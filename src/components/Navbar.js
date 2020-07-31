import React,{useState} from "react"
import {Collapse,Navbar,NavbarToggler,NavItem,NavLink, NavbarBrand,Nav, NavbarText} from "reactstrap";
import {Link} from "react-router-dom";
import "../styles/navbar.css"


function Navbars(props){
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);
    return(
        <div className="navs">
            <Navbar light expand="md" >
                <NavbarBrand href="/"><i className="fa fa-users"></i></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                   {
                       
                        props.display === '/'?
                        <Nav  className="mr-auto" navbar>
                         <NavItem>
                            <NavLink href="/signup">Signup</NavLink>
                        </NavItem>
                         </Nav>
                         :
                        <Nav className="mr-auto" navbar>
                        <NavItem>
                        <NavLink href="/signup" ><i className="fa fa-user"> {props.username}</i></NavLink>
                        </NavItem>
                         <NavItem>
                            <NavLink href="#" onClick={props.logout}>Logout</NavLink>
                        </NavItem>
                         </Nav>
                    }
                    
                        
                   
                </Collapse>

            </Navbar>
        </div>
    )
}
export default Navbars