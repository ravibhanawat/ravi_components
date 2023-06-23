import * as path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import postCssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import { sha256 } from "js-sha256";
import * as fs from "fs";
import ejs from "ejs";

const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
const ROOT_PATH = path.join(__dirname);
const SRC_PATH = path.join(ROOT_PATH, "src");
const DIST_PATH = path.join(ROOT_PATH, "dist");
const injectStyle = fs.readFileSync("./rollup/styleInject.ejs", "utf8");

const shouldMockModularClassnames = process.env.mock_classnames === "on";

function getShortSha(content, length = 10) {
  return sha256(content).slice(0, length);
}

function generateCssModulesScopedName(name, filename, css) {
  const start = css.indexOf(`${name} {`);
  const end = css.indexOf("}", start);
  const content = css.slice(start + name.length + 1, end).replace(/[\r\n]/, "");
  return `${name}_${getShortSha(content)}`;
}

function generateCssModulesMockName(name) {
  return name;
}

export default {
  output: {
    dir: shouldMockModularClassnames ? path.join(DIST_PATH, "mocked_classnames_esm") : path.join(DIST_PATH, "esm"),
    indent: false,
    strict: false,
    exports: "named",
    preserveModules: true
  },
  input: {
    index: path.join(SRC_PATH, "index.js"),
    icons: path.join(SRC_PATH, "components/Icon/Icons/index.ts"),
    interactionsTests: path.join(SRC_PATH, "tests/interactions-utils.ts"),
    testIds: path.join(SRC_PATH, "tests/test-ids-utils.ts")
  },
  external: [/node_modules\/(?!monday-ui-style)(.*)/],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: [...EXTENSIONS, ".json", ".css"]
    }),
    typescript({
      tsconfig: path.join(ROOT_PATH, "tsconfig.esm.json")
    }),
    babel({
      babelHelpers: "bundled",
      extensions: EXTENSIONS
    }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      }
    }),
    postcss({
      /**
       * Normally, this plugin expects a local version of "node_modules" to be present, but since
       * we're externalizing all "node_modules", it doesn't exist.
       * This little hack makes sure we're using "node_modules" instead of what the plugin expects.
       */
      inject: function (cssVariableName, filename) {
        if (!injectStyle) return null;
        let shaKey = filename;
        try {
          const data = fs.readFileSync(filename, "utf8");

          shaKey = getShortSha(data, 12);
        } catch (err) {
          console.error(err);
        }

        const hashValue = `s_id-${shaKey}`;
        return ejs.render(injectStyle, { cssVariableName, hashValue });
      },
      plugins: [autoprefixer(), postCssImport()],
      modules: {
        generateScopedName: (name, filename, css) =>
          shouldMockModularClassnames
            ? generateCssModulesMockName(name)
            : generateCssModulesScopedName(name, filename, css)
      }
    })
  ]
};
