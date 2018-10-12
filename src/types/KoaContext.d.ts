// import * as Koa from 'koa';
// declare module 'koa' {
//   interface Request {
//     body: any;
//   }
//   interface Context {
//     body: any;
//   }
// }

interface Context {
  request: any;
  [key: string]: any;
}

declare var Context: Context;
