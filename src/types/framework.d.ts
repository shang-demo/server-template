interface Seneca {
  plainMsg(msg: object): object;
}

interface Queue {
  process: Function;
  createAndSave: Function;
}

interface Framework {
  seneca: Seneca;
  config: any;
  queue: Queue;
}

declare var framework: Framework;
