
// THIS IS WHERE ALL THE REQUEST WHICH CONTAIN PREFIX AND BASE-URL AS /api WILL COME

const Router = require('express').Router();
const { userById, read, update } = require('../Controllers/User.js');
const { requireSignin, isAuth, isAdmin } = require('../Controllers/Auth.js');

Router.param("userId", userById);  // here by this , routes having route parameter as /:userId then first this userById function will get execute but only those routes which comes to this js file 

// Here below Router first based on userId passed as Route parameter first get the user from DB and save it in req then it will check wheter user is logged in or not and again save logged in user id in req then it demand for wheter user detail we want to show and logged in user both are same or not and at last check wheter current logged in user is admin or not 

Router.get('/secret/:userId', requireSignin , isAuth, isAdmin, (req,res)=>{    // ##### /api/secret/:userId for admin details

    return res.status(200).json({user:req.profile,userId:req.auth});

})

Router.get('/user/:userId', requireSignin , isAuth, read)   // ####### /api/user/:userId
Router.put('/user/:userId/update', requireSignin , isAuth, update)  // ###### /api/user/:userId/update

module.exports=Router;

// To understand Router.paran() go to https://www.tutorialspoint.com/express-js-router-param-method#:~:text=router.param%20%28name%2C%20callback%29%20adds%20a%20callback%20to%20the,callback%20function%20%E2%88%92%20req%20%E2%80%93%20the%20request%20object