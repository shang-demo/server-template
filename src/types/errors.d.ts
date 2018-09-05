
declare class ErrFn {
  code: string;
  message: string;
  extra: any;

  constructor(extra: any, ...args: any[]);
}

interface Errors {
  OperationalError(): void;
  UnknownError: typeof ErrFn;
  ParamsRequired: typeof ErrFn;
  
}

declare var Errors: Errors;
