import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSignIn} from '@clerk/clerk-expo';
import {useAuth} from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

function SignInScreen() {
  const navigation = useNavigation();
  const {isSignedIn} = useAuth();
  const {isLoaded, signIn, setActive} = useSignIn();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isloading, setIsloading] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);

  if (isSignedIn) {
    navigation.navigate('Tabs');
  }

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignin = async () => {
    setIsloading(true);
    try {
      if (!isLoaded) {
        return;
      }
      if (!formData.email || !formData.password) {
        Alert.alert('warning', 'Please fill the fields!');
        return;
      }
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === 'complete') {
        console.log('logging in...');
        await setActive({session: signInAttempt.createdSessionId});
        navigation.navigate('Tabs');
      } else {
        Alert.alert('warning', 'Invaid Credentials!');
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert('Error', 'Invaid Credentials!');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsloading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            onChangeText={value => handleInputChange('email', value)}
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
            onChangeText={value => handleInputChange('password', value)}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          disabled={isloading}
          style={styles.loginButton}
          onPress={handleSignin}>
          {isloading ? (
            <AntDesign name="loading1" size={24} color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('signup')}
            style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  carouselItem: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '250',
    resizeMode: 'cover',
    borderRadius: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  loginButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#28a745',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupButton: {
    marginLeft: 8,
  },
  signupButtonText: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default SignInScreen;
