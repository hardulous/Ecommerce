const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')
const Cors = require('cors');

// ROUTERS
const AuthRoutes = require('./Routes/Auth.js');
const UserRoutes = require('./Routes/User.js');
const CategoryRoutes = require('./Routes/Category.js');
const ProductsRoutes = require('./Routes/Products.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(Cors());
app.use( [ morgan('dev'), bodyParser.urlencoded({extended:true}), bodyParser.json(), cookieParser(), expressValidator()] )

// ROUTES
app.use('/api',AuthRoutes);
app.use('/api',UserRoutes);
app.use('/api',CategoryRoutes);
app.use('/api',ProductsRoutes);

//DATABASE CONNECTION
mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    
    console.log("mongoose Connected to mongoDB")
    app.listen(PORT,()=>{
        console.log(`Server is running at port ${PORT}`)
    })

}).catch((error)=>{
    
    console.log(error)

})

// Downloading packages like npm install body-parser for parsing the data coming from client side or npm install cookie-parser which is used to parse data coming from cookie of browser since we will save user credentials in cookie or npm install morgan which is good for development that will give console log all the routes which has been requested by client 

// Downloading express validator to get error message if there is a invalid data present in request body by command npm install express-validator@5.3.1

// Downloading package jwt for sign or signup token we get by npm install express-jwt or npm install jsonwebtoken

// Now to avoid CORS error use package npm install cors basically to allow my api to be able to serve resources exist in different ORIGIN 