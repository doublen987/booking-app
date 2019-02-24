package dblayer

import (
	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence"
	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence/mongolayer"
)

type DBTYPE string

const (
	MONGODB		DBTYPE = "mongodb"
	DYNAMODB	DBTYPE = "dynamodb"
)

func NewPersistenceLayer(options DBTYPE, connection string) (persistence.DatabaseHandler, error) {
	switch options {
	case MONGODB:
		return mongolayer.NewMongoDBLayer(connection)
	}
	return nil, nil
}