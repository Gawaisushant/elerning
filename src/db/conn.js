const mongoose = require('mongoose');

mongoose.connect(MONGOD_URL", {useNewUrlParser: true , useUnifiedTopology:true,useCreateIndex:true})
.then( (err) => console.log("connection successful....."))
.catch( (err) => console.log(err));
