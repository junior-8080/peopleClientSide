import React,{useState} from "react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {Container, Row, Col} from "reactstrap"
import {Form, Button, FormGroup, Label, Input,FormText} from "reactstrap"
import {Link} from "react-router-dom"


import "../styles/signup.css"

function  Signup(){
        return (
            <Container fluid={true}>
                <Row noGutters={true}>
                        <FormSignup />
                </Row>
            </Container>
        )
    }

function FormSignup() {
    const [userError,setUserErrors] = useState(null);
    const [emailError,setEmailErrors] = useState(null);
    const [phoneError,setPhoneErrors] = useState(null);
   
    const  formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            phonenumber:"",
            password:"",
            confirmPassword:""
        },
        validationSchema: Yup.object({
            username:Yup.string().max(15,'Must be 15 characters or less').required('Required'),
            email:Yup.string().email('Invalid Email Address').required("Required"),
            phonenumber:Yup.string().max(10,'Must be 10 characters').required('Required'),
            password:Yup.string().max(20,'Must be 20 characters or less').required('Required'),
            confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"'Password must match").required('Require')
        }),
        onSubmit: values => {
            const data = {username:values.username,
                            useremail:values.email,
                            msisdn:values.phonenumber,
                            password:values.password,
                            confirmPassword:values.confirmPassword
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
              console.log(result.errors)
              result.errors.forEach((err) => {

                  if(err.param === "username"){
                      setUserErrors(err.msg)
                  }
                  if(err.param === "msisdn"){
                    setPhoneErrors(err.msg)
                 }
                 if(err.param === "useremail"){
                     setEmailErrors(err.msg)
                 }
              })
          }
      })
      .catch(err => {
        console.log(err)
         })
      }
    })
    return (
       <Col sm="12" md="5" style={{margin:"auto",marginTop:70}} className="column">
           <h4 className="title">Signup</h4>
        <Form className="form-signLogin signup" onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label htmlFor="usernameField" className="label">Username:</Label>
              <Input 
                type="text" 
                name="username" 
                id="usernameField" 
                placeholder="Username" 
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               />
               {formik.touched.username && formik.errors.username?<div className="errors">{formik.errors.username}</div>: null}
                { userError? <div className="errors">{userError}</div>: null}
          </FormGroup>
          <FormGroup>
              <Label htmlFor="emailField" className="label">Email:</Label>
              <Input 
                type="email"
                name="email"
                id="emailField" 
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email?<div className="errors">{formik.errors.email}</div>:null}
                { emailError? <div className="errors">{emailError}</div>: null}
          </FormGroup>
          <FormGroup>
              <Label htmlFor="numberField" className="label">Phone number:</Label>
              <Input type="text" 
                     name="phonenumber" 
                     id="numberField" 
                     placeholder="Phone number" 
                     value={formik.values.phonenumber}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
              />
              {formik.touched.phonenumber && formik.errors.phonenumber?<div className="errors">{formik.errors.phonenumber}</div>:null}
              {phoneError ? <div className="errors">{phoneError}</div>: null}
          </FormGroup>
          <FormGroup>
              <Label htmlFor="passwordField" className="label">Password:</Label>
              <Input 
                    type="password" 
                    name="password" 
                    id="passwordField" 
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
               />
               {formik.touched.password && formik.errors.password?<div className="errors">{formik.errors.password}</div>:null}
          </FormGroup>
          <FormGroup>
              <Label for="confirmpasswordField" className="label">Confirm Password:</Label>
              <Input 
                type="password" 
                name="confirmPassword" 
                id="confirmpasswordField" 
                placeholder="Confirm Password" 
                value = {formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword?<div className="errors">{formik.errors.confirmPassword}</div>:null}
          </FormGroup>
          <Button className="btn">Signup</Button>
        </Form>
        <FormText color="info" className="form-text">Have an account? <Link to="/" className="link">Login</Link></FormText>

    </Col>
    )

}

export default Signup
