import React from 'react'
import '../styles/recepient.css'

function Recepient(props){

   let recepient = props.recepient.map((recepient,index)=>{
        return(
                <li key={index} className="recepient-list">
                    <input type="checkbox" className="check-box" onClick={(event)=> {props.check(event,recepient.phonenumber)}}/>
                    {recepient.person_name}
                    </li>
        )
    })
    return(
        <div className="recepient-section">
            <label className="lead">People</label>
            {/* <input type="search" placeholder="search" /> */}
            <hr className="lead" />
            <ul className="recepient">
                {
                recepient
                }
           </ul>
        </div>  
    )
}
export default Recepient;