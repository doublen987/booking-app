package msgqueue

//We define an interface for the publishers and subscribers to use when handling events:
type Event interface {
	EventName() string
}

