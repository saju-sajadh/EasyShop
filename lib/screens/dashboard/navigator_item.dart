import 'package:flutter/material.dart';
import 'package:EasyShop/screens/account/account_screen.dart';
import 'package:EasyShop/screens/cart/cart_screen.dart';
import 'package:EasyShop/screens/explore_screen.dart';
import 'package:EasyShop/screens/home/home_screen.dart';
import '../classification_screen.dart';


class NavigatorItem {
  final String label;
  final String iconPath;
  final int index;
  final Widget screen;

  NavigatorItem(this.label, this.iconPath, this.index, this.screen);
}

List<NavigatorItem> navigatorItems = [
  NavigatorItem('Shop', 'assets/icons/shop_icon.svg', 0, HomeScreen()),
  NavigatorItem('Explore', 'assets/icons/explore_icon.svg', 1, ExploreScreen()),
  NavigatorItem('Add', 'assets/icons/add_quantity.svg', 2, ClassificationScreen()),
  NavigatorItem('Cart', 'assets/icons/cart_icon.svg', 3, CartScreen()),
  NavigatorItem('Account', 'assets/icons/account_icon.svg', 4, AccountScreen()),
];
