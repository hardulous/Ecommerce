// THIS IS WHERE ALL THE REQUEST WHICH CONTAIN PREFIX AND BASE-URL AS /api WILL COME

const Router = require('express').Router();
const { signup , signin, signout } = require('../Controllers/Auth.js')
const {userSignupValidator} = require('../Validator/index.js')

Router.post('/signup', userSignupValidator ,signup )  // ##### /api/signup
Router.post('/signin', signin );  // ##### /api/signin 
Router.get('/signout', signout); // ####### /api/signout 

module.exports=Router;