package contracts

// EventBookedEvent is emitted whenever an event is booked
type EventBookedEvent struct {
	ID      string `json:"id"`
	EventID string `json:"eventId"`
	UserID  string `json:"userId"`
	Seats   int    `json:"seats"`
	Date    int64  `json:"date"`
}

// EventName returns the event's name
func (c *EventBookedEvent) EventName() string {
	return "event.booked"
}
