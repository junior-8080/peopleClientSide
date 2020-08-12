import React,{useState} from "react"
import {Collapse,Navbar,NavbarToggler,NavItem,NavLink, NavbarBrand,Nav} from "reactstrap";
import  logo from './logo.svg'  
import "../styles/navbar.css"


function Navbars(props){
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);
    return(
        <div className="navs">
            <Navbar light expand="md" >
                <NavbarBrand href="/"><img className="logo" src={logo}  width="50px" height="50px"/></NavbarBrand>
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