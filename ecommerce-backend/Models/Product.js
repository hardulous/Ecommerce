

// Here defining the schema for each Products Document which will get stored in model or collection Products in our database

const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },

    description:{
        type:String,
        required:true,
        maxlength:2000
    },

    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:2000
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,    // ## this will hold objectId of that document of model Category whose product is this 
        ref:'Category',      // now it will fill this category data from Category model objectId
        required:true,
    },

    
    quantity:{         // represent stock of a product in market , if user buy a product then this quantity property will get decrease by 1
        type:Number,
        trim:true,
        maxlength:32
    },

    sold:{           // represent how much item for this product has been sold , if user buy a product then this sold property will get increase by 1
        type:Number,
        default:0
    },

    
    photo:{                // here now photo will get stored in buffer format and retrived in string format 
        data:Buffer,
        contentType:String,
    },

    
    shipping:{            // some products might not be shippable and can be downloaded as e-Book 
        required:true,
        type:Boolean,
        default:false
        
    },

   

} , {timestamps:true} ); // this timeStamp when updation of any instance of product or other model take place then will automatically update the updatedAt field of instance 

module.exports=mongoose.model("Product",ProductsSchema);