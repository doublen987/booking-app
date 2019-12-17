package contracts

type UserCreatedEvent struct {
	ID    string `json:"id"`
	First string `json:"first"`
	Last  string `json:"last"`
	Age   int    `json:"age"`
}

func (e *UserCreatedEvent) EventName() string {
	return "user.created"
}
