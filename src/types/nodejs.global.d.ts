import lodash from 'lodash';
import bluebird from 'bluebird';

interface Tim {
  (extra: any, message: string): void;
}

interface SenecaMsg {
  cmd: string;
  action: string;
  role: string;
  transport$: string;
  id$: string;
  plugin$: string;
  fatal$: string;
  tx$: string;
  meta$: string;
  traceId: string;
  [key: string]: any;
}

interface Seneca {
  plainMsg(msg: object): object;
}

interface Framework {
  seneca: Seneca;
}

declare global {
  namespace NodeJS {
    interface Global {
      _: typeof lodash;
      throwIfMissing: Tim;
      tim: Tim;
      framework: Framework;
      Errors: Errors;
    }
  }
}




