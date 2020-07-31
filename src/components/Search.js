import React from "react";
import {Form,Input} from "reactstrap";

import  "../styles/table.css";
function Search(props){
    return(
        <Form onSubmit={props.handleSubmit}>
            <Input type="text" placeholder="search..." value={props.filterText} className="search" name="filterText"
             onChange={props.handleChange} />
        </Form>
    )
}

export default Search