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
app.use('/images', express.static('images'));

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

router.route('/customers/:id').get((request, response) => {


    dboperations.getCustomer(request.params.id).then(result => {
        response.json(result[0]);
    })

})

// how to use this route
// http://localhost:8080/api/customers/username/janesmith

router.route('/customers/username/:username').get((request, response) => {

    dboperations.getCustomerUsername(request.params.username).then(result => {
        response.json(result[0]);
    })

})


// how to use this route
// http://localhost:8080/api/customers

router.route('/customers').post((request, response) => {
    let customer = { ...request.body };
    dboperations.addCustomer(customer).then(result => {
        response.status(201).json(result[0]);
    })
})


// how to use this route
// http://localhost:8080/api/customers

router.route('/customers/:id').put((request, response) => {
    let customer = { ...request.body };
    dboperations.updateCustomer(request.params.id, customer).then(result => {
        response.status(201).json(result[0]);
    })
})

// how to use this route
// http://localhost:8080/api/customers/1

router.route('/customers/:id').delete((request, response) => {
    dboperations.deleteCustomer(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })
})

// get all food items
// http://localhost:8080/api/fooditems

router.route('/fooditems').get((request, response) => {

    dboperations.getFoodItems().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get food item by id

// http://localhost:8080/api/fooditems/1

router.route('/fooditems/:id').get((request, response) => {


    dboperations.getFoodItem(request.params.id).then(result => {
        response.json(result[0]);
    })

})


// add food item

// http://localhost:8080/api/fooditems

router.route('/fooditems').post((request, response) => {
    let fooditem = { ...request.body };
    dboperations.addFoodItem(fooditem).then(result => {
        response.status(201).json(result[0]);
    })
})


// update food item

// http://localhost:8080/api/fooditems/1

router.route('/fooditems/:id').put((request, response) => {
    let fooditem = { ...request.body };
    dboperations.updateFoodItem(request.params.id, fooditem).then(result => {
        response.status(201).json(result[0]);
    })
})

// delete food item

// http://localhost:8080/api/fooditems/1

router.route('/fooditems/:id').delete((request, response) => {
    dboperations.deleteFoodItem(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})


// get all addresses

// http://localhost:8080/api/addresses

router.route('/addresses').get((request, response) => {

    dboperations.getAddresses().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get address by id

// http://localhost:8080/api/addresses/1

router.route('/addresses/:id').get((request, response) => {


    dboperations.getAddress(request.params.id).then(result => {
        response.json(result[0]);
    })

})


// add address

// http://localhost:8080/api/addresses

router.route('/addresses').post((request, response) => {
    let address = { ...request.body };
    dboperations.addAddress(address).then(result => {
        response.status(201).json(result[0]);
    })  

})


// update address

// http://localhost:8080/api/addresses/1

router.route('/addresses/:id').put((request, response) => {
    let address = { ...request.body };
    dboperations.updateAddress(request.params.id, address).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete address

// http://localhost:8080/api/addresses/1

router.route('/addresses/:id').delete((request, response) => {
    dboperations.deleteAddress(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })
})



// get all areacodes

// http://localhost:8080/api/areacodes

router.route('/areacodes').get((request, response) => {

    dboperations.getAreaCodes().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get areacode by id

// http://localhost:8080/api/areacodes/1

router.route('/areacodes/:id').get((request, response) => {


    dboperations.getAreaCode(request.params.id).then(result => {
        response.json(result[0]);
    })

})


// add areacode

// http://localhost:8080/api/areacodes

router.route('/areacodes').post((request, response) => {
    let areacode = { ...request.body };
    dboperations.addAreaCode(areacode).then(result => {
        response.status(201).json(result[0]);
    })
})


// update areacode

// http://localhost:8080/api/areacodes/1

router.route('/areacodes/:id').put((request, response) => {
    let areacode = { ...request.body };
    dboperations.updateAreaCode(request.params.id, areacode).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete areacode

// http://localhost:8080/api/areacodes/1

router.route('/areacodes/:id').delete((request, response) => {
    dboperations.deleteAreaCode(request.params.id).then(result => {
        
        //response.status(201).json(result[0]);
    })

})




// get all deliveryboys

// http://localhost:8080/api/deliveryboys

router.route('/deliveryboys').get((request, response) => {

    dboperations.getDeliveryBoys().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get deliveryboy by id

// http://localhost:8080/api/deliveryboys/1

router.route('/deliveryboys/:id').get((request, response) => {


    dboperations.getDeliveryBoy(request.params.id).then(result => {

        response.json(result[0]);

    })

})


// add deliveryboy

// http://localhost:8080/api/deliveryboys

router.route('/deliveryboys').post((request, response) => {
    let deliveryboy = { ...request.body };
    dboperations.addDeliveryBoy(deliveryboy).then(result => {
        response.status(201).json(result[0]);
    })
})


// update deliveryboy

// http://localhost:8080/api/deliveryboys/1

router.route('/deliveryboys/:id').put((request, response) => {
    let deliveryboy = { ...request.body };
    dboperations.updateDeliveryBoy(request.params.id, deliveryboy).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete deliveryboy

// http://localhost:8080/api/deliveryboys/1

router.route('/deliveryboys/:id').delete((request, response) => {
    dboperations.deleteDeliveryBoy(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})



// get all orders

// http://localhost:8080/api/orders

router.route('/orders').get((request, response) => {

    dboperations.getOrders().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get order by id

// http://localhost:8080/api/orders/1

router.route('/orders/:id').get((request, response) => {


    dboperations.getOrder(request.params.id).then(result => {
        response.json(result[0]);
    })  

})


// add order

// http://localhost:8080/api/orders

router.route('/orders').post((request, response) => {
    let order = { ...request.body };
    dboperations.addOrder(order).then(result => {
        response.status(201).json(result[0]);
    })

})


// update order

// http://localhost:8080/api/orders/1

router.route('/orders/:id').put((request, response) => {
    let order = { ...request.body };
    dboperations.updateOrder(request.params.id, order).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete order

// http://localhost:8080/api/orders/1

router.route('/orders/:id').delete((request, response) => {
    dboperations.deleteOrder(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})


// get all orderdetails

// http://localhost:8080/api/orderdetails

router.route('/orderdetails').get((request, response) => {

    dboperations.getOrderDetails().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get orderdetail by id

// http://localhost:8080/api/orderdetails/1

router.route('/orderdetails/:id').get((request, response) => {


    dboperations.getOrderDetail(request.params.id).then(result => {
        response.json(result[0]);
    })

})


// add orderdetail

// http://localhost:8080/api/orderdetails

router.route('/orderdetails').post((request, response) => {
    let orderdetail = { ...request.body };
    dboperations.addOrderDetail(orderdetail).then(result => {
        response.status(201).json(result[0]);
    })

})


// update orderdetail

// http://localhost:8080/api/orderdetails/1

router.route('/orderdetails/:id').put((request, response) => {
    let orderdetail = { ...request.body };
    dboperations.updateOrderDetail(request.params.id, orderdetail).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete orderdetail

// http://localhost:8080/api/orderdetails/1

router.route('/orderdetails/:id').delete((request, response) => {

    dboperations.deleteOrderDetail(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})


// get all admins

// http://localhost:8080/api/admins

router.route('/admins').get((request, response) => {

    dboperations.getAdminUsers().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


// get admin by id

// http://localhost:8080/api/admins/1

router.route('/admins/:id').get((request, response) => {


    dboperations.getAdminUser(request.params.id).then(result => {
        response.json(result[0]);
    })

})


// get admin by username

// http://localhost:8080/api/admins/username/admin

router.route('/admins/username/:username').get((request, response) => {


    dboperations.getAdminUserByUserName(request.params.username).then(result => {
        response.json(result[0]);
    })

})


// add admin

// http://localhost:8080/api/admins

router.route('/admins').post((request, response) => {
    let admin = { ...request.body };
    dboperations.addAdminUser(admin).then(result => {
        response.status(201).json(result[0]);
    })

})


// update admin

// http://localhost:8080/api/admins/1

router.route('/admins/:id').put((request, response) => {
    let admin = { ...request.body };
    dboperations.updateAdminUser(request.params.id, admin).then(result => {
        response.status(201).json(result[0]);
    })
})


// delete admin

// http://localhost:8080/api/admins/1

router.route('/admins/:id').delete((request, response) => {

    dboperations.deleteAdminUser(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})


// get admin summary

// http://localhost:8080/api/adminsummary

router.route('/adminsummary').get((request, response) => {

    dboperations.getAdminSummary().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})




//get review info

// http://localhost:8080/api/getreviews

router.route('/getreviews').get((request, response) => {

    dboperations.getReviewInfo().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})



//get reviews

// http://localhost:8080/api/reviews

router.route('/reviews').get((request, response) => {

    dboperations.getReviews().then(result => {
        //console.log(result);
        response.json(result[0]);
    })

})


//get review by id

// http://localhost:8080/api/reviews/1

router.route('/reviews/:id').get((request, response) => {


    dboperations.getReview(request.params.id).then(result => {
        response.json(result[0]);
    })

})


//add review

// http://localhost:8080/api/reviews

router.route('/reviews').post((request, response) => {
    let review = { ...request.body };
    dboperations.addReview(review).then(result => {
        response.status(201).json(result[0]);
    })

})


//update review

// http://localhost:8080/api/reviews/1

router.route('/reviews/:id').put((request, response) => {
    let review = { ...request.body };
    dboperations.updateReview(request.params.id, review).then(result => {
        response.status(201).json(result[0]);
    })
})


//delete review

// http://localhost:8080/api/reviews/1

router.route('/reviews/:id').delete((request, response) => {

    dboperations.deleteReview(request.params.id).then(result => {
        response.status(201).json(result[0]);
    })

})


//take order

// http://localhost:8080/api/takeorder

router.route('/takeorder').post((request, response) => {
    let order = { ...request.body };
    dboperations.takeOrder(order).then(result => {
        response.status(201).json(result[0]);
    })

})

// take order detail

// http://localhost:8080/api/takeorderdetail

router.route('/takeorderdetail').post((request, response) => {
    let orderdetail = { ...request.body };
    dboperations.takeOrderDetail(orderdetail).then(result => {
        response.status(201).json(result[0]);
    })

})


























var port = process.env.PORT || 8080;
app.listen(port);
console.log('Order API is runnning at http://localhost:' + port);






