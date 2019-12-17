package amqp

import (
	"encoding/json"
	"fmt"

	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
	"github.com/streadway/amqp"
)

type amqpEventEmitter struct {
	connection *Connection
	exchange   string
	setupDone  bool
}

//This is a constructor for the amqpEventEmitter struct and it hides the struct from being instanciated
//by some other package in other ways.
func (a *amqpEventEmitter) setup() error {
	if a.connection.Conn == nil {
		return fmt.Errorf("connection is not established with the broker")
	}
	channel, err := a.connection.Conn.Channel()
	if err != nil {
		return err
	}
	defer channel.Close()
	err = channel.ExchangeDeclare(
		a.exchange, // name
		"topic",    // type
		true,       // durable
		false,      // auto-deleted
		false,      // internal
		false,      // no-wait
		nil,        // arguments
	)
	return err
}

//This is a constructor for building new instances of the struct
func NewAMQPEventEmitter(conn *Connection, exchange string) (msgqueue.EventEmitter, error) {
	emitter := &amqpEventEmitter{
		connection: conn,
		exchange:   exchange,
		setupDone:  false,
	}
	err := emitter.setup()
	if err != nil {
		return nil, err
	}
	return emitter, nil
}

func (a *amqpEventEmitter) Emit(event msgqueue.Event) error {
	//We are creating a new channel for each published message within this code. While in theory it is
	//possible to reuse the same channel for publishing multiple messages, we need to keep in mind that
	//a single AMQP channel is not thread-safe. This means that calling the event emitter's Emit() method
	//from multiple go-routines might lead to strange and unpredictable results. This is exactly the
	//problem that AMQP channels are there to solve; using multiple channels, multiple threads can use the
	//same AMQP connection.
	if a.connection.Conn == nil {
		return fmt.Errorf("connection not established")
	}
	if a.connection.Conn.IsClosed() == true {
		return fmt.Errorf("connection is closed")
	}
	err := a.setup()
	if err != nil {
		return err
	}

	channel, err := a.connection.Conn.Channel()
	if err != nil {
		return err
	}
	defer channel.Close()

	jsonDoc, err := json.Marshal(event)
	if err != nil {
		return err
	}

	msg := amqp.Publishing{
		Headers:     amqp.Table{"x-event-name": event.EventName()},
		Body:        jsonDoc,
		ContentType: "application/json",
	}
	return channel.Publish(
		a.exchange,
		event.EventName(),
		false,
		false,
		msg,
	)
}
