package configuration

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/doublen987/web_dev/MyEvents/events/lib/persistence/dblayer"
)

var (
	DBTypeDefault		= dblayer.DBTYPE("mongodb")
	DBConnectionDefault = "mongodb://127.0.0.1:5656"
	RestfulEPDefault 	= "localhost:8181"
	RestfulTLSEPDefault = "localhost:9191"
)

type ServiceConfig struct {
	Databasetype		dblayer.DBTYPE 	`json:"databasetype"`
	DBConnection		string			`json:"dbconnection"`
	RestfulEndpoint		string			`json:"restfulapi_endpoint"`
	RestfulTLSEndpoint 	string			`json:"restfulapi_tlsendpoint"`
}

func ExtractConfiguration(filename string) (ServiceConfig, error) {
	conf := ServiceConfig{
		DBTypeDefault,
		DBConnectionDefault,
		RestfulEPDefault,
		RestfulTLSEPDefault,
	}

	file, err := os.Open(filename)
	if err != nil {
		fmt.Println("Configuration file not found. Continuing with default values.")
		return conf, err
	}

	err = json.NewDecoder(file).Decode(&conf)
	return conf, err
}