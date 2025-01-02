import 'package:flutter/material.dart';
import '../sign_up_page.dart';

class DontHaveAccountRow extends StatelessWidget {
  const DontHaveAccountRow({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('Don\'t Have Account?'),
        TextButton(
          onPressed: () => Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => SignUpPage()),
          ),
          child: const Text('Sign Up'),
        ),
      ],
    );
  }
}
