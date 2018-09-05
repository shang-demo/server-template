import buildError from '@ofa2/ofa2-error';

global.Errors = buildError({
  UnknownError: 'unknown error, need feedback',
  ParamsRequired: 'params required',
});
