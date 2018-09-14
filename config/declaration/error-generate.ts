import '../../src/config/error';
import { resolve } from 'path';
import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);

let str = `
declare class ErrFn {
  code: string;
  message: string;
  extra: any;

  constructor(extra: any, ...args: any[]);
}

interface Errors {
  OperationalError(): void;
  UnknownError: typeof ErrFn;
  ParamsRequired: typeof ErrFn;
__INSERT_ERRORS__
}

declare var Errors: Errors;
`;

let temp = '';
Object.keys(global.Errors)
  .map((key) => {
    if (['OperationalError', 'UnknownError', 'ParamsRequired'].indexOf(key) >= 0) {
      return null;
    }

    return key;
  })
  .filter((key) => {
    return key;
  })
  .forEach((key) => {
    temp += `  ${key}: typeof ErrFn;\n`;
  });

str = str.replace('__INSERT_ERRORS__', temp);

console.info(str);

(async () => {
  await writeFileAsync(resolve(__dirname, '../../src/types/errors.d.ts'), str);
})();
