const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const postRoutes= require('./routes/posts');

mongoose.connect("mongodb+srv://praveen_:@cluster0-45j7x.mongodb.net/angular?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
  console.log("connected to server ");
}).catch(()=>{
  console.log("error in connection");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/posts",postRoutes);

module.exports =app;
