import React,{Component} from 'react'
import Search from './Search';
import '../styles/recepient.css';


function RecepientRow(props){
   let  rows = [];
   let recepients = props.recepients;
   let filterText = props.filterText;
   recepients.map((recepient,index)=>{
       if(recepient.person_name.indexOf(filterText) === -1){
           return
       }
        rows.push(
                <li key={index} className="recepient-list">
                       <input type="checkbox" className="check-box" onClick={(event)=> {props.check(event,recepient.phonenumber)}}/>
                       {recepient.person_name}
                </li>
        )
    })
    if(rows.length === 0){
        return(<li>No Results found</li>)
    }

    return rows
}

class Recepient extends Component{
    constructor(props){
        super(props);
        this.state = {
            filterText:""
        }    
    }
    
    handleChange = (event) => {
        this.setState({
            filterText : event.target.value
        })
    }
    render(){
        return(
            <div className="recepient-section">
                <label className="lead">People</label>
                <Search 
                filterText = {this.state.filterText}
                handleChange={this.handleChange}
                width='100%'
                />
                <ul className="recepient">
                    <RecepientRow 
                    filterText={this.state.filterText}
                    recepients = {this.props.recepient}
                    check = {this.props.check}
                    />
                </ul>
            </div>  
        )
  }
}
export default Recepient;