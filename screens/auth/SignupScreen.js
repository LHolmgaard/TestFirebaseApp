
import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';

import {NavigationActions, StackActions} from  'react-navigation'
import HomeScreen from '../HomeScreen';
import tabNavigator from '../../navigation/MainTabNavigator';

import * as firebase from 'firebase';
export default class SignupScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            email: "",
            password:"",
            passwordConfirm:""
        }
    }
    
    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm){
            Alert.alert("Passwords do not match")
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() =>{ }, (error) => {
                Alert.alert(error.message);
            })
    }
    
    onBackToLoginPress = () => { 
        var navActions = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:"Login"})
            ]
        })
        this.props.navigation.dispatch(navActions);
    }

    render(){
        return (
            <View style ={Styles.container}>
                <TextInput style={{width:200, height:40, borderWidth:1 }} value={this.state.email} onChangeText={(text) => {this.setState({email:text})}}></TextInput>
                <TextInput style={{width:200, height:40, borderWidth:1 }} value={this.state.password} onChangeText={(text) => {this.setState({password:text})}}></TextInput>
                <TextInput style={{width:200, height:40, borderWidth:1 }} value={this.state.passwordConfirm} onChangeText={(text) => {this.setState({passwordConfirm:text})}}></TextInput>
                <Button title="Singup" onPress={this.onSignupPress}></Button>
                <Button title="Back" onPress={this.onBackToLoginPress}></Button>
            </View>
        )
    }

}

const Styles = StyleSheet.create({
container:{
    backgroundColor:'#6495ED',
    paddingTop:50,
    alignItems:"center",
    height:'100%'
},
button:{
    margin:10,

}
});