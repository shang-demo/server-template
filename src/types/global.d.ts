
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
  config: any;
}

declare var framework: Framework;
declare var tim: Tim;
declare var SenecaMsg: SenecaMsg;
declare var _: _.LoDashStatic;

