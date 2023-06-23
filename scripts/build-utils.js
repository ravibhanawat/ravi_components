#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const {
  publishedTSComponents,
  publishedJSComponents,
  publishedStorybookComponents
} = require("../webpack/published-components");

function createFoldersIfNotExist() {
  // if dist is not exist let's create it
  const distDir = path.join(__dirname, `../dist/`);

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }

  // if dist/icons not exist let's create it
  const iconsDir = path.join(distDir, `/icons`);
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }

  // if dist/storybook does not exist let's create it
  const storybookDir = path.join(distDir, `/storybook`);
  if (!fs.existsSync(storybookDir)) {
    fs.mkdirSync(storybookDir);
  }
}

function buildComponentExport(name, path) {
  return `export { default as ${name} } from "${path}";`;
}

function buildExportToComponentWithoutType(name) {
  return `export const ${name}: any;`;
}

function convertExportsToFile(exportsArray, fileName) {
  const content = `${exportsArray.join("\n")}\n`;
  fs.writeFileSync(path.join(__dirname, `../dist/${fileName}`), content, "utf8");
}

function buildComponentsTypesIndexFile() {
  const exportsWithTypescript = Object.entries(publishedTSComponents).map(([name, path]) =>
    buildComponentExport(name, `./types/${path}`)
  );

  const exportsWithJavasript = Object.keys(publishedJSComponents).map(name => buildExportToComponentWithoutType(name));
  convertExportsToFile(exportsWithTypescript.concat(exportsWithJavasript), "types.d.ts");
}

function buildStorybookComponentsIndexFile() {
  const exports = Object.entries(publishedStorybookComponents).map(([name, _path]) => {
    const fileName = name.split("/").slice(-1);
    return buildComponentExport(fileName, `./${fileName}`);
  });
  convertExportsToFile(exports, "storybook/index.js");
}

module.exports = {
  createFoldersIfNotExist,
  buildComponentsTypesIndexFile,
  buildStorybookComponentsIndexFile
};
