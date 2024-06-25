import { ComponentClass } from '../Component';
import { Route } from './Route';

export class Router {
  routes: Route[];

  history: History;

  #currentRoute?: Route;

  #rootQuery: string;

  constructor(rootQuery = '#app') {
    this.routes = [];
    this.history = window.history;
    this.#currentRoute = undefined;
    this.#rootQuery = rootQuery;

    // this.history.pushState({}, '', '/');
  }

  start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      if (!event.currentTarget) return;
      const target = event.currentTarget as Window;

      this.#onRoute(target.location.pathname);
    });

    this.#onRoute(window.location.pathname);
  }

  #onRoute(pathname: string) {
    const route = this.#getRoute(pathname);

    if (!route) {
      console.error('route not found');
      return;
    }

    if (this.#currentRoute) {
      this.#currentRoute.leave();
    }

    this.#currentRoute = route;
    route.render();
  }

  #getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  go(pathname: string) {
    this.history.pushState(this.history.state || {}, '', pathname);
    this.#onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  use(pathname: string, block: ComponentClass) {
    const route = new Route(pathname, block, { rootQuery: this.#rootQuery });
    this.routes.push(route);
    return this;
  }
}

const router = new Router();
const testRouter = new Router();

export { router, testRouter };
