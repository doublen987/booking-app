package main

import (
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/doublen987/web_dev/MyEvents/bookings/listener"
	"github.com/doublen987/web_dev/MyEvents/contracts"
	"github.com/doublen987/web_dev/MyEvents/lib/configuration"
	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
	msgqueue_amqp "github.com/doublen987/web_dev/MyEvents/lib/msgqueue/amqp"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	//"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
	//"github.com/doublen987/web_dev/MyEvents/contracts"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence/dblayer"
)

type eventRef struct {
	ID   string `json:"id"`
	Name string `json:"name,omitempty"`
}

type createBookingRequest struct {
	Seats int `json:"seats"`
}

type createBookingResponse struct {
	ID    string   `json:"id"`
	Event eventRef `json:"event"`
}

type BookingHandler struct {
	database     persistence.DatabaseHandler
	eventEmitter msgqueue.EventEmitter
}

type errorResponse struct {
	Msg string `json:"msg"`
}

func newBookingHandler(databaseHandler persistence.DatabaseHandler, eventEmitter msgqueue.EventEmitter) *BookingHandler {
	return &BookingHandler{
		database:     databaseHandler,
		eventEmitter: eventEmitter,
	}
}

func (bh *BookingHandler) findBookingHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	criteria, ok := vars["SearchCriteria"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, `{error: No search criteria found, you can either search by id via /id/4 to 
			search by name via /name/coldplayconcert}`)
		return
	}
	searchkey, ok := vars["search"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, `{error: No search keys found, you can either search by id via /id/4 to
			search by name via /name/coldplayconcert}`)
		return
	}
	var bookings []persistence.Booking
	var err error
	switch strings.ToLower(criteria) {
	case "id":
		id, err := hex.DecodeString(searchkey)
		userID, err := hex.DecodeString(searchkey)
		if err == nil {
			fmt.Println(bh.database)
			booking, findErr := bh.database.FindBookingByBookingId(userID, id)
			fmt.Println(booking)
			if findErr != nil {
				fmt.Println(findErr)
			}
			fmt.Printf("id: %s\n", searchkey)
			bookings = append(bookings, booking)
		} else {
			fmt.Println(err)
		}
		break
	case "userId":
		userID, err := hex.DecodeString(searchkey)
		if err == nil {
			foundBookings, err := bh.database.FindBookingsByUserId(userID)
			bookings = append(bookings, foundBookings...)
			if err != nil {
				fmt.Println(err)
			}
		} else {
			fmt.Println(err)
		}
		break
	}
	if err != nil {
		fmt.Fprintf(w, "{error %s}", err)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=utf8")
	json.NewEncoder(w).Encode(&bookings)
}

func (bh *BookingHandler) bookEventByUserHandler(w http.ResponseWriter, r *http.Request) {
	booking := persistence.Booking{}

	vars := mux.Vars(r)

	userID, ok := vars["userID"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, `{error: No userID found}`)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while decoding booking data %s"}`, err)
		return
	}

	byteUserID, err := hex.DecodeString(userID)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while persisting booking for user %d: %s"}`, byteUserID, err)
	}

	id, err := bh.database.AddBookingForUser(byteUserID, booking)
	fmt.Fprint(w, `{"id":%d}`, id)
	if err != nil {
		fmt.Println(err)
	}

	if booking.Seats <= 0 {
		w.WriteHeader(400)
		fmt.Fprintf(w, "seat number must be positive (was %d)", booking.Seats)
		return
	}

	msg := contracts.EventBookedEvent{
		EventID: string(booking.EventID),
		UserID:  string(booking.ID),
	}
	bh.eventEmitter.Emit(&msg)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)

	json.NewEncoder(w).Encode(&booking)
}

func (bh *BookingHandler) bookEventHandler(w http.ResponseWriter, r *http.Request) {
	routeVars := mux.Vars(r)
	eventID, ok := routeVars["eventID"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, "missing route parameter 'eventID'")
		return
	}

	eventIDMongo, _ := hex.DecodeString(eventID)
	event, err := bh.database.FindEvent(eventIDMongo)
	if err != nil {
		w.WriteHeader(404)
		fmt.Fprintf(w, "event %s could not be loaded: %s", eventID, err)
		return
	}

	bookingRequest := createBookingRequest{}
	err = json.NewDecoder(r.Body).Decode(&bookingRequest)
	if err != nil {
		w.WriteHeader(400)
		fmt.Fprintf(w, "could not decode JSON body: %s", err)
		return
	}

	if bookingRequest.Seats <= 0 {
		w.WriteHeader(400)
		fmt.Fprintf(w, "seat number must be positive (was %d)", bookingRequest.Seats)
		return
	}

	booking := persistence.Booking{
		Date:    time.Now().Unix(),
		EventID: event.ID,
		Seats:   bookingRequest.Seats,
	}

	// msg := contracts.EventBookedEvent{
	// 	EventID: event.ID.Hex(),
	// 	UserID:  "someUserID",
	// }
	// h.eventEmitter.Emit(&msg)

	bh.database.AddBookingForUser([]byte("someUserID"), booking)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)

	json.NewEncoder(w).Encode(&booking)
}

func respondWithError(res http.ResponseWriter, msg string, code int) error {
	response := errorResponse{msg}
	jsonResponse, err := json.Marshal(&response)
	if err != nil {
		return err
	}

	res.WriteHeader(code)
	res.Header().Set("Content-Type", "application/json;charset=utf8")

	_, err = res.Write(jsonResponse)
	if err != nil {
		return err
	}

	return nil
}

func ServeAPI(endpoint string, tlsendpoint string, databaseHandler persistence.DatabaseHandler, eventEmitter msgqueue.EventEmitter) (chan error, chan error) {
	//With this we get a router object called r, to help  us define our routes and link them
	//with actions to execute:
	r := mux.NewRouter()
	//A subrouter is basically an object that will in charge of any incoming HTTP request
	//directed towards a relative URL that starts with /events. This code makes use of the
	//router object we created earlier, then calls the PathPrefix method, which is used to
	//capture any URL path that starts with "/events". The new router is called eventsrouter.
	//The eventsrouter can be used to define what to do with the rest of the URLs that share
	//the /events prefix.
	eventsrouter := r.PathPrefix("/users/{userID}/bookings").Subrouter()

	handler := newBookingHandler(databaseHandler, eventEmitter)
	//Here we implement the search functionality by id(/events/id/3434) or name(/events/name/jazz_concert).
	eventsrouter.Methods("GET").Path("/{SearchCriteria}/{search}").HandlerFunc(handler.findBookingHandler)
	//Here we implement the retrival of all events at once:
	//eventsrouter.Methods("GET").Path("").HandlerFunc(handler.allBookingsHandler)
	//Here we implement the creation of a new event (/events):
	//eventsrouter.Methods("POST").Path("/{userID}").HandlerFunc(handler.newBookingHandler)

	eventsrouter.Methods("POST").Path("/").HandlerFunc(handler.bookEventByUserHandler)

	//We use go channels to handle error correcting
	httpErrChan := make(chan error)
	httpIsErrChan := make(chan error)

	//To convert the web server from the preceding chapter from HTTP to HTTPS, we will need
	//to perform one simple change, instead of calling the http.ListenAndServe() function, we'll
	//utilize instead another function called http.ListenAndServeTLS(). The two extra arguments
	//are the digital certificate filename and the private key filename.

	//We want for the user to both be able to connect via http and https and so we use both
	//ListenAndServe() and ListenAndServeTLS, but because they are both blocking functions, one
	//cannot be listening while the other is listening so we have to make separate goroutins for them.

	server := handlers.CORS()(r)
	go func() { httpIsErrChan <- http.ListenAndServeTLS(tlsendpoint, "cert.pem", "key.pem", server) }()
	go func() { httpErrChan <- http.ListenAndServe(endpoint, server) }()

	fmt.Printf("Listening to port: %s\n", endpoint)

	return httpErrChan, httpIsErrChan
}

func main() {
	confPath := flag.String("config", "./bookings-config.json", "path to config file")
	flag.Parse()
	config, err := configuration.ExtractConfiguration(*confPath)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}

	configMap := make(map[string]interface{})
	configMap["connection"] = config.DBConnection
	configMap["region"] = config.AWSRegion
	dbhandler, err := dblayer.NewPersistenceLayer(config.Databasetype, configMap)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	} else {
		fmt.Println("Connected to the database")
	}

	// conn, err := amqp.Dial(config.AMQPMessageBroker)
	// if err != nil {
	// 	fmt.Printf("Error: %s\n", err)
	// } else {
	// 	fmt.Println("Connected to the message broker")
	// }

	conn2 := msgqueue_amqp.NewAMQPConnection(config.AMQPMessageBroker)

	eventListener, err := msgqueue_amqp.NewAMQPEventListener(conn2, "myevents", "bookings")
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}
	eventEmitter, err := msgqueue_amqp.NewAMQPEventEmitter(conn2, "myevents")
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}

	processor := &listener.EventProcessor{eventListener, dbhandler}
	go processor.ProcessEvents()

	httpErrChan, httpIsErrChan := ServeAPI(config.RestfulEndpoint, config.RestfulTLSEndpoint, dbhandler, eventEmitter)
	fmt.Printf("Started listening for http connections on: %s\n", config.RestfulEndpoint)

	select {
	case err := <-httpErrChan:
		log.Fatal("HTTP Error: ", err)
	case err := <-httpIsErrChan:
		log.Fatal("HTTPS Error: ", err)
	}
}
