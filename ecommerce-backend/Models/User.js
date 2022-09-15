
// HERE DEFINING THE SCHEMA FOR EACH DOCUMENTS WHICH WILL GET STORED IN MODEL OR COLLECTION USER IN OUR DATABASE 

const mongoose = require('mongoose');
const crypto = require('crypto');
const {v4 : uuidv4} = require('uuid')

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },

    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    
    hashed_password:{
        type:String,
        required:true,
    },

    about:{
        type:String,
        trim:true,
    },

    salt:{             // a long string used to generate hashed password
        type:String,
    },

    role:{           // 0 for normal authenticated user and 1 for admin 
        type:Number,
        default:0
    },

    history:{       // store user purchased items 
        type:Array,
        default:[]
    },


} , {timestamps:true} );    // here by 2nd argument in schema that is timestamps as true , now each documents will have 2 extra field which is createdAt and updatedAt

// VIRTUALS FIELD:
UserSchema.virtual('password')
.get(function(){

    return this._password;

})
.set(function(password){
    
    this._password=password; // temporary variable
    this.salt = uuidv4();  // return a random string for hashing the password
    this.hashed_password = this.encryptPassword(password);

})

// Instance Methods: to hash the password
UserSchema.methods.encryptPassword = function(password){

    if(!password) return '';

    try {
        
        return crypto.createHmac('sha1',this.salt).update(password).digest('hex')

    } catch (err) {
        
        return '';

    }

}

// Instance Methods: to check wheter request password and hashed password in database is same or not
UserSchema.methods.authenticate = function(plainPassword){

    return this.encryptPassword(plainPassword) === this.hashed_password;  

}

module.exports = mongoose.model('User',UserSchema);

// NOTE:

// here using core node.js package CRYPTO to hash the password for security and package UUID to generate unique string by npm install uuid