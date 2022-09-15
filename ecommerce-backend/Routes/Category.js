
// THIS IS WHERE ALL THE REQUEST WHICH CONTAIN PREFIX AND BASE-URL AS /api WILL COME

const Router = require('express').Router();
const { create, categoryById, read, update, remove, list } = require('../Controllers/Category.js')
const { requireSignin, isAuth, isAdmin } = require('../Controllers/Auth.js');
const { userById } = require('../Controllers/User.js');

Router.param("userId", userById);
Router.param("categoryId",categoryById); // similar to userById any request which contain categoryId route parameter will first go to categoryById function

Router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create) // ##### /api/category/create , here by all these middleware only authenticated Admin can make new category 

Router.get('/category/:categoryId', read);  // ##### /api/category/:categoryId , here by these all user can see a particular category 

Router.put('/category/:categoryId/:userId/update', requireSignin, isAuth, isAdmin, update) // ##### /api/category/:categoryId/:userId/update , here by all these middleware only authenticated Admin can update the category 

Router.delete('/category/:categoryId/:userId/delete', requireSignin, isAuth, isAdmin, remove) // ##### /api/category/:categoryId/:userId/delete , here by all these middleware only authenticated Admin can delete the category 

Router.get('/categories', list);  // ##### /api/categories , here by these any user can see all categories 

module.exports=Router;