import React from "react";
import {Nav,NavItem,NavLink} from "reactstrap";
import {Link}  from "react-router-dom";

import "../styles/sidemenu.css"



function Sidemenu(props){

    let style1 = {
        backgroundColor:'blue',
        padding:10,
        borderBottom:" 1px solid black"
    }
    
    return(
                <Nav vertical>
                    <NavItem>
                        {/* <Link to="/" style={style1} className="nav-link" ><i className="fa fa-home">&nbsp;Home</i></Link> */}
                        <Link to="/account" style={style1} className="nav-link"><i className="fa fa-user">&nbsp;AllPeople</i></Link>
                        <Link to="#" onClick={props.toggle}  style={style1} className="nav-link"><i className="fa fa-user">&nbsp;AddPerson</i></Link>
                        <Link to="/message" style={style1} className="nav-link"><i className="fa fa-envelope">&nbsp;Send Message</i></Link>
                    </NavItem>
                </Nav>   
        
    )
}

export default Sidemenu
