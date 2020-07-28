import React from "react";
import {Nav,NavItem,NavLink} from "reactstrap";

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
                        <NavLink href="/" style={style1} ><i className="fa fa-home">&nbsp;Home</i></NavLink>
                        <NavLink href="/account" style={style1}><i className="fa fa-user">&nbsp;AllPeople</i></NavLink>
                        <NavLink href="#" onClick={props.toggle}  style={style1}><i className="fa fa-user">&nbsp;AddPerson</i></NavLink>
                        <NavLink href="/message" style={style1}><i className="fa fa-envelope">&nbsp;Send Message</i></NavLink>
                    </NavItem>
                </Nav>   
        
    )
}

export default Sidemenu
