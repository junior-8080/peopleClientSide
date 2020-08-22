import React,{Component} from "react";
import { connect } from 'react-redux'
import {Container,Row,Col,Alert} from "reactstrap";
import {Link} from "react-router-dom";
import Footer from "./Footer";
import SigninForm from "./Signin";
import Logo from "./people.jpg";
import Reset from './Reset';
import isLogged from '../action/isLogged';
import {saveProfile} from '../action/saveProfile';



import "../styles/home.css";
import "../styles/footer.css";


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            error:"",
            modal:false
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    toggle = () => {
        this.setState({
            modal:!this.state.modal
        })
     }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            useremail:this.state.email,
            password:this.state.password
        }
        fetch('/api/signin',{
            method:'POST',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.message === 'success'){
                console.log(result.data)
                this.props.isLogged();
                this.props.saveProfile(result.data)
                localStorage.setItem('profile',JSON.stringify(result.data))
            }
            if(result.errors){
                return this.setState({
                    error:result.errors[0].msg
                })
            }
        })  
        .catch(err => {
            console.log(err)
        })      
    }
    render(){
        localStorage.setItem('isLogged',false);
        localStorage.setItem('profile',JSON.stringify({}));
        return(
            <Container fluid={true}>
              <Row noGutters={true} className="row-home">
                  <Col sm="12" md={{size:3,offset:1}} className="column1" >
                    <div>
                      <h1>Poeple Management And Messaging App</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                             .</p>
                          </div>
                       
                  </Col>
                  <Col sm="12" md={{ size:3}} className="column2" >
                     <img src={Logo} width="100%" height="100%" alt="img"/>
                  </Col>
                  <Col sm="12" md={{size:4,offset:1}} className="column3">
                     <h4 className="title">Login</h4>
                     <SigninForm 
                     email = {this.state.email}
                     password = {this.state.password}
                     handleChange = {this.handleChange}
                     handleSubmit = {this.handleSubmit}
                     error = {this.state.error}/>
                     <span className="dntHaveAccount">
                         Dont have an account...?<Link to="/signup">&nbsp;Sign me up</Link>
                     </span>
                     <div>
                         <span className="dntHaveAccount">Forgotton Password...?<Link onClick={this.toggle} >&nbsp;Reset</Link></span>
                     </div>
                  </Col>
              </Row>
              <Reset  toggle={this.toggle} modal={this.state.modal}/>
              <Footer />
            </Container>
        )
    }
   
}



  const mapDispatchToProps = dispatch => {
    return {
        saveProfile: profile => {
            dispatch(saveProfile(profile))
        },
        isLogged:()=> {
            dispatch(isLogged());
        }
    }
  }

export default connect(null, mapDispatchToProps)(Homepage);