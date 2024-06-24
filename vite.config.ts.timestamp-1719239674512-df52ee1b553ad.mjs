// vite.config.ts
import { defineConfig } from "file:///D:/npm-project/el-lowcode/node_modules/.pnpm/vite@4.5.3_7oimt4uavhsfeixmluil6lyqoy/node_modules/vite/dist/node/index.js";

// build/all-pkgs.js
import fg from "file:///D:/npm-project/el-lowcode/node_modules/.pnpm/fast-glob@3.3.2/node_modules/fast-glob/out/index.js";

// build/utils.js
import { writeFileSync } from "fs";
import fse from "file:///D:/npm-project/el-lowcode/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
import path from "path";
var cwd = process.cwd().replaceAll("\\", "/");
var pkgDir = (...args) => path.join("packages", ...args);
var pkgJsonPath = (dir) => pkgDir(dir, "package.json");
var pkgJson = (dir, content) => {
  if (content)
    return writeFileSync(pkgJsonPath(dir), JSON.stringify(content, null, "  "));
  return fse.readJsonSync(pkgJsonPath(dir));
};

// build/all-pkgs.js
import fse2 from "file:///D:/npm-project/el-lowcode/node_modules/.pnpm/fs-extra@11.2.0/node_modules/fs-extra/lib/index.js";
import path2 from "path";
var ALL_PKG_DIRS = fg.sync("*/index.ts", { cwd: pkgDir() }).map((e) => e.split("/")[0]);
var ALL_PKGS = ALL_PKG_DIRS.map((e) => {
  var _a;
  return (_a = pkgJson(e)) == null ? void 0 : _a.name;
}).filter((e) => e);
var ALL_DEPS = (() => {
  let ret = ALL_PKG_DIRS.map((e) => {
    const pkg = pkgJson(e);
    return [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
  }).flat();
  const rootPkg = fse2.readJsonSync(path2.join(cwd, "package.json"));
  ret.push(...Object.keys(rootPkg.dependencies || {}), ...Object.keys(rootPkg.peerDependencies || {}));
  return [...new Set(ret)];
})();

// build/plugins/alias.js
import _alias from "file:///D:/npm-project/el-lowcode/node_modules/.pnpm/@rollup+plugin-alias@5.1.0_rollup@3.29.4/node_modules/@rollup/plugin-alias/dist/es/index.js";
import path3 from "path";
var entries = ALL_PKGS.map((pkg) => ({
  find: pkg,
  replacement: path3.join(cwd, pkgDir(pkg.replace("@el-lowcode/", ""), "index.ts"))
}));
var alias = _alias({
  entries
});

// vite.config.ts
var vite_config_default = defineConfig(async () => ({
  base: "/el-lowcode/designer",
  resolve: {
    alias: [
      ...entries
    ]
  },
  optimizeDeps: {
    exclude: ["vue"]
  },
  server: {
    port: 5174
  },
  build: {
    outDir: "docs/dest/designer",
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, "@vue"].find((e) => id.includes(`node_modules/${e}/`));
          if (dep && dep != "vue")
            return dep.replaceAll("/", "-");
        }
      },
      plugins: [
        (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@3.29.4/node_modules/rollup-plugin-visualizer/dist/plugin/index.js")).visualizer()
      ]
    }
  },
  plugins: [
    // vue(),
    (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/unplugin-vue-macros@2.9.2_zaxieds36ogvb3hg4leobfs7ye/node_modules/unplugin-vue-macros/dist/vite.mjs")).default({
      plugins: {
        vue: (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.3+vue@3.4.27/node_modules/@vitejs/plugin-vue/dist/index.mjs")).default(),
        vueJsx: (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@4.5.3+vue@3.4.27/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs")).default()
        // if needed
      }
    }),
    (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/unocss@0.54.1_rollup@3.29.4+vite@4.5.3/node_modules/unocss/dist/vite.mjs")).default(),
    (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/unplugin-vue-components@0.25.2_rollup@3.29.4+vue@3.4.27/node_modules/unplugin-vue-components/dist/vite.mjs")).default({
      resolvers: [(await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/unplugin-icons@0.17.4_@vue+compiler-sfc@3.4.27/node_modules/unplugin-icons/dist/resolver.mjs")).default()]
    }),
    (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/unplugin-icons@0.17.4_@vue+compiler-sfc@3.4.27/node_modules/unplugin-icons/dist/vite.mjs")).default({ autoInstall: true }),
    (await import("file:///D:/npm-project/el-lowcode/node_modules/.pnpm/vite-plugin-pages@0.31.0_ugjbiaq7kyimkgmew2omubsso4/node_modules/vite-plugin-pages/dist/index.mjs")).default({ dirs: "designer/pages" })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvYWxsLXBrZ3MuanMiLCAiYnVpbGQvdXRpbHMuanMiLCAiYnVpbGQvcGx1Z2lucy9hbGlhcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG5wbS1wcm9qZWN0XFxcXGVsLWxvd2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG5wbS1wcm9qZWN0XFxcXGVsLWxvd2NvZGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L25wbS1wcm9qZWN0L2VsLWxvd2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBBTExfREVQUyB9IGZyb20gJy4vYnVpbGQvYWxsLXBrZ3MuanMnXHJcblxyXG4vLyBjb25zb2xlLmxvZyhBTExfREVQUyk7XHJcblxyXG5pbXBvcnQgeyBlbnRyaWVzIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zL2FsaWFzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKGFzeW5jICgpID0+ICh7XHJcbiAgYmFzZTogJy9lbC1sb3djb2RlL2Rlc2lnbmVyJyxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICAuLi5lbnRyaWVzLFxyXG4gICAgXVxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBleGNsdWRlOiBbJ3Z1ZSddLFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA1MTc0XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZG9jcy9kZXN0L2Rlc2lnbmVyJyxcclxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRlcCA9IFsuLi5BTExfREVQUywgJ0B2dWUnXS5maW5kKGUgPT4gaWQuaW5jbHVkZXMoYG5vZGVfbW9kdWxlcy8ke2V9L2ApKVxyXG4gICAgICAgICAgaWYgKGRlcCAmJiBkZXAgIT0gJ3Z1ZScpIHJldHVybiBkZXAucmVwbGFjZUFsbCgnLycsICctJylcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAoYXdhaXQgaW1wb3J0KCdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInKSkudmlzdWFsaXplcigpXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIC8vIHZ1ZSgpLFxyXG4gICAgKGF3YWl0IGltcG9ydCgndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJykpLmRlZmF1bHQoe1xyXG4gICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgdnVlOiAoYXdhaXQgaW1wb3J0KCdAdml0ZWpzL3BsdWdpbi12dWUnKSkuZGVmYXVsdCgpLFxyXG4gICAgICAgIHZ1ZUpzeDogKGF3YWl0IGltcG9ydCgnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCcpKS5kZWZhdWx0KCksIC8vIGlmIG5lZWRlZFxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIChhd2FpdCBpbXBvcnQoJ3Vub2Nzcy92aXRlJykpLmRlZmF1bHQoKSxcclxuICAgIChhd2FpdCBpbXBvcnQoJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnKSkuZGVmYXVsdCh7XHJcbiAgICAgIHJlc29sdmVyczogWyhhd2FpdCBpbXBvcnQoJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJykpLmRlZmF1bHQoKV1cclxuICAgIH0pLFxyXG4gICAgKGF3YWl0IGltcG9ydCgndW5wbHVnaW4taWNvbnMvdml0ZScpKS5kZWZhdWx0KHsgYXV0b0luc3RhbGw6IHRydWUgfSksXHJcbiAgICAoYXdhaXQgaW1wb3J0KCd2aXRlLXBsdWdpbi1wYWdlcycpKS5kZWZhdWx0KHsgZGlyczogJ2Rlc2lnbmVyL3BhZ2VzJyB9KVxyXG4gIF1cclxufSkpXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbnBtLXByb2plY3RcXFxcZWwtbG93Y29kZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbnBtLXByb2plY3RcXFxcZWwtbG93Y29kZVxcXFxidWlsZFxcXFxhbGwtcGtncy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbnBtLXByb2plY3QvZWwtbG93Y29kZS9idWlsZC9hbGwtcGtncy5qc1wiO2ltcG9ydCBmZyBmcm9tICdmYXN0LWdsb2InXHJcbmltcG9ydCB7IGN3ZCwgcGtnRGlyLCBwa2dKc29uIH0gZnJvbSAnLi91dGlscy5qcydcclxuaW1wb3J0IGZzZSBmcm9tICdmcy1leHRyYSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBjb25zdCBBTExfUEtHX0RJUlMgPSBmZy5zeW5jKCcqL2luZGV4LnRzJywgeyBjd2Q6IHBrZ0RpcigpIH0pLm1hcChlID0+IGUuc3BsaXQoJy8nKVswXSlcclxuXHJcbmV4cG9ydCBjb25zdCBBTExfUEtHUyA9IEFMTF9QS0dfRElSUy5tYXAoZSA9PiBwa2dKc29uKGUpPy5uYW1lKS5maWx0ZXIoZSA9PiBlKVxyXG5cclxuZXhwb3J0IGNvbnN0IEFMTF9ERVBTID0gKCgpID0+IHtcclxuICBsZXQgcmV0ID0gQUxMX1BLR19ESVJTLm1hcChlID0+IHtcclxuICAgIGNvbnN0IHBrZyA9IHBrZ0pzb24oZSlcclxuICAgIHJldHVybiBbLi4uT2JqZWN0LmtleXMocGtnLmRlcGVuZGVuY2llcyB8fCB7fSksIC4uLk9iamVjdC5rZXlzKHBrZy5wZWVyRGVwZW5kZW5jaWVzIHx8IHt9KV1cclxuICB9KS5mbGF0KClcclxuXHJcbiAgY29uc3Qgcm9vdFBrZyA9IGZzZS5yZWFkSnNvblN5bmMocGF0aC5qb2luKGN3ZCwgJ3BhY2thZ2UuanNvbicpKVxyXG4gIHJldC5wdXNoKC4uLk9iamVjdC5rZXlzKHJvb3RQa2cuZGVwZW5kZW5jaWVzIHx8IHt9KSwgLi4uT2JqZWN0LmtleXMocm9vdFBrZy5wZWVyRGVwZW5kZW5jaWVzIHx8IHt9KSlcclxuXHJcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KHJldCldXHJcbn0pKCkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG5wbS1wcm9qZWN0XFxcXGVsLWxvd2NvZGVcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG5wbS1wcm9qZWN0XFxcXGVsLWxvd2NvZGVcXFxcYnVpbGRcXFxcdXRpbHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L25wbS1wcm9qZWN0L2VsLWxvd2NvZGUvYnVpbGQvdXRpbHMuanNcIjtpbXBvcnQgeyB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnXHJcbmltcG9ydCBmc2UgZnJvbSAnZnMtZXh0cmEnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgY29uc3QgY3dkID0gcHJvY2Vzcy5jd2QoKS5yZXBsYWNlQWxsKCdcXFxcJywgJy8nKVxyXG5leHBvcnQgY29uc3QgcGtnRGlyID0gKC4uLmFyZ3MpID0+IHBhdGguam9pbigncGFja2FnZXMnLCAuLi5hcmdzKVxyXG5leHBvcnQgY29uc3QgcGtnSnNvblBhdGggPSAoZGlyKSA9PiBwa2dEaXIoZGlyLCAncGFja2FnZS5qc29uJylcclxuXHJcbmV4cG9ydCBjb25zdCBwa2dKc29uID0gKGRpciwgY29udGVudCkgPT4ge1xyXG4gIGlmIChjb250ZW50KSByZXR1cm4gd3JpdGVGaWxlU3luYyhwa2dKc29uUGF0aChkaXIpLCBKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCAnICAnKSlcclxuICByZXR1cm4gZnNlLnJlYWRKc29uU3luYyhwa2dKc29uUGF0aChkaXIpKVxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxucG0tcHJvamVjdFxcXFxlbC1sb3djb2RlXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG5wbS1wcm9qZWN0XFxcXGVsLWxvd2NvZGVcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhbGlhcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbnBtLXByb2plY3QvZWwtbG93Y29kZS9idWlsZC9wbHVnaW5zL2FsaWFzLmpzXCI7aW1wb3J0IF9hbGlhcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1hbGlhcydcclxuaW1wb3J0IHsgY3dkLCBwa2dEaXIgfSBmcm9tICcuLi91dGlscy5qcydcclxuaW1wb3J0IHsgQUxMX1BLR1MgfSBmcm9tICcuLi9hbGwtcGtncy5qcydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBjb25zdCBlbnRyaWVzID0gQUxMX1BLR1MubWFwKHBrZyA9PiAoe1xyXG4gIGZpbmQ6IHBrZyxcclxuICByZXBsYWNlbWVudDogcGF0aC5qb2luKGN3ZCwgcGtnRGlyKHBrZy5yZXBsYWNlKCdAZWwtbG93Y29kZS8nLCAnJyksICdpbmRleC50cycpKVxyXG59KSlcclxuXHJcbmV4cG9ydCBjb25zdCBhbGlhcyA9IF9hbGlh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QUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsS0FFTixNQUFNLE9BQU8sMEpBQTBCLEdBQUcsUUFBUTtBQUFBLE1BQ2pELFNBQVM7QUFBQSxRQUNQLE1BQU0sTUFBTSxPQUFPLG9KQUFvQixHQUFHLFFBQVE7QUFBQSxRQUNsRCxTQUFTLE1BQU0sT0FBTyw0SkFBd0IsR0FBRyxRQUFRO0FBQUE7QUFBQSxNQUMzRDtBQUFBLElBQ0YsQ0FBQztBQUFBLEtBQ0EsTUFBTSxPQUFPLCtIQUFhLEdBQUcsUUFBUTtBQUFBLEtBQ3JDLE1BQU0sT0FBTyxpS0FBOEIsR0FBRyxRQUFRO0FBQUEsTUFDckQsV0FBVyxFQUFFLE1BQU0sT0FBTyxtSkFBeUIsR0FBRyxRQUFRLENBQUM7QUFBQSxJQUNqRSxDQUFDO0FBQUEsS0FDQSxNQUFNLE9BQU8sK0lBQXFCLEdBQUcsUUFBUSxFQUFFLGFBQWEsS0FBSyxDQUFDO0FBQUEsS0FDbEUsTUFBTSxPQUFPLHdKQUFtQixHQUFHLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDeEU7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogWyJmc2UiLCAicGF0aCIsICJmc2UiLCAicGF0aCIsICJwYXRoIiwgInBhdGgiXQp9Cg==
