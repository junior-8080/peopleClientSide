import React from "react"
import {Link} from "react-router-dom"
import "../styles/footer.css"

function Footer(){
    return(
        <footer className="footer">
          <p>This app is under development by &copy;Team 1Gad</p>
          <hr />
            <Link  to ="/" className="ilink"><i className="fa fa-twitter"></i></Link>
            <Link to ="/" className="ilink"><i className="fa fa-instagram"></i></Link>
            <Link  to ="/" className="ilink"><i className="fa fa-facebook"></i></Link>
        </footer>
    ) 
}
export default Footer