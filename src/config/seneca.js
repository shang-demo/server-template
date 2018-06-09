export default {
  connection: 'rabbitmq',
  options: {
    timeout: 600000,
  },
  client: {
    connection: 'senecaClient',
  },
};
