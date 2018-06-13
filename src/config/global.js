import _ from 'lodash';
import Promise from 'bluebird';

global._ = _;
global.Promise = Promise;

global.throwIfMissing = function throwIfMissing(extra, message) {
  throw new Errors.ParamsRequired(extra, message);
};
