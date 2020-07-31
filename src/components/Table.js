import React from "react"
import {Link} from "react-router-dom"
import {Table} from "reactstrap"

import "../styles/table.css"



function TableRow(props){
    return(
        <tr>
            <td>{props.person.person_name}</td>
            <td>{props.person.phonenumber}</td>
            <td>{props.person.email}</td>
            <td>{props.person.gender}</td>
            <td> <Link to={`/overview/${props.person.person_id}`}>View</Link></td>
        </tr>
    )
}

function Tables(props){
 const rows = [];
 let filterText = props.filterText;
 let people = props.people;
  
    people.forEach((person) => {
    if(person.person_name.indexOf(filterText) === -1 && person.email.indexOf(filterText) === -1 && person.phonenumber.indexOf(filterText) === -1 ) {
        return
    }
    rows.push(
        <TableRow person={person} key={person.person_id} />
    )
 })

    return(
        <Table responsive hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}
export default Tables;
