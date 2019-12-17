package mongolayer

import (
	"fmt"

	"gopkg.in/mgo.v2/bson"
)

//The bson.ObjectId type is a special type that represents MongoDB document ID. The bson package
//can be found in the mgo adapter, which is the Go third part framework of choice to communicate
//with MongoDB.

type MongoUser struct {
	ID       bson.ObjectId  `bson:"_id"`
	First    string         `bson:"first"`
	Last     string         `bson:"last"`
	Age      int            `bson:"age"`
	Bookings []MongoBooking `bson:"bookings"`
}

func (u *MongoUser) String() string {
	return fmt.Sprintf("id: %s, first_name: %s, last_name: %s, Age: %d, Bookings: %v", u.ID, u.First, u.Last, u.Age, u.Bookings)
}

type MongoBooking struct {
	ID      bson.ObjectId `bson:"_id"`
	Date    int64
	EventID string
	Seats   int
}

type MongoEvent struct {
	ID        bson.ObjectId `bson:"_id"`
	Name      string        `dynamodbav:"EventName"`
	Duration  int
	StartDate int64 //
	EndDate   int64
	Location  MongoLocation
}

type MongoLocation struct {
	ID        bson.ObjectId `bson:"_id"`
	Name      string
	Address   string
	Country   string
	OpenTime  int
	CloseTime int
	Halls     []MongoHall
}

type MongoHall struct {
	Name     string `json:"name"`
	Location string `json:"location,omitempty"`
	Capacity int    `json:"capacity"`
}
