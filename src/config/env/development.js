export default {
  log: {
    level: 'trace',
    base: null,
  },
  connections: {
    mongo: {
      hosts: [
        {
          host: '127.0.0.1',
          port: 27017,
        },
      ],
      database: 'mwConsoleDev',
    },
    // for seneca-route
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
    senecaClient: {
      transport: '@ofa2/ofa2-seneca-amqp-transport',
      options: {
        url: 'amqp://127.0.0.1',
        username: undefined,
        password: undefined,

        type: 'amqp',
        pin: ['role:template'],
        consume: {
          noAck: true,
        },
      },
    },
  },
};
