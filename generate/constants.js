const components = {
  als: [
    {
      use: 'ofa2-als',
    },
  ],
  config: [
    {
      use: 'ofa2-config',
    },
  ],
  log: [
    {
      use: 'ofa2-logger',
      alias: 'log',
    },
    {
      src: 'src/config/env/development.js',
      value: {
        log: {
          level: 'trace',
          base: null,
        },
      },
    },
  ],
  model: [
    {
      use: 'ofa2-model',
    },
    {
      cp: 'src/config/models.js',
    },
    {
      cp: 'src/models',
    },
    {
      src: 'src/config/env/development.js',
      value: {
        connections: {
          mongo: {
            hosts: [{ host: '127.0.0.1', port: 27017 }],
            database: 'noName',
          },
        },
      },
    },
  ],
  koa: [
    {
      use: 'ofa2-koa',
    },
  ],
  koaController: [
    {
      use: 'ofa2-controller',
    },
    {
      cp: {
        src: 'src/controllers-koa',
        dist: 'src/controllers',
      },
    },
  ],
  koaPolicy: [
    {
      use: 'ofa2-koa-policy',
    },
    {
      cp: 'src/config/policies.js',
    },
    {
      cp: 'src/policies',
    },
    {
      package: 'shortid',
    },
  ],
  koaRoute: [
    {
      use: 'ofa2-koa-route',
    },
    {
      cp: {
        src: 'src/config/routes-koa.js',
        dist: 'src/config/routes.js',
      },
    },
  ],
  koaServer: [
    {
      use: 'ofa2-koa-server',
    },
    {
      dependencies: ['shortid'],
    },
  ],

  seneca: [
    {
      use: 'ofa2-seneca',
    },
  ],
  senecaController: [
    {
      use: 'ofa2-controller',
    },
    {
      cp: {
        src: 'src/controllers-seneca',
        dist: 'src/controllers',
      },
    },
  ],
  senecaRoute: [
    {
      use: 'ofa2-seneca-wrap',
      alias: '{ wrapRoutes }',
      useName: 'wrapRoutes',
    },
    {
      use: 'ofa2-seneca-route',
    },
    {
      cp: {
        src: 'src/config/routes-seneca.js',
        dist: 'src/config/routes.js',
      },
    },
  ],
  senecaWrapAct: [
    {
      use: 'ofa2-seneca-wrap',
      alias: '{ wrapAct }',
      useName: 'wrapAct',
    },
  ],
  senecaServer: [
    {
      src: 'src/config/seneca.js',
      value: {
        connection: 'rabbitmq',
        options: {
          timeout: 600000,
        },
      },
    },
    {
      package: 'ofa2-seneca-amqp-transport',
    },
    {
      src: 'src/config/env/development.js',
      value: {
        connections: {
          rabbitmq: {
            transport: '@ofa2/ofa2-seneca-amqp-transport',
            options: {
              url: 'amqp://127.0.0.1',
              username: undefined,
              password: undefined,

              type: 'amqp',
              pin: 'role:template',
              consume: {
                noAck: true,
              },
            },
          },
        },
      },
    },
  ],
  senecaClient: [
    {
      use: 'ofa2-seneca-client',
    },

    {
      src: 'src/config/seneca.js',
      value: {
        options: {
          timeout: 600000,
        },
        client: {
          connection: 'senecaClient',
        },
      },
    },
    {
      package: '@ofa2/ofa2-seneca-amqp-transport',
    },
    {
      src: 'src/config/env/development.js',
      value: {
        connections: {
          senecaClient: {
            transport: '@ofa2/ofa2-seneca-amqp-transport',
            options: {
              url: 'amqp://127.0.0.1',
              username: undefined,
              password: undefined,

              type: 'amqp',
              pin: ['role:template', 'role:console'],
              consume: {
                noAck: true,
              },
            },
          },
        },
      },
    },
  ],
  shutdown: [
    {
      use: 'ofa2-shutdown',
    },
  ],
};

const cpDirs = [
  'config',
  'src/config/error.js',
  'src/config/global.js',
  'src/config/http.js',
  '.babelrc',
  '.eslintrc.js',
  '.gitignore',
  'gulpfile.js',
  'Makefile',
];

export { components, cpDirs };
export default {};
