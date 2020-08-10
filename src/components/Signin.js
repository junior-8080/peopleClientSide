import React from "react"
import {Form,Button,FormGroup,Label,Input} from "reactstrap"

function SigninForm(props){
    return(
        <Form className="form-signLogin  login" onSubmit={props.handleSubmit}>
            <FormGroup>
              <span className="errors">{props.error}</span>
            </FormGroup>
            <FormGroup>
                <Label for="emailField" className="label">Email:</Label>
                <Input type="email" name="email" id="emailField" placeholder="email"  
                value={props.email} 
                onChange={props.handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="passwordField" className="label">Password:</Label>
                <Input type="password"  name="password" id="passwordField" placeholder="password"
                 value={props.password} 
                 onChange={props.handleChange}
                />
            </FormGroup>
            <Button>Login</Button>
        </Form>
    )
}

export default SigninForm