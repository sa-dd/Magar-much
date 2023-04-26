
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
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(1000),
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
INSERT INTO FoodItem (Name, Description, Price, Image, Category, Availability)
VALUES ('Halal Bacon and Egg on Turkish', 'Start your morning with better brekky. Try our NEW Bacon & Egg Turkish Brekky Roll, with premium bacon, BBQ sauce, freshly cracked egg and cheese on a toasted Turkish roll. ', 8.99, '/images/sec6.png', 'Breakfast', 10),
       ('Sausage And Egg On Turkish', 'Start your morning with better brekky. Try our NEW Sausage & Egg Turkish Brekky Roll, with a sausage patty, BBQ sauce, freshly cracked egg and cheese on a toasted Turkish roll. ', 8.99, '/images/b1.png', 'Breakfast', 10),
        ('Munchh Brekky Roll', 'Start your morning on a roll with better brekky. Try our Jack’s Brekky Roll, with a sausage patty, premium bacon, freshly cracked egg, BBQ sauce and melted cheese on a buttery brioche bun.  ', 8.99, '/images/b3.png', 'Breakfast', 10),
       ('BBQ Brekky Wrap', 'Heres a great reason to spring out of bed. The awesome combination of a freshly cracked egg, flame-grilled sausage patty, premium eye bacon, cheese and BBQ sauce on a warm toasted tortilla wrap.  ', 5.99, '/images/b4.png', 'Breakfast', 10),
       ('2 Pancakes', 'Good morning, morning, morning. Two fluffy golden-brown pancakes that sit up and say eat me, dripping in a sweet maple flavoured syrup. Served with a side of butter.  ', 7.99, '/images/b5.png', 'Breakfast', 1),
       ('Halal Ham And Cheese Toastie', 'Start the morning with a Munchh Ham and Cheese Toastie. Premium Shaved Ham and Melted Cheese = A perfect combination. Not available on delivery.  ', 3.99, '/images/b6.png', 'Breakfast', 1),
       ('Halal Ham Cheese And Tomato Toastie', ' Need a quick bite? Try the Munchh Ham, Cheese and Tomato Toastie. Premium Shaved Ham, Melted Cheese and ripe tomato in a lightly toasted sandwich. Not available on delivery. ', 4.99, '/images/b2.png', 'Breakfast', 1),
       ('3 Munch Fried Chicken Boneless Pieces', 'Tender, Juicy, 100% Aussie Boneless Chicken Breast pieces. Choose from our delicious dipping sauces Aioli, BBQ, Spicy, or Sweet n Sour sauce.', 8.99, '/images/f1.png', 'Sides', 10),
       ('5 Munch Fried Chicken Boneless Pieces', 'Tender, Juicy, 100% Aussie Boneless Chicken Breast pieces. Choose from our delicious dipping sauces Aioli, BBQ, Spicy, or Sweet n Sour sauce.', 8.99, '/images/f2.png', 'Sides', 10),
       ('Thick Cut Chips', 'Our thick cut chips are deliciously seasoned, delivering a crispier crunch on the outside, fluffy and hot on the inside. The chips are better at Magar Munchh. Available in Small, Medium or Large. ', 3.99, '/images/s1.png', 'Sides', 10),
       ('Battered Onion Rings', 'A Magar Munchh favourite you will be crying over if you miss them! Freshly battered, crispy onion rings available in Medium or Large. ', 3.99, '/images/s2.png', 'Sides', 10),
       ('3 Nuggets & Chips Carry Cup', 'Grab a snack with our 3 Nuggets & Chips Carry Cup. Crispy, golden nuggets made with 100% chicken breast, cooked in sunflower and canola oil for a better tasting golden finish. Our thick cut chips are deliciously seasoned, delivering a crispier crunch on the outside, fluffy and hot on the inside. The perfect snack when you’re on the go. Not available on delivery. ', 4.99, '/images/s3.png', 'Sides', 10),
       ('3 Nuggets & Sauce', 'Crispy, golden nuggets made with 100% chicken breast, cooked in sunflower and canola oil for a better tasting golden finish. Our nuggets are as good as gold. Choose from our delicious dipping sauces aioli, BBQ, Spicy, or Sweet n Sour sauce. ', 1.99, '/images/s5.png', 'Sides', 10),
       ('6 Nuggets & Sauce', 'Crispy, golden nuggets made with 100% chicken breast, cooked in sunflower and canola oil for a better tasting golden finish. Our nuggets are as good as gold. Choose from our delicious dipping sauces aioli, BBQ, Spicy, or Sweet n Sour sauce. ', 2.99, '/images/s6.png', 'Sides', 10),
       ('12 Nuggets & Sauces', 'Crispy, golden nuggets made with 100% chicken breast, cooked in sunflower and canola oil for a better tasting golden finish. Our nuggets are as good as gold. Choose from our delicious dipping sauces aioli, BBQ, Spicy, or Sweet n Sour sauce. ', 6.99, '/images/s7.png', 'Sides', 10),
       ('18 Nuggets & Sauces', 'Your favourite thirst-quenching Coke®. Available in Small, Medium or Large.  ', 1.99, '/images/d1.png', 'Drinks', 10),
     ('Coke® No Sugar', 'Your favourite thirst-quenching Coke®. Available in Small, Medium or Large. ', 1.99, '/images/d2.png', 'Drinks', 10),
       ('Sprite®', 'Let Sprite® refresh your day with the great taste of lemon-lime. ', 1.99, '/images/d3.png', 'Drinks', 10),
       ('Fanta® Orange', 'Enjoy the tingly, fruity orange taste. Available in Small, Medium or Large. ', 1.99, '/images/d4.png', 'Drinks', 10),
       ('Fanta® Raspberry', 'A refreshing, sparkling soft drink busting with delicious raspberry flavour. Available in Small, Medium or Large. Not available on delivery. ', 1.99, '/images/d5.png', 'Drinks', 10),
       ('Orange Juice', 'Our orange juice brings the authentic taste of Australias best to you each day. Available in Small, Medium or Large. ', 1.99, '/images/d10.png', 'Drinks', 10),
       ('Keri® Apple Juice', 'Keri® Apple Juice is made in Australia from 100% Australian ingredients, no added sugar and preservative free. (Keri is a registered trademark of the Coca-Cola Company).  ', 3.99, '/images/d11.png', 'Drinks', 10),
         ('Mount Franklin® Spring Water', 'Need a hydration top up? We have Australias favourite water brand, Mount Franklin® Spring Water, available in store. ', 1.99, '/images/d6.png', 'Drinks', 10),
       ('Chocolate Shake', 'Try our delicious rich chocolate milk shake - made from Australian milk and infused with a deliciously rich chocolate syrup. Available in Small, Medium or Large. ', 2.99, '/images/d7.png', 'Drinks', 10),
       ('Caramel Shake', 'Our creamy delicious caramel shake will have you coming back for more. Soft waves of frozen milk and cream infused with a rich caramel flavoured syrup. So thick and creamy it almost doesnt make it up the straw. Available in Small, Medium or Large. ', 2.99, '/images/d8.png', 'Drinks', 10),
         ('Cappuccino', 'The coffee drinkers favourite the world over. Available from a Munchh Cafe near you, the Cappuccino features an aromatic shot of espresso and steamed milk with a light, silky froth thats topped with a delicious sprinkle of chocolate. ', 3.99, '/images/mc1.png', 'Cafe', 10),
       ('Long Black', 'Available from a Jack’s Cafe near you, the long black features a double shot of our award-winning espresso blend, producing a thick layer of crema with a dash of hot water. ', 3.99, '/images/mc2.png', 'Cafe', 10),
       ('Mocha', 'Available from a Jack’s Cafe near you, the mocha features an aromatic shot of espresso, freshly steamed milk and chocolate powder. ', 3.99, '/images/mc3.png', 'Cafe', 10),
       ('Hot Chocolate', 'Available from a Jack’s Cafe near you, the hot chocolate is an indulgent, coffee-free alternative made with your choice of freshly steamed full cream, skim, soy, almond, oat or lactose-free milk and a rich, chocolate powder. ', 3.99, '/images/mc4.png', 'Cafe', 10),
       ('Short Black', 'Available from a Jack’s Cafe near you, the short black has a bold flavour profile and offers a more concentrated coffee option than the long black. ', 2.99, '/images/mc5.png', 'Cafe', 10),
       ('Iced Long Black', 'Available from a Jack’s Cafe near you, the iced long black features a double shot of our award-winning espresso blend poured over chilled water and ice. Add brown sugar popping pearls to your barista made iced drink.', 3.99, '/images/mc6.png', 'Cafe', 10),
       ('Iced Coffee', 'Available from a Jack’s Cafe near you, our iced coffee features a shot of espresso poured over ice and your choice of full cream, skim, soy, almond, oat or lactose-free milk before being topped with cream and a dusting of chocolate powder', 3.99, '/images/mc7.png', 'Cafe', 10),
       ('Iced Chocolate', 'Available from a Jack’s Cafe near you, our iced chocolate is a delicious blend of your choice of full cream, skim, soy, almond, oat or lactose-free milk with a rich chocolate syrup poured over ice and topped with whipped cream.', 3.99, '/images/mc8.png', 'Cafe', 10),
       ('Iced Chai', 'Available from a Jack’s Cafe near you, our Iced Chai combines freshly steamed milk and rich, aromatic chai flavours poured over ice.', 3.99, '/images/mc9.png', 'Cafe', 10),
         ('Family Bundle Small', 'Treat the family and enjoy two 100% Aussie beef flame-grilled Whoppers®, two Cheeseburgers, ten crispy golden nuggets made with 100% chicken breast + two ketchup sauces, four small thick cut chips and four small soft drinks.', 8.99, '/images/bnd1.png', 'Bundles', 10),
       ('Family Bundle Medium ', 'Treat the family and enjoy two 100% Aussie beef flame-grilled Whoppers®, two Cheeseburgers, ten crispy golden nuggets made with 100% chicken breast + two ketchup sauces, four medium thick cut chips and four medium soft drinks.', 10.99, '/images/bnd2.png', 'Bundles', 10),
       ('Carolina Whopper®Hunger Tamers', 'Enjoy the new Carolina Whopper Hunger Tamers. It includes a Carolina Whopper, a BBQ Cheeseburger, medium thick cut chips, three 100% chicken breast nuggets and a medium Coke.', 7.99, '/images/bnd3.png', 'Bundles', 10),
       ('Munchh Fried Chicken Hunger Tamers', 'Enjoy the new Big, thick, crunchy and juicy Classic Fried Chicken Burger with medium thick cut chips, three 100% chicken breast nuggets, one Chicken Royale burger and a medium Coke. ', 8.99, '/images/bnd4.png', 'Bundles', 10),
       ('Whopper® Cheese Hunger Tamers', 'Satisfy your hunger with the Hungry Jack’s Whopper® Cheese Hunger Tamers. It includes one Whopper® Cheese, one BBQ Cheeseburger, both with 100% Aussie, flame-grilled beef.', 8.99, '/images/bnd5.png', 'Bundles', 10),
       ('Grilled Chicken Bacon & Cheese Hunger Tamers', 'Enjoy our succulent flame-grilled breast fillet Chicken burger with Bacon & Cheese, plus a Chicken Royale made from 100% chicken breast. Teamed up with medium thick cut chips, three 100% chicken breast nuggets and a medium Coke. ', 8.99, '/images/bnd6.png', 'Bundles', 10),
       ('Triple Cheeseburger Super Stunner', 'Triple the satisfaction. 5 awesome items including our flame-grilled 100% Aussie beef Triple Cheeseburger, small thick cut chips, small Coke®, Peters Drumstick® Mini ice-cream and three 100% chicken breast nuggets. ', 9.99, '/images/bnd7.png', 'Bundles', 10),
       ('Bacon Deluxe™ Hunger Tamers', 'Love bacon and ravenous? Try the Munchh Deluxe™ Tamers! It comes with one 100% Aussie beef flame-grilled Bacon Deluxe burger, one 100% Aussie beef, flame-grilled BBQ Cheeseburger, one medium thick cut chips, three 100% chicken breast nuggets and a medium Coke. ', 9.99, '/images/bnd8.png', 'Bundles', 10),
      ('3 Munch Fried Chicken Boneless Pieces', 'Tender, Juicy, 100% Aussie Boneless Chicken Breast pieces. Choose from our delicious dipping sauces Aioli, BBQ, Spicy, or Sweet n Sour sauce.', 8.99, '/images/f1.png', 'Featured', 10),
       ('5 Munch Fried Chicken Boneless Pieces', 'Tender, Juicy, 100% Aussie Boneless Chicken Breast pieces. Choose from our delicious dipping sauces Aioli, BBQ, Spicy, or Sweet n Sour sauce.', 8.99, '/images/f2.png', 'Featured', 10),
       ('Carolina Whopper®', '100% flame-grilled Aussie beef topped with melted cheese, double premium eye bacon, Tangy Carolina BBQ Sauce, Crispy Onions, mayo, lettuce and tomato on a toasted sesame seed bun. s', 8.99, '/images/f3.png', 'Featured', 1),
       ('Double Carolina Whopper®', ' 2x 100% flame-grilled Aussie beef patties topped with melted cheese, double premium eye bacon, Tangy Carolina BBQ Sauce, Crispy Onions, mayo, lettuce and tomato on a toasted sesame seed bun. ', 8.99, '/images/f4.png', 'Featured', 1),
       ('Carolina Munchh Fried Chicken', 'Big, thick, crunchy and juicy fried chicken fillet, topped with melted cheese, premium eye bacon, Tangy Carolina BBQ Sauce, Crispy Onions, mayo and lettuce on a toasted brioche bun. ', 8.99, '/images/f5.png', 'Featured', 1),
       ('Carolina Grilled Chicken', 'Flame-grilled Aussie chicken breast fillet topped with melted cheese, premium eye bacon, Tangy Carolina BBQ Sauce, Crispy Onions, mayo, lettuce and tomato on a toasted sesame seed bun. ', 8.99, '/images/f6.png', 'Featured', 1),
       ('Carolina Whopper®Hunger Tamers', ' Enjoy the new Carolina Whopper Hunger Tamers. It includes a Carolina Whopper, a BBQ Cheeseburger, medium thick cut chips, three 100% chicken breast nuggets and a medium Coke. ', 8.99, '/images/bnd3.png', 'Featured', 1),
       ('Carolina Munchh Fried Chicken Hunger Tamers', 'Enjoy the new Big, thick, crunchy and juicy Carolina Munchh Fried Chicken Burger with medium thick cut chips, three 100% chicken breast nuggets, one Chicken Royale burger and a medium Coke. ', 8.99, '/images/bn6.png', 'Featured', 1),
       ('$6 Double Cheeseburger Small Value Meal', 'The Cheeseburger with twice the flavour. Two flame-grilled 100% beef patties, two slices of cheese, pickles, mustard and tomato sauce on a toasted sesame seed bun', 5.99, '/images/f9.png', 'Featured', 1),
        ('Bacon Deluxe & Medium Coke', 'Tackle hunger head-on with this unbeatable combo: a Bacon Deluxe with flame-grilled Aussie beef, fresh lettuce, ripe tomato and mayo, teamed up with premium eye bacon and a slice of cheese', 5.99, '/images/f10.png', 'Featured', 1),
        ('2 Large Iced Drinks', 'Our rich, velvety, smooth iced coffees features a shot of espresso poured over ice and your choice of full cream, skim, soy, oat, almond or lactose-free milk before being topped with cream and a dusting of chocolate powder.', 5.99, '/images/f11.png', 'Featured', 1),
       ('Storm OREO®', 'Love the chocolate taste of OREO? Then you will love our OREO Storm dessert, with rich creamy vanilla soft serve ice cream made with OREO Cookie Crumb.', 4.99, '/images/dsrt1.png', 'Dessert', 1),
         ('Storm CADBURY® FLAKE®', 'Storm Flake is hard to resist! A storm of rich creamy vanilla soft serve made with crushed CADBURY FLAKE pieces.', 4.99, '/images/dsrt2.png', 'Dessert', 1),
         ('Storm M&Ms Minis®', 'Storm M&Ms is the dessert that has been taking Australia by storm. Rich creamy vanilla soft serve ice cream swirled with a storm of crunchy M&Ms Minis. ', 4.99, '/images/dsrt3.png', 'Dessert', 1),
         ('Sticky Date Pudding', 'Dessert lovers rejoice! An Aussie fave, our delicious Sticky Date Pudding is served warm with gooey caramel sauce. ', 6.99, '/images/dsrt4.png', 'Dessert', 1),
         ('Caramel Sundae', 'f you love the taste of warm sweet caramel sauce then you will find this hard to resist. The Munchh classic rich creamy vanilla ice cream topped with a creamy caramel fudge sauce. ', 3.99, '/images/dsrt5.png', 'Dessert', 1),
         ('Strawberry Sundae', 'If you love the sweet sensation of strawberry, then this is hard to resist. Soft serve rich creamy ice cream topped with a luscious strawberry sauce. ', 3.99, '/images/dsrt6.png', 'Dessert', 1),
         ('Chocolate Sundae', 'Finish a meal or treat yourself with our rich and velvety vanilla soft serve chocolate sundae topped with a wicked gooey chocolate fudge sauce. ', 3.99, '/images/dsrt7.png', 'Dessert', 1),
         ('Drumstick® Mini Vanilla', 'Smooth vanilla ice cream topped with lush chocolate sauce all in a crispy wafer cone with a delicious choc tip. Available in a perfect 49g size for snacking.', 2.99, '/images/dsrt8.png', 'Dessert', 1),
         ('Soft Serve Cone', 'They say the simple things in life are often the best and our soft serve is no exception. Rich creamy vanilla soft serve in a crispy cone.', 0.99, '/images/dsrt9.png', 'Dessert', 1)

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


-- Saad please add review table and all the procedures and functions here into your database

CREATE TABLE Review (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL FOREIGN KEY REFERENCES Customer(ID),
    Rating INT NOT NULL,
    Comment VARCHAR(500),
    ReviewDate DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT CK_Review_Rating CHECK (Rating >= 1 AND Rating <= 5)
);

INSERT INTO Review (CustomerID, Rating, Comment, ReviewDate)
VALUES 

(1, 5, 'The food was delicious and the delivery was fast!', '2022-03-08 12:45:00'),
(2, 4, 'The food was good, but the delivery was a little late.', '2022-03-08 14:30:00'),
(3, 3, 'The food was okay, but the delivery was very late.', '2022-03-08 18:30:00');








--VIEW

CREATE VIEW adminSummary AS
SELECT
    (SELECT COUNT(*) FROM Customer) AS CustomerCount,
    (SELECT COUNT(*) FROM DeliveryBoy) AS DeliveryBoyCount,
    (SELECT COUNT(*) FROM FoodItem) AS FoodItemCount,
    (SELECT COUNT(*) FROM [Order]) AS OrderCount,
    (SELECT COUNT(*) FROM Review) AS ReviewCount;


--SELECT * FROM adminSummary;


--------------------------------









-- Procedures

CREATE PROCEDURE GetAllReviews
AS
BEGIN
    SELECT * FROM Review JOIN Customer ON Review.CustomerID = Customer.ID;
END;
GO

--EXEC GetAllReviews;


--------------------------------





-- TakeOrder Procedure finds a suitable deliveryboy for the order and inserts the order into the database
Create PROCEDURE TakeOrder
@CustomerID INT,
@OrderDate DATETIME,
@TotalAmount MONEY,
@Status VARCHAR(50),
@PaymentMethod VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    
    DECLARE @DeliveryCount INT;
    DECLARE @DeliveryBoyID INT;

    -- Find the deliveryboy with the lowest delivery count

    SELECT TOP 1 @DeliveryBoyID = ID, @DeliveryCount = DeliveryCount
    FROM DeliveryBoy
    ORDER BY DeliveryCount ASC;

    -- Update the deliveryboy's delivery count
    UPDATE DeliveryBoy
    SET DeliveryCount = @DeliveryCount + 1
    WHERE ID = @DeliveryBoyID;

    -- Insert the order into the database

    INSERT INTO [Order] (CustomerID, DeliveryBoyID, OrderDate, TotalAmount, Status, PaymentMethod)
    VALUES (@CustomerID, @DeliveryBoyID, @OrderDate, @TotalAmount, @Status, @PaymentMethod);

    -- Return the order ID
    SELECT SCOPE_IDENTITY();





END;


--EXEC TakeOrder 2, '2023-04-16 14:00:00', 27.97, 'Delivered', 'Cash';



--------------------------------

--procedure TakeOrderDetails

CREATE PROCEDURE TakeOrderDetails
@OrderID INT,
@FoodItemID INT,
@Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @Price MONEY;
    DECLARE @TotalAmount MONEY;
    
    -- Find the price of the food item
    SELECT @Price = Price
    FROM FoodItem
    WHERE ID = @FoodItemID;
    
    -- Calculate the total amount
    SET @TotalAmount = @Price * @Quantity;
    
    -- Insert the order details into the database
    INSERT INTO OrderDetails (OrderID, FoodItemID, Quantity, Price)
    VALUES (@OrderID, @FoodItemID, @Quantity, @TotalAmount);
    
    -- Return order id and food item id and total amount
    SELECT @OrderID, @FoodItemID, @TotalAmount;
    
END;


-- EXEC TakeOrderDetails 5, 1, 2;

-- SELECT * FROM OrderDetails JOIN [Order] ON OrderDetails.OrderID = [Order].ID;

-- drop procedure TakeOrderDetails;

-- delete from OrderDetails where OrderID = 5 AND FoodItemID = 1;

--------------------------------------------------

--procedure to return customer summary

CREATE PROCEDURE GetAllCustomerSummary
AS


BEGIN
    SET NOCOUNT ON;
    
    SELECT * FROM Customer
    INNER JOIN Address ON Customer.ID = Address.CustomerID
    INNER JOIN [Order] ON Customer.ID = [Order].CustomerID
    INNER JOIN OrderDetails ON [Order].ID = OrderDetails.OrderID
    INNER JOIN FoodItem ON OrderDetails.FoodItemID = FoodItem.ID
    INNER JOIN DeliveryBoy ON [Order].DeliveryBoyID = DeliveryBoy.ID
    INNER JOIN AreaCode ON DeliveryBoy.AreaCodeID = AreaCode.ID
    INNER JOIN Address AS DeliveryAddress ON Customer.ID = DeliveryAddress.CustomerID
    
END;


--exec GetAllCustomerSummary;

------------------------------------------------

--procedure to change status of order to delivered

-- CREATE PROCEDURE ChangeOrderStatusToDelivered
-- @OrderID INT
-- AS
-- BEGIN
--     SET NOCOUNT ON;
    
--     UPDATE [Order]
--     SET Status = 'Delivered', DeliveryDate = GETDATE()
--     WHERE ID = @OrderID

--     --return a message
--     SELECT 'Order status changed to delivered'

    
-- END;

-- --exec ChangeOrderStatusToDelivered 3;


-- ------------------------------------------------

-- -- procedure to change status of order to cancelled

-- CREATE PROCEDURE ChangeOrderStatusToCancelled
-- @OrderID INT
-- AS
-- BEGIN
--     SET NOCOUNT ON;
    
--     UPDATE [Order]
--     SET Status = 'Cancelled', DeliveryDate = GETDATE()
--     WHERE ID = @OrderID

--     --return a message
--     SELECT 'Order status changed to cancelled'

    
-- END;



-- change status of order to cancelled and delivery date to null

-- update [Order]
-- set Status = 'Pending', DeliveryDate = null
-- where ID = 3;



-- add a order with status pending and delivery date null and deliveryboy id is 3

-- insert into [Order] (CustomerID, DeliveryBoyID, OrderDate, TotalAmount, Status, PaymentMethod) values (1, 3, '2022-03-08 12:45:00', 27.97, 'Pending', 'Cash');







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
SELECT * FROM Review JOIN Customer ON Review.CustomerID = Customer.ID;

--SUMMARY

SELECT * FROM Customer
INNER JOIN Address ON Customer.ID = Address.CustomerID
INNER JOIN [Order] ON Customer.ID = [Order].CustomerID
INNER JOIN OrderDetails ON [Order].ID = OrderDetails.OrderID
INNER JOIN FoodItem ON OrderDetails.FoodItemID = FoodItem.ID
INNER JOIN DeliveryBoy ON [Order].DeliveryBoyID = DeliveryBoy.ID
INNER JOIN AreaCode ON DeliveryBoy.AreaCodeID = AreaCode.ID
INNER JOIN Address AS DeliveryAddress ON Customer.ID = DeliveryAddress.CustomerID







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
