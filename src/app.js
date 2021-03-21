require('dotenv').config();



const express = require('express')
const app = express();
const path  = require('path');
const port  =  process.env.PORT || 400 ;
const hbs = require('hbs');
const fs = require("fs");
const http = require("http");
const cookieparser = require("cookie-parser");
const auth = require("./userAuth/auth");


//const jwt = require("jsonwebtoken");

/// require the statice path of the folder here

require("./db/conn.js");
//require('./db/conn2');
const Register = require("./models/registers");


const staticPath = path.join(__dirname , "../public");
const videopath = path.join(__dirname ,"./public/videos/myvideo.mp4");
// important
//app.use(express.json());

app.use(cookieparser());
app.use(express.urlencoded({extended:false}));


app.use(express.static(staticPath));
app.set('view engine', 'hbs');
const partialsFolder = path.join(__dirname , '../templates/partials');

hbs.registerPartials(partialsFolder)

app.get('/' , (req , res) => {
   
   
    res.render('index'  );
  
    
});




app.get('/abaut' , auth, (req , res) => {
    // req.user  = req.user.username;
    res.render('abaut' , {name:`${req.user}`});
    console.log(`this is the cookie ${req.cookies.jwt}`)
});

app.get('/contact' , (req , res) => {
    res.render('contact');
});

app.get('/classes' , (req , res) => {
   

    res.render('classes');
});

app.get('/courses' ,auth, (req , res) => {
    res.render('courses' ,  );
});
app.get('/loader' , (req , res) => {
    res.render('loader'   );
});

app.get('/login' , (req , res) => {
    res.render('ok');
});

app.get('/uconstruction' , (req , res) => {
    res.render('underconstruction')
})


app.get('/massage' , (req , res) => {
    res.render('fmassenger.hbs')
})
app.get('/logout' ,auth ,  async (req , res) => {

    try {

        

        //for single logout

        req.user.tokens = req.user.tokens.filter( (elem) => {
            return elem.token !== req.token
        })



        //req.user.tokens = []; // use to log out from all devices 

       res.clearCookie("jwt");
       console.log('logout succssefully')
       await req.user.save(); 
       res.render("index")
       
    } catch (error) {

        res.status.send(error);
        
    }


    
 });

app.get('/tenth' , (req , res) => {
    const username = req.body.username;
   res.render('tenth' , {name:`${username}`})
});

app.get('/register' , (req , res) => {
    res.render('register');
});

app.get('/blogs' ,auth , async(req , res) => {
    res.render("blogs")
});

app.get('/gallery' , (req , res) => {
    res.render('gallery');
});

app.get('/userprofile' ,  auth , (req , res) => {

    const usernaeme  = req.user.username;
    const email = req.user.email
    const sms = req.user.sms;
    res.render('userprofile' , {name:`${usernaeme}` , email:email , sms:`${sms}`});
});


app.get('/addblogs' ,  (req , res) => {
    
    res.render('addblogs');
});


app.post("/addblogs" , auth , async(req , res) => {
    try {
        console.log(req.user)
        const blog = req.body.blog;
        console.log(blog)
        const newblog = await user.concat(blog);
        req.user = req.user.concat({token});
        console.log(newblog);
      

        
        await newblog.save();

        res.status(201).render("index");


        
    } catch (error) {
        res.status(401).send(error);
    }
    

   
})

app.post('/register' , async(req, res ) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword ) {
           
           const registerdperson = new Register(req.body);

           // generating a web tokens herer // 

           const token = await registerdperson.genrateAuthTokens();
           console.log("the token part is " + token );



            res.cookie("jwt" , token)

            
           await registerdperson.save();
           res.status(201).render("index")
           

        }else{
            res.render("register")
           
            
        }

        
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
})
 
app.post('/login' , async(req , res) => {

   try {
       const username = req.body.username;
       const password = req.body.password;
       
       const userdata = await Register.findOne({username:username})
       const token = await userdata.genrateAuthTokens();
       console.log(`the token is ${token}`);
       
       res.cookie("jwt" , token, {
        expires:new Date(Date.now() +90000),
        httpOnly:true
        });


   
       
       if(userdata.password === password){
           
            res.status(201).render("index", {name:`${username}`})

          
       }else{
           
           res.status(400).send("invalide details")
       }
       
       
   } catch (error) {
       res.send("invalide details");
       console.log(error)
   }
   
});


app.listen(port , (err) => {
    console.log(`listning to the port ${port}`)
});


