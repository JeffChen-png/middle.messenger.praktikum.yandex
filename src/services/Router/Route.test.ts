import { expect } from 'chai';

import { SignIn } from './mocks';
import { pathnames } from './pathnames';
import { Route } from './Route';

describe('Route', () => {
  const SignInRoute = new Route(pathnames.signIn, SignIn, { rootQuery: '#app' });

  it('render', async () => {
    SignInRoute.render();

    await new Promise(res => {
      setTimeout(res, 1000);
    });

    const page = window.document.querySelector('#sign-in');

    expect(page?.innerHTML).to.equal('Sign In');
  });
  it('match', () => {
    const match = SignInRoute.match(pathnames.signIn);

    expect(match).to.equal(true);
  });
  it('leave', () => {
    SignInRoute.leave();

    const page = window.document.querySelector('#sign-in') as HTMLElement;
    expect(page.style.visibility).to.equal('none');
  });
});
