import React,{Component} from "react"
import {Container,Row,Col} from "reactstrap"

import Navbars from './Navbar';
import Sidemenu from "./Sidemenu";
import Tables from "./Table";
import NewUser from "./NewUser";
import AddPersonForm from "./AddPersonForm"
import "../styles/account.css"
import Search from "./Search";




class  Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal:false,
            people:[],
            filterText:"",
            username:"",
            name:"",
            email:"",
            gender:"male",
            number:"",
            location:"",
            twitter:"",
            instagram:""

        }
    }
    
    toggle = () => {
       this.setState({
           modal:!this.state.modal
       })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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
                 window.location ='/account'
                 alert(result.message)
             }
        })
        .catch(err => console.log(err))
            
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
            //    let errors =  convertArrayToObject(err,'errors')
               console.log(err)
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

    render(){
        let username = JSON.parse(localStorage.getItem('profile')).username;
        console.log(username)
        // console.log(this.state.gender)
        return(
            <Container fluid={true}>
                <Navbars  username={username} logout={this.logout}/>
                <Row className="row-acc" noGutters={true}>
                    <Col sm="12" md="2" className="sidemenu-col">
                      <Sidemenu toggle={this.toggle}/>
                    </Col>
                    <Col sm="12" md="10" className="table-col">
                        {
                            this.state.people.length !== 0 ?
                            <div>
                                <Search filterText = {this.state.filterText}
                                 handleChange ={this.handleChange} />
                                <Tables people = {this.state.people} filterText={this.state.filterText} />
                            </div>
                            : 
                            <NewUser toggle={this.toggle} />
                        }
                       
                    </Col>
                </Row>
                <AddPersonForm toggle={this.toggle} 
                modal={this.state.modal}
                />
            </Container>
        )
    }
}
export default Account