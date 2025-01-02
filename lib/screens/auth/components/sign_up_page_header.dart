import 'package:flutter/material.dart';

class SignUpPageHeader extends StatelessWidget {
  const SignUpPageHeader({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Text(
          'Welcome to Easyshop',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
      ),
    );
  }
}
