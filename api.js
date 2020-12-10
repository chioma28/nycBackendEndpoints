const express = require('express');
const bodyParser = require('body-parser');
var users = require('./controllers/userController');
var roles = require('./controllers/roleController');
var category = require('./controllers/categoryController');
var login = require('./controllers/loginController');
var company = require('./controllers/companyController');
var permission = require('./controllers/permissionController');
var faq = require('./controllers/faqController');
var notification =  require('./controllers/notificationController');


app = express();
app.use(bodyParser());


/*************************************** Instantiate Controllers **************************************/
users(app);
roles(app);
category(app);
login(app);
company(app);
permission(app);
faq(app);
notification(app);


/**************************************** Assign port *************************************************/

app.listen(8600);
console.log('Listening at 8600');