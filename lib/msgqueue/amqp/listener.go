package amqp

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/doublen987/web_dev/MyEvents/contracts"
	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
)

type amqpEventListener struct {
	connection *Connection
	queue      string //name of the queue to listen to. Put "" for auto generated queue name
	exchange   string
	setupDone  bool
}

func (a *amqpEventListener) setup() error {
	channel, err := a.connection.Conn.Channel()
	if err != nil {
		return nil
	}

	err = channel.ExchangeDeclare(
		"myevents", // name
		"topic",    // type
		true,       // durable
		false,      // auto-deleted
		false,      // internal
		false,      // no-wait
		nil,        // arguments
	)
	if err != nil {
		return err
	}

	defer channel.Close()
	_, err = channel.QueueDeclare(a.queue, true, false, false, false, nil)
	if err != nil {
		return fmt.Errorf("could not declare queue %s: %s", a.queue, err)
	}
	return nil
}

//Listens to certain events with specified names from the declared queue
func (a *amqpEventListener) Listen(eventNames ...string) (<-chan msgqueue.Event, <-chan error, error) {
	//The msgs variable now holds a channel of amqp.Delivery structs. However our event listener is supposed
	//to return a channel of msgqueue.Event. This can be solved by consuming the msgs channel in our own
	//goroutine, build the respective event structs, and then publish these in another channel that we
	//return from this function.
	events := make(chan msgqueue.Event)
	errors := make(chan error)
	go func() {
		for {
			time.Sleep(time.Duration(5000000000))
			if a.connection.Conn == nil {
				fmt.Printf("Connection not established\n")
				continue
			}
			if a.connection.Conn.IsClosed() == true {
				fmt.Printf("Connection is closed\n")
				continue
			}
			err := a.setup()
			if err != nil {
				fmt.Printf("Setup failed: %s\n", err)
				continue
			}
			channel, err := a.connection.Conn.Channel()
			if err != nil {
				fmt.Printf("Could not get channel from connection: %s\n", err)
			}
			for _, eventName := range eventNames {
				if err := channel.QueueBind(a.queue, eventName, a.exchange, false, nil); err != nil {
					fmt.Printf("Could not bind queue: %s, error: %s\n", eventName, err)
				}
			}

			msgs, err := channel.Consume(a.queue, "", false, false, false, false, nil)
			if err != nil {
				fmt.Printf("Could not establish a consumer: %s\n", err)
				continue
			}
			for msg := range msgs {
				//We try to read the "x-event-name" header from the AMQP message
				rawEventName, ok := msg.Headers["x-event-name"]
				if !ok {
					errors <- fmt.Errorf("msg did not contain x-event-name header")
					//We nack the message (negative acknowledgment), indicating to the broker that it could
					//not be successfully processed.
					msg.Nack(false, false)
					continue
				}
				eventName, ok := rawEventName.(string)
				if !ok {
					errors <- fmt.Errorf(
						"x-event-name header is not string, but %t",
						rawEventName,
					)
					msg.Nack(false, false)
					continue
				}
				var event msgqueue.Event
				switch eventName {
				case "event.created":
					event = new(contracts.EventCreatedEvent)
				case "booking.created":
					event = new(contracts.EventBookedEvent)
				default:
					errors <- fmt.Errorf("event type %s is unknown", eventName)
					msg.Nack(false, false)
					continue
				}
				err := json.Unmarshal(msg.Body, event)
				if err != nil {
					errors <- err
					msg.Nack(false, false)
					continue
				}
				events <- event
				msg.Ack(false)
			}
			fmt.Println("Stoped listening to messages")
		}
	}()
	return events, errors, nil
}

//Initializes a new Listener struct that we use to listen to new events
func NewAMQPEventListener(conn *Connection, exchange string, queue string) (msgqueue.EventListener, error) {
	listener := &amqpEventListener{
		connection: conn,
		queue:      queue,
		exchange:   exchange,
	}
	err := listener.setup()
	if err != nil {
		return nil, err
	}
	return listener, nil
}
