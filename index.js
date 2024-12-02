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
    username text not null, 
    age integer,
    email text not null,
    password text not null,
    gender text
)`

const creatquestionstable = `CREATE TABLE IF NOT EXISTS questions(
    ID integer primary key autoincrement, 
    question text,
    category text
)`

const createanswerstable = `CREATE TABLE IF NOT EXISTS answers(
    ID integer primary key autoincrement, 
    question_id int not null, 
    foreign key (question_id) references questions(ID),
    answer text, 
    preferred_scents text not null
)`

const createperfumestable = `CREATE TABLE IF NOT EXISTS perfumes(
    ID integer primary key autoincrement, 
    name text not null, 
    description text,
    type text,
    brand text,
    image text 
)`

const createrecommendationstable = `CREATE TABLE IF NOT EXISTS recommendations(
    ID integer primary key autoincrement, 
    user_id int not null,
    foreign key (user_id) references user(ID),
    perfumes_id int not null,
    foreign key (perfumes_id) references perfumes(ID)
)`


//register
server.post('/register', (req, res) => {
    let username= req.body.name;
    let age= req.body.age;
    let email=req.body.email;
    let password= req.body.password;
    db.run(`insert into user (username,age,email,password) values('${username}',${age}, '${email}', '${password}')`, (err) =>{
        if (err) {
            console.log(err.message)
            return res.send (err)
        }
        else
        return res.send ('Welcome to The Fragrance Hub!')
    })
})

server.post('/questions', (req, res) => {
    let question= req.body.question;
    let category= req.body.category;
    db.run(`insert into questions (question, category) values('${question}','${category}')`, (err) =>{
        if (err) {
            console.log(err.message)
            return res.send (err)
        }
        else
        return res.send ('Good job Wasnaa!')
    })
})


server.post('/answers', (req, res) => {
    let question_id= req.body.question_id;
    let answer= req.body.answer;
    let preferred_scents=req.body.preferred_scents;
    db.run(`insert into answers (question_id,answer,preferred_scents) values(${question_id},'${answer}', '${preferred_scents}')`, (err) =>{
        if (err) {
            console.log(err.message)
            return res.send (err)
        }
        else
        return res.send ('Good job Sona!')
    })
})


server.post('/choosescents', (req, res) => {
    let name= req.body.name;
    let description= req.body.description;
    let type=req.body.type;
    let brand= req.body.brand;
    let image= req.body.image;
    db.run(`insert into perfumes (name,description,type,brand,image) values('${name}','${description}', '${type}', '${brand}','${image}')`, (err) =>{
        if (err) {
            console.log(err.message)
            return res.send (err)
        }
        else
        return res.send ('Welcome to The Fragrance Hub!')
    })
})


server.post('/recommendations', (req, res) => {
    let user_id= req.body.user_id;
    let perfumes_id= req.body.perfumes_id;
    db.run(`insert into recommendations (user_id,perfumes_id) values(${user_id},${perfumes_id})`, (err) =>{
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

