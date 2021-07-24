const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const mysql = require('mysql')
const { json } = require('body-parser')
const PORT = 8000 
app.use(bodyParser.json())

const conn = mysql.createConnection({

    host:'localhost',
    user : 'root',
    password : '1235',
    database : 'www',
    
})

var cors = require('cors')
app.use(cors())

//create user
app.post('/api/create', (req,res)=>{

    let data = {
        
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        
    }
    let sql = "INSERT INTO users SET ?";
    conn.query(sql, data, (err, result) =>{
        if(err) throw err;
        res.send(JSON.stringify({status :200, error : null, response : "New Record added successfully "}))
    })
})

// show all records;

app.get('/api/view', (req,res)=>{
    let sql = "SELECT * from users";
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error : null, response : result}))
    })
})

// single user record by id

app.get("/api/view/:id", (req,res)=>{
    let sql = "SELECT * from users where Id="+req.params.id;
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error : null, response : result}))
    })
} )


// update the users

app.put("/api/update", (req,res)=>{
    let sql = "UPDATE users SET name='"+req.body.name+"',email='"+req.body.email+"',name='"+req.body.phonr+"' WHERE Id="+req.body.Id
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error : null, response : "record updated successfully"}))
    })
} )

// delete the user record by id
app.delete("/api/delete/:id", (req,res)=>{
    let sql = "DELETE  from users where Id="+req.params.id;
    conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({ status: 200, error : null, response : "Record deleted successfully"}))
    })
} )

app.get('')
conn.connect((err)=>{
    if(err) throw err
    console.log("Database Connection successful")
})

app.listen(PORT, ()=>{console.log("server running at port 8000")})