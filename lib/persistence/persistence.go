package persistence

//Because we want to create a persistence layer for our event service we need to create an
//interface with all the functionality we want our persistence layer to have. This is because
//the implementation of our persistence layer may change over time (DynamoDB, Redis, MySQL...)
//but the functionality that is supported will not.

type DatabaseHandler interface {
	AddUser(User) ([]byte, error)
	FindUserByName(string) (User, error)
	FindUserById(id []byte) (User, error)
	FindAllUsers() ([]User, error)

	AddEvent(Event) ([]byte, error)
	FindEvent([]byte) (Event, error)
	FindEventByName(string) (Event, error)
	FindAllAvailableEvents() ([]Event, error)

	//AddLocation(Location) ([]byte, error)

	AddBookingForUser([]byte, Booking) ([]byte, error)
	FindBookingByBookingId([]byte, []byte) (Booking, error)
	FindBookingsByUserId([]byte) ([]Booking, error)
}
