import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';

import '../classifier/classifier.dart';
import '../styles.dart';
import '../widgets/plant_photo_view.dart';

const _labelsFileName = 'assets/labels.txt';
const _modelFileName = 'model_unquant.tflite';

class ClassificationScreen extends StatefulWidget {
  const ClassificationScreen({super.key});

  @override
  State<ClassificationScreen> createState() => _ClassificationScreenState();
}

enum _ResultStatus {
  notStarted,
  notFound,
  found,
}

class _ClassificationScreenState extends State<ClassificationScreen> {
  bool _isAnalyzing = false;
  final picker = ImagePicker();
  File? _selectedImageFile;

  // Result
  _ResultStatus _resultStatus = _ResultStatus.notStarted;
  String _plantLabel = ''; // Name of Error Message
  double _accuracy = 0.0;

  late Classifier _classifier;

  @override
  void initState() {
    super.initState();
    _loadClassifier();
  }

  Future<void> _loadClassifier() async {
    debugPrint(
      'Start loading of Classifier with '
      'labels at $_labelsFileName, '
      'model at $_modelFileName',
    );

    final classifier = await Classifier.loadWith(
      labelsFileName: _labelsFileName,
      modelFileName: _modelFileName,
    );
    _classifier = classifier!;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.white,
        width: double.infinity,
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: [
            const Spacer(),
            Padding(
              padding: const EdgeInsets.only(top: 30),
              child: _buildTitle(),
            ),
            const SizedBox(height: 20),
            _buildPhotolView(),
            const SizedBox(height: 10),
            _buildResultView(),
            const Spacer(), // Adjusted Spacer
            _buildPickPhotoButton(
              title: 'Take a photo',
              source: ImageSource.camera,
            ),
            const SizedBox(height: 20), // Added spacing
            _buildScanShopButton(), // Added ScanShop button
            const Spacer(),
          ],
        ),
      ),
    );
  }

  Widget _buildPhotolView() {
    return Stack(
      alignment: AlignmentDirectional.center,
      children: [
        PlantPhotoView(file: _selectedImageFile),
        _buildAnalyzingText(),
      ],
    );
  }

  Widget _buildAnalyzingText() {
    if (!_isAnalyzing) {
      return const SizedBox.shrink();
    }
    return const Text('Analyzing...', style: kAnalyzingTextStyle);
  }

  Widget _buildTitle() {
    return const Text(
      'Flash  Cart',
      style: kTitleTextStyle,
      textAlign: TextAlign.center,
    );
  }

  Widget _buildPickPhotoButton({
    required ImageSource source,
    required String title,
  }) {
    return TextButton(
      onPressed: () => _onPickPhoto(source),
      child: Container(
        width: 300,
        height: 50,
        color: kColorBrown,
        child: Center(
            child: Text(title,
                style: const TextStyle(
                  fontFamily: kButtonFont,
                  fontSize: 20.0,
                  fontWeight: FontWeight.w600,
                  color: kColorLightYellow,
                ))),
      ),
    );
  }

  void _setAnalyzing(bool flag) {
    setState(() {
      _isAnalyzing = flag;
    });
  }

  void _onPickPhoto(ImageSource source) async {
    final pickedFile = await picker.pickImage(source: source);

    if (pickedFile == null) {
      return;
    }

    final imageFile = File(pickedFile.path);
    setState(() {
      _selectedImageFile = imageFile;
    });

    _analyzeImage(imageFile);
  }

  void _analyzeImage(File image) {
    _setAnalyzing(true);

    final imageInput = img.decodeImage(image.readAsBytesSync())!;

    final resultCategory = _classifier.predict(imageInput);

    final result = resultCategory.score >= 0.8
        ? _ResultStatus.found
        : _ResultStatus.notFound;
    final plantLabel = resultCategory.label;
    final accuracy = resultCategory.score;

    _setAnalyzing(false);

    setState(() {
      _resultStatus = result;
      _plantLabel = plantLabel;
      _accuracy = accuracy;
    });
  }

  Widget _buildResultView() {
    var title = '';

    if (_resultStatus == _ResultStatus.notFound) {
      title = 'Fail to recognise';
    } else if (_resultStatus == _ResultStatus.found) {
      title = _plantLabel;
    } else {
      title = '';
    }

    //
    var accuracyLabel = '';
    if (_resultStatus == _ResultStatus.found) {
      accuracyLabel = 'Accuracy: ${(_accuracy * 100).toStringAsFixed(2)}%';
    }

    return Column(
      children: [
        Text(title, style: kResultTextStyle),
        const SizedBox(height: 10),
        Text(accuracyLabel, style: kResultRatingTextStyle)
      ],
    );
  }

  // Added ScanShop button
  Widget _buildScanShopButton() {
    return ElevatedButton(
      onPressed: () => scanBarcode(),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
        backgroundColor: const Color(0xFFFF7643),
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(30),
        ),
        elevation: 5,
        shadowColor: Colors.black54,
      ),
      child: const Text(
        'Scan Product Code',
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
    );
  }

  // Barcode scanning logic (from ScanShop)
  Future<void> scanBarcode() async {
    String barcodeScanRes;
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#FF00AD48', 'Cancel', true, ScanMode.BARCODE);
    } on PlatformException {
      barcodeScanRes = '😢';
      print('Failed to get platform version.');
    } catch (e) {
      barcodeScanRes = '😢';
      print('Failed to get result.');
    }

    if (!mounted) return;

    setState(() {
      if (barcodeScanRes == '-1') {
        _scanBarcode = '😢';
      } else {
        _scanBarcode = barcodeScanRes;
      }
    });
  }

  String _scanBarcode = '😀';
}