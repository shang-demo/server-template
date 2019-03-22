import { resolve, basename, extname as pathExtname } from 'path';
import { stat, readdir, writeFile } from 'fs';
import { promisify } from 'util';
import bb from 'bluebird';

const writeFileAsync = promisify(writeFile);
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

const modelsPath = resolve(__dirname, '../../src/models');

const eslintrcPath = resolve(__dirname, '../../.eslintrc.js');

function formatCode(str: string) {
  const options = {
    text: str,
    filePath: eslintrcPath,
  };

  // eslint-disable-next-line
  return require('prettier-eslint')(options);
}

(async () => {
  let fileNames: string[] = await readdirAsync(modelsPath);

  let fileList = await bb.map(fileNames, async (fileName) => {
    let filePath = resolve(modelsPath, fileName);
    let extname = pathExtname(filePath);
    if (extname !== '.js' && extname !== '.ts') {
      return null;
    }

    let stats = await statAsync(filePath);

    return {
      fileName,
      stats,
      extname,
    };
  });

  let modelArr = fileList
    .filter((file) => {
      return file && file.stats && file.stats.isFile();
    })
    .map((file) => {
      if (!file) {
        throw new Error('no file');
      }
      let modelName = basename(file.fileName, file.extname);
      return modelName;
    });

  // eslint-disable-next-line
  let eslintrc = require(eslintrcPath);
  let globalVariables = ['Mixed', 'act', 'ObjectID', 'ObjectId', ...modelArr, ...Object.keys(eslintrc.globals || {})].sort();
  eslintrc.globals = globalVariables.reduce((obj: any, key) => {
    obj[key] = false;
    return obj;
  }, {});

  await writeFileAsync(
    eslintrcPath,
    formatCode(`
    module.exports = ${JSON.stringify(eslintrc, null, 2)}
`)
  );

  let str = modelArr
    .map((modelName) => {
      return `  var ${modelName}: Model<any>;`;
    })
    .join('\n');

  await writeFileAsync(
    resolve(__dirname, '../../src/types/model.d.ts'),
    `
import { Model } from 'mongoose';
import { ObjectID as MongodbObjectID, ObjectId as MongodbObjectId } from 'mongodb';

declare global {
  var ObjectId: typeof MongodbObjectId;
  var ObjectID: typeof MongodbObjectID;
  var Mixed: { [key: string]: any };
${str}
}
`
  );
})();
