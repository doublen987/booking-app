package listener

import (
	"encoding/hex"
	"log"

	"github.com/doublen987/web_dev/MyEvents/contracts"
	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
)

type EventProcessor struct {
	EventListener msgqueue.EventListener
	Database      persistence.DatabaseHandler
}

//Here we listen for newly created events
func (p *EventProcessor) ProcessEvents() error {
	log.Println("Listening to events...")
	received, errors, err := p.EventListener.Listen("event.created", "event.update", "booking.created", "booking.remove")
	if err != nil {
		return err
	}
	for {
		select {
		case evt := <-received:
			//Received events will be passed to the handleEvent function
			p.handleEvent(evt)
		case err = <-errors:
			log.Printf("received error while processing msg: %s", err)
		}
	}
}

func (p *EventProcessor) handleEvent(event msgqueue.Event) {
	//The function uses a type switch to determine the type of the incoming event. Then we store the events
	//in the local database. In this example, we are using a shared library github.com/doublen987/MyEvents/lib/persistence
	//for managing database access. This is for convenience only. In real microservice architectures,
	//individual microservices typically use completely independent persistence layers that might be
	//built on completely different technology stacks.
	switch e := event.(type) {
	case *contracts.EventCreatedEvent:
		log.Printf("event %s created: %s", e.ID, e)
		p.Database.AddEvent(persistence.Event{ID: e.ID})
	case *contracts.LocationCreatedEvent:
		log.Printf("location %s created: %s", e.ID, e)
		//p.Database.AddLocation(persistence.Location{ID: e.ID})
	case *contracts.EventBookedEvent:
		log.Printf("booking %s created: %s", e.ID, e)
		bookingUserID, _ := hex.DecodeString(e.UserID)
		bookingEventID, _ := hex.DecodeString(e.EventID)
		p.Database.AddBookingForUser(bookingUserID, persistence.Booking{
			ID:      e.ID,
			Date:    e.Date,
			EventID: string(bookingEventID),
			Seats:   e.Seats,
		})
	default:
		log.Printf("unknown event: %t", e)
	}
}
