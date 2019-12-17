import * as React from "react";
import {Link} from "react-router-dom";

export class Navigation extends React.Component { 
    constructor(props) { 
        super(props); 
    }

    render() { 
        return <nav className="navbar navbar-default"> 
          <div className="container"> 
            <div className="navbar-header"> 
              <Link to="/" className="navbar-brand"> 
                {this.props.brandName} 
              </Link> 
            </div> 
       
            <ul className="nav navbar-nav"> 
              <li><Link to="/events">Events</Link></li> 
            </ul> 
          </div> 
        </nav>
      } 
}