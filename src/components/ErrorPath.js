import React from 'react';
import { Link } from 'react-router-dom';

import notFound  from './not.svg'

const ErrorPath = () => {

    let style = {
        textAlign:'center',
        marginTop:100
    }
    let space = {
        marginBottom:50
    }
    let danger = {
        color:'red',
        marginBottom:50

    }
    return (
        <div style={style}>
            <h1 style={danger}>404 Page Not Found</h1>
            <div style={space}>
                <img src={notFound} alt="404"  width="150px" />
            </div>
            <h3 >
               <Link to='/' className="link">Home &nbsp;
                        <i class="fa fa-arrow-right"></i>
               </Link>   
            </h3>
        </div>
    );
}

export default ErrorPath;
