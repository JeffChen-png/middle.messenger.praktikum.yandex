import { IEventBus } from './types';

class EventBus implements IEventBus {
  constructor() {
    this.listeners = {};
  }

  listeners: IEventBus['listeners'];

  on: IEventBus['on'] = (event, callback) => {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  };

  off: IEventBus['off'] = (event, callback) => {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`);
      return;
    }

    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  };

  emit: IEventBus['emit'] = (event, ...args) => {
    if (!this.listeners[event]) {
      console.error(`Нет события: ${event}`);
      return;
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  };
}

export default EventBus;
