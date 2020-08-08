import React,{Component} from "react";
import {Container,Row,Col,Alert} from "reactstrap";
import {Link} from "react-router-dom";
import Footer from "./Footer";
import SigninForm from "./Signin";
import Logo from "./people.jpg";



import "../styles/home.css";
import "../styles/footer.css";


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errors:[]
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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
            console.log(result)
            if(result.message){
            fetch('/api/profile')
            .then(res => res.json())
            .then(result => {
                console.log(data)
                let profile = {
                    userId:result.data.user_id,
                    username:result.data.user_name,
                    useremail : result.data.user_email
                }
                localStorage.setItem('profile',JSON.stringify(profile))
                window.location = '/account'
                console.log(profile)
            })
            .catch(err=> console.log(err))
            }
            if(result.errors){
                // let errors = convertArrayToObject(result.errors,'msg')
                return this.setState({
                    errors:result.errors
                })
            }
        })  
        .catch(err => {
            console.log(err)
        })      
    }
    render(){
        let errors = this.state.errors.length !== 0?
         this.state.errors.map((error,index)=>{
             return(
                 <Alert>
                     {
                         error.msg
                     }
                 </Alert>
             )
         })
         : null
        return(
            <Container fluid={true}>
               { errors?
                            <Alert>
                            {
                            errors
                            }
                        </Alert>
                        : null
                        }
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
                     handleSubmit = {this.handleSubmit}/>
                     <span className="dntHaveAccount">
                         Dont have an account...<Link to="/signup">Sign me up</Link>
                     </span>
                  </Col>
              </Row>
              <Footer />
            </Container>
        )
    }
   
}

export default Homepage