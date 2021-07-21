const express = require("express");
const bodyParser= require('body-parser');
const ejs = require('ejs');
const mysql = require('mysql');
const PORT= process.env.PORT | 9000;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


// database
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'password',
    port: 3306,
    database: "banksystemsparkle"
});

db.connect((err) => {
  if(err){
    throw err;
  }
  else{
    console.log("connect with my sql");
  }
});

// trans



// ROUTES VIEWS
app.get("/",function(req,res){
  res.render("Home");
});
app.get("/homepage",function(req,res){
  res.render("mohit")
});
app.get("/viewcustomers",function(req,res){
  let sql ="select * from users";
  db.query(sql,(err,result)=>{
    if(!result.length){
      console.log(result);
      res.render("error");
    }
    else{
        //console.log(result);
        res.render("Customers",{customers:result});
    }
  })
});
app.get("/transfermoney",function(req,res){
  let sql ="select * from transaction";
  db.query(sql,(err,result)=>{
    if(!result.length){
      console.log(result);
      res.render("error");
    }
    else{
        //console.log(result);
        res.render("Transfer",{transfer:result});
    }
  })
});
app.post("/transaction",function(req,res){
  let sender = req.body.sender;
  let reciever = req.body.reciever;
  let amount = req.body.amount;
  let sql = 'update users set balance = balance + '+amount+ " where username = '"+reciever+"'";
  db.query(sql,(err,result) => {
});
 let sq = 'update users set balance = balance - '+amount+ " where username = '"+sender+"'";
db.query(sq,(err,result) => {
});
  let tql ="insert into transaction values(null,'"+sender+"','"+reciever+"','"+amount+"')";
  db.query(tql,(err,result) => {
});
  
  res.redirect("/viewcustomers");
});

// transaction

// app.post('/transaction', function(req, res){
//   console.log(req.body.sender);
//   console.log(req.body.reciever);
// });
;

app.listen(PORT,function(){
   console.log("server running")
});