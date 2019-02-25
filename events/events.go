package main

import (
	"net/http"
	"flag"
	"fmt"
	"log"
	"encoding/json"
	"encoding/hex"
	"strings"
	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence"
	"github.com/gorilla/mux"
	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence/dblayer"
	"github.com/doublen987/web_dev/MyEvents/events/lib/configuration"
)

type eventServiceHandler struct {
	dbhandler persistence.DatabaseHandler
}

func newEventHandler(databaseHandler persistence.DatabaseHandler) *eventServiceHandler {
	return &eventServiceHandler{
		dbhandler: databaseHandler,
	}
}

//The method takes two arguments: a ResponseWriter, which represents the HTTP response to fill,
//and a Request, which represents the HTTP request that we recieved.
func (eh *eventServiceHandler) findEventHandler(w http.ResponseWriter, r *http.Request) {
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
	var event persistence.Event
	var err error
	switch strings.ToLower(criteria) {
	case "name":
		event, err = eh.dbhandler.FindEventByName(searchkey)
	case "id":
		id, err := hex.DecodeString(searchkey)
		if err != nil {
			event, err = eh.dbhandler.FindEvent(id)
		}
	}
	if err != nil {
		fmt.Fprintf(w, "{error %s}", err)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=utf8")
	json.NewEncoder(w).Encode(&event)
}

func (eh *eventServiceHandler) allEventHandler(w http.ResponseWriter, r *http.Request) {
	events, err := eh.dbhandler.FindAllAvailableEvents()
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "Error occured while trying to find all available events %s"}`, err)
		return
	}
	w.Header().Set("Content-Type", "application/json;charset=utf8")
	err = json.NewEncoder(w).Encode(&events)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "Error occured while trying encode events to JSON %s"}`, err)
	}
}

func (eh *eventServiceHandler) newEventHandler(w http.ResponseWriter, r *http.Request) {
	event := persistence.Event{}
	err := json.NewDecoder(r.Body).Decode(&event)
	if nil != err {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while decoding event data %s"}`, err)
		return
	}
	id, err := eh.dbhandler.AddEvent(event)
	if nil != err {
		w.WriteHeader(500)
		fmt.Fprintf(w, `{"error": "error occured while persisting event %d %s"}`, id, err)
		return
	}
	fmt.Fprint(w, `{"id":%d}`, id)
}

func ServeAPI(endpoint string, tlsendpoint string, databaseHandler persistence.DatabaseHandler) (chan error, chan error) {
	//With this we get a router object called r, to help  us define our routes and link them
	//with actions to execute:
	r := mux.NewRouter()
	//A subrouter is basically an object that will in charge of any incoming HTTP request 
	//directed towards a relative URL that starts with /events. This code makes use of the 
	//router object we created earlier, then calls the PathPrefix method, which is used to 
	//capture any URL path that starts with "/events". The new router is called eventsrouter.
	//The eventsrouter can be used to define what to do with the rest of the URLs that share
	//the /events prefix.
	eventsrouter := r.PathPrefix("/events").Subrouter()

	handler := newEventHandler(databaseHandler) 
	//Here we implement the search functionality by id(/events/id/3434) or name(/events/name/jazz_concert).
	eventsrouter.Methods("GET").Path("/{SearchCriteria}/{search}").HandlerFunc(handler.findEventHandler)
	//Here we implement the retrival of all events at once:
	eventsrouter.Methods("GET").Path("").HandlerFunc(handler.allEventHandler)
	//Here we implement the creation of a new event (/events):
	eventsrouter.Methods("POST").Path("").HandlerFunc(handler.newEventHandler)

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
	go func() { httpIsErrChan <- http.ListenAndServeTLS(tlsendpoint, "cert.pem", "key.pem", r) }()
	go func() { httpErrChan <- http.ListenAndServe(endpoint, r)}()

	return httpErrChan, httpIsErrChan
}

func main() {
	confPath := flag.String("conf", `.\configuration\config.json`, "flag to set the path to the configuration json file")
	flag.Parse()
	//extract configuration
	config, _ := configuration.ExtractConfiguration(*confPath)
	fmt.Println("Connecting to database")
	dbhandler, _ := dblayer.NewPersistenceLayer(config.Databasetype, config.DBConnection)
	httpErrChan, httpIsErrChan := ServeAPI(config.RestfulEndpoint, config.RestfulTLSEndpoint, dbhandler)
	select {
	case err := <-httpErrChan:
		log.Fatal("HTTP Error: ", err)
	case err := <-httpIsErrChan:
		log.Fatal("HTTPS Error: ", err)
	}
}