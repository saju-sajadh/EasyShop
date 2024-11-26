import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from './screens/signin';
import Tabs from './Tab';
import SignupScreen from './screens/signup';

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signin"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
