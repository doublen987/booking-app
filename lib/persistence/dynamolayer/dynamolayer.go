package dynamolayer

import (
	"errors"
	"fmt"
	"reflect"

	uuid "github.com/satori/go.uuid"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/doublen987/web_dev/MyEvents/lib/persistence"
)

func SetField(obj interface{}, name string, value interface{}) error {
	structValue := reflect.ValueOf(obj).Elem()
	structFieldValue := structValue.FieldByName(name)

	//fmt.Println(obj)

	if !structFieldValue.IsValid() {
		return fmt.Errorf("No such field: %s in obj", name)
	}

	if !structFieldValue.CanSet() {
		return fmt.Errorf("Cannot set %s field value", name)
	}

	structFieldType := structFieldValue.Type()
	val := reflect.ValueOf(value)
	if structFieldType != val.Type() {
		return errors.New("Provided value type didn't match obj field type")
	}

	structFieldValue.Set(val)
	return nil
}

type Airplane struct {
	Name         string
	Type         string
	Passangers   int
	Acceleration float64
}

func FillStruct(m map[string]interface{}, s interface{}, replace map[string]string) error {
	for k, v := range m { //k is the key, v is the value
		for i, j := range replace {
			if i == k {
				//fmt.Println("i: " + i + " k: " + k)
				k = j
			}
		}
		err := SetField(s, k, v)
		if err != nil {
			continue
		}
	}
	return nil
}

func NewDynamoDBLayerByRegion(region string) (persistence.DatabaseHandler, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(region),
	})
	if err != nil {
		return nil, err
	}
	return &DynamoDBLayer{
		service: dynamodb.New(sess),
	}, nil
}

func NewDynamoDBLayerBySession(sess *session.Session) persistence.DatabaseHandler {
	return &DynamoDBLayer{
		service: dynamodb.New(sess),
	}
}

//Done
func (dynamoLayer *DynamoDBLayer) AddUser(user persistence.User) ([]byte, error) {
	u1 := uuid.NewV4()
	av, err := dynamodbattribute.MarshalMap(AWSUser{
		PK:       string("USR#" + u1.String()),
		SK:       string("META#" + u1.String()),
		Name:     user.First,
		Surname:  user.Last,
		Age:      user.Age,
		Username: user.Username,
		Email:    user.Email,
	})
	if err != nil {
		return nil, err
	}
	_, err = dynamoLayer.service.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("myevents"),
		Item:      av,
	})
	if err != nil {
		return nil, err
	}
	return []byte("USR#" + u1.String()), nil
}

//Needs a GSI FIX
func (dynamoLayer *DynamoDBLayer) FindUserByName(name string) (persistence.User, error) {
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("#pk = :id"),
		ExpressionAttributeNames: map[string]*string{
			"#pk": aws.String("PK-GSI1"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {
				S: aws.String("USR#META"),
			},
			":username": {
				S: aws.String(name),
			},
		},
		FilterExpression: aws.String("Username = :username"),
		IndexName:        aws.String("GSI1"),
		TableName:        aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return persistence.User{}, err
	}
	//Obtain the first item from the result
	var awsuser map[string]interface{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalMap(result.Items[0], &awsuser)
		fmt.Println(awsuser)
	} else {
		err = errors.New("No results found")
	}

	newUser := &persistence.User{}
	replaceMap := map[string]string{
		"SK-GSI1": "ID",
		"Name":    "First",
		"Surname": "Last",
	}
	FillStruct(awsuser, newUser, replaceMap)
	fmt.Println(newUser)

	if err != nil {
		return persistence.User{}, err
	}

	return *newUser, nil
}

//Done
func (dynamoLayer *DynamoDBLayer) FindUserById(id []byte) (persistence.User, error) {
	//Create the QueryInput type with the information we need to execute the query
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("PK = :id"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {
				S: aws.String(string(id)),
			},
		},
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return persistence.User{}, err
	}
	//Obtain the first item from the result
	awsuser := AWSUser{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalMap(result.Items[0], &awsuser)
	} else {
		err = errors.New("No results found")
	}
	user := persistence.User{
		ID:       awsuser.PK,
		First:    awsuser.Name,
		Last:     awsuser.Surname,
		Age:      awsuser.Age,
		Email:    awsuser.Email,
		Username: awsuser.Username,
	}
	return user, err
}

//Done
func (dynamoLayer *DynamoDBLayer) FindAllUsers() ([]persistence.User, error) {
	//Create the QueryInput type with the information we need to execute the query
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("#pk = :id"),
		ExpressionAttributeNames: map[string]*string{
			"#pk": aws.String("PK-GSI1"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {
				S: aws.String("USR#META"),
			},
		},
		IndexName: aws.String("GSI1"),
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return []persistence.User{}, err
	}
	//Obtain the first item from the result
	var awsusers []map[string]interface{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &awsusers)
		fmt.Println(awsusers)
	} else {
		err = errors.New("No results found")
	}

	var users []persistence.User

	for _, element := range awsusers {
		//element["Age"].(int)
		newUser := &persistence.User{}
		replaceMap := map[string]string{
			"SK-GSI1": "ID",
			"Name":    "First",
			"Surname": "Last",
		}
		FillStruct(element, newUser, replaceMap)
		fmt.Println(newUser)
		users = append(users, *newUser)
	}

	return users, err
}

//Done
func (dynamoLayer *DynamoDBLayer) AddEvent(event persistence.Event) ([]byte, error) {
	u1 := uuid.NewV4()
	av, err := dynamodbattribute.MarshalMap(AWSEvent{
		PK:         string("EV#" + u1.String()),
		SK:         string("META#" + u1.String()),
		EventID:    string("EV#" + u1.String()),
		Name:       event.Name,
		StartTime:  event.StartDate,
		EndTime:    event.EndDate,
		LocationID: event.Location.ID,
	})
	if err != nil {
		return nil, err
	}
	_, err = dynamoLayer.service.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("myevents"),
		Item:      av,
	})
	if err != nil {
		return nil, err
	}
	return []byte("EV#" + u1.String()), nil
}

//Done
func (dynamoLayer *DynamoDBLayer) FindEvent(id []byte) (persistence.Event, error) {
	//Create the QueryInput type with the information we need to execute the query
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("PK = :id"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {
				S: aws.String(string(id)),
			},
		},
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return persistence.Event{}, err
	}
	//Obtain the first item from the result
	awsevent := AWSEvent{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalMap(result.Items[0], &awsevent)
	} else {
		err = errors.New("No results found")
	}
	event := persistence.Event{
		ID:        awsevent.PK,
		Name:      awsevent.Name,
		StartDate: awsevent.StartTime,
		EndDate:   awsevent.StartTime,
		Location: persistence.Location{
			ID: awsevent.LocationID,
		},
	}
	return event, err
}

//Needs GSI
func (dynamoLayer *DynamoDBLayer) FindEventByName(name string) (persistence.Event, error) {
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("#pk = :pk and #sk = :sk"),
		ExpressionAttributeNames: map[string]*string{
			"#pk": aws.String("PK-GSI1"),
			"#sk": aws.String("SK-GSI1"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":pk": {
				S: aws.String("EV#META"),
			},
			":sk": {
				S: aws.String(string(name)),
			},
		},
		IndexName: aws.String("GSI1"),
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return persistence.Event{}, err
	}
	//Obtain the first item from the result
	var awsevent map[string]interface{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalMap(result.Items[0], &awsevent)
	} else {
		err = errors.New("No results found")
	}

	newEvent := &persistence.Event{}
	replaceMap := map[string]string{
		"SK-GSI1":   "ID",
		"Name":      "Name",
		"StartTime": "StartDate",
		"EndTime":   "EndDate",
	}
	FillStruct(awsevent, newEvent, replaceMap)
	//fmt.Println(newEvent)

	if err != nil {
		return persistence.Event{}, err
	}

	return *newEvent, nil
}

//Done
func (dynamoLayer *DynamoDBLayer) FindAllAvailableEvents() ([]persistence.Event, error) {
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("#pk = :id"),
		ExpressionAttributeNames: map[string]*string{
			"#pk": aws.String("PK-GSI1"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {
				S: aws.String("EV#META"),
			},
		},
		IndexName: aws.String("GSI1"),
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return []persistence.Event{}, err
	}

	var awsevents []map[string]interface{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &awsevents)
	} else {
		err = errors.New("No results found")
	}

	var events []persistence.Event

	for _, element := range awsevents {
		newEvent := &persistence.Event{}
		replaceMap := map[string]string{
			"SK-GSI1":   "ID",
			"Name":      "Name",
			"StartTime": "StartDate",
			"EndTime":   "EndDate",
		}
		FillStruct(element, newEvent, replaceMap)
		fmt.Println(newEvent)

		events = append(events, *newEvent)
	}

	return events, err
}

//Done
func (dynamoLayer *DynamoDBLayer) AddBookingForUser(id []byte, bk persistence.Booking) ([]byte, error) {
	u1 := uuid.NewV4()
	av, err := dynamodbattribute.MarshalMap(AWSBooking{
		PK:      string(id),
		SK:      string("BK#" + u1.String()),
		EventID: string(bk.EventID),
		Seats:   bk.Seats,
	})
	if err != nil {
		return nil, err
	}
	_, err = dynamoLayer.service.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("myevents"),
		Item:      av,
	})
	if err != nil {
		return nil, err
	}
	return []byte("BK#" + u1.String()), nil
}

//Done
func (dynamoLayer *DynamoDBLayer) FindBookingByBookingId(userId []byte, bookingId []byte) (persistence.Booking, error) {
	//Create the QueryInput type with the information we need to execute the query
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("PK = :pk and SK = :sk"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":pk": {
				S: aws.String(string(userId)),
			},
			":sk": {
				S: aws.String(string(bookingId)),
			},
		},
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return persistence.Booking{}, err
	}
	//Obtain the first item from the result
	awsbooking := AWSBooking{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalMap(result.Items[0], &awsbooking)
	} else {
		err = errors.New("No results found")
	}

	if err != nil {
		return persistence.Booking{}, err
	}

	return persistence.Booking{
		ID:      awsbooking.SK,
		EventID: awsbooking.EventID,
		Seats:   awsbooking.Seats,
	}, err
}

//Fix
func (dynamoLayer *DynamoDBLayer) FindBookingsByUserId(userId []byte) ([]persistence.Booking, error) {
	//Create the QueryInput type with the information we need to execute the query
	input := &dynamodb.QueryInput{
		KeyConditionExpression: aws.String("PK = :pk and begins_with(SK, :sk)"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":pk": {
				S: aws.String(string(userId)),
			},
			":sk": {
				S: aws.String(string("BK#")),
			},
		},
		TableName: aws.String("myevents"),
	}
	// Execute the query
	result, err := dynamoLayer.service.Query(input)
	if err != nil {
		return []persistence.Booking{}, err
	}

	var awsbookings []map[string]interface{}
	if len(result.Items) > 0 {
		err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &awsbookings)
	} else {
		err = errors.New("No results found")
		return []persistence.Booking{}, err
	}

	//Obtain the first item from the result
	var bookings []persistence.Booking

	for _, element := range awsbookings {
		newBooking := &persistence.Booking{}
		replaceMap := map[string]string{
			"SK": "ID",
		}
		FillStruct(element, newBooking, replaceMap)
		fmt.Println(newBooking)

		bookings = append(bookings, *newBooking)
	}

	if err != nil {
		return []persistence.Booking{}, err
	}

	return bookings, nil

}
