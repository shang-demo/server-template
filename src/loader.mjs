import url from 'url';
import path from 'path';
import process from 'process';
import fs from 'fs';

// 从package.json中
// 的 dependencies devDependencies 获取项目所需npm模块信息
const ROOT_PATH = process.cwd();
const PKG_JSON_PATH = path.join(ROOT_PATH, 'package.json');
const PKG_JSON_STR = fs.readFileSync(PKG_JSON_PATH, 'binary');
const PKG_JSON = JSON.parse(PKG_JSON_STR);
// 项目所需npm模块信息
const allDependencies = {
  ...(PKG_JSON.dependencies || {}),
  ...(PKG_JSON.devDependencies || {}),
};

// Node原生模信息
const buildIns = new Set(
  Object.keys(process.binding('natives')).filter((str) => {
    return /^(?!(?:internal|node|v8)\/)/.test(str);
  })
);

// 文件引用兼容后缀名
const JS_EXTENSIONS = new Set(['.js', '.mjs']);
const JSON_EXTENSIONS = new Set(['.json']);

export default function resolve(specifier, parentModuleURL, defaultResolve) {
  // 判断是否为Node原生模块
  if (buildIns.has(specifier)) {
    return {
      url: specifier,
      format: 'builtin',
    };
  }

  // 判断是否为npm模块
  if (allDependencies && typeof allDependencies[specifier] === 'string') {
    return defaultResolve(specifier, parentModuleURL);
  }

  // 如果是文件引用，判断是否路径格式正确
  if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) {
    throw new Error(`imports must begin with '/', './', or '../'; '${specifier}' does not`);
  }

  // 判断是否为*.js、*.mjs、*.json文件
  const resolved = new url.URL(specifier, parentModuleURL);
  const ext = path.extname(resolved.pathname);

  // 如果是*.js、*.mjs文件
  if (JS_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'esm',
    };
  }

  // 如果是*.json文件
  if (JSON_EXTENSIONS.has(ext)) {
    return {
      url: resolved.href,
      format: 'json',
    };
  }

  throw new Error(`Cannot load file with non-JavaScript file extension ${ext}.`);
}
