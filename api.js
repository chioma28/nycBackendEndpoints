const express = require('express')
const bodyParser = require('body-parser')
var users = require('./controllers/userController')
var roles = require('./controllers/roleController')
var category = require('./controllers/categoryController')
var login = require('./controllers/loginController')
var company = require('./controllers/companyController')
var contact = require('./controllers/contactController')
var package = require('./controllers/packageController')
// const { json } = require('body-parser')
const mysql = require('mysql')


app = express();
app.use(bodyParser.json())


/*************************************** Instantiate Controllers **************************************/
// users(app)
// roles(app)
// category(app)
// login(app)
// company(app)
// package(app)
contact(app)


/**************************************** Assign port *************************************************/

app.listen(3000)
console.log('Listening at 3000')