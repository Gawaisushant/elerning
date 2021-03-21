const jwt = require("jsonwebtoken");
const Register = require('../models/registers');

const auth = async (req , res , next) =>{

    try {
        
        const token = req.cookies.jwt ;
        const virifyuser = jwt.verify(token , process.env.SECRET_KEY)
        

        const user = await Register.findOne({_id:virifyuser._id})
        
        req.token = token ; 
        req.user = user ; 
        

        
        next();
        


    } catch (error) {
       res.status(401).render("ok");
       console.log(error)
    }


    
}


module.exports = auth ;