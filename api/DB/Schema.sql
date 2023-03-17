
USE master;
GO

IF EXISTS (
    SELECT *
    FROM sys.databases
    WHERE name = 'RestaurantDeliveryDB'
)
BEGIN
    DROP DATABASE RestaurantDeliveryDB;
END
GO

CREATE DATABASE RestaurantDeliveryDB;
GO

USE RestaurantDeliveryDB;
GO

CREATE TABLE FoodItem (
    ID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(100),
    Price DECIMAL(10,2) NOT NULL,
    Image VARCHAR(100),
    Category VARCHAR(20) NOT NULL,
    Availability BIT NOT NULL DEFAULT 1,
    CONSTRAINT CK_FoodItem_Price CHECK (Price >= 0)
);
GO

CREATE TABLE Customer (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(50),
    Phone VARCHAR(20) NOT NULL,
    PremiumCustomer BIT NOT NULL,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL
);
GO

CREATE TABLE Address (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    ZipCode VARCHAR(10) NOT NULL,
);
GO


CREATE TABLE AreaCode (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Code INT NOT NULL UNIQUE
);
GO

CREATE TABLE DeliveryBoy (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    AreaCodeID INT NOT NULL FOREIGN KEY REFERENCES AreaCode(ID),
    Availability BIT NOT NULL DEFAULT 1,
    DeliveryCount INT NOT NULL DEFAULT 0,
    Rating DECIMAL(10,2) NOT NULL DEFAULT 0,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL
);
GO



CREATE TABLE [Order] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
    DeliveryBoyID INT NOT NULL FOREIGN KEY REFERENCES DeliveryBoy(ID),
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    DeliveryDate DATETIME,
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status VARCHAR(20) NOT NULL,
    PaymentMethod VARCHAR(20) NOT NULL,
    CONSTRAINT CK_Order_TotalAmount CHECK (TotalAmount >= 0),
    CONSTRAINT CK_Order_Status CHECK (Status IN ('Pending', 'In Progress', 'Delivered', 'Cancelled')),
    CONSTRAINT CK_Order_PaymentMethod CHECK (PaymentMethod IN ('Cash', 'Credit Card'))
);
GO

CREATE TABLE OrderDetails (
    OrderID INT NOT NULL FOREIGN KEY REFERENCES [Order](ID),
    FoodItemID INT NOT NULL FOREIGN KEY REFERENCES FoodItem(ID),
    Quantity INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (OrderID, FoodItemID),
    CONSTRAINT CK_OrderDetails_Quantity CHECK (Quantity >= 0),
    CONSTRAINT CK_OrderDetails_Price CHECK (Price >= 0)
);
GO

CREATE TABLE AdminUser (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL
);
GO



-- test data


-- Inserting AreaCode values
INSERT INTO AreaCode (Code)
VALUES (12345), (67890);

-- Inserting Customer values
INSERT INTO Customer (Name, Email, Phone, PremiumCustomer, UserName, Password)
VALUES ('John Doe', 'johndoe@example.com', '555-123-4567', 0, 'johndoe', 'password'),
       ('Jane Smith', 'janesmith@example.com', '555-234-5678', 1, 'janesmith', 'password'),
       ('Bob Johnson', 'bobjohnson@example.com', '555-345-6789', 0, 'bobjohnson', 'password');

-- Inserting Address values
INSERT INTO Address (CustomerID, StreetAddress, City, State, ZipCode)
VALUES (1, '123 Main St', 'Anytown', 'CA', '12345'),
       (2, '456 Elm St', 'Othertown', 'NY', '67890'),
       (3, '789 Oak St', 'Somewhere', 'TX', '54321');

-- Inserting DeliveryBoy values
INSERT INTO DeliveryBoy (Name, Phone, AreaCodeID, Availability, DeliveryCount, Rating, UserName, Password)
VALUES ('Mike Williams', '555-111-2222', 1, 1, 0, 4.5, 'mikew', 'password'),
       ('Sara Lee', '555-222-3333', 2, 1, 0, 4.8, 'saral', 'password'),
       ('Tom Smith', '555-333-4444', 1, 1, 0, 4.2, 'tomsmith', 'password');

-- Inserting FoodItem values
INSERT INTO FoodItem (ID, Name, Description, Price, Image, Category, Availability)
VALUES (1, 'Cheeseburger', 'Juicy beef patty with melted cheese and toppings', 8.99, '/images/cheeseburger.jpg', 'Entree', 1),
       (2, 'Fries', 'Crispy golden fries', 2.99, '/images/fries.jpg', 'Side', 1),
       (3, 'Soft Drink', 'Refreshing soda', 1.99, '/images/soda.jpg', 'Beverage', 1),
       (4, 'Chicken Sandwich', 'Grilled chicken breast with lettuce, tomato, and mayo', 9.99, '/images/chickensandwich.jpg', 'Entree', 1),
       (5, 'Onion Rings', 'Crispy battered onion rings', 3.99, '/images/onionrings.jpg', 'Side', 1);

-- Inserting Order values
INSERT INTO [Order] (CustomerID, DeliveryBoyID, OrderDate, DeliveryDate, TotalAmount, Status, PaymentMethod)
VALUES (1, 2, '2022-03-08 12:00:00', '2022-03-08 12:45:00', 12.97, 'Delivered', 'Credit Card'),
       (2, 1, '2022-03-08 14:00:00', '2022-03-08 14:30:00', 22.97, 'Delivered', 'Cash'),
       (3, 3, '2022-03-08 18:00:00', NULL, 15.97, 'Pending', 'Credit Card');


-- Inserting OrderDetail values
INSERT INTO OrderDetails (OrderID, FoodItemID, Quantity, Price)
VALUES (1, 1, 1, 8.99),
(1, 2, 2, 2.99),
(1, 3, 1, 1.99),
(2, 4, 1, 9.99),
(2, 5, 2, 3.99),
(3, 1, 1, 8.99),
(3, 2, 1, 2.99),
(3, 5, 1, 3.99);


-- Inserting AdminUser values
INSERT INTO AdminUser (UserName, Password)
VALUES ('admin', '123456');







-- Procedures

-- 








--ROUGH WORK

-- Print all tables in the database
SELECT * FROM sys.tables;

SELECT * FROM Customer;
SELECT * FROM Address;
SELECT * FROM DeliveryBoy;
SELECT * FROM AreaCode;
SELECT * FROM FoodItem;
SELECT * FROM [Order];
SELECT * FROM OrderDetails;
SELECT * FROM AdminUser;

--SUMMARY

SELECT * FROM Customer
INNER JOIN Address ON Customer.ID = Address.CustomerID
INNER JOIN [Order] ON Customer.ID = [Order].CustomerID
INNER JOIN OrderDetails ON [Order].ID = OrderDetails.OrderID
INNER JOIN FoodItem ON OrderDetails.FoodItemID = FoodItem.ID
INNER JOIN DeliveryBoy ON [Order].DeliveryBoyID = DeliveryBoy.ID
INNER JOIN AreaCode ON DeliveryBoy.AreaCodeID = AreaCode.ID;






--delete all tables
DROP TABLE OrderDetails;
DROP TABLE [Order];
DROP TABLE DeliveryBoy;
DROP TABLE AreaCode;
DROP TABLE Customer;
DROP TABLE FoodItem;

--delete database
DROP DATABASE RestaurantDeliveryDB;



-- query to find sql server tcp port and instance name and ip address
SELECT * FROM sys.dm_exec_connections;

-- set tcp port and instance name and ip address
EXEC sp_configure 'show advanced options', 1;

-- revert changes
EXEC sp_configure 'show advanced options', 0;





SELECT DISTINCT local_net_address, local_tcp_port FROM sys.dm_exec_connections;






SELECT  
   CONNECTIONPROPERTY('net_transport') AS net_transport,
   CONNECTIONPROPERTY('protocol_type') AS protocol_type,
   CONNECTIONPROPERTY('auth_scheme') AS auth_scheme,
   CONNECTIONPROPERTY('local_net_address') AS local_net_address,
   CONNECTIONPROPERTY('local_tcp_port') AS local_tcp_port,
   CONNECTIONPROPERTY('client_net_address') AS client_net_address 
