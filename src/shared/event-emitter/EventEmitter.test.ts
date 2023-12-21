import { EventEmitter } from './EventEmitter';
import { EventEmitterCallback } from './IEventEmitter';

describe('EventEmitter', () => {

  let ee: EventEmitter<string>;
  let callbackObj: { callback: EventEmitterCallback<string> };

  beforeEach(() => {
    ee = new EventEmitter<string>();
    callbackObj = {
      callback: (item: string) => {
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(ee).toBeDefined();
  });

  it('should add a callback', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  it('should add callback only 1 time for the same eventName', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toHaveBeenCalledTimes(1);
  });

  it('should add callback only once for each eventName', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test1', callbackObj.callback);
    ee.on('test1', callbackObj.callback);
    ee.on('test2', callbackObj.callback);
    ee.emit('test1', 'aa');
    ee.emit('test2', 'bb');

    expect(callbackMock).toHaveBeenCalledTimes(2);
    expect(callbackMock).toHaveBeenCalledWith('aa');
    expect(callbackMock).toHaveBeenCalledWith('bb');
  });

  it('should not throw an error if emit on unknown event', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test1', callbackObj.callback);
    ee.emit('test2', 'bb');

    expect(callbackMock).toHaveBeenCalledTimes(0);
  });

  it('should throw an error on registering empty event', () => {
    const t = () => {
      ee.on('', callbackObj.callback);
    };

    expect(t).toThrow();
  });

  it('should throw an error on registering "once" empty event', () => {
    const t = () => {
      ee.once('', callbackObj.callback);
    };

    expect(t).toThrow();
  });

  it('should call a listener with the same value which was emitted', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledWith('aa');
  });

  it('should call a listener twice if event was emitted twice', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');
    ee.emit('test', 'bb');

    expect(callbackMock).toHaveBeenCalledTimes(2);
    expect(callbackMock).toHaveBeenCalledWith('aa');
    expect(callbackMock).toHaveBeenCalledWith('bb');
  });

  it('should call all registered listeners for eventName with correct values', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();
    const callbackObj2 = {
      callback: (item: string) => {
      }
    };
    const callbackMock2 = jest.spyOn(callbackObj2, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.on('test', callbackObj2.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(callbackMock2).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledWith('aa');
    expect(callbackMock2).toHaveBeenCalledWith('aa');
  });

  it('should not call registered listeners for a different eventName', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();
    const callbackObj2 = {
      callback: (item: string) => {
      }
    };
    const callbackMock2 = jest.spyOn(callbackObj2, 'callback').mockClear();

    ee.on('test1', callbackObj.callback);
    ee.on('test2', callbackObj2.callback);

    ee.emit('test1', 'aa');

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(callbackMock2).toHaveBeenCalledTimes(0);
    expect(callbackMock).toHaveBeenCalledWith('aa');
  });

  it('should call a listener once for "once" registration even if event was emitted twice', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.once('test', callbackObj.callback);
    ee.emit('test', 'aa');
    ee.emit('test', 'bb');

    expect(callbackMock).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledWith('aa');
    expect(callbackMock).not.toHaveBeenCalledWith('bb');
  });

  describe('dispose', () => {
    it('should delete all listeners for the event name', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();
      const callbackObj2 = {
        callback: (item: string) => {
        }
      };
      const callbackMock2 = jest.spyOn(callbackObj2, 'callback').mockClear();

      ee.on('test', callbackObj.callback);
      ee.on('test', callbackObj2.callback);
      ee.dispose('test');
      ee.emit('test', 'aa');

      expect(callbackMock).not.toHaveBeenCalled();
      expect(callbackMock2).not.toHaveBeenCalled();
    });

    it('should not delete listeners for other event names', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

      ee.on('test1', callbackObj.callback);
      ee.on('test2', callbackObj.callback);
      ee.dispose('test1');
      ee.emit('test1', 'aa');
      ee.emit('test2', 'aa');

      expect(callbackMock).toHaveBeenCalledTimes(1);
    });

  });

  describe('disposeCallback', () => {
    it('should delete only specific listener for the event name', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();
      const callbackObj2 = {
        callback: (item: string) => {
        }
      };
      const callbackMock2 = jest.spyOn(callbackObj2, 'callback').mockClear();

      ee.on('test', callbackObj.callback);
      ee.on('test', callbackObj2.callback);
      ee.disposeCallback('test', callbackObj.callback);
      ee.emit('test', 'aa');

      expect(callbackMock).not.toHaveBeenCalled();
      expect(callbackMock2).toHaveBeenCalledTimes(1);
    });

    it('should not delete specific listener for a different event name', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

      ee.on('test1', callbackObj.callback);
      ee.on('test2', callbackObj.callback);
      ee.disposeCallback('test1', callbackObj.callback);
      ee.emit('test1', 'aa');
      ee.emit('test2', 'bb');

      expect(callbackMock).toHaveBeenCalledTimes(1);
      expect(callbackMock).toHaveBeenCalledWith('bb');
    });
  });

});

