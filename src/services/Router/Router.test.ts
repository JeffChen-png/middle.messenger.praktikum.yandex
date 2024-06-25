import { expect } from 'chai';
import { afterEach, describe, it } from 'mocha';

import { SignIn, SignUp } from './mocks';
import { pathnames } from './pathnames';
import { testRouter as router } from './Router';

describe('Router', () => {
  before(() => {
    router.use(pathnames.signIn, SignIn);
    router.use(pathnames.signUp, SignUp);
    router.start();
  });
  afterEach(() => {
    window.history.replaceState({}, '');
  });

  it('should change state by go pressing', () => {
    router.go(pathnames.signIn);
    expect(window.history.length).to.equal(2);
  });

  it('should change state by back pressing', () => {
    router.go(pathnames.signIn);
    router.go(pathnames.signUp);
    router.back();
    expect(window.history.length).to.equal(4);
  });

  it('should change state by route changing', async () => {
    const path = pathnames.signIn;
    window.history.replaceState({}, '', path);

    /* time to render */
    await new Promise(res => {
      setTimeout(res, 1000);
    });

    const page = window.document.querySelector('#sign-in');

    expect(page?.innerHTML).to.equal('Sign In');
  });
});
