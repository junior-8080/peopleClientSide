import React, {Component} from "react"
import {Container, Row, Col,Alert} from "reactstrap"
import {Form, Button, FormGroup, Label, Input,FormText} from "reactstrap"
import {Link} from "react-router-dom"


import "../styles/signup.css"

class Signup extends Component {
    constructor(props){
        super(props)
            this.state = {
                username:"",
                email:"",
                phonenumber:"",
                password:"",
                confirmPassword:"",
                errors:[]

            }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) =>{
      event.preventDefault()
      const data = {username:this.state.username,
                    useremail:this.state.email,
                    msisdn:this.state.phonenumber,
                    password:this.state.password,
                    confirmPassword:this.state.confirmPassword
                }
      fetch('/api/signup',{
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
          if(result.message){
              window.location = "/signin";
          }
          if(result.errors){
            this.setState({
                errors:result.errors
            })
          }
      })
      .catch(err => {
        console.log(err)
      })
    }
    render() {
       let errors = this.state.errors.length !== 0?
            this.state.errors.map((error,index) =>{
                return(
                    <li key={index}><small>{error.msg}</small></li>
                )
            })
            : 
            null
        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                    <Col sm="12" md="5" style={{margin:"auto",marginTop:70}} className="column">
                        {
                            errors?
                            <Alert color="danger">
                            <ul className="err-list">
                            {
                                errors
                            }
                            </ul>
                        </Alert>
                        :null 
                        }
                        
                        <h4 className="title">Signup</h4>
                       <FormSignup 
                        Username = {this.state.username}
                        email = {this.state.email}
                        phonenumber = {this.state.phonenumber}
                        password = {this.state.password}
                        confirmPassword = {this.state.confirmPassword}
                        handleChange = {this.handleChange}
                        handleSubmit = {this.handleSubmit}
                       />
                            <FormText color="info" className="form-text">Have an account? <Link to="/signin" className="link">Login</Link></FormText>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function FormSignup(props) {
    return (
        <Form className="form-signLogin" onSubmit={props.handleSubmit}>
            <FormGroup>
              <Label for="emailField" className="label">Username:</Label>
              <Input type="text" name="username" id="emailField" placeholder="Username" 
               value={props.username}
                onChange={props.handleChange}
               />
          </FormGroup>
          <FormGroup>
              <Label for="emailField" className="label">Email:</Label>
              <Input type="email" name="email" id="emailField" placeholder="Email"
               value={props.email}
               onChange={props.handleChange}
                />
          </FormGroup>
          <FormGroup>
              <Label for="numberField" className="label">Phone number:</Label>
              <Input type="text" name="phonenumber" id="numberField" placeholder="Phone number" 
                     value={props.phonenumber}
                     onChange={props.handleChange}
              />
          </FormGroup>
          <FormGroup>
              <Label for="passwordField" className="label">Password:</Label>
              <Input type="password" name="password" id="passwordField" placeholder="Password"
                    value={props.password}
                    onChange={props.handleChange}
               />
          </FormGroup>
          <FormGroup>
              <Label for="confirmpasswordField" className="label">Confirm Password:</Label>
              <Input type="password" name="confirmPassword" id="confirmpasswordField" placeholder="Confirm Password" 
                    value = {props.confirmPassword}
                    onChange={props.handleChange}
              />
          </FormGroup>
          <Button className="btn">Signup</Button>
        </Form>
    )

}

export default Signup
