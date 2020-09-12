import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik"
import {Row, Col} from "reactstrap";
import {Form, Button, FormGroup, Input} from "reactstrap";
import {Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap"
import "../styles/add.css"
import { connect } from "react-redux";


function AddPersonForm(props) {
    
    const  formik = useFormik({
        initialValues:{
            pname:"",
            email:"",
            gender:"male",
            number:"",
            location:"",
            twitter:"",
            instagram:""
        },
        validationSchema: Yup.object({
            name:Yup.string().max(15,'Must be 15 characters or less').required('Required'),
            email:Yup.string().email('Invalid Email Address').required("Required"),
            number:Yup.string().max(10,'Must be 10 characters').required('Required'),
        }),
        onSubmit:values =>{
            const data = {
                name:values.name,
                email:values.email,
                number:values.number,
                gender:values.gender,
                location:values.location,
                twitter:values.twitter,
                instagram:values.instagram
            }
        
            fetch('/api/addPerson',{
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
                    props.toggle();
                     window.location ='/account'
                     alert(result.message)
                 }
            })
            .catch(err => console.log(err))
                
        },
    })
 
     return (
           
         <Modal isOpen={props.modal} toggle={props.toggle} className="modal-container">
        
                 <ModalHeader toggle={props.toggle} style={{color:'rgb(9, 9, 112)'}}>
                    New Person
                 </ModalHeader>
             
             <ModalBody>
                <Form className="form" onSubmit={formik.handleSubmit}>
                    <Row>
                    <Col md="6">
                    <FormGroup>
                        <Input type="text" name="name" id="nameField" placeholder="name" 
                        value={props.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                         {formik.touched.name && formik.errors.name?<div className="errors">{formik.errors.name}</div>: null}

                    </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Input type="text" name="number" id="numberField" placeholder="Phone number" 
                        value={formik.values.number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.number && formik.errors.number?<div className="errors">{formik.errors.number}</div>: null}

                       </FormGroup>
                     </Col>
                    </Row>
                         <FormGroup>
                        <Input type="email" name="email" id="emailField" placeholder="Email" 
                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.touched.email && formik.errors.email?<div className="errors">{formik.errors.email}</div>: null}

                         </FormGroup>
                    <Row>
                    <Col>
                        <FormGroup>
                        <select name="gender" id="exampleSelect" value={formik.values.gender} 
                        onChange={formik.handleChange} className="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                     </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Input type="text" name="location" id="locationField" placeholder="Location" 
                        value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Input type="text" name="twitter" id="twitterField" placeholder="Twitter Account"
                    value={formik.values.twitter} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="instagram" id="instagramField" placeholder="IG Account" 
                    value={formik.values.instagram} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                </FormGroup>
                </Form>
             </ModalBody>
                    <ModalFooter>
                         <Button  color="primary"  onClick={formik.handleSubmit} >Add</Button>
                        <Button color="danger" onClick={props.toggle} className="cancel">Cancel</Button> 
                    </ModalFooter>
         </Modal>
        
    )

}

 const mapStateToProps = state => {
     return {isLogged:state.isLogged}
 }
export default connect(mapStateToProps,null) (AddPersonForm)