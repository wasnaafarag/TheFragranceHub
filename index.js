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
    gender text not null
)`

const creatquestionstable = `CREATE TABLE IF NOT EXISTS questions(
    ID integer primary key autoincrement, 
    question text,
    category text
)`

const createanswerstable = `CREATE TABLE IF NOT EXISTS answers(
    ID integer primary key autoincrement, 
    question_id int not null, 
    answer text, 
    preferred_scents text not null,
    FOREIGN KEY (question_id) REFERENCES questions(ID)
)`

const createperfumestable = `CREATE TABLE IF NOT EXISTS perfumes(
    ID integer primary key autoincrement, 
   
)`

const createrecommendationstable = `CREATE TABLE IF NOT EXISTS recommendations(
    ID integer primary key autoincrement, 
    user_id int not null,
    perfumes_id int not null,
    FOREIGN KEY (user_id) REFERENCES user(ID),
    FOREIGN KEY (perfumes_id) REFERENCES perfumes(ID)
)`



server.post('/register', (req, res) => {
    let username = req.body.username;
    let age = req.body.age;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    db.run(`insert into user (username,age,email,password,gender) values('${username}',${age}, '${email}', '${password}','${gender}')`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Welcome to The Fragrance Hub!')
    })
})

server.post('/questions', (req, res) => {
    let question = req.body.question;
    let category = req.body.category;
    db.run(`insert into questions (question, category) values('${question}','${category}')`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Good job Wasnaa!')
    })
})


server.post('/answers', (req, res) => {
    let question_id = req.body.question_id;
    let answer = req.body.answer;
    let preferred_scents = req.body.preferred_scents;
    db.run(`insert into answers (question_id,answer,preferred_scents) values(${question_id},'${answer}', '${preferred_scents}')`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Good job Sona!')
    })
})


server.post('/choosescents', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let type = req.body.type;
    let brand = req.body.brand;
    let image = req.body.image;
    db.run(`insert into perfumes (name,description,type,brand,image) values('${name}','${description}', '${type}', '${brand}','${image}')`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Welcome to The Fragrance Hub!')
    })
})


server.post('/recommendations', (req, res) => {
    let user_id = req.body.user_id;
    let perfumes_id = req.body.perfumes_id;
    db.run(`insert into recommendations (user_id,perfumes_id) values(${user_id},${perfumes_id})`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Welcome to The Fragrance Hub!')
    })
})

server.put('/register:ID/:password', (req, res) => {
    db.run(`update user set password= '${req.params.password}' where ID = ${req.params.ID}`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Edited successfully!')
    })
})



server.get('/register', (req, res) => {
    const register = `select * from user`
    db.all(register, (err, rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.json(rows)
    })
})


server.get('/choosescents', (req, res) => {
    const choosescents = `select * from choosescents`
    if (description) {
        choosescents += `where description = '${description}'`
    }
    if (type) {
        if (description) {
            choosescents += `and type = '${type}'`

        }
        else {
            choosescents += `where type = '${type}'`
        }

    }

    db.all(constregister, (err), rows => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.json(rows)
    })
})


server.get('/questions', (req, res) => {
    const questions = `select * from questions`
    db.all(questions, (err, rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.json(rows)
    })
})

server.get('/answers', (req, res) => {
    const answers = `select * from answers`
    db.all(answers, (err, rows) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.json(rows)
    })
})

server.get ('/recommendations', (req, res) => {
    const recommendations=`select * from recommendations`
    db.all(recommendations, (err, rows) =>{
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
        return res.json(rows) 
    })
    })

server.delete('/register/:ID', (req, res) => {
    db.run(`delete from user where ID= ${request.params.ID}`, (err) => {
        if (err) {
            console.log(err.message)
            return res.send(err)
        }
        else
            return res.send('Deleted successfully!')
    })
})

server.listen(port, () => {
    console.log(`server is listening at port ${port}`)
    db.serialize(() => {
        db.exec(createusertable, (err) => {
            if (err) {
                console.error('Error creating user table.', (err))
            } else {
                console.log('User table was created succesfully.')
            }
        })
        db.exec(creatquestionstable, (err) => {
            if (err) {
                console.error('Error creating user table.', (err))
            } else {
                console.log('Questions table was created succesfully.')
            }
        })
        db.exec(createanswerstable, (err) => {
            if (err) {
                console.error('Error creating user table.', (err))
            } else {
                console.log('Answers table was created succesfully.')
            }
        })
        db.exec(createperfumestable, (err) => {
            if (err) {
                console.error('Error creating user table.', (err))
            } else {
                console.log('Perfumes table was created succesfully.')
            }
        })
        db.exec(createrecommendationstable, (err) => {
            if (err) {
                console.error('Error creating user table.', (err))
            } else {
                console.log('Recommendations table was created succesfully.')
            }
        })
    })

})



