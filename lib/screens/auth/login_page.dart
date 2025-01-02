import 'package:flutter/material.dart';
import 'components/dont_have_account_row.dart';
import 'components/login_header.dart';
import 'components/login_page_form.dart';


class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                LoginPageHeader(),
                LoginPageForm(),
                SizedBox(height: 15),
                DontHaveAccountRow(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
