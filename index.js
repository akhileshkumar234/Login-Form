const express=require('express');
const mongoose=require('mongoose');
//const bodyParser=require('body-parser');
const { check, validationResult } = require('express-validator');
//for taking whole data 
const { matchedData, sanitizeBody } = require('express-validator');
const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

mongoose.connect('mongodb://localhost:27017/loginDetail',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
//error checking in connection
db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connection to database is successful.."));


app.post('/signUp',(req,res)=>{ //signup is same as form dir..
    var name=req.body.name;
    var email=req.body.email;
    var phoneno=req.body.phoneno;
    var collegename=req.body.collegename;
    var password=req.body.password;
    var cpassword=req.body.cpassword;

    //storing data in asingle object
    var data={
        "name" : name,
        "email" : email,
        "phoneno" : phoneno,
        "collegename" : collegename,
        "password" : password,
        "cpassword" : cpassword
    }
    
    db.collection('registeredUsers').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw err;
        }else{
            console.log("Data inserted in Database successfullt..");
        }
    });
    return res.redirect('signup_success.html');
});

app.get('/',(req,res)=>{
    res.redirect('index.html');
});

app.get('/login',async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(email);
        console.log(password);
    }catch(error){
        res.status(404).send("Invalid email");
    }
});
app.listen(3000,(req,res)=>{
    console.log("Server is running at PORT 3000......");
});

console.log("Connected to server");