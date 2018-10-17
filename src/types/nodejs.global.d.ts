import lodash from 'lodash';

interface Tim {
  (extra: any, message: string): void;
}

declare global {
  var _: typeof lodash;
  var als: any;
  var throwIfMissing: Tim;
  var tim: Tim;
  var framework: Framework;
  var Errors: Errors;

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
