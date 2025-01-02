import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../../constants/auth_controller.dart';
import './app_themes.dart';
import 'login_button.dart';
import 'package:form_field_validator/form_field_validator.dart';

class LoginPageForm extends ConsumerStatefulWidget {
  const LoginPageForm({
    super.key,
  });

  @override
  ConsumerState<LoginPageForm> createState() => _LoginPageFormState();
}

class _LoginPageFormState extends ConsumerState<LoginPageForm> {
  final _key = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool isPasswordShown = false;

  void onPassShowClicked() {
    setState(() {
      isPasswordShown = !isPasswordShown;
    });
  }

  void onLogin() {
  final bool isFormOkay = _key.currentState?.validate() ?? false;
  if (isFormOkay) {
    // Get the values from the controllers
    final email = _emailController.text;
    final password = _passwordController.text;

    // Correct usage of ref to access the provider
    ref.read(authControllerProvider.notifier).login(
      email: email, 
      password: password, 
      context: context
    );
  } else {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Please try again.')),
    );
  }
}


  @override
  Widget build(BuildContext context) {
    return Theme(
      data: AppTheme.defaultTheme.copyWith(
        inputDecorationTheme: AppTheme.secondaryInputDecorationTheme,
      ),
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Form(
          key: _key,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Email Field
              const Text('Email id'),
              const SizedBox(height: 8),
              TextFormField(
                controller: _emailController,
                validator: Validators.requiredWithFieldName('email').call,
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 15),

              // Password Field
              const Text('Password'),
              const SizedBox(height: 8),
              TextFormField(
                controller: _passwordController,
                validator: Validators.password.call,
                onFieldSubmitted: (v) => onLogin(),
                textInputAction: TextInputAction.done,
                obscureText: !isPasswordShown,
                decoration: InputDecoration(
                  suffixIcon: Material(
                    color: Colors.transparent,
                    child: IconButton(
                      onPressed: onPassShowClicked,
                      icon: SvgPicture.asset(
                        'assets/icons/eye.svg',
                        width: 24,
                      ),
                    ),
                  ),
                ),
              ),

              // Forget Password label
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/');
                  },
                  child: const Text('Forget Password?'),
                ),
              ),

              // Login Button
              LoginButton(onPressed: onLogin),
            ],
          ),
        ),
      ),
    );
  }
}

class Validators {
  /// Email Validator
  static final email = EmailValidator(errorText: 'Enter a valid email address');

  /// Password Validator
  static final password = MultiValidator([
    RequiredValidator(errorText: 'Password is required'),
    MinLengthValidator(8, errorText: 'Password must be at least 8 digits long'),
    PatternValidator(r'(?=.*?[#?!@$%^&*-])',
        errorText: 'Passwords must have at least one special character')
  ]);

  /// Required Validator with Optional Field Name
  static RequiredValidator requiredWithFieldName(String? fieldName) =>
      RequiredValidator(errorText: '${fieldName ?? 'Field'} is required');

  /// Plain Required Validator
  static final required = RequiredValidator(errorText: 'Field is required');
}
