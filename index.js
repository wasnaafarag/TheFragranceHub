const express = require('express'); //define what variable the express package is
const server = express()
const port = 7777 //port number 
server.use(express)
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db')

server.get("/", (request, respond) => {
    response.send("hello wasnaa!");

});

const createusertable = `CREATE TABLE IF NOT EXISTS user(
    ID integer primary key autoincrement, 
    name text not null, 
    age integer,
    email text not null,
    password text not null
)`

//register
server.post('/register', (request, respond) => {
    let name= req.body.name;
    let age= req.body.age;
    let email=req.body.email;
    let password= req.body.password;
    db.run(`insert into user (name,age,email,password) values('${name}',${age}, '${email}', '${password}') `)
})


server.listen(port, () => {
    console.log(`server is listening at port ${port}`)

});
