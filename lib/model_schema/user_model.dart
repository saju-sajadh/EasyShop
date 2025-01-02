class Product {
  final String id;
  final String name;
  final double price;

  Product({
    required this.id,
    required this.name,
    required this.price,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'price': price,
    };
  }

  factory Product.fromMap(Map<String, dynamic> map) {
    return Product(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      price: map['price']?.toDouble() ?? 0.0,
    );
  }
}

class Cart {
  final String ProductId;

  Cart({
    required this.ProductId,
  });

  Map<String, dynamic> toMap() {
    return {
      'ProductId': ProductId,
    };
  }

  factory Cart.fromMap(Map<String, dynamic> map) {
    return Cart(
      ProductId: map['ProductId'] ?? '',
    );
  }
}

class Order {
  final String orderId;
  final DateTime date;
  final List<Product> products;

  Order({
    required this.orderId,
    required this.date,
    required this.products,
  });

  Map<String, dynamic> toMap() {
    return {
      'orderId': orderId,
      'date': date.toIso8601String(),
      'products': products.map((product) => product.toMap()).toList(),
    };
  }

  factory Order.fromMap(Map<String, dynamic> map) {
    return Order(
      orderId: map['orderId'] ?? '',
      date: DateTime.parse(map['date']),
      products: List<Product>.from(
        map['products']?.map((productMap) => Product.fromMap(productMap)) ?? [],
      ),
    );
  }
}

class UserModel {
  final String email;
  final String name;
  final String uid;
  final List<Order> orders;
  final List<Order> cart;  // Changed to List<Order> to match orders

  UserModel({
    required this.email,
    required this.name,
    required this.uid,
    required this.orders,
    required this.cart,  // Now expecting List<Order>
  });

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'name': name,
      'uid': uid,
      'orders': orders.map((order) => order.toMap()).toList(),
      'cart': cart.map((order) => order.toMap()).toList(),  
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      email: map['email'] ?? '',
      name: map['name'] ?? '',
      uid: map['uid'] ?? '',
      orders: List<Order>.from(
        map['orders']?.map((orderMap) => Order.fromMap(orderMap)) ?? [],
      ),
      cart: List<Order>.from(  
        map['cart']?.map((orderMap) => Order.fromMap(orderMap)) ?? [],
      ),
    );
  }
}
