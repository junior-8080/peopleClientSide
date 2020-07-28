import React from "react";
import {Container,Row,Col} from "reactstrap";
import Navbars from "../components/Navbar" ;
import Footer from "./Footer";

import Logo from "./people.jpg";
import "../styles/home.css";
import "../styles/footer.css";

function Homepage(props) {
    return(
        <Container fluid={true}>
           <Navbars  display={props.match.path} />
          <Row noGutters={true} className="row-home">
              <Col sm="12" md={{size:3,offset:1}} className="column1" >
                  <div>
                  <h1>Poeple Management And Messaging App</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                         .</p>
                      </div>
                   
              </Col>
              <Col sm="12" md={{ size:4}} className="column2" >
                 <img src={Logo} width="100%" height="100%" alt="img"/>
              </Col>
              <Col sm="12" md={{size:3,offset:1}} className="column3">
                  <ul className="list">
                      <li className="list-item"><i className="fa fa-chevron-right">&nbsp;</i>Lorem Ipsum is simply dummy text of the printing</li>
                      <li className="list-item"><i className="fa fa-chevron-right">&nbsp;</i>Lorem Ipsum is simply dummy text of the printing</li>
                      <li className="list-item"><i className="fa fa-chevron-right">&nbsp;</i>Lorem Ipsum is simply dummy text of the printing</li>
                      <li className="list-item"><i className="fa fa-chevron-right">&nbsp;</i>Lorem Ipsum is simply dummy text of the printing</li>
                      <li className="list-item"><i className="fa fa-chevron-right">&nbsp;</i>Lorem Ipsum is simply dummy text of the printing</li>
                  </ul>
              </Col>
          </Row>
          <Footer />
        </Container>
    )
}

export default Homepage