export default {
  async status(msg: SenecaMsg) {
    logger.info('msg: ', framework.seneca.plainMsg(msg));
    return {
      success: true,
    };
  },
};
