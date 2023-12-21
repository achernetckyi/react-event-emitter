import { EventEmitterCallback, IEventEmitter } from './IEventEmitter';

/**
 * EventEmitter is a class for emitting and listening to events.
 *
 * The listeners are called after calling “emit” function. The listener which was registered after the calling
 * “emit” does not get the previously emitted values.
 * The listener does not support a specific context (the function is always called in its default context).
 * */
export class EventEmitter<T> implements IEventEmitter<T> {

  private readonly listeners = new Map<string, Listener<T>[]>();

  /**
   * Add a listener for a given event.
   * The listener function can be registered only once with the same event name
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback The listener function.
   * @returns {void}
   * @public
   */
  on(eventName: string, callback: EventEmitterCallback<T>): void {
    this.addCallback(eventName, callback, false);
  }

  /**
   * Add a one-time listener for a given event.
   * The listener function can be registered only once with the same event name
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback The listener function.
   * @returns {void}
   * @public
   */
  once(eventName: string, callback: EventEmitterCallback<T>): void {
    this.addCallback(eventName, callback, true);
  }

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {(any)} payload The event name.
   * @returns {void}
   * @public
   */
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

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @returns {void}
   * @public
   */
  dispose(eventName: string): void {
    this.listeners.delete(eventName);
  }

  /**
   * Remove the listener of a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback Only remove the listener that match this function.
   * @returns {void}
   * @public
   */
  disposeCallback(eventName: string, callback: EventEmitterCallback<T>): void {
    this.deleteCallback(eventName, callback);
  }

  private addCallback(eventName: string, callback: EventEmitterCallback<T>, once: boolean): void {
    if (!eventName) {
      throw new Error('eventName should be a valid not empty string');
    }
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
