const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./controllers/userController');
var roles = require('./controllers/roleController');
var category = require('./controllers/categoryController');
var company = require('./controllers/companyController');
var permission = require('./controllers/permissionController');
var faq = require('./controllers/faqController');
var notification =  require('./controllers/notificationController');
var payment = require('./controllers/paymentController');
var advert = require('./controllers/advertController');
// var upload = require('./controllers/uploadDocumentController');

var corsOption = {
    origin : ["https://naijayellowcatalogue.netlify.app", "http://localhost","http://localhost:8600"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    optionSuccessStatus: 200
}
app = express();
app.use(bodyParser(),cors(corsOption));


/*************************************** Instantiate Controllers **************************************/
users(app);
roles(app);
category(app);
company(app);
permission(app);
faq(app);
notification(app);
payment(app);
advert(app);
// upload(app);


/**************************************** Assign port *************************************************/

app.listen(8600);
console.log('Listening at 8600');