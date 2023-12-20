import { EventEmitterCallback, IEventEmitter } from './IEventEmitter';

export class EventEmitter<T> implements IEventEmitter<T> {

  private constructor(private readonly emitter: EventEmitterInternal<T>) {
  }

  static create<V>(): EventEmitter<V> {
    const emitter = new EventEmitter<V>(new EventEmitterInternal<V>());
    Object.freeze(emitter);
    return emitter;
  }

  on(eventName: string, callback: EventEmitterCallback<T>): void {
    this.emitter.on(eventName, callback);
  }

  once(eventName: string, callback: EventEmitterCallback<T>): void {
    this.emitter.once(eventName, callback);
  }

  emit(eventName: string, payload: T): void {
    this.emitter.emit(eventName, payload);
  }

  dispose(eventName: string): void {
    this.emitter.dispose(eventName);
  }

  disposeCallback(eventName: string, callback: EventEmitterCallback<T>): void {
    this.emitter.disposeCallback(eventName, callback);
  }
}

class EventEmitterInternal<T> implements IEventEmitter<T> {

  private readonly listeners = new Map<string, Listener<T>[]>();

  on(eventName: string, callback: EventEmitterCallback<T>): void {
    this.addCallback(eventName, callback, false);
  }

  once(eventName: string, callback: EventEmitterCallback<T>): void {
    this.addCallback(eventName, callback, true);
  }

  emit(eventName: string, payload: T): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners?.length) {
      const onceListeners: Listener<T>[] = [];
      eventListeners.forEach(listener => {
        if (listener.once) {
          onceListeners.push(listener);
        }
        listener.callback(payload);
      });
      this.listeners.set(eventName, eventListeners.filter(listener => !onceListeners.includes(listener)));
    }
  }

  dispose(eventName: string): void {
    this.listeners.delete(eventName);
  }

  disposeCallback(eventName: string, callback: EventEmitterCallback<T>): void {
    this.deleteCallback(eventName, callback);
  }

  private addCallback(eventName: string, callback: EventEmitterCallback<T>, once: boolean): void {
    let listeners = this.listeners.get(eventName);
    if (listeners?.find(listener => listener.callback === callback)) {
      return;
    }
    if (!listeners) {
      listeners = [];
      this.listeners.set(eventName, listeners);
    }
    listeners.push(new Listener<T>(callback, once));
  }

  private deleteCallback(eventName: string, callback: EventEmitterCallback<T>): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners?.length) {
      this.listeners.set(eventName, eventListeners.filter(listener => listener.callback !== callback));
    }
  }
}

class Listener<T> {
  constructor(public callback: EventEmitterCallback<T>, public once: boolean) {
  }
}
