const express=require('express')
const app=express()
const cors=require('cors')
const {Pool}=require('pg')
app.use(express.json())
app.use(cors())

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'happy@2609',
    port:5432,
    database:'form'
})

app.post('/',async(req,res)=>{
    const {Firstname,Lastname,email,phoneNumber,dob,gender,address,city,state,zip,country}=req.body;
    console.log(999);
    try{
        const k=await pool.query('insert into users (Firstname,Lastname,mailid,phoneNumber,dob,gender,addressline,city,state,zip,country) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *',[Firstname,Lastname,email,phoneNumber,dob,gender,address,city,state,zip,country])
        console.log(k.rows);  
    }
    catch(err){
        console.error(err);
    }
    
   
    res.json({msg:"success"})
})
app.get('/',async(req,res)=>{
    try{
        const data=await pool.query('select * from users'); 
        res.json(data.rows)}
        catch(err){
            console.log(err);
        } 
})
app.listen(3000,(req,res)=>{
    console.log("Server is listening to port 3000...");
})


