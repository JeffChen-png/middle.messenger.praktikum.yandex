import Handlebars from 'handlebars';

import * as Components from './Components';
import { default as ModalRaw } from './Components/modal/modal.hbs?raw';
import * as Features from './Features';
import * as Icons from './Icons';
import { registerComponent } from './services/RegisterComponent';
import { router } from './services/Router/Router';
import { routes } from './services/Router/routes';
import { registerAppState } from './services/Store/AppState';
import * as Widgets from './Widgets';

Object.entries(Components).forEach(([name, component]) => {
  return registerComponent(name, component);
});

Object.entries(Widgets).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Icons).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerPartial('Modal', ModalRaw);

Object.entries(Features).forEach(([name, component]) => {
  return registerComponent(name, component);
});

document.addEventListener('DOMContentLoaded', () => {
  routes.forEach(route => router.use(route.path, route.Component));
  registerAppState();

  router.start();
});
