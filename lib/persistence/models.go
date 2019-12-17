package persistence

import (
	"fmt"
)

//The bson.ObjectId type is a special type that represents MongoDB document ID. The bson package
//can be found in the mgo adapter, which is the Go third part framework of choice to communicate
//with MongoDB.

type User struct {
	ID       string    `bson:"_id"`
	First    string    `bson:"first", required`
	Last     string    `bson:"last", required`
	Age      int       `bson:"age", required`
	Email    string    `bson:"email", required`
	Username string    `bson:"username", required`
	Bookings []Booking `bson:"bookings"`
}

func (u *User) String() string {
	return fmt.Sprintf("id: %s, first_name: %s, last_name: %s, Age: %d, Bookings: %v", u.ID, u.First, u.Last, u.Age, u.Bookings)
}

type Booking struct {
	ID      string `bson:"_id"`
	Date    int64
	EventID string
	Seats   int
}

type Event struct {
	ID        string `bson:"_id"`
	Name      string `dynamodbav:"EventName"`
	Duration  int
	StartDate int64 //
	EndDate   int64
	Location  Location
}

type Location struct {
	ID        string `bson:"_id"`
	Name      string
	Address   string
	Country   string
	OpenTime  int
	CloseTime int
	Halls     []Hall
}

type Hall struct {
	Name     string `json:"name"`
	Location string `json:"location,omitempty"`
	Capacity int    `json:"capacity"`
}
