import 'package:flutter/material.dart';
import 'components/sign_up_form.dart';
import 'components/sign_up_page_header.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF7F7F7),
      body: SafeArea(
        child: Stack(
          children: [
            // Background image
            Positioned.fill(
              child: Image.asset(
                'assets/images/background_image.png', 
                fit: BoxFit.cover,
              ),
            ),
            // Foreground content
            Center(
              child: SingleChildScrollView(
                child: Column(
                  children: const [
                    SignUpPageHeader(),
                    SizedBox(height: 15),
                    SignUpForm(),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
