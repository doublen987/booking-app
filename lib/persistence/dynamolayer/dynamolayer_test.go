package dynamolayer

import (
	"fmt"
	"testing"

	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
)

func TestFillStruct(t *testing.T) {

	airplaneMap := make(map[string]interface{})
	airplaneMap["Name"] = "UH-765"
	airplaneMap["Passangers"] = 256
	airplaneMap["Acceleration"] = 23.435

	airplane := &Airplane{}

	replaceMap := map[string]string{
		"SK-GSI1": "ID",
		"Name":    "First",
		"Surname": "Last",
	}
	FillStruct(airplaneMap, airplane, replaceMap)

	fmt.Println(airplane)
}

func TestAddUser(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	newUser := persistence.User{
		First: "Milorad",
		Last:  "Miloradovic",
		Age:   53,
		//Username: "mikim",
		Email: "doublem@gmail.com",
	}

	user, err := dbhandler.AddUser(newUser)
	if err != nil {
		t.Fatalf("Error adding user: %v", err)
	}

	fmt.Println(user)
}

func TestFindUserById(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")

	user, err := dbhandler.FindUserById([]byte("USR#5ec42c20-afc8-4198-a229-aaab19c0b16b"))
	if err != nil {
		t.Fatalf("Error finding user: %v", err)
	}
	if user.First != "Milorad" {
		t.Fatalf("Error finding user. Wrong user.")
	}

	fmt.Println(user)
}

func TestFindAllUsers(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")

	users, err := dbhandler.FindAllUsers()
	if err != nil {
		t.Fatalf("Error getting all users: %v", err)
	}

	fmt.Println(users)
}

func TestFindUserByName(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")

	user, err := dbhandler.FindUserByName("doublen987")
	if err != nil {
		t.Fatalf("Error getting all users: %v", err)
	}

	fmt.Println(user)
}

func TestAddEvent(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	newEvent := persistence.Event{
		Name:      "Anime Movie Night",
		StartDate: 1576408000,
		EndDate:   1576410000,
		Location: persistence.Location{
			ID: "LOC#256",
		},
	}

	eventId, err := dbhandler.AddEvent(newEvent)
	if err != nil {
		t.Fatalf("Error adding event: %v", err)
	}

	fmt.Println(eventId)
}

func TestFindAllAvailableEvents(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	events, err := dbhandler.FindAllAvailableEvents()
	if err != nil {
		t.Fatalf("Error getting all available events: %v", err)
	}

	fmt.Println(events)
}

func TestFindEventByName(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	event, err := dbhandler.FindEventByName("Gamesconn")
	if err != nil {
		t.Fatalf("Error getting all available event: %v", err)
	}

	fmt.Println(event)
}

func TestFindEvent(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	event, err := dbhandler.FindEvent([]byte("EV#25"))
	if err != nil {
		t.Fatalf("Error getting all available event: %v", err)
	}

	fmt.Println(event)
}

func TestAddBookingForUser(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	newBooking := persistence.Booking{
		Date:    1576582419,
		EventID: "EV#25",
		Seats:   46,
	}

	bookingId, err := dbhandler.AddBookingForUser([]byte("USR#235"), newBooking)
	if err != nil {
		t.Fatalf("Error adding booking for user: %v", err)
	}

	fmt.Println(bookingId)

}

func TestFindBookingByBookingId(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	booking, err := dbhandler.FindBookingByBookingId([]byte("USR#235"), []byte("BK#1"))
	if err != nil {
		t.Fatalf("Error finding booking by booking id: %v", err)
	}

	fmt.Println(booking)
}

func TestFindBookingsByUserId(t *testing.T) {
	dbhandler, err := NewDynamoDBLayerByRegion("us-east-2")
	if err != nil {
		t.Fatalf("Could not establish an aws connection: %v", err)
	}

	bookings, err := dbhandler.FindBookingsByUserId([]byte("USR#235"))
	if err != nil {
		t.Fatalf("Error finding bookings by user id: %v", err)
	}

	fmt.Println(bookings)
}
