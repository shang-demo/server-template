const rabbitMqAddress = process.env.RABBIT_MQ_ADDRESS || '127.0.0.1:5672';
const rabbitMqUsername = process.env.RABBIT_MQ_USERNAME;
const rabbitMqPassword = process.env.RABBIT_MQ_PASSWORD;

const mongodbHost = process.env.MONGODB_HOST || '127.0.0.1';
const mongodbPort = process.env.MONGODB_PORT || '27017';
const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;

export default {
  log: {
    level: 'trace',
    base: null,
  },
  connections: {
    mongo: {
      hosts: [
        {
          host: mongodbHost,
          port: mongodbPort,
        },
      ],
      username: mongodbUsername,
      password: mongodbPassword,
      database: 'mwConsoleDev',
    },
    // for seneca-route
    rabbitmq: {
      transport: '@ofa2/ofa2-seneca-amqp-transport',
      options: {
        url: `amqp://${rabbitMqAddress}`,
        username: rabbitMqUsername,
        password: rabbitMqPassword,

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
        url: `amqp://${rabbitMqAddress}`,
        username: rabbitMqUsername,
        password: rabbitMqPassword,

        type: 'amqp',
        pin: ['role:template'],
        consume: {
          noAck: true,
        },
      },
    },
  },
};
