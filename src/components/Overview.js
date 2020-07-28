import React,{Component} from "react"
import {Container,Row,Col} from "reactstrap"
import {Card,CardBody,CardTitle,CardText,CardImg} from "reactstrap"
import Navbars from './Navbar';
import Sidemenu from "./Sidemenu"
import image from "./people.jpg"
import AddPersonForm from "./AddPersonForm"

import "../styles/overview.css"


class Overview extends Component {
    constructor(props){
        super(props)
        this.state = {
            person:{},
            id: props.match.params.id,
            modal:false,
            name:"",
            email:"",
            number:"",
            location:"",
            twitter:"",
            instagram:""
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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
        fetch(`/api/getPerson/${this.state.id}`)  
            .then(res => res.json())
            .then(result => {
                console.log(result)
                this.setState({
                    person:result,
                })
            })
            .catch(err => console.log(err))
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
          fetch(`/api/getPerson/${nextProps.match.params.id}`)
          .then(res => res.json())
          .then(result => {
              this.setState({
                person: result
              })
             
          })
          .catch(err=> console.log(err))
        }
      }

      toggle = () => {
        this.setState({
            modal:!this.state.modal,
            name:this.state.person.person_name,
            email:this.state.person.email,
            number:this.state.person.phonenumber,
            location:this.state.person.person_location,
            twitter:this.state.person.twitter_acc,
            instagram:this.state.person.ig_acc

        })
     }
      edit = () => {
        const data = {
            id:this.state.person.person_id,
            name:this.state.name,
            email:this.state.email,
            number:this.state.number,
            gender:this.state.gender,
            location:this.state.location,
            twitter:this.state.twitter,
            instagram:this.state.instagram
        }
        fetch('/api/updatePerson',{
            method:'PUT',
            headers:{
               'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            if(result.message){
                window.location =`/overview/${this.state.person.person_id}`
                alert(result.message)
            }
        })
      }
    render(){
        let username = JSON.parse(localStorage.getItem('profile')).username;
        console.log(username)
        return(
           <Container fluid={true} className="overview">
               <Navbars username={username} logout={this.logout}/>
               <Row noGutters={true} className="over-row">
                 <Col sm="12" md="2" className="sidemenu-col">
                 <Sidemenu />
                 </Col>
                <Col sm="12" md={{size:4,offset:3}} className="table-col">
                    <Card>
                        <CardImg top width="100%" src={image} alt="card-image"  />
                        {/* <hr /> */}
                        <CardBody>
                            <CardTitle>
                               <i className="fa fa-edit" onClick={this.toggle}></i> {this.state.person.person_name}
                            </CardTitle>
                         <Row>
                            <Col sm="12" md="6">
                            <CardText>  
                                <i className="fa fa-phone"></i>
                                &nbsp;
                                {this.state.person.phonenumber}
                            </CardText>
                            </Col>
                            <Col sm="12" md="6">
                            <CardText>
                                <i className="fa fa-envelope"></i>
                                &nbsp;
                                {this.state.person.email}
                            </CardText>
                            </Col>
                         </Row>
                         <Row>
                            <Col sm="12" md="6">
                            <CardText>
                                <i className="fa fa-location-arrow"></i>
                                &nbsp;
                                {this.state.person.person_location}
                            </CardText> 
                            </Col>
                            <Col>
                            <CardText>
                                <i className="fa fa-user"></i>
                                &nbsp;
                                {this.state.person.gender}
                            </CardText>
                            </Col>
                         </Row>
                         <Row>
                             <Col>
                             <CardText>
                                <i className="fa fa-info"></i>
                                &nbsp;
                                {this.state.person.description}
                            </CardText>
                             </Col>
                         </Row>
                         <Row>
                            <Col sm="12" md="6">
                             <CardText>
                                <i className="fa fa-twitter"></i>
                                &nbsp;
                                {this.state.person.twitter_acc}
                            </CardText>
                            </Col>
                            <Col>
                            <CardText>
                                <i className="fa fa-instagram">
                                &nbsp;
                                    {this.state.person.ig_acc}
                                </i>
                            </CardText>
                            </Col>
                         </Row>
                        </CardBody>
                    </Card>
                    <AddPersonForm  toggle={this.toggle} modal={this.state.modal} 
                    name={this.state.name}
                    email={this.state.email}
                    number={this.state.number}
                    location={this.state.location}
                    twitter={this.state.twitter}
                    instagram={this.state.instagram}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    edit ={this.edit}
                    url="overview"/>
                </Col>
               </Row>
           </Container>
        )

    }
}
export default Overview