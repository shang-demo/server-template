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


declare var SenecaMsg: SenecaMsg;