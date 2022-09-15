
// THIS IS WHERE ALL THE REQUEST WHICH CONTAIN PREFIX AND BASE-URL AS /api WILL COME

const Router = require('express').Router();
const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../Controllers/Products.js')
const { requireSignin, isAuth, isAdmin } = require('../Controllers/Auth.js');
const { userById } = require('../Controllers/User.js');

Router.param("userId", userById);
Router.param("productId",productById); // simiar to userById but will add product in req object 

Router.post('/products/create/:userId', requireSignin, isAuth, isAdmin, create) // ##### /api/products/create/:userId , here by all these middleware only authenticated Admin can make new Products for a Category 

Router.get('/product/:productId' , read); // #### /api/product/:productId

Router.delete('/product/:productId/:userId/delete', requireSignin, isAuth, isAdmin, remove)  // ###### /api/product/:productId/:userId/delete , here now only authenticated admin can delete the product

Router.put('/product/:productId/:userId/update', requireSignin, isAuth, isAdmin, update)  // ###### /api/product/:productId/:userId/update , here now only authenticated admin can update the product


// ############### Now return products based on query string parameter ######################

Router.get('/products', list);
Router.get('/products/related/:productId', listRelated);
Router.get('/products/categories', listCategories);
Router.post("/products/by/search", listBySearch)    // now searching as per user query like price range or category search
Router.get('/product/photo/:productId', photo);  // now seprate request to return photo of product because it is of large size , and this photo method work like middleware for many product method 

module.exports=Router;