class FoodItem {
    constructor(id, name, description, price, image, category, availability) {
      this.ID = id;
      this.Name = name;
      this.Description = description;
      this.Price = price;
      this.Image = image;
      this.Category = category;
      this.Availability = availability;
    }
  }
  
  class Customer {
    constructor(name, email, phone, premiumCustomer, userName, password) {
      this.Name = name;
      this.Email = email;
      this.Phone = phone;
      this.PremiumCustomer = premiumCustomer;
      this.UserName = userName;
      this.Password = password;
    }
  }
  
  class Address {
    constructor(customerID, streetAddress, city, state, zipCode) {
      this.CustomerID = customerID;
      this.StreetAddress = streetAddress;
      this.City = city;
      this.State = state;
      this.ZipCode = zipCode;
    }
  }
  
  class AreaCode {
    constructor(code) {
      this.Code = code;
    }
  }
  
  class DeliveryBoy {
    constructor(name, phone, areaCodeID, availability, deliveryCount, rating, userName, password) {
      this.Name = name;
      this.Phone = phone;
      this.AreaCodeID = areaCodeID;
      this.Availability = availability;
      this.DeliveryCount = deliveryCount;
      this.Rating = rating;
      this.UserName = userName;
      this.Password = password;
    }
  }
  
  class Order {
    constructor(customerID, deliveryBoyID, totalAmount, status, paymentMethod) {
      this.CustomerID = customerID;
      this.DeliveryBoyID = deliveryBoyID;
      this.TotalAmount = totalAmount;
      this.Status = status;
      this.PaymentMethod = paymentMethod;
    }
  }
  
  class OrderDetails {
    constructor(orderID, foodItemID, quantity, price) {
      this.OrderID = orderID;
      this.FoodItemID = foodItemID;
      this.Quantity = quantity;
      this.Price = price;
    }
  }
  
  class AdminUser {
    constructor(userName, password) {
      this.UserName = userName;
      this.Password = password;
    }
  }
  

module.exports = { FoodItem, Customer, Address, AreaCode, DeliveryBoy, Order, OrderDetails, AdminUser };  
