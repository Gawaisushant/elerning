const mongoose = require('mongoose');
const validater = require('validater');
const jwt = require("jsonwebtoken");
const userShima = new mongoose.Schema({
   

    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    username:{
        type:String,
        minlength:3
    },

    password:{
        type:String,
        minlength:3
    },

    cpassword:{
        type:String,
        minlength:3
    },

    sms:{
        type:String,
        minlength:3,

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],

 

  
});


userShima.methods.genrateAuthTokens = async function(){
    try {
       
        const token = jwt.sign({_id:this._id.toString() } ,"mynameissushantgawaiandiwasanfrontendaswellasbackenddevloper");

        this.tokens = this.tokens.concat({token});
        await this.save();
        return token ;
    } catch (error) {
        console.log("the error part" + error);
        res.send("the error part" + error)

    }
}




const Register = new mongoose.model("sangita", userShima);



module.exports = Register;
