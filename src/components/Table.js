import React from "react"
import {Link} from "react-router-dom"
import {Table} from "reactstrap"

import "../styles/table.css"

function Tables (props) {
    let people = props.people.length !== 0?
         props.people.map((person,index)=>{
                return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{person.person_name}</td>
                            <td>{person.phonenumber}</td>
                            <td>{person.email}</td>
                            <td>{person.gender}</td>
                            <td> <Link to={`/overview/${person.person_id}`}>View</Link></td>
                        </tr>
                )
         })
         : null
    return(
            //Table
            <Table  responsive hover>
                <thead className="table-head">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {people}
                </tbody>
            </Table>
            
    )
}

export default Tables