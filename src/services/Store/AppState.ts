import { Store } from './store';

export type AppState = {
  error?: string;
};

declare global {
  interface Window {
    store: Store<AppState>;
  }
}

const initState: AppState = {
  error: undefined,
};

export const registerAppState = () => {
  window.store = new Store<AppState>(initState);
};
