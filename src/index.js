import Ofa2 from '@ofa2/ofa2';
import config from '@ofa2/ofa2-config';
import log from '@ofa2/ofa2-logger';
import controller from '@ofa2/ofa2-controller';
// import koa from '@ofa2/ofa2-koa';
// import koaPolicy from '@ofa2/ofa2-koa-policy';
// import koaRoute from '@ofa2/ofa2-koa-route';
// import koaServer from '@ofa2/ofa2-koa-server';
import ofa2Als from '@ofa2/ofa2-als';
import model from '@ofa2/ofa2-model';
import shutdown from '@ofa2/ofa2-shutdown';
import seneca from '@ofa2/ofa2-seneca';
import senecaClient from '@ofa2/ofa2-seneca-client';
import senecaRoute from '@ofa2/ofa2-seneca-route';
import { wrapAct, wrapRoutes } from '@ofa2/ofa2-seneca-wrap';
import pkg from '../package.json';

const app = new Ofa2(__dirname)
  .use(ofa2Als)
  .use(config)
  .use(log)
  .use(model)
  .use(controller)
  // .use(koa)
  // .use(koaPolicy)
  // .use(koaRoute)
  // .use(koaServer)
  .use(seneca)
  .use(senecaClient)
  .use(wrapAct)
  .use(wrapRoutes)
  .use(senecaRoute)
  .use(shutdown)
  .on('lifted', () => {
    logger.info(`${pkg.name} lifted`);
    // logger.info('config: ', app.config);
  })
  .on('error', (e) => {
    // eslint-disable-next-line no-console
    console.warn(e);
    process.exit(1);
  })
  .lift();

export default app;
