import { HOST } from '../../env';
import { METHODS, TOptions, TUrl } from './types';

function queryStringify(data = {}) {
  const string = Object.entries(data)
    .map(([key, value]) => {
      let tmpl = value;
      if (Array.isArray(value)) {
        tmpl = value.join(',');
      }
      return `${key}=${tmpl}`;
    })
    .join('&');

  if (string.length > 0) {
    return `?${string}`;
  }

  return string;
}

export class HTTPTransport {
  #host: string;

  constructor(baseUrl: string = '') {
    this.#host = HOST + baseUrl;
  }

  get<TResponse = unknown>(url: TUrl, { data, ...options }: Omit<TOptions, 'method'> = {}): Promise<TResponse> {
    const path = data ? url + queryStringify(data) : url;
    return this.request<TResponse>(path, { ...options, method: METHODS.GET }, options.timeout);
  }

  post<TResponse = unknown>(url: TUrl, options: Omit<TOptions, 'method'> = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put<TResponse = unknown>(url: TUrl, options: Omit<TOptions, 'method'> = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete<TResponse = unknown>(url: TUrl, options: Omit<TOptions, 'method'> = {}): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request<TResponse = unknown>(url: TUrl, options: TOptions, timeout = 5000) {
    const { headers = {}, method, data } = options;

    return new Promise<TResponse>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.open(method, this.#host + url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

      xhr.timeout = timeout;

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const isJson = xhr.getResponseHeader('content-type')?.includes('application/json');
          resolve(isJson ? JSON.parse(xhr.response) : xhr.response);
        } else {
          reject({ status: xhr.status, reason: xhr.response.reason });
        }
      });
      xhr.addEventListener('abort', () => reject({ reason: 'requst aborded' }));
      xhr.addEventListener('error', () => reject({ reason: 'network error' }));
      xhr.addEventListener('timeout', () => reject({ reason: 'request timeout' }));

      const isGet = method === METHODS.GET;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        const payload = JSON.stringify(data);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(payload);
      }
    });
  }
}

const client = new HTTPTransport();

export function fetch(url: TUrl, options: TOptions) {
  return client.request(url, options);
}

export function fetchWithRetry(url: TUrl, options: TOptions) {
  const retries = options.retries || 1;
  let requestCount = 1;

  const request = (): Promise<unknown> | Error => {
    try {
      return client.request(url, options);
    } catch (error) {
      if (retries > requestCount) {
        requestCount += 1;
        return request();
      }
      throw error;
    }
  };

  return request();
}
