import 'package:flutter/material.dart';
import './network_image.dart';


class LoginPageHeader extends StatelessWidget {
  const LoginPageHeader({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          width: MediaQuery.of(context).size.width * 0.3,
          child: const AspectRatio(
            aspectRatio: 1 / 1,
            child: NetworkImageWithLoader('https://i.imgur.com/9EsY2t6.png'),
          ),
        ),
        Text(
          'Welcome to ',
          style: Theme.of(context)
              .textTheme
              .titleLarge
              ?.copyWith(fontWeight: FontWeight.bold),
        ),
        Text(
          'Easyshop',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
                color: Color(0xFF00AD48),
              ),
        )
      ],
    );
  }
}
