package dynamolayer

import "github.com/aws/aws-sdk-go/service/dynamodb"

type DynamoDBLayer struct {
	service *dynamodb.DynamoDB
}

type AWSBooking struct {
	PK         string //User Id: USR#235
	SK         string //Booking Id: BK#1
	LocationID string
	EventID    string
	Seats      int
}

type AWSEvent struct {
	PK         string //Event Id: EV#25
	SK         string //Booking Id: META#25
	LocationID string
	EventID    string
	Name       string
	EndTime    int64
	StartTime  int64
}

type AWSUser struct {
	PK       string //Event Id: USR#235
	SK       string //Booking Id: META#235
	Name     string
	Surname  string
	Username string
	Email    string
	Age      int
}
