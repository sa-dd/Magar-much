var dboperations = require('./DB/dboperations');
var Tables = require('./DB/tables');


var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/api', router);


router.use((request, response, next) => {
    console.log('middleware');
    next();
})



// how to use this route
// http://localhost:8080/api/customers


router.route('/customers').get((request, response) => {

    dboperations.getCustomers().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})



// how to use this route
// http://localhost:8080/api/customers/1

router.route('/customers/:id').get((request,response)=>{

    
    dboperations.getCustomer(request.params.id).then(result => {
       response.json(result[0]);
    })

})

// how to use this route
// http://localhost:8080/api/customers/username/janesmith

router.route('/customers/username/:username').get((request,response)=>{

    dboperations.getCustomerUsername(request.params.username).then(result => {
       response.json(result[0]);
    })

})


// how to use this route
// http://localhost:8080/api/customers

router.route('/customers').post((request,response)=>{
    let customer = {...request.body};
    dboperations.addCustomer(customer).then(result => {
        response.status(201).json(result[0]);
    })
})


// how to use this route
// http://localhost:8080/api/customers

router.route('/customers/:id').put((request,response)=>{
    let customer = {...request.body};
    dboperations.updateCustomer(request.params.id, customer).then(result => {
        response.status(201).json(result[0]);
    })
})

// how to use this route
// http://localhost:8080/api/customers/1

router.route('/customers/:id').delete((request,response)=>{
    dboperations.deleteCustomer(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })
})





var port = process.env.PORT || 8080;
app.listen(port);
console.log('Order API is runnning at localhost:' + port);






