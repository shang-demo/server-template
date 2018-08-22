import _ from 'lodash';
import Promise from 'bluebird';

global._ = _;
global.Promise = Promise;

function throwIfMissing(extra, message) {
  throw new Errors.ParamsRequired(extra, message);
}

global.throwIfMissing = throwIfMissing;
global.tim = throwIfMissing;

