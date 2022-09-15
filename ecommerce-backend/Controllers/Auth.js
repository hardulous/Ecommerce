// THIS IS WHERE ACTUAL OPERATION IS WORKING LIKE QUERY FROM DATABASE FUNCTIONS

const User = require('../Models/User.js');
const {errorHandler} = require('../Helpers/dbErrorHandler.js');
const jwt = require('jsonwebtoken');      // to generate a signed token
const {expressjwt: expressJwt} = require('express-jwt');  // for authorization check 
const dotenv = require('dotenv')

dotenv.config(); // now i can use JWT_SECRET

// 1. USER SIGN-UP
const signup = async (req,res)=>{
    
   try { 
    
    // creating a user and saving in database
    console.log("req body is",req.body);
    const user = new User(req.body); 
    await user.save();
   
    if(user){
        
        // removing salt and hashed_password property to not be send to client as request
        user.salt = undefined;
        user.hashed_password=undefined;

        return res.status(201).json({user});
    }

   } catch (error) {
    
    // now we will send only err message not complete error object to client
    return res.status(404).json({

        error:errorHandler({err:error,errmsg:error.message})
        
    });

   }
    
}

// 2. USER SIGN-IN
const signin = async (req,res)=>{
    
    try {
        
        // checking wheter user with this email exist or not
        console.log("req body is",req.body);
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        // user with email does not exist so return can not sign in
        if(!user){
            return res.status(400).json({error:"User with this email does not exist. Please signup"})
        }
        
        // if come here means user with email exist

        // now checking wheter user request password is same as hashed password present in database
        if( !user.authenticate(password) ){
            return res.status(400).json({error:"Email and Password don't match"})
        }

        // now generating a jwt token to pass in client as response
        const token = jwt.sign( { _id : user._id } , process.env.JWT_SECRET )
        
        // now creating a cookie name 't' with value as token some expiry date
        res.cookie('t',token,{expire:new Date()+9999})
        
        // now sending response to client
        const {_id,name,role} = user

        return res.status(200).json({token,user:{_id,name,email,role}});
        
        

    } catch (error) {
        return res.status(404).json({

            error:errorHandler({err:error,errmsg:error.message})
            
        });
    }

}

// 3. USER SIGN-OUT
const signout = async (req,res)=>{

   // all we need to do just clear the cookie from res we have set when signed in
   res.clearCookie('t');

   return res.status(200).json({message:"Signout success"});

}

// 4. USER PROTECTED ROUTE : FOR ONLY LOGGED IN USER , to make this expressJwt() work must install cookie parser package , basically this expressJwt() method look for request.header property called Authorization which contain token in the format of always "bearer token" , and from this it will decode the token and add in my req.auth property for use 
const requireSignin = expressJwt({

    secret : process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",

})

// 5. Middleware to check whether the user detail we want is actually the user who is currently logged in
const isAuth = async(req,res,next)=>{

    let user = req.profile && req.auth && req.profile._id == req.auth._id

    // it is false means the logged in user trying to get the details of other user who are no logged in currently
    if(!user){
      return  res.status(403).json({error:"Access denied"})
    }

    // if come here means logged in user and user detail wew want both are same user
    next()
}

// 6. Middleware to check wheter current user detail we got that user is admin or not
const isAdmin = async(req,res,next)=>{
    
    // 0 means regular user and 1 means admin
    if(req.profile.role===0){
        return res.status(403).json({error:"Admin resource! Access denied"})
    }
    
    // if come here means user is admin
    next();
}

module.exports={
    
    signup,
    signin,
    signout,
    requireSignin,
    isAuth,
    isAdmin,

};

// to understand about res.cookie() go to https://www.geeksforgeeks.org/express-js-res-cookie-function/

// cookie are always saved in server where your backend is present not in client so if u want to save in client then first send this cookie as response then save in any file EX: https://stackoverflow.com/questions/61694992/res-cookie-ist-not-saved-in-the-browser

// if u want to see the cookie first go to server in browser that is like http://localhost:8000/api/signout and in there go to search bar of browser on the left most side there is 'i' icon present just click on it and it contain your cookie 

// basically this expressJwt() is a function which takes a secret which is used to sign and create a jwt token and using this secret it will automatically attach the decoded payload data to req.user and if secret used for token is false then it will return error , with the help of userProperty key we can name with what field of req does this decoded payload will get attached to

// to understand more go to https://javascript.plainenglish.io/verifying-json-web-tokens-with-express-jwt-1ae147aa9bd3