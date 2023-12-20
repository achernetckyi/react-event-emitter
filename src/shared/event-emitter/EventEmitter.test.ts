import { EventEmitter } from './EventEmitter';
import { EventEmitterCallback } from './IEventEmitter';

describe('EventEmitter', () => {

  let ee: EventEmitter<string>;
  let callbackObj: { callback: EventEmitterCallback<string> };

  beforeEach(() => {
    ee = EventEmitter.create<string>();
    callbackObj = {
      callback: (item: string) => {
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    const ee = EventEmitter.create<string>();

    expect(ee).toBeDefined();
  });

  it('should add a callback', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toBeCalledTimes(1);
  });

  it('should add callback only 1 time for the same eventName', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toBeCalledTimes(1);
  });

  it('should add callback only once for each eventName', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test1', callbackObj.callback);
    ee.on('test1', callbackObj.callback);
    ee.on('test2', callbackObj.callback);
    ee.emit('test1', 'aa');
    ee.emit('test2', 'bb');

    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).toBeCalledWith('aa');
    expect(callbackMock).toBeCalledWith('bb');
  });

  it('should call a listener with the same value which was emitted', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');

    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith('aa');
  });

  it('should call a listener twice if event was emitted twice', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.on('test', callbackObj.callback);
    ee.emit('test', 'aa');
    ee.emit('test', 'bb');

    expect(callbackMock).toBeCalledTimes(2);
    expect(callbackMock).toBeCalledWith('aa');
    expect(callbackMock).toBeCalledWith('bb');
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

    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock2).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith('aa');
    expect(callbackMock2).toBeCalledWith('aa');
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

    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock2).toBeCalledTimes(0);
    expect(callbackMock).toBeCalledWith('aa');
  });

  it('should call a listener once for "once" registration even if event was emitted twice', () => {
    const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

    ee.once('test', callbackObj.callback);
    ee.emit('test', 'aa');
    ee.emit('test', 'bb');

    expect(callbackMock).toBeCalledTimes(1);
    expect(callbackMock).toBeCalledWith('aa');
    expect(callbackMock).not.toBeCalledWith('bb');
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

      expect(callbackMock).not.toBeCalled();
      expect(callbackMock2).not.toBeCalled();
    });

    it('should not delete listeners for other event names', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

      ee.on('test1', callbackObj.callback);
      ee.on('test2', callbackObj.callback);
      ee.dispose('test1');
      ee.emit('test1', 'aa');
      ee.emit('test2', 'aa');

      expect(callbackMock).toBeCalledTimes(1);
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

      expect(callbackMock).not.toBeCalled();
      expect(callbackMock2).toBeCalledTimes(1);
    });

    it('should not delete specific listener for a different event name', () => {
      const callbackMock = jest.spyOn(callbackObj, 'callback').mockClear();

      ee.on('test1', callbackObj.callback);
      ee.on('test2', callbackObj.callback);
      ee.disposeCallback('test1', callbackObj.callback);
      ee.emit('test1', 'aa');
      ee.emit('test2', 'bb');

      expect(callbackMock).toBeCalledTimes(1);
      expect(callbackMock).toBeCalledWith('bb');
    });
  })

});

