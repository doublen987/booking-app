package amqp

import (
	"fmt"
	"time"

	"github.com/streadway/amqp"
)

type Connection struct {
	ConnURL string
	Conn    *amqp.Connection
}

func (c *Connection) Connect() error {
	if c.ConnURL == "" {
		return fmt.Errorf("connection string not set")
	}
	conn, err := amqp.Dial(c.ConnURL)
	if err != nil {
		fmt.Println("failed to connect to the broker")
		return err
	}
	fmt.Println("Connected to the amqp broker")
	c.Conn = conn
	return nil
}

func NewAMQPConnection(connection string) *Connection {

	newConnection := &Connection{
		ConnURL: connection,
		Conn:    nil,
	}

	for err := newConnection.Connect(); err != nil; err = newConnection.Connect() {
		time.Sleep(time.Duration(5000000000))
	}

	chanErr := make(chan *amqp.Error)
	chanErr = newConnection.Conn.NotifyClose(chanErr)

	go func() {
		for {
			//fmt.Println("Connection failed. Trying to reconnect.")
			<-chanErr
			for err := newConnection.Connect(); err != nil; err = newConnection.Connect() {

				time.Sleep(time.Duration(5000000000))
			}
			chanErr = make(chan *amqp.Error)
			chanErr = newConnection.Conn.NotifyClose(chanErr)
		}
		fmt.Println("Exited loop")
	}()

	return newConnection
}
