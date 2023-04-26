var config = require('./dbconfig');
const sql = require('mssql');



async function getCustomers() {
    try {
        let pool = await sql.connect(config);
        let customers = await pool.request().query("SELECT * from Customer");
        return customers.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}



async function getCustomer(CustomerId) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter', sql.Int, CustomerId)
            .query("SELECT * from Customer where Id = @input_parameter");
        return customer.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getCustomerUsername(username) {
    try {
        let pool = await sql.connect(config);
        let customer = await pool.request()
            .input('input_parameter', sql.NVarChar, username)
            .query("SELECT * from Customer where UserName = @input_parameter");
        return customer.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addCustomer(customer) {

    try {
        let pool = await sql.connect(config);
        let insertcustomer = await pool.request()
            .input('Name', sql.NVarChar, customer.Name)
            .input('Email', sql.NVarChar, customer.Email)
            .input('Phone', sql.NVarChar, customer.Phone)
            .input('PremiumCustomer', sql.Bit, customer.PremiumCustomer)
            .input('UserName', sql.NVarChar, customer.UserName)
            .input('Password', sql.NVarChar, customer.Password)
            .query("INSERT INTO Customer (Name, Email, Phone, PremiumCustomer, UserName, Password) VALUES (@Name, @Email, @Phone, @PremiumCustomer, @UserName, @Password)");
        return insertcustomer.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}


async function updateCustomer(id, customer) {

    try {
        let pool = await sql.connect(config);
        let updatecustomer = await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, customer.Name)
            .input('Email', sql.NVarChar, customer.Email)
            .input('Phone', sql.NVarChar, customer.Phone)
            .input('PremiumCustomer', sql.Bit, customer.PremiumCustomer)
            .input('UserName', sql.NVarChar, customer.UserName)
            .input('Password', sql.NVarChar, customer.Password)
            .query("UPDATE Customer SET Name = @Name, Email = @Email, Phone = @Phone, PremiumCustomer = @PremiumCustomer, UserName = @UserName, Password = @Password WHERE Id = @Id");
        return updatecustomer.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

async function deleteCustomer(id) {

    try {
        let pool = await sql.connect(config);
        let deletecustomer = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM Customer WHERE Id = @input_parameter");
        return deletecustomer.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}



// CREATE TABLE FoodItem (
//     ID INT PRIMARY KEY,
//     Name VARCHAR(50) NOT NULL,
//     Description VARCHAR(100),
//     Price DECIMAL(10,2) NOT NULL,
//     Image VARCHAR(100),
//     Category VARCHAR(20) NOT NULL,
//     Availability BIT NOT NULL DEFAULT 1,
//     CONSTRAINT CK_FoodItem_Price CHECK (Price >= 0)
// );

// create afucntiion to get all food items

async function getFoodItems() {
    try {
        let pool = await sql.connect(config);
        let fooditems = await pool.request().query("SELECT * from FoodItem");
        return fooditems.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// create a function to get a food item by id

async function getFoodItem(FoodItemId) {
    try {
        let pool = await sql.connect(config);
        let fooditem = await pool.request()
            .input('input_parameter', sql.Int, FoodItemId)
            .query("SELECT * from FoodItem where ID = @input_parameter");
        return fooditem.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

// create a function to add a food item

async function addFoodItem(fooditem) {

    try {
        let pool = await sql.connect(config);
        let insertfooditem = await pool.request()
            .input('Name', sql.NVarChar, fooditem.Name)
            .input('Description', sql.NVarChar, fooditem.Description)
            .input('Price', sql.Decimal(10,2), fooditem.Price)
            .input('Image', sql.NVarChar, fooditem.Image)
            .input('Category', sql.NVarChar, fooditem.Category)
            .input('Availability', sql.Bit, fooditem.Availability)
            .query("INSERT INTO FoodItem (Name, Description, Price, Image, Category, Availability) VALUES (@Name, @Description, @Price, @Image, @Category, @Availability)");
        return insertfooditem.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

// create a function to update a food item

async function updateFoodItem(id, fooditem) {

    try {
        let pool = await sql.connect(config);
        let updatefooditem = await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, fooditem.Name)
            .input('Description', sql.NVarChar, fooditem.Description)
            .input('Price', sql.Decimal(10, 2), fooditem.Price)
            .input('Image', sql.NVarChar, fooditem.Image)
            .input('Category', sql.NVarChar, fooditem.Category)
            .input('Availability', sql.Bit, fooditem.Availability)
            .query("UPDATE FoodItem SET Name = @Name, Description = @Description, Price = @Price, Image = @Image, Category = @Category, Availability = @Availability WHERE ID = @Id");

        return updatefooditem.recordsets;
    }
    catch (err) {

        console.log(err);
    }

}

// create a function to delete a food item

async function deleteFoodItem(id) {

    try {
        let pool = await sql.connect(config);
        let deletefooditem = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM FoodItem WHERE ID = @input_parameter");
        return deletefooditem.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}


// CREATE TABLE Address (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
//     StreetAddress VARCHAR(100) NOT NULL,
//     City VARCHAR(50) NOT NULL,
//     State VARCHAR(50) NOT NULL,
//     ZipCode VARCHAR(10) NOT NULL,
// );

// create a function to get all addresses

async function getAddresses() {
    try {
        let pool = await sql.connect(config);
        let addresses = await pool.request().query("SELECT * from Address");
        return addresses.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// create a function to get an address by id

async function getAddress(AddressId) {
    try {
        let pool = await sql.connect(config);
        let address = await pool.request()
            .input('input_parameter', sql.Int, AddressId)
            .query("SELECT * from Address where ID = @input_parameter");
        return address.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

// create a function to add an address

async function addAddress(address) {

    try {
        let pool = await sql.connect(config);
        let insertaddress = await pool.request()
            .input('CustomerID', sql.Int, address.CustomerID)
            .input('StreetAddress', sql.NVarChar, address.StreetAddress)
            .input('City', sql.NVarChar, address.City)
            .input('State', sql.NVarChar, address.State)
            .input('ZipCode', sql.NVarChar, address.ZipCode)
            .query("INSERT INTO Address (CustomerID, StreetAddress, City, State, ZipCode) VALUES (@CustomerID, @StreetAddress, @City, @State, @ZipCode)");

        return insertaddress.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

// create a function to update an address

async function updateAddress(id, address) {

    try {
        let pool = await sql.connect(config);
        let updateaddress = await pool.request()
            .input('Id', sql.Int, id)
            .input('CustomerID', sql.Int, address.CustomerID)
            .input('StreetAddress', sql.NVarChar, address.StreetAddress)
            .input('City', sql.NVarChar, address.City)
            .input('State', sql.NVarChar, address.State)
            .input('ZipCode', sql.NVarChar, address.ZipCode)
            .query("UPDATE Address SET CustomerID = @CustomerID, StreetAddress = @StreetAddress, City = @City, State = @State, ZipCode = @ZipCode WHERE ID = @Id");

            return updateaddress.recordsets;
    }
    catch (err) {

        console.log(err);
    }

}

// create a function to delete an address

async function deleteAddress(id) {

    try {
        let pool = await sql.connect(config);
        let deleteaddress = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM Address WHERE ID = @input_parameter");

            return deleteaddress.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}


// CREATE TABLE AreaCode (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     Code INT NOT NULL UNIQUE
// );


// function to get all area codes

async function getAreaCodes() {
    try {
        let pool = await sql.connect(config);
        let areacodes = await pool.request().query("SELECT * from AreaCode");
        return areacodes.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// function to get an area code by id

async function getAreaCode(AreaCodeId) {
    try {
        let pool = await sql.connect(config);
        let areacode = await pool.request()
            .input('input_parameter', sql.Int, AreaCodeId)
            .query("SELECT * from AreaCode where ID = @input_parameter");
        return areacode.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

// function to add an area code

async function addAreaCode(areacode) {

    try {
        let pool = await sql.connect(config);
        let insertareacode = await pool.request()
            .input('Code', sql.Int, areacode.Code)
            .query("INSERT INTO AreaCode (Code) VALUES (@Code)");

        return insertareacode.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

// function to update an area code

async function updateAreaCode(id, areacode) {

    try {
        let pool = await sql.connect(config);
        let updateareacode = await pool.request()
            .input('Id', sql.Int, id)
            .input('Code', sql.Int, areacode.Code)
            .query("UPDATE AreaCode SET Code = @Code WHERE ID = @Id");

        return updateareacode.recordsets;
    }
    catch (err) {

        console.log(err);
    }

}

// function to delete an area code

async function deleteAreaCode(id) {

    try {
        let pool = await sql.connect(config);
        let deleteareacode = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM AreaCode WHERE ID = @input_parameter");

    }
    catch (error) {
        console.log(error);
    }

}


// CREATE TABLE DeliveryBoy (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     Name VARCHAR(50) NOT NULL,
//     Phone VARCHAR(20) NOT NULL,
//     AreaCodeID INT NOT NULL FOREIGN KEY REFERENCES AreaCode(ID),
//     Availability BIT NOT NULL DEFAULT 1,
//     DeliveryCount INT NOT NULL DEFAULT 0,
//     Rating DECIMAL(10,2) NOT NULL DEFAULT 0,
//     UserName VARCHAR(50) NOT NULL UNIQUE,
//     Password VARCHAR(50) NOT NULL
// );


// function to get all deliveryboys

// crashes the server when called. why???
// TODO: fix this

async function getDeliveryBoys() {
    try {
        let pool = await sql.connect(config);
        let deliveryboys = await pool.request().query("SELECT * from DeliveryBoy");


        return deliveryboys.recordsets;


    }
    catch (error) {
        console.log(error);
    }
}

// function to get a deliveryboy by id

async function getDeliveryBoy(DeliveryBoyId) {
    try {
        let pool = await sql.connect(config);
        let deliveryboy = await pool.request()
            .input('input_parameter', sql.Int, DeliveryBoyId)
            .query("SELECT * from DeliveryBoy where ID = @input_parameter");

        return deliveryboy.recordsets;
    }
    catch (error) {
        console.log(error);
    }

}

// function to add a deliveryboy

async function addDeliveryBoy(deliveryboy) {

    try {
        let pool = await sql.connect(config);
        let insertdeliveryboy = await pool.request()
            .input('Name', sql.NVarChar, deliveryboy.Name)
            .input('Phone', sql.NVarChar, deliveryboy.Phone)
            .input('AreaCodeID', sql.Int, deliveryboy.AreaCodeID)
            .input('Availability', sql.Bit, deliveryboy.Availability)
            .input('DeliveryCount', sql.Int, deliveryboy.DeliveryCount)
            .input('Rating', sql.Decimal, deliveryboy.Rating)
            .input('UserName', sql.NVarChar, deliveryboy.UserName)
            .input('Password', sql.NVarChar, deliveryboy.Password)
            .query("INSERT INTO DeliveryBoy (Name, Phone, AreaCodeID, Availability, DeliveryCount, Rating, UserName, Password) VALUES (@Name, @Phone, @AreaCodeID, @Availability, @DeliveryCount, @Rating, @UserName, @Password)");

        
        return insertdeliveryboy.recordsets;     
    }
    catch (err) {
        console.log(err);
    }

}

// function to update a deliveryboy

async function updateDeliveryBoy(id, deliveryboy) {

    try {
        let pool = await sql.connect(config);
        let updatedeliveryboy = await pool.request()
            .input('Id', sql.Int, id)
            .input('Name', sql.NVarChar, deliveryboy.Name)
            .input('Phone', sql.NVarChar, deliveryboy.Phone)
            .input('AreaCodeID', sql.Int, deliveryboy.AreaCodeID)
            .input('Availability', sql.Bit, deliveryboy.Availability)
            .input('DeliveryCount', sql.Int, deliveryboy.DeliveryCount)
            .input('Rating', sql.Decimal, deliveryboy.Rating)
            .input('UserName', sql.NVarChar, deliveryboy.UserName)
            .input('Password', sql.NVarChar, deliveryboy.Password)
            .query("UPDATE DeliveryBoy SET Name = @Name, Phone = @Phone, AreaCodeID = @AreaCodeID, Availability = @Availability, DeliveryCount = @DeliveryCount, Rating = @Rating, UserName = @UserName, Password = @Password WHERE ID = @Id");

        return updatedeliveryboy.recordsets;
    }
    catch (err) {

        console.log(err);
    }

}

// function to delete a deliveryboy

async function deleteDeliveryBoy(id) {

    try {
        let pool = await sql.connect(config);
        let deletedeliveryboy = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM DeliveryBoy WHERE ID = @input_parameter");

        return deletedeliveryboy.recordsets;
    }
    catch (error) {
        console.log(error);
    }

}




// CREATE TABLE [Order] (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
//     DeliveryBoyID INT NOT NULL FOREIGN KEY REFERENCES DeliveryBoy(ID),
//     OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
//     DeliveryDate DATETIME,
//     TotalAmount DECIMAL(10,2) NOT NULL,
//     Status VARCHAR(20) NOT NULL,
//     PaymentMethod VARCHAR(20) NOT NULL,
//     CONSTRAINT CK_Order_TotalAmount CHECK (TotalAmount >= 0),
//     CONSTRAINT CK_Order_Status CHECK (Status IN ('Pending', 'In Progress', 'Delivered', 'Cancelled')),
//     CONSTRAINT CK_Order_PaymentMethod CHECK (PaymentMethod IN ('Cash', 'Credit Card'))
// );


//function to get all orders

async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request().query("SELECT * from [Order]");
        return orders.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//function to get an order by id

async function getOrder(OrderId) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
            .input('input_parameter', sql.Int, OrderId)
            .query("SELECT * from [Order] where ID = @input_parameter");
        return order.recordsets;

    }

    catch (error) {

        console.log(error);
    }

}

//function to add an order

async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertorder = await pool.request()
            .input('CustomerID', sql.Int, order.CustomerID)
            .input('DeliveryBoyID', sql.Int, order.DeliveryBoyID)
            .input('OrderDate', sql.DateTime, order.OrderDate)
            .input('DeliveryDate', sql.DateTime, order.DeliveryDate)
            .input('TotalAmount', sql.Decimal, order.TotalAmount)
            .input('Status', sql.NVarChar, order.Status)
            .input('PaymentMethod', sql.NVarChar, order.PaymentMethod)
            .query("INSERT INTO [Order] (CustomerID, DeliveryBoyID, OrderDate, DeliveryDate, TotalAmount, Status, PaymentMethod) VALUES (@CustomerID, @DeliveryBoyID, @OrderDate, @DeliveryDate, @TotalAmount, @Status, @PaymentMethod)");

        return insertorder.recordsets; 
    }
    catch (err) {
        console.log(err);
    }

}

//function to update an order

async function updateOrder(id, order) {

    try {
        let pool = await sql.connect(config);
        let updateorder = await pool.request()
            .input('Id', sql.Int, id)
            .input('CustomerID', sql.Int, order.CustomerID)
            .input('DeliveryBoyID', sql.Int, order.DeliveryBoyID)
            .input('OrderDate', sql.DateTime, order.OrderDate)
            .input('DeliveryDate', sql.DateTime, order.DeliveryDate)
            .input('TotalAmount', sql.Decimal, order.TotalAmount)
            .input('Status', sql.NVarChar, order.Status)
            .input('PaymentMethod', sql.NVarChar, order.PaymentMethod)
            .query("UPDATE [Order] SET CustomerID = @CustomerID, DeliveryBoyID = @DeliveryBoyID, OrderDate = @OrderDate, DeliveryDate = @DeliveryDate, TotalAmount = @TotalAmount, Status = @Status, PaymentMethod = @PaymentMethod WHERE ID = @Id");

        return updateorder.recordsets;
    }
    catch (err) {

        console.log(err);
    }

}

//function to delete an order

async function deleteOrder(id) {

    try {
        let pool = await sql.connect(config);
        let deleteorder = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM [Order] WHERE ID = @input_parameter");

        return deleteorder.recordsets;
    }
    catch (error) {
        console.log(error);
    }

}

// function to change status of an order to delivered

async function changeStatusToDelivered(id) {

    try {
        let pool = await sql.connect(config);
        let updateorder = await pool.request()
            .input('Id', sql.Int, id)
            .query("UPDATE [Order] SET Status = 'Delivered', DeliveryDate = GETDATE() WHERE ID = @Id");

        return updateorder.recordsets;

    }
    catch (error) {

        console.log(error);

    }

}

// function to change status of an order to cancelled

async function changeStatusToCancelled(id) {

    try {
        let pool = await sql.connect(config);
        let updateorder = await pool.request()
            .input('Id', sql.Int, id)
            .query("UPDATE [Order] SET Status = 'Cancelled', DeliveryDate = GETDATE() WHERE ID = @Id");

        return updateorder.recordsets;

    }
    catch (error) {

        console.log(error);

    }

}

//function to change status of an order to in progress

async function changeStatusToInProgress(id) {

    try {
        let pool = await sql.connect(config);
        let updateorder = await pool.request()
            .input('Id', sql.Int, id)
            .query("UPDATE [Order] SET Status = 'In Progress', DeliveryDate = NULL WHERE ID = @Id");

        return updateorder.recordsets;

    }

    catch (error) {

        console.log(error);

    }

}


// CREATE TABLE OrderDetails (
//     OrderID INT NOT NULL FOREIGN KEY REFERENCES [Order](ID),
//     FoodItemID INT NOT NULL FOREIGN KEY REFERENCES FoodItem(ID),
//     Quantity INT NOT NULL,
//     Price DECIMAL(10,2) NOT NULL,
//     PRIMARY KEY (OrderID, FoodItemID),
//     CONSTRAINT CK_OrderDetails_Quantity CHECK (Quantity >= 0),
//     CONSTRAINT CK_OrderDetails_Price CHECK (Price >= 0)
// );


//function to get all orderdetails

async function getOrderDetails() {
    try {
        let pool = await sql.connect(config);
        let orderdetails = await pool.request().query("SELECT * from OrderDetails");
        return orderdetails.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//function to get an orderdetail by id

async function getOrderDetail(OrderId, FoodItemId) {
    try {
        let pool = await sql.connect(config);
        let orderdetail = await pool.request()
            .input('OrderId', sql.Int, OrderId)
            .input('FoodItemId', sql.Int, FoodItemId)
            .query("SELECT * from OrderDetails where OrderID = @OrderId AND FoodItemID = @FoodItemId");
        return orderdetail.recordsets;

    }

    catch (error) {

        console.log(error);
    }

}


//function to add an orderdetail

async function addOrderDetail(orderdetail) {

    try {
        let pool = await sql.connect(config);
        let insertorderdetail = await pool.request()
            .input('OrderID', sql.Int, orderdetail.OrderID)
            .input('FoodItemID', sql.Int, orderdetail.FoodItemID)
            .input('Quantity', sql.Int, orderdetail.Quantity)
            .input('Price', sql.Decimal, orderdetail.Price)
            .query("INSERT INTO OrderDetails (OrderID, FoodItemID, Quantity, Price) VALUES (@OrderID, @FoodItemID, @Quantity, @Price)");

        return insertorderdetail.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//function to update an orderdetail

async function updateOrderDetail(OrderId, FoodItemId, orderdetail) {

    try {
        let pool = await sql.connect(config);
        let updateorderdetail = await pool.request()
            .input('OrderId', sql.Int, OrderId)
            .input('FoodItemId', sql.Int, FoodItemId)
            .input('OrderID', sql.Int, orderdetail.OrderID)
            .input('FoodItemID', sql.Int, orderdetail.FoodItemID)
            .input('Quantity', sql.Int, orderdetail.Quantity)
            .input('Price', sql.Decimal, orderdetail.Price)
            .query("UPDATE OrderDetails SET OrderID = @OrderID, FoodItemID = @FoodItemID, Quantity = @Quantity, Price = @Price WHERE OrderID = @OrderId AND FoodItemID = @FoodItemId");

        return updateorderdetail.recordsets;
    }
    catch (err) {

        console.log(err);
    }


}

//function to delete an orderdetail

async function deleteOrderDetail(OrderId, FoodItemId) {

    try {
        let pool = await sql.connect(config);
        let deleteorderdetail = await pool.request()
            .input('OrderId', sql.Int, OrderId)
            .input('FoodItemId', sql.Int, FoodItemId)
            .query("DELETE FROM OrderDetails WHERE OrderID = @OrderId AND FoodItemID = @FoodItemId");

        return deleteorderdetail.recordsets;
    }

    catch (error) {
        console.log(error);

    }

}


// CREATE TABLE AdminUser (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     UserName VARCHAR(50) NOT NULL UNIQUE,
//     Password VARCHAR(50) NOT NULL
// );


//function to get all adminusers

async function getAdminUsers() {
    try {
        let pool = await sql.connect(config);
        let adminusers = await pool.request().query("SELECT * from AdminUser");
        return adminusers.recordsets;
    }

    catch (error) {
        console.log(error);
    }

}

//function to get an adminuser by id

async function getAdminUser(id) {
    try {
        let pool = await sql.connect(config);
        let adminuser = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * from AdminUser where ID = @input_parameter");
        return adminuser.recordsets;

    }

    catch (error) {
        console.log(error);
    }

}

//function to get an adminuser by username

async function getAdminUserByUserName(username) {
    try {
        let pool = await sql.connect(config);
        let adminuser = await pool.request()
            .input('input_parameter', sql.VarChar, username)
            .query("SELECT * from AdminUser where UserName = @input_parameter");
        return adminuser.recordsets;

    }

    catch (error) {
        console.log(error);
    }

}


//function to add an adminuser

async function addAdminUser(adminuser) {

    try {
        let pool = await sql.connect(config);
        let insertadminuser = await pool.request()
            .input('UserName', sql.VarChar, adminuser.UserName)
            .input('Password', sql.VarChar, adminuser.Password)
            .query("INSERT INTO AdminUser (UserName, Password) VALUES (@UserName, @Password)");

        return insertadminuser.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//function to update an adminuser

async function updateAdminUser(id, adminuser) {

    try {
        let pool = await sql.connect(config);
        let updateadminuser = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('UserName', sql.VarChar, adminuser.UserName)
            .input('Password', sql.VarChar, adminuser.Password)
            .query("UPDATE AdminUser SET UserName = @UserName, Password = @Password WHERE ID = @input_parameter");

        return updateadminuser.recordsets;
    }
    catch (err) {

        console.log(err);
    }


}

//function to delete an adminuser

async function deleteAdminUser(id) {

    try {
        let pool = await sql.connect(config);
        let deleteadminuser = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM AdminUser WHERE ID = @input_parameter");

        return deleteadminuser.recordsets;
    }

    catch (error) {
        console.log(error);

    }

}




//function to get admin summary

async function getAdminSummary() {
    try {
        let pool = await sql.connect(config);
        let adminsummary = await pool.request().query("SELECT * from adminSummary");
        return adminsummary.recordsets;
    }

    catch (error) {
        console.log(error);
    }

}




//function to get all reviews info


async function getReviewInfo() {
    try {
        let pool = await sql.connect(config);
        let reviews = await pool.request().query("EXEC GetAllReviews");
        return reviews.recordsets;
    }

    catch (error) {
        console.log(error);
    }

}


//function to get all reviews

// CREATE TABLE Review (
//     ID INT IDENTITY(1,1) PRIMARY KEY,
//     CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
//     Rating INT NOT NULL,
//     Comment VARCHAR(500),
//     ReviewDate DATETIME NOT NULL DEFAULT GETDATE(),
//     CONSTRAINT CK_Review_Rating CHECK (Rating >= 1 AND Rating <= 5)
// );

async function getReviews() {
    try {
        let pool = await sql.connect(config);
        let reviews = await pool.request().query("SELECT * from Review");
        return reviews.recordsets;
    }

    catch (error) {
        console.log(error);
    }

}

//function to get a review by id

async function getReview(id) {
    try {
        let pool = await sql.connect(config);
        let review = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * from Review where ID = @input_parameter");
        return review.recordsets;

    }

    catch (error) {
        console.log(error);
    }

}

//function to add a review

async function addReview(review) {

    try {
        let pool = await sql.connect(config);
        let insertreview = await pool.request()
            .input('CustomerID', sql.Int, review.CustomerID)
            .input('Rating', sql.Int, review.Rating)
            .input('Comment', sql.VarChar, review.Comment)
            .query("INSERT INTO Review (CustomerID, Rating, Comment) VALUES (@CustomerID, @Rating, @Comment)");

        return insertreview.recordsets;
    }
    catch (err) {
        console.log(err);

    }


}

//function to update a review

async function updateReview(id, review) {

    try {
        let pool = await sql.connect(config);
        let updatereview = await pool.request()
            .input('input_parameter', sql.Int, id)
            .input('CustomerID', sql.Int, review.CustomerID)
            .input('Rating', sql.Int, review.Rating)
            .input('Comment', sql.VarChar, review.Comment)
            .query("UPDATE Review SET CustomerID = @CustomerID, Rating = @Rating, Comment = @Comment WHERE ID = @input_parameter");

        return updatereview.recordsets;
    }
    catch (err) {

        console.log(err);
    }

    
}

//function to delete a review

async function deleteReview(id) {

    try {
        let pool = await sql.connect(config);
        let deletereview = await pool.request()
            .input('input_parameter', sql.Int, id)
            .query("DELETE FROM Review WHERE ID = @input_parameter");

        return deletereview.recordsets;
    }

    catch (error) {
        console.log(error);

    }

}




async function takeOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertorder = await pool.request()
            .input('CustomerID', sql.Int, order.CustomerID)
            .input('OrderDate', sql.DateTime, order.OrderDate)
            .input('TotalAmount', sql.Money, order.TotalAmount)
            .input('Status', sql.VarChar, order.Status)
            .input('PaymentMethod', sql.VarChar, order.PaymentMethod)
            .query("EXEC TakeOrder @CustomerID, @OrderDate, @TotalAmount, @Status, @PaymentMethod");


        return insertorder.recordsets;
    }
    catch (err) {
        console.log(err);

    }


}




async function takeOrderDetails(orderdetails) {

    try {
        let pool = await sql.connect(config);
        let insertorderdetails = await pool.request()
            .input('OrderID', sql.Int, orderdetails.OrderID)
            .input('FoodItemID', sql.Int, orderdetails.FoodItemID)
            .input('Quantity', sql.Int, orderdetails.Quantity)
            .query("EXEC TakeOrderDetails @OrderID, @FoodItemID, @Quantity");


        return insertorderdetails.recordsets;
    }

    catch (err) {
        console.log(err);

    }


}





















module.exports =
{
    getCustomers: getCustomers,
    getCustomer: getCustomer,
    getCustomerUsername: getCustomerUsername,
    addCustomer: addCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer,
    getFoodItems: getFoodItems,
    getFoodItem: getFoodItem,
    addFoodItem: addFoodItem,
    updateFoodItem: updateFoodItem,
    deleteFoodItem: deleteFoodItem,
    getAddresses: getAddresses,
    getAddress: getAddress,
    addAddress: addAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
    getAreaCodes: getAreaCodes,
    getAreaCode: getAreaCode,
    addAreaCode: addAreaCode,
    updateAreaCode: updateAreaCode,
    deleteAreaCode: deleteAreaCode,
    getDeliveryBoys: getDeliveryBoys,
    getDeliveryBoy: getDeliveryBoy,
    addDeliveryBoy: addDeliveryBoy,
    updateDeliveryBoy: updateDeliveryBoy,
    deleteDeliveryBoy: deleteDeliveryBoy,
    getOrders: getOrders,
    getOrder: getOrder,
    addOrder: addOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    getOrderDetails: getOrderDetails,
    getOrderDetail: getOrderDetail,
    addOrderDetail: addOrderDetail,
    updateOrderDetail: updateOrderDetail,
    deleteOrderDetail: deleteOrderDetail,
    getAdminUsers: getAdminUsers,
    getAdminUser: getAdminUser,
    getAdminUserByUserName: getAdminUserByUserName,
    addAdminUser: addAdminUser,
    updateAdminUser: updateAdminUser,
    deleteAdminUser: deleteAdminUser,
    getAdminSummary: getAdminSummary,
    getReviewInfo: getReviewInfo,
    getReviews: getReviews,
    getReview: getReview,
    addReview: addReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
    takeOrder: takeOrder,
    takeOrderDetails: takeOrderDetails,
    changeStatusToDelivered: changeStatusToDelivered,
    changeStatusToCancelled: changeStatusToCancelled,
    changeStatusToInProgress: changeStatusToInProgress,




}

