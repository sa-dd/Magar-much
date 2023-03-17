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








module.exports = 
{
    getCustomers: getCustomers,
    getCustomer: getCustomer,
    getCustomerUsername: getCustomerUsername,
    addCustomer: addCustomer,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
}

