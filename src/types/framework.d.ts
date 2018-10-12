interface Seneca {
  plainMsg(msg: object): object;
}

interface Framework {
  seneca: Seneca;
  config: any;
}

declare var framework: Framework;
