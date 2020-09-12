
import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik"
import {Row, Col, Label} from "reactstrap";
import {Form, Button, FormGroup, Input} from "reactstrap";
import "../styles/reset.css"


function ResetForm(props) {
    
    const  formik = useFormik({
        initialValues:{
            password:"",
            confirmPassword:""
        },
        validationSchema: Yup.object({
            password:Yup.string().max(20,'Must be 20 characters or less').required('Required'),
            confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"'Password must match").required('Required')
        }),
        onSubmit:values => {
            const data = {
                secret:props.match.params.secret,
                password:values.password,
            }
        
            fetch('/api/resetpassword',{
                method:'POST',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if(result.message === 'password reset'){
                    window.location = '/'
                }
            })
        }
    })

     return (
                <Form className="form form-reset" onSubmit={formik.handleSubmit}>
                    <Row>
                    <Col md="8">
                    <FormGroup>
                        <Label>New-Password:</Label>
                        <Input type="password" name="password" id="passwordField" placeholder="Enter new password" 
                        value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                         {formik.touched.email && formik.errors.email?<div className="errors">{formik.errors.email}</div>: null}
                    </FormGroup>
                    <FormGroup>
                        <Label>Confirm-Password:</Label>
                        <Input type="password" name="confirmPassword" id="confirmField" placeholder="Enter new password" 
                        value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                         {formik.touched.confirmPassword && formik.errors.confirmPassword?<div className="errors">{formik.errors.confirmPassword}</div>: null}
                    </FormGroup>
                    <Button className="btn" onClick={formik.handleSubmit}>Reset</Button>
                    </Col>
                    </Row>
                </Form>
        
    )

}

export default ResetForm;
