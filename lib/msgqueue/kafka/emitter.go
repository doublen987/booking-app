package kafka 
 
//In order to emit messages, you will need to construct an instance of the sarama.ProducerMessage struct. For this, you will need 
//the topic (which, in our case, is supplied by the msgqueue. Event's EventName() method) and the actual message body. The body needs 
//to be supplied as an implementation of the sarama.Encoder interface. You can use the sarama.ByteEncoder and sarama.StringEncoder 
//types to simply typecast a byte array or a string to an Encoder implementation.

import "github.com/Shopify/sarama" 

type kafkaEventEmitter struct { 
  producer sarama.SyncProducer 
}

func NewKafkaEventEmitter(client sarama.Client) (msgqueue.EventEmitter, error) { 
	producer, err := sarama.NewSyncProducerFromClient(client) 
	if err != nil { 
	  return nil, err 
	} 
   
	emitter := &kafkaEventEmitter{ 
	  producer: producer, 
	} 
   
	return emitter, nil 
} 

func (e *kafkaEventEmitter) Emit(event msgqueue.Event) error { 
	envelope := messageEnvelope{event.EventName(), event} 
	jsonBody, err := json.Marshal(&envelope) 
	if err != nil { 
	  return err 
	} 
   
	msg := &sarama.ProducerMessage{ 
	  Topic: event.EventName(), 
	  Value: sarama.ByteEncoder(jsonBody), 
	} 
   
	//The key in this code sample is the producer's SendMessage() method. Note that we are actually ignoring a few of this method's 
	//return values. The first two return values return the number of the partition that the messages were written in and the offset 
	//number that the message has in the event log.
	_, _, err = e.producer.SendMessage(msg) 
	return err 
  } 