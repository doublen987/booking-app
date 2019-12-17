package contracts

import "github.com/doublen987/web_dev/MyEvents/lib/persistence"

// LocationCreatedEvent is emitted whenever a location is created
type LocationCreatedEvent struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Address string             `json:"address"`
	Country string             `json:"country"`
	Halls   []persistence.Hall `json:"halls"`
}

// EventName returns the event's name
func (c *LocationCreatedEvent) EventName() string {
	return "location.created"
}
