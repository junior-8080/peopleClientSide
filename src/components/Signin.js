import React,{Component} from "react"
import {Link} from "react-router-dom"
import {Container,Row,Col, Alert} from "reactstrap"
import {Form,Button,FormGroup,Label,FormText,Input} from "reactstrap"


import  "../styles/signup.css"

class Signin extends Component {
    constructor(props){
        super(props)
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
                <Row noGutters={true}>
                    <Col sm="12" md={{ size: 6, offset: 3 }} style={{marginTop:150,marginBottom:150}} className="column">
                        { errors?
                            <Alert>
                            {
                            errors
                            }
                        </Alert>
                        : null
                        }
                        <h4 className="title">Login</h4>
                        <SigninForm 
                            email = {this.state.email}
                            password = {this.state.password}
                            handleChange = {this.handleChange}
                            handleSubmit = {this.handleSubmit}/>
                        <FormText className="form-text">Dont have account ? <Link to="/signup" className="link">Signup</Link></FormText>
                    </Col>
                </Row>
            </Container>
        )
    }
}
function SigninForm(props){
    return(
        <Form className="form-signLogin" onSubmit={props.handleSubmit}>
            <FormGroup>
                <Label for="emailField">Email</Label>
                <Input type="email" name="email" id="emailField" placeholder="email"  
                value={props.email} 
                onChange={props.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="passwordField">Password</Label>
                <Input type="password"  name="password" id="passwordField" placeholder="password"
                 value={props.password} 
                 onChange={props.handleChange}
                />
            </FormGroup>
            <Button>Login</Button>
        </Form>
    )
}

export default Signin