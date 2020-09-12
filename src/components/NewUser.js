import React from "react";
import {Card,CardBody,Button,CardTitle,CardText} from "reactstrap";
import add from "./new.svg";

function NewUser(props) {
    return(
        <Card className="newUser">    
            <CardBody>
              <CardTitle>No Person</CardTitle>
              <img src={add} width="100%" height="350px" alt="add-user" className="add-user"/>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button onClick={props.toggle}>Add Person</Button>
            </CardBody>
        </Card>
    )

}
export default NewUser