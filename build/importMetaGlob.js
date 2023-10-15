import path, { posix, isAbsolute } from 'node:path';
import micromatch from 'micromatch';
import { stripLiteral } from 'strip-literal';
import { parseExpressionAt } from 'acorn';
import { findNodeAt } from 'acorn-walk';
import MagicString from 'magic-string';
import fg from 'fast-glob';
import { stringifyQuery } from 'ufo';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const windowsSlashRE = /\\/g;
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
const isWindows = os.platform() === "win32";
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}
new Function("file", "return import(file)");
path.dirname(fileURLToPath(import.meta.url));
function transformStableResult(s, id, config) {
  return {
    code: s.toString(),
    map: config.command === "build" && config.build.sourcemap ? s.generateMap({ hires: "boundary", source: id }) : null
  };
}
function evalValue(rawValue) {
  const fn = new Function(`
    var console, exports, global, module, process, require
    return (
${rawValue}
)
  `);
  return fn();
}

const { isMatch, scan } = micromatch;
function getAffectedGlobModules(file, server) {
  const modules = [];
  for (const [id, allGlobs] of server._importGlobMap) {
    if (allGlobs.some(
      ({ affirmed, negated }) => (!affirmed.length || affirmed.some((glob) => isMatch(file, glob))) && (!negated.length || negated.every((glob) => isMatch(file, glob)))
    )) {
      const mod = server.moduleGraph.getModuleById(id);
      if (mod)
        modules.push(mod);
    }
  }
  modules.forEach((i) => {
    if (i?.file)
      server.moduleGraph.onFileChange(i.file);
  });
  return modules;
}

/**
 * 
 * @param {import('vite/dist/node/index.d.ts').ResolvedConfig} config
 * @returns 
 */
function importGlobPlugin(config) {
  let server;
  return {
    name: "vite:import-glob",
    configureServer(_server) {
      server = _server;
      server._importGlobMap.clear();
    },
    async transform(code, id) {
      if (!code.includes("import.meta.glob"))
        return;
      const result = await transformGlobImport(
        code,
        id,
        config.root,
        (im, _, options) => this.resolve(im, id, options).then((i) => i?.id || im),
        config.experimental?.importGlobRestoreExtension,
      );
      if (result) {
        if (server) {
          const allGlobs = result.matches.map((i) => i.globsResolved);
          server._importGlobMap.set(
            id,
            allGlobs.map((globs) => {
              const affirmed = [];
              const negated = [];
              for (const glob of globs) {
                (glob[0] === "!" ? negated : affirmed).push(glob);
              }
              return { affirmed, negated };
            })
          );
        }
        return transformStableResult(result.s, id, config);
      }
    }
  };
}
const importGlobRE = /\bimport\.meta\.glob(?:<\w+>)?\s*\(/g;
const knownOptions = {
  as: ["string"],
  eager: ["boolean"],
  import: ["string"],
  exhaustive: ["boolean"],
  query: ["object", "string"]
};
const forceDefaultAs = ["raw", "url"];
function err(e, pos) {
  const error = new Error(e);
  error.pos = pos;
  return error;
}
function parseGlobOptions(rawOpts, optsStartIndex) {
  let opts = {};
  try {
    opts = evalValue(rawOpts);
  } catch {
    throw err(
      "Vite is unable to parse the glob options as the value is not static",
      optsStartIndex
    );
  }
  if (opts == null) {
    return {};
  }
  for (const key in opts) {
    if (!(key in knownOptions)) {
      throw err(`Unknown glob option "${key}"`, optsStartIndex);
    }
    const allowedTypes = knownOptions[key];
    const valueType = typeof opts[key];
    if (!allowedTypes.includes(valueType)) {
      throw err(
        `Expected glob option "${key}" to be of type ${allowedTypes.join(
          " or "
        )}, but got ${valueType}`,
        optsStartIndex
      );
    }
  }
  if (typeof opts.query === "object") {
    for (const key in opts.query) {
      const value = opts.query[key];
      if (!["string", "number", "boolean"].includes(typeof value)) {
        throw err(
          `Expected glob option "query.${key}" to be of type string, number, or boolean, but got ${typeof value}`,
          optsStartIndex
        );
      }
    }
  }
  if (opts.as && forceDefaultAs.includes(opts.as)) {
    if (opts.import && opts.import !== "default" && opts.import !== "*")
      throw err(
        `Option "import" can only be "default" or "*" when "as" is "${opts.as}", but got "${opts.import}"`,
        optsStartIndex
      );
    opts.import = opts.import || "default";
  }
  if (opts.as && opts.query)
    throw err(
      'Options "as" and "query" cannot be used together',
      optsStartIndex
    );
  if (opts.as)
    opts.query = opts.as;
  return opts;
}
async function parseImportGlob(code, importer, root, resolveId) {
  let cleanCode;
  try {
    cleanCode = stripLiteral(code);
  } catch (e) {
    return [];
  }
  const matches = Array.from(cleanCode.matchAll(importGlobRE));
  const tasks = matches.map(async (match, index) => {
    const start = match.index;
    const err2 = (msg) => {
      const e = new Error(`Invalid glob import syntax: ${msg}`);
      e.pos = start;
      return e;
    };
    let ast;
    let lastTokenPos;
    try {
      ast = parseExpressionAt(code, start, {
        ecmaVersion: "latest",
        sourceType: "module",
        ranges: true,
        onToken: (token) => {
          lastTokenPos = token.end;
        }
      });
    } catch (e) {
      const _e = e;
      if (_e.message && _e.message.startsWith("Unterminated string constant"))
        return void 0;
      if (lastTokenPos == null || lastTokenPos <= start)
        throw _e;
      try {
        const statement = code.slice(start, lastTokenPos).replace(/[,\s]*$/, "");
        ast = parseExpressionAt(
          " ".repeat(start) + statement,
          // to keep the ast position
          start,
          {
            ecmaVersion: "latest",
            sourceType: "module",
            ranges: true
          }
        );
      } catch {
        throw _e;
      }
    }
    const found = findNodeAt(ast, start, void 0, "CallExpression");
    if (!found)
      throw err2(`Expect CallExpression, got ${ast.type}`);
    ast = found.node;
    if (ast.arguments.length < 1 || ast.arguments.length > 2)
      throw err2(`Expected 1-2 arguments, but got ${ast.arguments.length}`);
    const arg1 = ast.arguments[0];
    const arg2 = ast.arguments[1];
    const globs = [];
    const validateLiteral = (element) => {
      if (!element)
        return;
      if (element.type === "Literal") {
        if (typeof element.value !== "string")
          throw err2(
            `Expected glob to be a string, but got "${typeof element.value}"`
          );
        globs.push(element.value);
      } else if (element.type === "TemplateLiteral") {
        if (element.expressions.length !== 0) {
          throw err2(
            `Expected glob to be a string, but got dynamic template literal`
          );
        }
        globs.push(element.quasis[0].value.raw);
      } else {
        throw err2("Could only use literals");
      }
    };
    if (arg1.type === "ArrayExpression") {
      for (const element of arg1.elements) {
        validateLiteral(element);
      }
    } else {
      validateLiteral(arg1);
    }
    let options = {};
    if (arg2) {
      if (arg2.type !== "ObjectExpression")
        throw err2(
          `Expected the second argument to be an object literal, but got "${arg2.type}"`
        );
      options = parseGlobOptions(
        code.slice(arg2.range[0], arg2.range[1]),
        arg2.range[0]
      );
    }
    const end = ast.range[1];
    const globsResolved = await Promise.all(
      globs.map((glob) => toAbsoluteGlob(glob, root, importer, resolveId))
    );
    const isRelative = globs.every((i) => ".!".includes(i[0]));
    return {
      index,
      globs,
      globsResolved,
      isRelative,
      options,
      start,
      end
    };
  });
  return (await Promise.all(tasks)).filter(Boolean);
}
const importPrefix = "__vite_glob_";
const { basename, dirname, relative, join } = posix;
async function transformGlobImport(code, id, root, resolveId, restoreQueryExtension = false) {
  id = slash(id);
  root = slash(root);
  const isVirtual = isVirtualModule(id);
  const dir = isVirtual ? void 0 : dirname(id);
  const matches = await parseImportGlob(
    code,
    isVirtual ? void 0 : id,
    root,
    resolveId
  );
  const matchedFiles = /* @__PURE__ */ new Set();
  if (!matches.length)
    return null;
  const s = new MagicString(code);
  const staticImports = (await Promise.all(
    matches.map(
      async ({ globsResolved, isRelative, options, index, start, end }) => {
        const cwd = getCommonBase(globsResolved) ?? root;
        const files = (await fg(globsResolved, {
          cwd,
          absolute: true,
          dot: !!options.exhaustive,
          ignore: options.exhaustive ? [] : [join(cwd, "**/node_modules/**")]
        })).filter((file) => file !== id).sort();
        const objectProps = [];
        const staticImports2 = [];
        let query = !options.query ? "" : typeof options.query === "string" ? options.query : stringifyQuery(options.query);
        if (query && query[0] !== "?")
          query = `?${query}`;
        const resolvePaths = (file) => {
          if (!dir) {
            if (isRelative)
              throw new Error(
                "In virtual modules, all globs must start with '/'"
              );
            const filePath2 = `/${relative(root, file)}`;
            return { filePath: filePath2, importPath: filePath2 };
          }
          let importPath = relative(dir, file);
          if (importPath[0] !== ".")
            importPath = `./${importPath}`;
          let filePath;
          if (isRelative) {
            filePath = importPath;
          } else {
            filePath = relative(root, file);
            if (filePath[0] !== ".")
              filePath = `/${filePath}`;
          }
          return { filePath, importPath };
        };
        files.forEach((file, i) => {
          const paths = resolvePaths(file);
          const filePath = paths.filePath;
          let importPath = paths.importPath;
          let importQuery = query;
          if (importQuery && importQuery !== "?raw") {
            const fileExtension = basename(file).split(".").slice(-1)[0];
            if (fileExtension && restoreQueryExtension)
              importQuery = `${importQuery}&lang.${fileExtension}`;
          }
          importPath = `${importPath}${importQuery}`;
          const importKey = options.import && options.import !== "*" ? options.import : void 0;
          if (options.eager) {
            const variableName = `${importPrefix}${index}_${i}`;
            const expression = importKey ? `{ ${importKey} as ${variableName} }` : `* as ${variableName}`;
            staticImports2.push(
              `import ${expression} from ${JSON.stringify(importPath)}`
            );
            objectProps.push(`${JSON.stringify(filePath)}: ${variableName}`);
          } else {
            let importStatement = `import(${JSON.stringify(importPath)})`;
            if (importKey)
              importStatement += `.then(m => m[${JSON.stringify(importKey)}])`;
            objectProps.push(
              `${JSON.stringify(filePath)}: () => ${importStatement}`
            );
          }
        });
        files.forEach((i) => matchedFiles.add(i));
        const originalLineBreakCount = code.slice(start, end).match(/\n/g)?.length ?? 0;
        const lineBreaks = originalLineBreakCount > 0 ? "\n".repeat(originalLineBreakCount) : "";
        const replacement = `/* #__PURE__ */ Object.assign({${objectProps.join(
          ","
        )}${lineBreaks}})`;
        s.overwrite(start, end, replacement);
        return staticImports2;
      }
    )
  )).flat();
  if (staticImports.length)
    s.prepend(`${staticImports.join(";")};`);
  return {
    s,
    matches,
    files: matchedFiles
  };
}
function globSafePath(path) {
  return fg.escapePath(normalizePath(path));
}
function lastNthChar(str, n) {
  return str.charAt(str.length - 1 - n);
}
function globSafeResolvedPath(resolved, glob) {
  let numEqual = 0;
  const maxEqual = Math.min(resolved.length, glob.length);
  while (numEqual < maxEqual && lastNthChar(resolved, numEqual) === lastNthChar(glob, numEqual)) {
    numEqual += 1;
  }
  const staticPartEnd = resolved.length - numEqual;
  const staticPart = resolved.slice(0, staticPartEnd);
  const dynamicPart = resolved.slice(staticPartEnd);
  return globSafePath(staticPart) + dynamicPart;
}
async function toAbsoluteGlob(glob, root, importer, resolveId) {
  let pre = "";
  if (glob[0] === "!") {
    pre = "!";
    glob = glob.slice(1);
  }
  root = globSafePath(root);
  const dir = importer ? globSafePath(dirname(importer)) : root;
  if (glob[0] === "/")
    return pre + posix.join(root, glob.slice(1));
  if (glob.startsWith("./"))
    return pre + posix.join(dir, glob.slice(2));
  if (glob.startsWith("../"))
    return pre + posix.join(dir, glob);
  if (glob.startsWith("**"))
    return pre + glob;
  const isSubImportsPattern = glob[0] === "#" && glob.includes("*");
  const resolved = normalizePath(
    await resolveId(glob, importer, {
      custom: { "vite:import-glob": { isSubImportsPattern } }
    }) || glob
  );
  if (isSubImportsPattern) {
    return join(root, resolved);
  }
  if (isAbsolute(resolved)) {
    return pre + globSafeResolvedPath(resolved, glob);
  }
  throw new Error(
    `Invalid glob: "${glob}" (resolved: "${resolved}"). It must start with '/' or './'`
  );
}
function getCommonBase(globsResolved) {
  const bases = globsResolved.filter((g) => g[0] !== "!").map((glob) => {
    let { base } = scan(glob);
    if (posix.basename(base).includes("."))
      base = posix.dirname(base);
    return base;
  });
  if (!bases.length)
    return null;
  let commonAncestor = "";
  const dirS = bases[0].split("/");
  for (let i = 0; i < dirS.length; i++) {
    const candidate = dirS.slice(0, i + 1).join("/");
    if (bases.every((base) => base.startsWith(candidate)))
      commonAncestor = candidate;
    else
      break;
  }
  if (!commonAncestor)
    commonAncestor = "/";
  return commonAncestor;
}
function isVirtualModule(id) {
  return id.startsWith("virtual:") || id[0] === "\0" || !id.includes("/");
}

export { getAffectedGlobModules, getCommonBase, importGlobPlugin, isVirtualModule, parseImportGlob, toAbsoluteGlob, transformGlobImport };
