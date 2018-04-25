
const path = require('path');

/** **** start: 用户配置***********/

let alterableSetting = {  // prod 的 基础路径
  basePath: 'production/',
  publicPath: 'production/public/',
  viewPath: 'production/views/',
};


function getCommonConfig() {
  return {
    clean: {                   // 清除生成文件的路径
      src: [
        `${alterableSetting.basePath}**/*`,
        'clinet/styles/',
        `!${alterableSetting.basePath}/.git/`,
        `!${alterableSetting.basePath}/CNAME`,
        `!${alterableSetting.basePath}/Makefile`,
      ],
    },
    server: {
      src: [
        '**/*',
        '!public/**/*',
        '!views/**/*',
        '!index.html',
      ],
      opt: {
        cwd: 'src/',
        base: 'src/',
      },
      dest: alterableSetting.basePath,
    },
    watchRebuildTypings: {
      src: [
        'services/**/*',
        'models/**/*'
      ],
      opt: {
        cwd: 'src/',
        base: 'src/',
      },
      dest: path.join(alterableSetting.publicPath, 'js'),
    },
    nodemon: {
      config: {
        script: 'src/index.js',
        ext: 'js,mjs,json',
        args: ['--experimental-modules', '--loader ./loader.mjs'],
        watch: ['src/'],
        env: {
          NODE_ENV: 'development'
        },
      },
      events: {
        crash: true,
        start: false,
      }
    }
  };
}

module.exports = {
  alterableSetting,
  getCommonConfig,
};
