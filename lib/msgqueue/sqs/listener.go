package sqs

import (
	"errors"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
)

type SQSListener struct {
	mapper              msgqueue.EventMapper
	sqsSvc              *sqs.SQS
	queueURL            *string
	maxNumberOfMessages int64
	waitTime            int64
	visibilityTimeOut   int64
}

func NewSQSListener(s *session.Session, queueName string, maxMsgs, wtTime, visTO int64) (listener msgqueue.EventListener, err error) {
	if s == nil {
		s, err = session.NewSession()
		if err != nil {
			return
		}
	}
	svc := sqs.New(s)
	QUResult, err := svc.GetQueueUrl(&sqs.GetQueueUrlInput{
		QueueName: aws.String(queueName),
	})
	if err != nil {
		return
	}
	listener = &SQSListener{
		sqsSvc:              svc,
		queueURL:            QUResult.QueueUrl,
		mapper:              msgqueue.NewEventMapper(),
		maxNumberOfMessages: maxMsgs,
		waitTime:            wtTime,
		visibilityTimeOut:   visTO,
	}
	return
}

func (sqsListener *SQSListener) Listen(events ...string) (<-chan msgqueue.Event, <-chan error, error) {
	if sqsListener == nil {
		return nil, nil, errors.New("SQSListener: the Listen() method was called on a nil pointer")
	}
	eventCh := make(chan msgqueue.Event)
	errorCh := make(chan error)
	go func() {
		for {
			sqsListener.receiveMessage(eventCh, errorCh)
		}
	}()

	return eventCh, errorCh, nil
}

func (sqsListener *SQSListener) receiveMessage(eventCh chan msgqueue.Event, errorCh chan error, events ...string) {
	//First, we receive messages and pass any errors to a Go error channel:
	recvMsgResult, err := sqsListener.sqsSvc.ReceiveMessage(&sqs.ReceiveMessageInput{
		MessageAttributeNames: []*string{
			aws.String(sqs.QueueAttributeNameAll),
		},
		QueueUrl:            sqsListener.queueURL,
		MaxNumberOfMessages: aws.Int64(sqsListener.maxNumberOfMessages),
		WaitTimeSeconds:     aws.Int64(sqsListener.waitTime),
		VisibilityTimeout:   aws.Int64(sqsListener.visibilityTimeOut),
	})
	if err != nil {
		errorCh <- err
	}

	//We then go through the received messages one by one and check their message attributes, if the event name does not
	//belong to the list of requested event names, we ignore it by moving to the next message:
	bContinue := false
	for _, msg := range recvMsgResult.Messages {
		value, ok := msg.MessageAttributes["event_name"]
		if !ok {
			continue
		}
		eventName := aws.StringValue(value.StringValue)
		for _, event := range events {
			if strings.EqualFold(eventName, event) {
				bContinue = true
				break
			}
		}

		if !bContinue {
			continue
		}

		//If we continue, we retrieve the message body, then use our event mapper object to translate it to an Event type that
		//we can use in our external code. The event mapper object simply takes an event name and the binary form of the event,
		//then it returns an Event object to us. After that, we obtain the event object and pass it to the events channel. If we
		//detect errors, we pass the error to the errors channel, then move to the next message:

		message := aws.StringValue(msg.Body)
		event, err := sqsListener.mapper.MapEvent(eventName, []byte(message))
		if err != nil {
			errorCh <- err
			continue
		}
		eventCh <- event

		//Finally, if we reach to this point without errors, then we know we succeeded in processing the message. So, the next
		//step will be to delete the message so that it won't be processed by someone else:

		_, err = sqsListener.sqsSvc.DeleteMessage(&sqs.DeleteMessageInput{
			QueueUrl:      sqsListener.queueURL,
			ReceiptHandle: msg.ReceiptHandle,
		})

		if err != nil {
			errorCh <- err
		}
	}
}
