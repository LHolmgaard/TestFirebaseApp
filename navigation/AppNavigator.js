import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import LoginScreen from './../screens/auth/LoginScreen';
import SignupScreen from './../screens/auth/SignupScreen';
import ForgotpasswordScreen from './../screens/auth/ForgotpasswordScreen';


export default createAppContainer(
  createStackNavigator({

    Login: {screen:LoginScreen},
    Signup: {screen:SignupScreen},
    ForgotPassword: {screen:ForgotpasswordScreen},
    Main: {screen: MainTabNavigator},
    
  },{
    headerMode:'none',
  })
);
