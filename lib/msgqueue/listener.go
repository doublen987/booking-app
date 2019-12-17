package msgqueue

//An event listener is typically active for a long time and needs to react to incoming messages whenever
//they may be recieved. This reflects in the design of our Listen() method: ffirst of all, it will accept
//a list of names for which the event listener should listen. It will  then return two Go channels: the
//first will be used to stream any events that were recieved by the listener and the second one will 
//contain any errors that occurred while receiving those events: 
type EventListener interface {
	Listen(eventNames ...string) (<-chan Event, <-chan error, error)
}