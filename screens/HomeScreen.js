import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import {TestComponent} from './../components/AppComponents';
import * as firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys'
import {Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import axios from 'axios';


export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentUser:{},
      isLoadingComplete:false,
      isAuthenicationReady:false,
      isAuthenticated: false,
    };
  }
  onSignoutPress = () =>{
    firebase.auth().signOut();
  }
  

  registerForPushNotificationsAsync = async () => {
    console.log("inside push")
    const { status: existingStatus} = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if(existingStatus !== 'granted'){
      console.log("Inside excistning not granded")
      const {status } = await Permissions.askAsync(Permissions.NOTFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted'){
      console.log("Fejl")
      return;
    }
    console.log("Before try")
    try{
    let token = await Notifications.getExpoPushTokenAsync();
    console.log('Token',token)
    // firebase.database().ref('users/'+this.currentUser.uid+'/push_token').set(token);

    }
    catch(error){
      console.log(error.message)
    }
    
  }

  // sendPushToken = () => {
  //   axios.post()
  // }



  async componentDidMount() {
    this.state.currentUser = await firebase.auth().currentUser;
    await this.registerForPushNotificationsAsync();

  }
  
  render (){
    return (
      <View style={styles.container}>
      <Text>Hello</Text>
      <TestComponent/>
      <TouchableOpacity style={styles.customButton} onPress={this.onSignoutPress}><Text style={styles.buttonText}>Signout</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  customButton: {
    padding:10,
    marginBottom:10,

    
},
buttonText:{
    textAlign:'center',
    color:'blue',
    fontSize:20,
}
});
