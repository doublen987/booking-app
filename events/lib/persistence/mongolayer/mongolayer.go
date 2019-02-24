package mongolayer

import (
	"log"
	"fmt"
	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const (
	DB		= "myevents"
	USERS	= "users"
	EVENTS	= "events"
)

type MongoDBLayer struct {
	session *mgo.Session
}

func NewMongoDBLayer(connection string) (persistence.DatabaseHandler, error) {
	s, err := mgo.Dial(connection)
	if err == nil {
		fmt.Println("Connected to the database")
	} else {
		log.Fatal(err)
	}
	return &MongoDBLayer{
		session: s,
	}, err
}

func (mgoLayer *MongoDBLayer) AddEvent(e persistence.Event) ([]byte, error) {
	s := mgoLayer.getFreshSession()
	defer s.Close()

	//We check if the event ID supplied by the Event argument object is valid and whether the
	//ID field of the Event object is of the bson.ObjectID type. bson.ObjectID supports a 
	//Valid() method, which we can use to detect whether the ID is a valid MongoDB document ID
	//or not. If the supplied event ID is not valid, we will create one of our own using the
	//bson.NewObjectID() function call. We will then repeat the same pattern with the location
	//embedded object inside the event.
	if !e.ID.Valid() {
		e.ID = bson.NewObjectId()
	}

	//We do the same with the location ID.
	if !e.Location.ID.Valid() {
		e.Location.ID = bson.NewObjectId()
	}

	//We return two results: the first result is the event ID of the added event, and a second
	//result is an error object representing the result of the event insertion operation. In
	//order to insert th event object to the MongoDB database, we will use the session object in
	//the s variable, then call s.DB(DB).C(EVENTS) to obtain an object that represents our events
	//collection in the database. The object will be of the *mgo.Collection type. The DB() method
	//helps us access the database. We will give it the DB constant as an argument, which has
	//our database name. The C() method helps us access the collection, we will give it the
	//EVENTS constant, which has the name of our events collection. Finally we call the Insert()
	//method of the collection object, with the Event object as an argument, which is why the 
	//code ends up like this:
	return []byte(e.ID), s.DB(DB).C(EVENTS).Insert(e)
}

//The id is passed in as a slice of bytes instead of a bson.ObjectId. We do this to ensure
//that the FindEvent() method in the Database Handler interface stays as generic as possible.
//For example we know that in the world of MongoDB, the ID will be of the bson.ObjectId type,
//but what if we now want to implement a MySQL database layer? It would not make sense to have
//to have the ID argument type passed to FindEvent() as bson.ObjectId.
func (mgoLayer *MongoDBLayer) FindEvent(id []byte) (persistence.Event, error) {
	s := mgoLayer.getFreshSession()
	defer s.Close()
	e := persistence.Event{}

	//FindId takes an id encoded into bson and returns an *mgo.Query type, that we can use to
	//retrieve results of the query. And finally we feed the retrieved data to the Events object
	//we use the One() function. If One() fails it returns an error, otherwise it returns nil.
	err := s.DB(DB).C(EVENTS).FindId(bson.ObjectId(id)).One(&e)
	return e, err
}

func (mgoLayer *MongoDBLayer) FindEventByName(name string) (persistence.Event, error) {
	s := mgoLayer.getFreshSession()
	defer s.Close()
	e := persistence.Event{}
	
	//The FInd() method takes an argument that represents the query we would like to pass to
	//MongoDB. The bson package provides a nice type called bson.M, which is basically a map
	//we can use to represent the query parameters that we would like to look for. 
	err := s.DB(DB).C(EVENTS).Find(bson.M{"name": name}).One(&e)
	return e, err
}

func (mgoLayer *MongoDBLayer) FindAllAvailableEvents() ([]persistence.Event, error) {
	s := mgoLayer.getFreshSession()
	defer s.Close()
	events := []persistence.Event{}
	err := s.DB(DB).C(EVENTS).Find(nil).All(&events)
	return events, err
}

func (mgoLayer *MongoDBLayer) getFreshSession() *mgo.Session {
	//The session.Copy() is the method that is called whenever we are requesting a new session
	//from the mgo package conncetion pool. It is idiomatic to call session.Copy() at the 
	//beginning of any method or function that is about to issue queries or commands to MongoDB
	//via the mgo package.	
	return mgoLayer.session.Copy()
}