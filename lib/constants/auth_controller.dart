import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:appwrite/models.dart' as model;
import '../apis/auth_api.dart';
import '../apis/user_api.dart';
import '../model_schema/user_model.dart';
import '../screens/auth/login_page.dart';
import '../screens/dashboard/dashboard_screen.dart';
import '../widgets/snack_bar.dart';

final authControllerProvider =
    StateNotifierProvider<AuthController, bool>((ref) {
  return AuthController(
    authAPI: ref.watch(authAPIProvider),
    userAPI: ref.watch(userAPIProvider),
  );
});

final currentUserDetailsProvider = FutureProvider((ref) async {
  final currentUserId = ref.watch(currentUserAccountProvider).value!.$id;
  final userDetails = ref.watch(userDetailsProvider(currentUserId));
  return userDetails.value;
});

final userDetailsProvider = FutureProvider.family((ref, String uid) async {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.getUserData(uid);
});

final currentUserAccountProvider = FutureProvider((ref) async {
  final authController = ref.watch(authControllerProvider.notifier);
  return authController.currentUser();
});

class AuthController extends StateNotifier<bool> {
  final AuthAPI _authAPI;
  final UserAPI _userAPI;
  AuthController({required AuthAPI authAPI, required UserAPI userAPI})
      : _authAPI = authAPI,
        _userAPI = userAPI,
        super(false);

  Future<model.Account?> currentUser() => _authAPI.currentUserAccount();

  void signUp({
    required String name,
    required String email,
    required String password,
    required BuildContext context,
  }) async {
    state = true;
    final res = await _authAPI.signUp(email: email, password: password);

    res.fold((failure) {
      print('Sign up failed: ${failure.message}');
      showSnackBar(context, failure.message);
    }, (user) async {
      // User created successfully
      UserModel userModel = UserModel(
        email: email,
        name: name,
        uid: user.$id,
        orders: [],
        cart: [],
      );

      final res2 = await _userAPI.saveUserData(userModel);
      res2.fold((failure) {
        showSnackBar(context, failure.message);
      }, (r) {
        showSnackBar(context, 'Account Created Successfully!');
        login(email: email, password: password, context: context);
      });
    });

    state = false;
  }

void login({
  required String email,
  required String password,
  required BuildContext context,
}) async {
  state = true;
  final res = await _authAPI.login(email: email, password: password);
  state = false;
  res.fold(
    (l) {
      showSnackBar(context, l.message);
    },
    (r) {
      // Navigate to DashboardScreen
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => DashboardScreen()),
      );
    },
  );
}


  Future<UserModel> getUserData(String uid) async {
    final document = await _userAPI.getUserData(uid);
    final updatedUser = UserModel.fromMap(document.data);
    return updatedUser;
  }

  void logout(BuildContext context) async {
    state = true;
    final res = await _authAPI.logout();
    state = false;
    res.fold(
      (l) => showSnackBar(context, l.message),
      (r) => Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => LoginPage()),
      ),
    );
  }
}
