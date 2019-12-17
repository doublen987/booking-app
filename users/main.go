package main

import (
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/streadway/amqp"

	"github.com/doublen987/web_dev/MyEvents/contracts"
	"github.com/doublen987/web_dev/MyEvents/lib/configuration"
	"github.com/doublen987/web_dev/MyEvents/lib/msgqueue"
	msgqueue_amqp "github.com/doublen987/web_dev/MyEvents/lib/msgqueue/amqp"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence/dblayer"
	"github.com/doublen987/web_dev/MyEvents/users/listener"
)

type userServiceHandler struct {
	dbhandler    persistence.DatabaseHandler
	eventEmitter msgqueue.EventEmitter
}

func newUserHandler(databaseHandler persistence.DatabaseHandler, eventEmitter msgqueue.EventEmitter) *userServiceHandler {
	return &userServiceHandler{
		dbhandler:    databaseHandler,
		eventEmitter: eventEmitter,
	}
}

func (eh *userServiceHandler) findUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	criteria, ok := vars["SearchCriteria"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, `{error: No search criteria found, you can either search by id via /id/4 to 
			search by name via /name/mycoolusername}`)
		return
	}
	searchkey, ok := vars["search"]
	if !ok {
		w.WriteHeader(400)
		fmt.Fprint(w, `{error: No search keys found, you can either search by id via /id/4 to
			search by name via /name/mycoolusername}`)
		return
	}
	var user persistence.User
	var err error
	switch strings.ToLower(criteria) {
	case "name":
		user, err = eh.dbhandler.FindUserByName(searchkey)
		break
	case "id":
		id, err := hex.DecodeString(searchkey)
		if err == nil {
			user, err = eh.dbhandler.FindUserById(id)
			fmt.Println(user)
		} else {
			fmt.Println(err)
		}
	}
	if err != nil {
		fmt.Fprintf(w, "{error %s}", err)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=utf8")
	json.NewEncoder(w).Encode(&user)
}

func (eh *userServiceHandler) findAllUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := eh.dbhandler.FindAllUsers()
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "Error occured while trying to find all available users %s"}`, err)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=utf8")
	err = json.NewEncoder(w).Encode(&users)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "Error occured while trying encode users to JSON %s"}`, err)
	}
}

func (eh *userServiceHandler) newUserHandler(w http.ResponseWriter, r *http.Request) {
	user := persistence.User{}
	err := json.NewDecoder(r.Body).Decode(&user)
	if nil != err {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while decoding user data %s"}`, err)
		return
	}
	id, err := eh.dbhandler.AddUser(user)
	if nil != err {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while persisting user %d %s"}`, id, err)
		return
	}

	msg := contracts.UserCreatedEvent{
		ID:    hex.EncodeToString(id),
		First: user.First,
		Last:  user.First,
		Age:   user.Age,
	}
	eh.eventEmitter.Emit(&msg)

	w.Header().Set("Content-Type", "application/json;charset=utf8")

	w.WriteHeader(201)
	json.NewEncoder(w).Encode(&user)
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

	handler := newUserHandler(databaseHandler, eventEmitter)

	usersrouter := r.PathPrefix("/users").Subrouter()
	usersrouter.Methods("GET").Path("/{SearchCriteria}/{search}").HandlerFunc(handler.findUserHandler)
	usersrouter.Methods("GET").Path("").HandlerFunc(handler.findAllUsersHandler)
	usersrouter.Methods("POST").Path("").HandlerFunc(handler.newUserHandler)

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

	return httpErrChan, httpIsErrChan
}

func main() {
	confPath := flag.String("conf", `./user-config.json`, "flag to set the path to the configuration json file")
	flag.Parse()

	config, err := configuration.ExtractConfiguration(*confPath)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Connecting to the AMQP message broker: %s\n", config.AMQPMessageBroker)
	conn, err := amqp.Dial(config.AMQPMessageBroker)
	if err != nil {
		panic(err)
	} else {
		fmt.Printf("Connected to the AMQP message broker: %s\n", config.AMQPMessageBroker)
	}

	emitter, err := msgqueue_amqp.NewAMQPEventEmitter(conn, "myevents")
	if err != nil {
		panic(err)
	}

	eventListener, err := msgqueue_amqp.NewAMQPEventListener(conn, "myevents", "users")
	if err != nil {
		panic(err)
	}

	fmt.Printf("Connecting to database: %s\n", config.DBConnection)
	configMap := make(map[string]interface{})
	configMap["connection"] = config.DBConnection
	configMap["region"] = config.AWSRegion
	dbhandler, err := dblayer.NewPersistenceLayer(config.Databasetype, configMap)
	if err != nil {
		panic(err)
	} else {
		fmt.Printf("Connected to the database: %s\n", config.DBConnection)
	}

	processor := &listener.EventProcessor{eventListener, dbhandler}
	go processor.ProcessEvents()

	httpErrChan, httpIsErrChan := ServeAPI(config.RestfulEndpoint, config.RestfulTLSEndpoint, dbhandler, emitter)
	fmt.Printf("Started listening for http connections on: %s\n", config.RestfulEndpoint)

	select {
	case err := <-httpErrChan:
		log.Fatal("HTTP Error: ", err)
	case err := <-httpIsErrChan:
		log.Fatal("HTTPS Error: ", err)
	}
}
