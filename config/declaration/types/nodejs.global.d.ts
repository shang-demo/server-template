import lodash from 'lodash';

declare global {
  var _: typeof lodash;
  var als: any;
  var Errors: any;

  namespace NodeJS {
    interface Global {
      Errors: any;
    }
  }
}
