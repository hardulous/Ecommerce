import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAutenticated } from "./index.js";

// here this component is wrapper for all those component which we want to show to only logged in user

const PrivateRoute = ( { children,...rest } )=>{
    
    const location = useLocation();
    
    if(isAutenticated() && isAutenticated().user.role === 0){
        return children
    }
    else{
        return <Navigate to ="/signin" state={{path:location.pathname}}/>
    }
    

}

export default PrivateRoute;