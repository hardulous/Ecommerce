
// Here defining the schema for each Category Document which will get stored in model or collection Category in our database , this Model basically represent category of item we are selling in ecommerce , like category of nodejs,js,programming,python etc these all are category and their books are stored in Products model whose documents also refer to any of these category 

const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    },

   

} , {timestamps:true} ); 

module.exports=mongoose.model("Category",CategorySchema);