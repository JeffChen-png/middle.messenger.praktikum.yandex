export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type TUrl = string;
export type TOptions = {
  method: METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: any;
  retries?: number;
};

export type ApiError = {
  status?: number;
  reason: string;
};

export type HTTPMethod = <R = unknown>(url: TUrl, options?: Omit<TOptions, 'method'>) => Promise<R>;
