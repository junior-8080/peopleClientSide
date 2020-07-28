import React,{Component} from "react";
import {Container,Row,Col,Label} from "reactstrap";
import {Form,FormGroup,Input,Button} from "reactstrap";
import Sidemenu from "./Sidemenu";
import Navbars from "./Navbar";
import Recepient from "./Recepient";

import '../styles/message.css'

class SendMessage extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:"",
            recepient:[],
            people:[]
        }
    }
     
    handleChange = (event)=> {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleChange1 = (event)=> {
        this.setState({
            [event.target.name]:[event.target.value]
        })
    }

    logout= () =>{
        fetch('/api/logout')
        .then(res => res.json())
        .then(result => {
            if(result.message === 'cookie cleared'){
                document.location = '/'
            }
        })
    }

    componentDidMount(){
        fetch("/api/getAllPeople")
            .then(res => res.json())
            .then(result =>{
                console.log(result)
                if(result.msg === 'token expired'){

                    return window.location = '/'
                }
                this.setState({
                    people: result.data,
                })
            })
            .catch(err=>{
            //    let errors =  convertArrayToObject(err,'errors')
               console.log(err)
            })
    }

    handleSend = ()=>{
        let recepient = this.state.recepient.split(' ')

        let data = {
            message:this.state.message,
            recepient:recepient
        }
        fetch('/api/message',{
                method:'POST',
                headers:{
                   'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(res=> res.json())
            .then(result => {
                alert(result.data.title)
                
            })
        }

        check = (event,number) => {
            let checked = event.target.checked;
            if(checked && this.state.recepient.length === 0){
               return this.setState({
                    recepient:[number]
                })
            }
            if(checked && this.state.recepient.length >= 1){
              return this.setState((prevState)=>({recepient:[...prevState.recepient,number]}));
            }
            if(!checked){
                this.setState({
                    recepient:[]
                })
            }
        }
 

    render(){
        let username = JSON.parse(localStorage.getItem('profile')).username;
        return(
            //messaging form.
            <Container fluid={true}>
                <Navbars  username={username} logout={this.logout}/>
                <Row noGutters={true}>
                    <Col sm="12" md="2" className="sidemenu-col">
                        <Sidemenu />
                    </Col>
                    <Col sm="12" md="7">
                        <MessageForm 
                        handleChange = {this.handleChange}
                        handleChange1 = {this.handleChange1}
                        message = {this.state.message}
                        recepient = {this.state.recepient}
                        handleSend={this.handleSend} 
                        />
                    </Col>
                    <Col sm="12" md="3">
                        <Recepient  recepient={this.state.people} check = {this.check}/>
                    </Col>
                    
                </Row>
            </Container>
        )
        
    }
}

function MessageForm(props){
    return(
        <Form>
            <FormGroup className="message-form" onSubmit={props.handleSend}>
                <Label for="#messageField">Message:</Label>
                <Input type="textarea" name="message" id="messageField" value={props.message}
                onChange={props.handleChange} className="textArea"></Input>
            </FormGroup>
            <FormGroup className="message-form">
                <Label for="#recepientField">Recepients:</Label>
                <Input type="textarea" name="recepient" id="recepientField" value={props.recepient}
                onChange={props.handleChange1} className="textArea"></Input>
            </FormGroup>
            <Button className="send-btn" onClick={props.handleSend}>Send</Button>
        </Form>

    )
    
}

export default SendMessage