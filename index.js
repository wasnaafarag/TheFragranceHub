const express = require('express'); //define what variable the express package is
const server = express()
const port = 7777 //port number 
server.use(express.json())
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('data.db')

server.get("/", (req, res) => {
    res.send("hello wasnaa!");

});

const createusertable = `CREATE TABLE IF NOT EXISTS user(
    ID integer primary key autoincrement, 
    name text not null, 
    age integer,
    email text not null,
    password text not null
)`

//register
server.post('/register', (req, res) => {
    let name= req.body.name;
    let age= req.body.age;
    let email=req.body.email;
    let password= req.body.password;
    db.run(`insert into user (name,age,email,password) values('${name}',${age}, '${email}', '${password}')`, (err) =>{
        if (err) {
            console.log(err.message)
            return res.send (err)
        }
        else
        return res.send ('Welcome to The Fragrance Hub!')
    })
})



server.listen(port, () => {
    console.log(`server is listening at port ${port}`)
    db.serialize(() => {
        db.exec(createusertable, (err)=>{
            if (err) {
                console.error('Error creating user table.', (err))
            } else{
                console.log('User table was created succesfully.')
            }
        })
    })

});
