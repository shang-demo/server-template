import Promise from 'bluebird';
import { merge } from 'lodash';
import { exec, cp, mkdir, touch } from 'shelljs';
import { resolve as pathResolve, parse as pathParse } from 'path';
import format from 'prettier-eslint';
import { camelize } from 'humps';
import { writeFile, readFile } from 'fs-extra';
import { components, cpDirs } from './constants';
import { getLockPath } from './yarn-lock/index';

const templateDir = pathResolve(__dirname, '../');

const indexUseList = [];
const fileMap = {};
const packageRequired = ['bluebird', 'lodash', '@ofa2/ofa2', '@ofa2/ofa2-error'];

async function ensureDir(p) {
  let { dir } = pathParse(p);
  mkdir('-p', dir);
}

async function ensureFile(p) {
  await ensureDir(p);
  touch(p);
}

async function projectCp(targetDir, src, dist = src) {
  let srcPath = pathResolve(templateDir, src);
  let distPath = pathResolve(targetDir, dist);

  await ensureDir(distPath);
  // console.info(`cp -r ${srcPath}, ${distPath}`);
  return cp('-r', srcPath, distPath);
}

function appendPackageRequired(name) {
  let packageName = name;
  if (/^ofa2-/.test(name)) {
    packageName = `@ofa2/${name}`;
  }

  if (packageRequired.indexOf(packageName) === -1) {
    packageRequired.push(packageName);
  }
}

async function createComponent(targetDir, name) {
  let configurations = components[name];

  configurations.map((config) => {
    if (config.use) {
      indexUseList.push(config);
      appendPackageRequired(config.use);
      return null;
    }

    if (config.cp) {
      if (config.cp.src) {
        return projectCp(targetDir, config.cp.src, config.cp.dist);
      }

      return projectCp(targetDir, config.cp);
    }

    if (config.src && config.value) {
      fileMap[config.src] = fileMap[config.src] || {};
      fileMap[config.src] = merge(fileMap[config.src], config.value);
      return null;
    }

    if (config.package) {
      appendPackageRequired(config.package);
    }
    return null;
  });
}

async function createPackageJson(targetDir) {
  let { name } = pathParse(targetDir);
  let pkgStr = await readFile(pathResolve(templateDir, 'package.json'));
  let pkg = JSON.parse(pkgStr);

  pkg.name = name;

  let dependencies = {
    '@ofa2/ofa2': '^1.0.4',
    '@ofa2/ofa2-error': '^1.0.2',
    bluebird: '^3.5.1',
    lodash: '^4.17.10',
  };

  pkg.dependencies = dependencies;

  let p = pathResolve(targetDir, 'package.json');
  await ensureFile(p);
  await writeFile(p, JSON.stringify(pkg, null, 2));
}

function formatCode(str) {
  const options = {
    text: str,
    filePath: pathResolve(__dirname, '../.eslintrc.js'),
  };

  return format(options);
}

async function getPackageRequired() {
  return packageRequired;
}

async function buildPackage(targetDir) {
  await createPackageJson(targetDir);
  let lockPath = await getLockPath(packageRequired);

  if (lockPath) {
    cp(lockPath, pathResolve(targetDir, 'yarn.lock'));
  }

  let cmd = `cd ${targetDir} && yarnpkg add ${packageRequired.join(' ')}`;
  console.log(cmd);
  await exec(cmd);
}

async function cpBase(targetDir) {
  // copy dirs
  await Promise.all(cpDirs.map((src) => {
    return projectCp(targetDir, src);
  }));
}

async function ensureTargetDir(targetDir) {
  await exec(`mkdir -p ${targetDir}`);
}

async function buildComponents(targetDir, {
  model, koaServer, senecaClient, senecaServer,
}) {
  let requiredComponents = ['als', 'config', 'log'];
  // mongoose model
  if (model) {
    requiredComponents.push(...['model']);
  }

  if (koaServer) {
    requiredComponents.push(...['koa', 'koaController', 'koaPolicy', 'koaRoute', 'koaServer']);
  }

  if (senecaClient) {
    requiredComponents.push(...['seneca', 'senecaClient', 'senecaWrapAct']);
  }

  if (senecaServer) {
    // senecaClient may had add seneca
    if (requiredComponents.indexOf('seneca') === -1) {
      requiredComponents.push('seneca');
    }

    requiredComponents.push(...['senecaController', 'senecaRoute', 'senecaServer']);
  }

  requiredComponents.push(...['shutdown']);

  await Promise.all(requiredComponents.map((key) => {
    return createComponent(targetDir, key);
  }));
}

async function buildConfigFile(targetDir) {
  await Promise.all(Object.keys(fileMap).map(async (key) => {
    let str = `export default\n${JSON.stringify(fileMap[key], null, 2)}`;
    let p = pathResolve(targetDir, key);

    await ensureFile(p);
    writeFile(p, formatCode(str));
  }));
}

async function buildIndexJs(targetDir) {
  let str = `
  import Ofa2 from '@ofa2/ofa2';
  `;

  indexUseList.forEach((item) => {
    if (/^ofa2/.test(item.use)) {
      item.use = `@ofa2/${item.use}`;
    }

    if (item.alias) {
      return;
    }

    item.alias = camelize(item.use.replace(/^@ofa2\/ofa2/, ''));
  });

  indexUseList.forEach((item) => {
    str += `import ${item.alias} from '${item.use}';`;
  });
  str += `
  import pkg from '../package.json';

  const app = new Ofa2(__dirname)
  `;
  indexUseList.forEach((item) => {
    str += `.use(${item.useName || item.alias})`;
  });

  str += `
  .on('lifted', () => {
    logger.info(\`\${pkg.name} lifted\`);
    logger.info('config: ', app.config);
  })
  .on('error', (e) => {
    // eslint-disable-next-line no-console
    console.warn(e);
    process.exit(1);
  })
  .lift();
  `;

  await writeFile(pathResolve(targetDir, 'src/index.js'), formatCode(str));
}

export {
  ensureTargetDir,
  cpBase,
  buildComponents,
  buildConfigFile,
  buildIndexJs,
  buildPackage,
  getPackageRequired,
};

export default {
  ensureTargetDir,
  cpBase,
  buildComponents,
  buildConfigFile,
  buildIndexJs,
  buildPackage,
  getPackageRequired,
};
