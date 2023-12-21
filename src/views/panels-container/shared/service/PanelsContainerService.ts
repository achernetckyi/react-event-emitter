import { SimpleItem } from '../model/SimpleItem';
import { EventEmitter } from '../../../../shared/event-emitter/EventEmitter';

const SimpleItemEventEmitter = new EventEmitter<Readonly<SimpleItem>>();

export default SimpleItemEventEmitter;
