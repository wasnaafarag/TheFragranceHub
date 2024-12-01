const express=require('express'); //define what variable the express package is
const server=express()  
const port=7777 //port number 
server.use(express) 
const sqlite3=require('sqlite3')
const db=new sqlite3.database('data.db')
