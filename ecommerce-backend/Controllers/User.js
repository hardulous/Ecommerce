
const User = require('../Models/User.js');

// here the function used in Router.param() as callback always have additional access to Id which denote Route Parameter value
const userById = async(req,res,next,Id)=>{  

    try {

        const user = await User.findById(Id);
        if(!user){
            return res.status(400).json({error:"User not found"})
        }

       // but if user exist then we will add user information to req object and then go to next middleware
       req.profile = user
       next();     
        
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

}

// To get Loggend in user detail for profile 
const read = async (req,res)=>{

   try {
    
    // we will not send password or salf of user so
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.status(200).json(req.profile);

   } catch (error) {
      return res.status(400).json({error:error.message})
   }

}

// To update the Logged in user details
const update = async (req,res)=>{

   try {
    
    // here this $set operator will update only that field present in req.body and rest will remain as it is
    const updatedUser = await User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true})

    if(!updatedUser){
        return res.status(400).json({error:"You are not authorized to perform this action"})
    }
z
    // we will not send password or salf of user so
    updatedUser.hashed_password = undefined
    updatedUser.salt = undefined

    return res.status(200).json({message:"User has been updated",updatedUser});

   } catch (error) {
    return res.status(400).json({error:error.message})
   }

}


module.exports={

    userById,
    read,
    update,

}