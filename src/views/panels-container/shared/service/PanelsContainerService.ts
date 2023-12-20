import { EventEmitter } from '../../../../shared/event-emitter/EventEmitter';
import { SimpleItem } from '../model/SimpleItem';

const SimpleItemEventEmitter = EventEmitter.create<Readonly<SimpleItem>>();

export default SimpleItemEventEmitter;
