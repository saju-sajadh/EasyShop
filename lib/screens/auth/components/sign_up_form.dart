import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import '../../../constants/auth_controller.dart';
import 'already_have_accout.dart';
import 'package:form_field_validator/form_field_validator.dart';

class SignUpForm extends ConsumerStatefulWidget {
  const SignUpForm({super.key});

  @override
  ConsumerState<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends ConsumerState<SignUpForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      final name = _nameController.text.trim();
      final email = _emailController.text.trim();
      final password = _passwordController.text;
      ref.read(authControllerProvider.notifier).signUp(
          name: name, email: email, password: password, context: context);
    } else {
      debugPrint('Validation failed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(15),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            blurRadius: 10,
            spreadRadius: 0,
            offset: const Offset(0, 2),
            color: Colors.black.withOpacity(0.04),
          ),
        ],
        borderRadius: BorderRadius.circular(15),
      ),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Name'),
            const SizedBox(height: 8),
            TextFormField(
              controller: _nameController,
              validator: Validators.requiredWithFieldName('Name').call,
              textInputAction: TextInputAction.next,
            ),
            const SizedBox(height: 15),
            const Text('Email'),
            const SizedBox(height: 8),
            TextFormField(
              controller: _emailController,
              validator: Validators.email.call,
              textInputAction: TextInputAction.next,
            ),
            const SizedBox(height: 15),
            const Text('Password'),
            const SizedBox(height: 8),
            TextFormField(
              controller: _passwordController,
              validator: Validators.password.call,
              textInputAction: TextInputAction.done,
              obscureText: true,
              decoration: InputDecoration(
                suffixIcon: Material(
                  color: Colors.transparent,
                  child: IconButton(
                    onPressed: () {},
                    icon: SvgPicture.asset(
                      'assets/icons/eye.svg',
                      width: 24,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 15),
            ElevatedButton(
              onPressed: _submitForm,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green, // Set background color to green
                foregroundColor: Colors.white, // Set text color to white
                padding:
                    const EdgeInsets.symmetric(vertical: 15, horizontal: 30),
                shape: RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(10), // Optional: rounded corners
                ),
              ),
              child: const Text('Sign Up'),
            ),
            const AlreadyHaveAnAccount(),
            const SizedBox(height: 15),
          ],
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
