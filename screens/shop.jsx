import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions, Button } from "expo-camera";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";


export default function Tab() {
  const { status, requestPermission } = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (status === null) {
    return <View />;
  }

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
  };

  if (status === "denied") {
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
      <LinearGradient colors={["#00B4DB", "#0083B0"]} style={styles.header}>
        <Text style={styles.headerText}>Scan & Go</Text>
        {isCameraActive && (
          <MaterialCommunityIcons
            name="camera-off-outline"
            size={24}
            color="black"
            style={{
              marginTop: 3,
              backgroundColor: "white",
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
          <CameraView style={styles.camera} type={"front"}>
            <View style={styles.buttonContainer}>
              <SimpleLineIcons style={{padding: 8, backgroundColor: 'white', borderRadius: 32}} name="camera" size={40} color="black" />
            </View>
          </CameraView>
        ) : (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCameraToggle}
          >
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
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "center", 
    alignItems: "flex-end",
  },
  captureButton: {
    backgroundColor: "#0083B0",
    padding: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  flipButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
