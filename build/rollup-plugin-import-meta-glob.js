import { transformSync as ts2js } from 'esbuild'
import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import pluginutils from '@rollup/pluginutils'
import glob from "fast-glob"
import path from "path"

/**
 * @returns {import('rollup').InputPluginOption}
 */
function createPlugin(options) {
	if (!options) options = {};
	var { include, exclude, sourceMap, sourcemap, ...rest } = options
	var filter = pluginutils.createFilter(include, exclude);

	sourceMap = sourceMap !== false && sourcemap !== false;
	var seq1 = 0;
	var seq2 = 0;
	return {
		name: "import-meta-glob",
		transform(code, id) {
			if (!filter(id)) { return null; }
			var ast = null;
			code = ts2js(code, { loader: 'ts' }).code
			try {
				ast = this.parse(code);
			} catch (err) {
				this.warn({
					code: 'PARSE_ERROR',
					message: ("rollup-plugin-import-meta-glob: failed to parse " + id + ". Consider restricting the plugin to particular files via options.include")
				});
			}
			if (!ast) {
				return null;
			}
			var imports = new Set();
			ast.body.forEach(function (node) {
				if (node.type === 'ImportDeclaration') {
					node.specifiers.forEach(function (specifier) {
						imports.add(specifier.local.name);
					});
				}
			});

			var scope = pluginutils.attachScopes(ast, 'scope');
			var magicString = new MagicString(code);
			var changed = false;
			var newImports = [];

			walk(ast, {
				enter: function enter(node, parent) {
					if (sourceMap) {
						magicString.addSourcemapLocation(node.start);
						magicString.addSourcemapLocation(node.end);
					}
					if (node.scope) {
						scope = node.scope;
					}
					if (node.type === "CallExpression") {
						var callee = node.callee;
						if (callee) {
							if (callee.type === "MemberExpression") {
								var property = callee.property
								if (property) {
									if (property.type === "Identifier") {
										if (property.name === "glob") {
											let object = callee.object;
											if (object && object.type === "MetaProperty") {
												let args = node.arguments;
												if (args && args.length) {
													let argument1 = args[0];
													if (argument1.type === "Literal") {
														let paths = glob.sync(argument1.value, {
															cwd: path.dirname(id),
															...rest
														});
														magicString.overwrite(node.start, node.end, "{" + paths.map(function (path) {
															return JSON.stringify(path) + ": function(){ return import(" + JSON.stringify(path) + ");}"
														}).join(",") + "}");
														changed = true;
													} else {
														console.error("import.meta.glob() argument should be string")
													}
												} else {
													console.error("import.meta.glob() has no arguments")
												}
											}
										} else if (property.name === "globEager") {
											let object = callee.object;
											if (object && object.type === "MetaProperty") {
												let args = node.arguments;
												if (args && args.length) {
													let argument1 = args[0];
													if (argument1.type === "Literal") {
														let paths = glob.sync(argument1.value, {
															cwd: path.dirname(id),
															...rest
														});
														magicString.overwrite(node.start, node.end, "{" + paths.map(function (path) {
															path = path.replace(/^(\.\/)?/, './')
															let importName;
															do {
																importName = `__glob__${seq2}_${seq1++}`;
															} while (imports.has(importName) || scope.contains(importName));
															newImports.push([importName, path]);
															return JSON.stringify(path) + ": " + importName
														}).join(",") + "}");
														changed = true;
													} else {
														console.error("import.meta.globEager() argument should be string")
													}
													seq2++;
												} else {
													console.error("import.meta.globEager() has no arguments")
												}
											}
										}
									}
								}
							}
						}
					}
				},
				leave: function leave(node) {
					if (node.scope) {
						scope = scope.parent;
					}
				}
			});
			if (newImports.length) {
				magicString.prepend(newImports.map(imp => `import * as ${imp[0]} from ${JSON.stringify(imp[1])};`).join(""));
				changed = true;
			}
			if (!changed) {
				return {
					code: code,
					ast: ast,
					map: sourceMap ? magicString.generateMap({ hires: true }) : null
				};
			}

			return {
				code: magicString.toString(),
				map: sourceMap ? magicString.generateMap({ hires: true }) : null
			};
		}
	};
}
export default createPlugin;