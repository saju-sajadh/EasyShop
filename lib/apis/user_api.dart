import 'package:appwrite/models.dart' as model;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';
import '../constants/appwrite.dart';
import '../constants/providers.dart';
import '../constants/type_dart.dart';
import '../model_schema/user_model.dart';
import 'package:appwrite/appwrite.dart';

final userAPIProvider = Provider((ref) {
  return UserAPI(db: ref.watch(appwriteDatabseProvider));
});

abstract class IUserAPI {
  FutureEitherVoid saveUserData(UserModel userModel);
  Future<model.Document> getUserData(String uid);
}

class UserAPI implements IUserAPI {
  final Databases _db;
  UserAPI({required Databases db}) : _db = db;

  @override
  FutureEitherVoid saveUserData(UserModel userModel) async {
    try {
      await _db.createDocument(
          databaseId: AppWrite.databaseId,
          collectionId: AppWrite.userCollection,
          documentId: userModel.uid,
          data: userModel.toMap());
      return right(null);
    } on AppwriteException catch (e, stackTrace) {
      return left(
          Failure(e.message ?? 'Some Unexpected error occured!.', stackTrace));
    } catch (e, st) {
      return left(Failure(e.toString(), st));
    }
  }

  @override
  Future<model.Document> getUserData(String uid) async {
    return await _db.getDocument(
      databaseId: AppWrite.databaseId,
      collectionId: AppWrite.userCollection,
      documentId: uid,
    );
  }
}
