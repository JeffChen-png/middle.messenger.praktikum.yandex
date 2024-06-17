import { expect } from 'chai';
import { afterEach, before, describe, it } from 'mocha';

import { SignIn, SignUp } from './mocks';
import { router } from './Router';

import { pathnames } from '.';

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

    expect(window.history.length).to.equal(2);
  });

  it('should change state by route changing', () => {
    const path = pathnames.signIn;
    window.history.replaceState({}, '', path);

    expect(window.document.querySelector('#sign-in')?.innerHTML).to.equal('Sign In');
  });
});
