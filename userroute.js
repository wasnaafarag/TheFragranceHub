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
