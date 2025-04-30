const express = require('express');
const app = express();

//app.get("/",(req,res)=>{
    //res.send("Hi,I am root");
//});

//Index-users
app.get("/users",(req,res)=>{
    res.send("GET for users");
});
//show-users
app.get("/users/:id",(req,res)=>{
    res.send("GET for users id");
});


//post-users
app.post("/users",(req,res)=>{
    res.send("POST for  show users");
});
//delete-users
app.delete("/users/:id",(req,res)=>{
    res.send("Delete  for users id");
});

// app.listen(8080, () => {
//     console.log('Server is listening on port 8080');
//   }).on('error', (err) => {
//     console.error('Server error:', err);
//   });
  