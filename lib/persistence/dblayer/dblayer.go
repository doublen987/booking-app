package dblayer

import (
	"errors"

	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence/dynamolayer"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence/mongolayer"
)

type DBTYPE string

const (
	MONGODB  DBTYPE = "mongodb"
	DYNAMODB DBTYPE = "dynamodb"
)

func NewPersistenceLayer(options DBTYPE, config map[string]interface{}) (persistence.DatabaseHandler, error) {
	switch options {
	case MONGODB:
		connection, ok := config["connection"]
		if !ok {
			return nil, errors.New("No connection string in config map")
		}

		if connstring, ok := connection.(string); ok {
			return mongolayer.NewMongoDBLayer(connstring)
		}
	case DYNAMODB:
		region, ok := config["region"]
		if !ok {
			return nil, errors.New("No region string in config map")
		}

		if regionstring, ok := region.(string); ok {
			return dynamolayer.NewDynamoDBLayerByRegion(regionstring)
		}
	}

	return nil, nil
}
