/** **** start: 用户配置********** */
let alterableSetting = {
  // prod 的 基础路径
  basePath: './dist/',
};

function getCommonConfig() {
  return {
    clean: {
      // 清除生成文件的路径
      src: [`${alterableSetting.basePath}**/*`],
      options: {
        force: true,
      },
    },
    server: {
      src: ['**/*', '!views/**/*', '!**/*.d.ts'],
      opt: {
        cwd: 'src/',
        base: 'src/',
      },
      dest: alterableSetting.basePath,
    },
    replace: {
      src: ['index.js'],
      regexp: '../package.json',
      newSubstr: './package.json',
    },
    cp: {
      src: ['package.json'],
      opt: {
        cwd: './',
        base: './',
      },
      dest: alterableSetting.basePath,
    },
    nodemon: {
      config: {
        script: 'src/index.ts',
        ext: 'js,ts',
        watch: ['src/'],
        verbose: true,
        restartable: 'rs',
        env: {
          NODE_ENV: 'development',
        },
        args: [
          '--extensions=".ts"',
          // if you want use attach debug, use `INSPECT=9229 gulp`
          process.env.INSPECT ? [`--inspect=${process.env.INSPECT}`] : '',
        ],
        exec: 'babel-node',
      },
      events: {
        crash: true,
        start: false,
        quit: true,
      },
    },
  };
}

module.exports = {
  alterableSetting,
  getCommonConfig,
};
