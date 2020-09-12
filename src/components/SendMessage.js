import React,{Component} from "react";
import {Container,Row,Col,Label} from "reactstrap";
import {connect} from "react-redux";
import {Form,FormGroup,Input,Button} from "reactstrap";
import Sidemenu from "./Sidemenu";
import {saveProfile}  from '../action/saveProfile';
import isLogged from '../action/isLogged';
import Navbars from "./Navbar";
import Recepient from "./Recepient";
import AddPersonForm from './AddPersonForm'

import '../styles/message.css'

class SendMessage extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:"",
            recepient:[],
            people:[],
            filterText:"",
            username:"",
            name:"",
            email:"",
            gender:"male",
            number:"",
            location:"",
            twitter:"",
            instagram:"",
            modal:false,
            temp:""
        }
    }
     
    handleChange = (event)=> {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleChange1 = (event)=> {
        
    }

    logout= () =>{
        fetch('/api/logout')
        .then(res => res.json())
        .then(result => {
            console.log(result)
            if(result.message === 'cookie cleared'){
                localStorage.removeItem('profile')
                this.props.isLogged();
                this.props.saveProfile({});
                this.props.history.push('/');
                
            }
        })
    }

    componentDidMount(){
        fetch("/api/getAllPeople")
            .then(res => res.json())
            .then(result =>{
                if(result.msg === 'token expired'){

                    return window.location = '/'
                }
                this.setState({
                    people: result.data,
                })
            })
            .catch(err=>{
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
              this.setState((prevState) =>{
                return{
                    recepient:[...prevState.recepient,number]
                }
              })
            }
            if(checked && this.state.recepient.length > 0){
              return this.setState((prevState)=>({recepient:[...prevState.recepient,number]}));
            }
            if(!checked && this.state.recepient.length !== 0 ){
                const index =  this.state.recepient.indexOf(number);
                this.setState({
                    recepient:this.state.recepient.filter((_, i) => i !== index)
                })
            }
        }
        toggle = () => {
            this.setState({
                modal:!this.state.modal
            })
         }
        handleSubmit = (event) => {
            event.preventDefault();
            const data = {
                name:this.state.name,
                email:this.state.email,
                number:this.state.number,
                gender:this.state.gender,
                location:this.state.location,
                twitter:this.state.twitter,
                instagram:this.state.instagram
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
                    this.setState({
                        modal:!this.state.modal
                    })
                     window.location ='/message'
                     alert(result.message)
                 }
            })
            .catch(err => console.log(err))
                
        }
 

    render(){
        let username = JSON.parse(localStorage.getItem('profile')).username;
        return(
            //messaging form.
            <Container fluid={true}>
                <Navbars  username={username}   logout={this.logout} />
                <Row noGutters={true}>
                    <Col sm="12" md="2" className="sidemenu-col">
                        <Sidemenu toggle = {this.toggle}/>
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
                        <Recepient 
                         recepient={this.state.people} 
                         handleChange = {this.handleChange}
                         check = {this.check} />
                    </Col>
                </Row>
                <AddPersonForm toggle={this.toggle} 
                modal={this.state.modal}
                name={this.state.name}
                email={this.state.email}
                number={this.state.number}
                gender={this.state.gender}
                location={this.state.location}
                twitter={this.state.twitter}
                instagram={this.state.instagram}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                />
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
                <Input type="textarea"  id="recepientField" value={props.recepient}
                onChange={props.handleChange1} className="textArea"></Input>
            </FormGroup>
            <Button className="send-btn" onClick={props.handleSend}>Send</Button>
        </Form>

    )
    
}


const mapStateToProps = (state) => {
    return {
        profile:state.saveProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveProfile: profile => {
            dispatch(saveProfile(profile))
        },
        isLogged:()=> {
            dispatch(isLogged());
        }
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(SendMessage)