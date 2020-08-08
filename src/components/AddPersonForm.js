import React from "react";
import {Row, Col} from "reactstrap";
import {Form, Button, FormGroup, Input} from "reactstrap";
import {Modal,ModalBody,ModalHeader,ModalFooter} from "reactstrap"
import "../styles/add.css"


function AddPersonForm(props) {
    
     return (
         <Modal isOpen={props.modal} toggle={props.toggle} className="modal-container">
             {
                 props.url === 'overview'?
                 <ModalHeader toggle={props.toggle} style={{color:'rgb(9, 9, 112)'}}>
                    Edit Person
                 </ModalHeader>
                 :
                 <ModalHeader toggle={props.toggle} style={{color:'rgb(9, 9, 112)'}}>
                    New Person
                 </ModalHeader>
             }
             
             <ModalBody>
                <Form className="form" onSubmit={props.handleSubmit}>
                    <Row>
                    <Col md="6">
                    <FormGroup>
                        {/* <Label for="emailField">Name:</Label> */}
                        <Input type="text" name="name" id="emailField" placeholder="name" 
                        value={props.name} onChange={props.handleChange}/>
                    </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        {/* <Label for="numberField">Phone number:</Label> */}
                        <Input type="text" name="number" id="numberField" placeholder="Phone number" 
                        value={props.number} onChange={props.handleChange}/>
                       </FormGroup>
                     </Col>
                    </Row>
                         <FormGroup>
                        {/* <Label for="emailField">Email:</Label> */}
                        <Input type="email" name="email" id="emailField" placeholder="Email" 
                        value={props.email} onChange={props.handleChange}/>
                         </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                        {/* <Label for="numberField">Gender:</Label> */}
                        <select name="gender" id="exampleSelect" value={props.gender} 
                        onChange={props.handleChange} className="form-control">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                     </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        {/* <Label for="locationField">Location</Label> */}
                        <Input type="text" name="location" id="locationField" placeholder="Location" 
                        value={props.location} onChange={props.handleChange}/>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    {/* <Label for="twitterField">Twitter Account:</Label> */}
                    <Input type="text" name="twitter" id="twitterField" placeholder="Twitter Account"
                    value={props.twitter} onChange={props.handleChange} />
                </FormGroup>
                <FormGroup>
                    {/* <Label for="instagramField">IG Account:</Label> */}
                    <Input type="text" name="instagram" id="instagramField" placeholder="IG Account" 
                    value={props.instagram} onChange={props.handleChange}/>
                </FormGroup>
                </Form>
             </ModalBody>
                {
                    props.url === 'overview'?
                    <ModalFooter>
                        <Button  color="primary" onClick={props.edit} >Edit</Button>
                        <Button color="danger" onClick={props.toggle}>Cancel</Button> 
                    </ModalFooter>
                    :
                    <ModalFooter>
                         <Button  color="primary"  onClick={props.handleSubmit} >Add</Button>
                        <Button color="danger" onClick={props.toggle} className="cancel">Cancel</Button> 
                    </ModalFooter>
                }
         </Modal>
        
    )

}
export default AddPersonForm