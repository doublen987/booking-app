package configuration

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/doublen987/web_dev/MyEvents/lib/persistence/dblayer"
)

var (
	DBTypeDefault            = dblayer.DBTYPE("mongodb")
	DBConnectionDefault      = "mongodb://127.0.0.1:27017"
	AWSRegionDefault         = "us-east-2"
	RestfulEPDefault         = "localhost:8080"
	RestfulTLSEPDefault      = "localhost:9090"
	MessageBrokerTypeDefault = "amqp"
	//AMQPMessageBrokerDefault = "amqp://guest:guest@rabbitmq4:5672"
	AMQPMessageBrokerDefault   = "amqp://guest:guest@localhost:5672"
	KafkaMessageBrokersDefault = []string{"localhost:9092"}
)

type ServiceConfig struct {
	Databasetype        dblayer.DBTYPE `json:"databasetype"`
	DBConnection        string         `json:"dbconnection"`
	AWSRegion           string         `json:"awsregion"`
	RestfulEndpoint     string         `json:"restfulapi_endpoint"`
	RestfulTLSEndpoint  string         `json:"restfulapi_tlsendpoint"`
	MessageBrokerType   string         `json:"message_broker_type"`
	AMQPMessageBroker   string         `json:"amqp_message_broker"`
	KafkaMessageBrokers []string       `json:"kafka_message_brokers"`
}

func getEnv(conf *ServiceConfig) {
	if broker := os.Getenv("AMQP_URL"); broker != "" {
		conf.AMQPMessageBroker = broker
	}

	if dbURL := os.Getenv("DB_URL"); dbURL != "" {
		conf.DBConnection = dbURL
	}

	if RestfulEPURL := os.Getenv("LISTEN_URL"); RestfulEPURL != "" {
		conf.RestfulEndpoint = RestfulEPURL
	}

	if RestfulEPURLTLS := os.Getenv("LISTEN_URL_TLS"); RestfulEPURLTLS != "" {
		conf.RestfulTLSEndpoint = RestfulEPURLTLS
	}

	if AWSRegion := os.Getenv("AWS_REGION"); AWSRegion != "" {
		conf.AWSRegion = AWSRegion
	}
}

func ExtractConfiguration(filename string) (ServiceConfig, error) {
	conf := ServiceConfig{
		DBTypeDefault,
		DBConnectionDefault,
		AWSRegionDefault,
		RestfulEPDefault,
		RestfulTLSEPDefault,
		MessageBrokerTypeDefault,
		AMQPMessageBrokerDefault,
		KafkaMessageBrokersDefault,
	}

	file, err := os.Open(filename)
	if err != nil {
		fmt.Println("Configuration file not found. Continuing with default values.")
		return conf, err
	}
	err = json.NewDecoder(file).Decode(&conf)

	getEnv(&conf)

	return conf, err
}
