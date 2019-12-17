import * as React from "react"; 
import * as ReactDOM from "react-dom"; 
import {HomePage} from './components/home_page';
import {EventListContainer} from "./components/event_list_container";
import {EventBookingFormContainer} from './components/event_booking_form_container';
import {Navigation} from "./components/navigation"; 
import {BrowserRouter, Route} from "react-router-dom"; 

 
class App extends React.Component { 
  render() {
    const homePage = () => <HomePage/>;
    const eventList = () => <EventListContainer eventListURL="http://localhost:8181/events"/>;
    const eventBooking = (props) => <EventBookingFormContainer {...props}
      eventServiceURL="http://localhost:8181" 
      bookingServiceURL="http://localhost:4141" />; 

    return <BrowserRouter> 
      <Navigation brandName="MyEvents"/> 
      <div className="container"> 
        <h1>My Events</h1> 
 
        <Route exact path="/" render={props => homePage(props)}/>
        <Route exact path="/events" render={props => eventList(props)}/>
        <Route path="/events/:id/book" render={props => eventBooking(props)} />
      </div> 
    </BrowserRouter> 
  } 
} 

ReactDOM.render( 
    <App/>,
    document.getElementById("myevents-app") 
);