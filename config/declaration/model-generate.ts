import { resolve, basename, extname as pathExtname } from 'path';
import { stat, readdir, writeFile } from 'fs';
import { promisify } from 'util';
import bb from 'bluebird';

const writeFileAsync = promisify(writeFile);
const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

const modelsPath = resolve(__dirname, '../../src/models');

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

  let str = fileList
    .filter((file) => {
      return file && file.stats && file.stats.isFile();
    })
    .map((file) => {
      let modelName = basename(file.fileName, file.extname);
      return `var ${modelName}: Model<any>;`;
    })
    .join('\n');

  await writeFileAsync(
    resolve(__dirname, '../../src/types/model.d.ts'),
    `
import { Model } from 'mongoose';
import { ObjectID as MongodbObjectId } from 'mongodb';

declare global {
  var ObjectID: typeof MongodbObjectId;

  ${str}
}
`
  );
})();
