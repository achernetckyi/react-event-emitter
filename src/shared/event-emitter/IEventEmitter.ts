export interface IEventEmitter<T> {

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback The listener function.
   * @returns {void}
   * @public
   */
  on(eventName: string, callback: EventEmitterCallback<T>): void;

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback The listener function.
   * @returns {void}
   * @public
   */
  once(eventName: string, callback: EventEmitterCallback<T>): void;

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {(any)} payload The event name.
   * @returns {void}
   * @public
   */
  emit(eventName: string, payload: T): void;

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @returns {void}
   * @public
   */
  dispose(eventName: string): void;

  /**
   * Remove the listener of a given event.
   *
   * @param {(String|Symbol)} eventName The event name.
   * @param {Function} callback Only remove the listener that match this function.
   * @returns {void}
   * @public
   */
  disposeCallback(eventName: string, callback: EventEmitterCallback<T>): void;

}

export type EventEmitterCallback<T> = (payload: T) => void;
