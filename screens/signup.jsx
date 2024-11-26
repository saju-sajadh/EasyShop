import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useSignUp } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get("window");

const SignupScreen = () => {
    const navigation = useNavigation();
  const { isLoaded, signUp, setActive } = useSignUp()
  const { isSignedIn } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_passord: '',
  });
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [toggleEye, setToggleEye] = useState(false)

  if(isSignedIn){
    navigation.navigate('Tabs')
  }

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {

      if (!isLoaded) {
        Alert.alert('Warning', "Please try again!")
        return
      }

      if(! formData.email || ! formData.password || !formData.confirm_passord){
        Alert.alert('Warning', 'Please fill the fields!')
        return
      }

      if(formData.password !== formData.confirm_passord){
        Alert.alert('Warning', 'Passwords mismatch!')
        return
      }

      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)

    } catch (error) {
      Alert.alert('Error', error)
      console.log(error)
    }
    finally{
      setIsloading(false)
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        navigation.navigate('Tabs')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if(!pendingVerification){
    return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="caret-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>

        <Text style={styles.title}>Welcome to Easyshop</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={formData.confirm_passord}
              onChangeText={(value) => handleInputChange('confirm_passord', value)}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign up</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>already have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('signin')} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )}
  else{
    return(
      <View style={styles.vcontainer}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="caret-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
        <View style={styles.vtextContainer}>
          <Text style={styles.vheadingText}>Let's get</Text>
          <Text style={styles.vheadingText}>verified</Text>
        </View>
        <View style={styles.vformContainer}>
          <View style={styles.vinputContainer1}>
            <SimpleLineIcons name={"lock"} size={30} color={'#AEB5BB'} />
            <TextInput
              style={styles.vtextInput}
              placeholder="code..."
              placeholderTextColor={'#AEB5BB'}
              secureTextEntry={true}
              value={code}
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity style={styles.vloginButtonWrapper} onPress={onPressVerify}>
            <Text style={styles.vloginText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  carouselItem: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: "100%",
    height: "250",
    resizeMode: "cover",
    borderRadius: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer1: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20
  },
  loginButton: {
    backgroundColor: "#28a745",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "#28a745",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: "#666",
  },
  signupButton: {
    marginLeft: 8,
  },
  signupButtonText: {
    color: "#28a745",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FAF9F6', // Example background color
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, 
  },
  vcontainer: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  vtextContainer: {
    alignItems: 'center',
    marginTop: 30, 
  },
  vheadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333', 
  },
  vformContainer: {
    paddingHorizontal: 30, 
    marginTop: 50, 
  },
  vinputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    padding: 15, 
    borderWidth: 1,
    borderColor: '#eee', 
    marginBottom: 20, 
  },
  vtextInput: {
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16,
    color: '#333', 
  },
  vloginButtonWrapper: {
    backgroundColor: '#28a745', 
    borderRadius: 10,
    padding: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  vloginText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
