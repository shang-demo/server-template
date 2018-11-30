import _ from 'lodash';
import Promise from 'bluebird';

global._ = _;
global.Promise = Promise;

function throwIfMissing(Extra: any, ...args: any[]) {
  if (Extra instanceof Errors.OperationalError) {
    // @ts-ignore
    return new Extra(...args);
  }

  throw new Errors.ParamsRequired(Extra, ...args);
}

global.throwIfMissing = throwIfMissing;
global.tim = throwIfMissing;
