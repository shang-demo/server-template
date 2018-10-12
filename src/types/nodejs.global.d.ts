import lodash from 'lodash';

declare global {
  namespace NodeJS {
    interface Global {
      _: typeof lodash;
      als: any;
      throwIfMissing: Tim;
      tim: Tim;
      framework: Framework;
      Errors: Errors;
    }
  }
}
