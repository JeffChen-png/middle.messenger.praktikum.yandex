import { isEqual } from '../../utils';
import Component, { ComponentClass } from '../Component';
import { TPropsBase } from '../Component/types';

function renderToDom(query: string, component: Component) {
  const app = document.querySelector(query);
  if (!app) return;

  app.innerHTML = '';
  app.append(component.getContent()!);
}

export class Route {
  #pathname: any;

  #blockClass: ComponentClass;

  #block?: Component;

  #props: TPropsBase;

  constructor(pathname: string, view: ComponentClass, props: TPropsBase) {
    this.#pathname = pathname;
    this.#blockClass = view;
    this.#props = props;
  }

  leave() {
    if (this.#block) {
      this.#block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.#pathname);
  }

  render() {
    if (!this.#block) {
      this.#block = new this.#blockClass(this.#props);
      renderToDom(this.#props.rootQuery, this.#block);
      return;
    }

    this.#block.show();
  }
}
