import * as React from "react"; 
import {EventList} from "./event_list";


export class EventListContainer extends React.Component { 
    constructor(p) { 
        super(p); 
    
        this.state = { 
            loading: true, 
            events: [] 
        }; 
    
        fetch(p.eventListURL) 
        .then(response => response.json()) 
        .then(events => { 
            this.setState({ 
            loading: false, 
            events: events 
            }); 
        }); 
    }

    render() { 
        if (this.state.loading) { 
          return <div>Loading...</div>; 
        } 
       
        return <EventList events={this.state.events} />; 
    } 
}