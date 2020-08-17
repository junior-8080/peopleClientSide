
import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik"
import {Row, Col, Label} from "reactstrap";
import {Form, Button, FormGroup, Input} from "reactstrap";
import {Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap"
import "../styles/add.css"


function Reset(props) {
    
    const  formik = useFormik({
        initialValues:{
            email:"",
        },
        validationSchema: Yup.object({
            email:Yup.string().email('Invalid Email Address').required("Required"),
        }),
        onSubmit:values => {
            const data = {
                email:values.email,
            }
            props.toggle();
            fetch('/api/reset',{
                method:'POST',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if(result.message === 'reset'){
                    alert('check your email to reset password link');
                }
            })
        }
    })

     return (
         <Modal isOpen={props.modal} toggle={props.toggle} className="modal-container">
                 <ModalHeader toggle={props.toggle} style={{color:'rgb(9, 9, 112)'}}>
                   Reset Password
                 </ModalHeader>
             <ModalBody>
                <Form className="form" onSubmit={formik.handleSubmit}>
                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="text" name="email" id="emailField" placeholder="Enter your email" 
                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                         {formik.touched.email && formik.errors.email?<div className="errors">{formik.errors.email}</div>: null}
                    </FormGroup>
                    </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={formik.handleSubmit}>Submit</Button>
            </ModalFooter>

               
         </Modal>
        
    )

}

export default Reset;
