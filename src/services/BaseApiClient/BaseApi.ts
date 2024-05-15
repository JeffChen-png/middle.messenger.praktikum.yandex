/* eslint-disable no-unused-vars */
interface IBaseAPI {
  create: (...args: any[]) => any;
  request: (...args: any[]) => any;
  update: (...args: any[]) => any;
  delete: (...args: any[]) => any;
}

export class BaseAPI implements IBaseAPI {
  create(..._args: any[]) {
    throw new Error('Not implemented');
  }

  request(..._args: any[]) {
    throw new Error('Not implemented');
  }

  update(..._args: any[]) {
    throw new Error('Not implemented');
  }

  delete(..._args: any[]) {
    throw new Error('Not implemented');
  }
}
