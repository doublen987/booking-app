import * as React from "react"; 
import {EventBookingForm} from "./event_booking_form"; 

export class EventBookingFormContainer extends React.Component { 
  constructor(props) { 
    super(props); 
 
    this.state = {state: "loading"}; 
 
    console.log(props.eventServiceURL + "/events/id/" + this.props.match.params.id);

    fetch(props.eventServiceURL + "/events/id/" + this.props.match.params.id) 
      .then(response => response.json()) 
      .then(event => { 
        console.log(event);
        this.setState({ 
          state: "ready", 
          event: event 
        }) 
      }); 
  } 

  handleSubmit(seats) { 
    const url = this.props.bookingServiceURL + "/events/" + p.match.params.id + "/bookings"; 
    const payload = {seats: seats}; 
   
    this.setState({ 
      event: this.state.event, 
      state: "saving" 
    }); 
   
    fetch(url, {method: "POST", body: JSON.stringify(payload)}) 
      .then(response => { 
        this.setState({ 
          event: this.state.event, 
          state: response.ok ? "done" : "error" 
        }); 
      }) 
  }

  render() { 
    if (this.state.state === "loading") { 
      return <div>Loading...</div>; 
    } 
   
    if (this.state.state === "saving") { 
      return <div>Saving...</div>; 
    } 
   
    if (this.state.state === "done") { 
      return <div className="alert alert-success"> 
        Booking completed! Thank you! 
      </div> 
    } 
   
    if (this.state.state === "error" || !this.state.event) { 
      return <div className="alert alert-danger"> 
        Unknown error! 
      </div> 
    } 
   
    return <EventBookingForm event={this.state.event} onSubmit={seats => this.handleSubmit(seats)} /> 
  } 
} 