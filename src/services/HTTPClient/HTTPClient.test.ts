import { expect } from 'chai';
import { describe } from 'mocha';
import Sinon from 'sinon';

import { HTTPTransport } from './fetch';
import { METHODS } from './types';

describe('HTTPClient', () => {
  let http: HTTPTransport;
  let request: Sinon.SinonStub;

  beforeEach(() => {
    http = new HTTPTransport('test.com');
    request = Sinon.stub(http, 'request').callsFake(() => Promise.resolve());
  });

  it('should be able to make a request', () => {
    http.get('/test');

    expect(request.callCount).equals(1);
  });

  it('should be able to provide host', () => {
    http.get('/test');

    expect(request.calledWithMatch('/test')).equals(true);
  });

  it('should be able to provide query', () => {
    http.get('/test', { data: { a: 1, b: 2 } });

    expect(request.calledWithMatch('/test?a=1&b=2')).equals(true);
  });

  it('should be able to provide method', () => {
    http.get('/test');

    expect(request.calledWithMatch('/test', { method: METHODS.GET })).equals(true);
  });
});
