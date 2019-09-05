
import React from 'react';
import {AppLoading} from 'expo'
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainTabNavigator from './navigation/MainTabNavigator';
import AppNavigator from './navigation/AppNavigator';
import ApiKeys from './constants/ApiKeys'
import * as firebase from 'firebase';


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete:false,
      isAuthenicationReady:false,
      isAuthenticated: false,
    };


    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
   
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  handleFinishLoading = () =>  {
    this.setState({isLoadingComplete:true});
  }

  onAuthStateChanged = async (user) => {
    // console.log(!!user)
    await this.setState({isAuthenicationReady: true});
    await this.setState({isAuthenticated: !!user});
    // console.log("isAuthenticated",this.state.isAuthenticated)
  }
  
  // registerForPushNotificationsAsync = async () => {

  //   const { status: existingStatus} = await Permissions.getAsync(
  //     Permissions.NOTFICATIONS
  //   );
  //   let finalStatus = existingStatus;

  //   if(existingStatus !== 'granted'){
  //     const {status } = await Permissions.askAsync(Permissions.NOTFICATIONS);
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted'){
  //     return;
  //   }

  //   let token = await Notfications.getExpoPushTokenAsync();
  // }

  render(){
    if ((!this.state.isLoadingComplete || !this.state.isAuthenicationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={ this.handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {(this.state.isAuthenticated ? <MainTabNavigator/> : <AppNavigator />)}
        </View>
        );
      }
    }

loadResourcesAsync = async() => {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

handleLoadingError = (error) => {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
