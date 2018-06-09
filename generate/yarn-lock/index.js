import crypto from 'crypto';
import { stat } from 'fs-extra';
import { resolve as pathResolve } from 'path';

async function isExists(p) {
  try {
    await stat(p);
    return true;
  }
  catch (e) {
    return false;
  }
}

function getLockName(packageArr) {
  const hash = crypto.createHash('sha256');

  if (typeof packageArr === 'string') {
    hash.update(packageArr);
  }
  else {
    hash.update(packageArr.join(' '));
  }
  return hash.digest('hex');
}

function getLockPath(packageArr) {
  let name = getLockName(packageArr);
  console.info(packageArr.join(' '));
  console.info('name: ', name);

  let file = pathResolve(__dirname, name);

  if (isExists(file)) {
    return file;
  }
  return null;
}

export { getLockName, getLockPath };
export default getLockPath;
