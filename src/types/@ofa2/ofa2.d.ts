declare module '@ofa2/ofa2' {
  interface CbFn {
    (...args: any[]): void;
  }

  class Ofa2 {
    constructor(rootDir: string, options?: object);

    use(fun: any): Ofa2;
    on(name: string, cb: CbFn): Ofa2;
    lift(): Ofa2;
  }

  export = Ofa2;
}
