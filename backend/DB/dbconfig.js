
const config = {
    user :'sa',
    password :'Curse321',
    server:'127.0.0.1',
    database:'RestaurantDeliveryDB',
    options:{
        trustedconnection: true,
        enableArithAbort : true,
        trustServerCertificate: true, 
        instancename :'SQLEXPRESS'
    },
    port : 1433
}

module.exports = config; 
