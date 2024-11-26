import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import HomeScreen from './screens/home';
import Cart from './screens/cart';
import Shop from './screens/shop';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Shop') {
              iconName = focused ? 'shopping-basket' : 'shopping-basket';
              return (
                <FontAwesome name="shopping-basket" size={24} color={color} />
              );
            } else if (route.name === 'Cart') {
              iconName = focused ? 'shoppingcart' : 'shoppingcart';
              return <AntDesign name="shoppingcart" size={24} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}
