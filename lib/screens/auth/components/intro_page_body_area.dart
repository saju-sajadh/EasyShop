import 'package:flutter/material.dart';


class IntroPageBodyArea extends StatelessWidget {
  const IntroPageBodyArea({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          const Spacer(flex: 1),
          Padding(
            padding: const EdgeInsets.all(15),
            child: SizedBox(
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome to our',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold, color: Colors.black),
                  ),
                  Text(
                    'E-Grocery',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w700, color: Color(0xFF00AD48)),
                  ),
                ],
              ),
            ),
          ),
          const Spacer(flex: 5),
          Padding(
            padding: const EdgeInsets.all(15),
            child: Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () =>
                        Navigator.pushNamed(context, '/'),
                    child: const Text('Continue with Email or Phone'),
                  ),
                ),
                const SizedBox(height: 15),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () =>
                        Navigator.pushNamed(context, '/'),
                    style: ElevatedButton.styleFrom(
                      foregroundColor: Colors.black,
                      backgroundColor: Colors.white,
                    ),
                    child: const Text('Create an account'),
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
