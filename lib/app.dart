import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:EasyShop/screens/splash_screen.dart';
import 'package:EasyShop/styles/theme.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'constants/auth_controller.dart';
import 'screens/dashboard/dashboard_screen.dart';

class MyApp extends ConsumerWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    SystemChrome.setPreferredOrientations(
      [
        DeviceOrientation.portraitUp,
        DeviceOrientation.portraitDown,
      ],
    );
    return MaterialApp(
      theme: themeData,
      home: ref.watch(currentUserAccountProvider).when(
          data: (user) {
            if(user != null){ 
              return  DashboardScreen();
            }
            return  SplashScreen();
          },
          error: (error, st) {
            print(error);
            return SplashScreen();
          },
          loading: () => SplashScreen()),
      debugShowCheckedModeBanner: false,
    );
  }
}

