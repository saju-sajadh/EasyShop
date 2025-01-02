import 'dart:async';

import 'package:flutter/material.dart';
import 'package:EasyShop/screens/welcome_screen.dart';
import 'package:EasyShop/styles/colors.dart';


class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();

    const delay = const Duration(seconds: 3);
    Future.delayed(delay, () => onTimerFinished());
  }

  void onTimerFinished() {
    Navigator.of(context).pushReplacement(new MaterialPageRoute(
      builder: (BuildContext context) {
        return WelcomeScreen();
      },
    ));
  }

@override
Widget build(BuildContext context) {
  return Scaffold(
    backgroundColor: AppColors.primaryColor,
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Text(
            'EasyShop',
            style: TextStyle(
              fontSize: 40, 
              fontWeight: FontWeight.bold,
              color: Colors.white, 
            ),
          ),
          SizedBox(height: 10), // Add some spacing
          Text(
            'shop easier and faster',
            style: TextStyle(
              fontSize: 16,
              color: Colors.white,
            ),
          ),
        ],
      ),
    ),
  );
}
}