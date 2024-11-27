import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
import {CameraView, useCameraPermissions, Button} from 'expo-camera';
import {useState, useEffect, useRef} from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as tf from '@tensorflow/tfjs';

export default function Tab() {
  const {status, requestPermission} = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel(
          require('../assets/model/model.json'),
        );
        setModel(model);
      } catch (error) {
        console.log("can't load model: ", error);
      }
    };
    loadModel();
  }, []);

  if (status === null) {
    return <View />;
  }

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
    setScanned(false);
  };

  const handleBarcodeScanned = ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const captureAndClassify = async () => {
    try {
      if (cameraRef.current && model) {
        const photo = await cameraRef.current.takePictureAsync({base64: true});
        const img = new Image();
        img.src = `data:image/jpg;base64,${photo.base64}`;
        await img.decode();
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .div(255)
          .expandDims();

        const predictions = await model.predict(tensor).data();

        const labels = ['Water', 'Apple', 'class3'];
        const predictedIndex = predictions.indexOf(Math.max(...predictions));
        const predictedClass = labels[predictedIndex];

        setPrediction(predictedClass);
      }
    } catch (error) {
      console.log('error occured: ', error);
    }
  };

  if (status === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#00B4DB', '#0083B0']} style={styles.header}>
        <Text style={styles.headerText}>
          {prediction ? prediction : 'Scan & Go'}
        </Text>
        {isCameraActive && (
          <MaterialCommunityIcons
            name="camera-off-outline"
            size={24}
            color="black"
            style={{
              marginTop: 3,
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 8,
            }}
            onPress={() => {
              setIsCameraActive(false);
            }}
          />
        )}
      </LinearGradient>

      <View style={styles.cameraContainer}>
        {isCameraActive ? (
          <CameraView
            barcodeScannerSettings={{
              barcodeTypes: ['code128', 'qr'],
            }}
            ref={cameraRef}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            autofocus="on"
            style={styles.camera}
            type={'front'}>
            <View style={styles.buttonContainer}>
              <SimpleLineIcons
                onPress={captureAndClassify}
                style={{padding: 8, backgroundColor: 'white', borderRadius: 32}}
                name="camera"
                size={40}
                color="black"
              />
            </View>
          </CameraView>
        ) : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCameraToggle}>
            <Ionicons name="camera-outline" size={40} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  captureButton: {
    backgroundColor: '#0083B0',
    padding: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  flipButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
