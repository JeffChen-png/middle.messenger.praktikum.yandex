/* eslint-disable no-unused-vars */
interface IBaseAPI {
  create: (...args: any[]) => any;
  request: (...args: any[]) => any;
  update: (...args: any[]) => any;
  delete: (...args: any[]) => any;
}

export class BaseAPI implements IBaseAPI {
  create(...args: any[]) {
    throw new Error('Not implemented');
  }

  request(...args: any[]) {
    throw new Error('Not implemented');
  }

  update(...args: any[]) {
    throw new Error('Not implemented');
  }

  delete(...args: any[]) {
    throw new Error('Not implemented');
  }
}
