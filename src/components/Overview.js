import React,{Component} from "react"
import {Container,Row,Col} from "reactstrap"
import {Card,CardBody,CardTitle,CardText,CardImg} from "reactstrap"
import Navbars from './Navbar';
import Sidemenu from "./Sidemenu"
import image from "./profile2.svg"
import AddPersonForm from "./AddPersonForm";
import EditForm from "./EditFrom";

import "../styles/overview.css"



class Overview extends Component {
    constructor(props){
        super(props)
        this.state = {
            person:{},
            id: props.match.params.id,
            modal:false,
            modal1:false,
        }
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
            modal:!this.state.modal
        })
     }

      toggle1 = () => {
        this.setState({
            modal1:!this.state.modal1
        })
     }
    render(){
        let username = JSON.parse(localStorage.getItem('profile')).username;
        return(
           <Container fluid={true} className="overview">
               <Navbars username={username} logout={this.logout}/>
               <Row noGutters={true} className="over-row">
                 <Col sm="12" md="2" className="sidemenu-col">
                 <Sidemenu toggle={this.toggle}/>
                 </Col>
                <Col sm="12" md={{size:4,offset:3}} className="table-col">
                    <Card>
                        <CardImg top width="200px" height="200px" src={image} alt="card-image"  />
                        {/* <hr /> */}
                        <CardBody>
                            <CardTitle>
                               <i className="fa fa-edit" onClick={this.toggle1}></i> {this.state.person.person_name}
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
                    {
                        this.state.modal?
                        <AddPersonForm  
                        toggle={this.toggle} 
                        modal={this.state.modal} 
                        />
                        :null

                    }
                    
                    {
                    this.state.modal1?
                    <EditForm toggle={this.toggle1} 
                        modal={this.state.modal1}
                        person_id={this.state.person.person_id}
                        person={this.state.person}
                     />
                     :null
                    }
                </Col>
               </Row>
           </Container>
        )

    }
}
export default Overview