interface actParams {
  role: string;
  cmd: string;
  [key: string]: any;
}

interface Act {
  (params: actParams): Promise<any>;
}

declare var act: Act;
