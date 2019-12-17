package msgqueue

//This interface describes the methods that all event emitter implementations need to fulfil.
type EventEmitter interface {
	Emit(e Event) error
}