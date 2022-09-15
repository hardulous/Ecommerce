import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut , isAutenticated } from "../../auth api";

// here this function based on path present in url will provide style to the link
const isActive = (location,path)=>{
  
    if(location.pathname===path){
        return {color:"orange"}
    }
    else{
        return {color:"white"}
    }

}

const Menu = ()=>{
    
    const navigate = useNavigate();

    const location = useLocation();  // we have access to current location in browser 

    return(

        <div>
            <ul className="nav nav-tabs bg-primary">

                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(location,'/')}>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={isActive(location,'/shop')}>Shop</Link>
                </li>

                <li className="nav-item">
                    
                    {
                        isAutenticated() && isAutenticated().user.role === 0  &&

                        <Link className="nav-link" to="/user/dashboard" style={isActive(location,'/user/dashboard')}>User dashboard</Link> 

                    }
                </li>

                <li className="nav-item">
                    
                    {
                        isAutenticated() && isAutenticated().user.role === 1  &&

                        <Link className="nav-link" to="/admin/dashboard" style={isActive(location,'/admin/dashboard')}>Admin dashboard</Link> 

                    }
                </li>

                {
                    !isAutenticated() && (

                      <>

                        <li className="nav-item">
                           <Link className="nav-link" to="/signin" style={isActive(location,'/signin')}>Signin</Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link" to="/signup" style={isActive(location,'/signup')}>Signup</Link>
                        </li>

                      </>
                    )
                }

               {

                    isAutenticated() && (

                        <>
                        <li className="nav-item">

                          <a className="nav-link" style={{cursor:'pointer',color:'white'}} 
                    
                             onClick={()=>signOut( ()=>{

                                  navigate('/signin');

                             } )} >

                                Signout

                            </a>

                        </li>
                        </>
                    )

               }
                
            </ul>
        </div>

    )

}

export default Menu
