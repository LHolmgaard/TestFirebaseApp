
import React from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity,Alert} from 'react-native';

import {NavigationActions, StackActions} from  'react-navigation'
import HomeScreen from '../HomeScreen';
import tabNavigator from '../../navigation/MainTabNavigator';
import * as firebase from 'firebase'
export default class LoginScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            email: "test@test.com",
            password:"tester",
        }
    }
    
    onLoginPress = () => {

        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(() => { }).catch(err => {
                Alert.alert(err.message);
                console.log(err)
            })
    }
    
    onCreacteAccountPress = () => { 

        // this.props.navigation.navigate("Signup")
        var navActions = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:"Signup"})
            ]
        })
        this.props.navigation.dispatch(navActions);
    }
    onForgotPasswordPress = () => {

        var navActions = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:"ForgotPassword"})
            ]
        })
        this.props.navigation.dispatch(navActions);
    }
    render(){
        return (
            <View style ={Styles.container}>
                <TextInput style={{width:200, height:40, borderWidth:1 }} value={this.state.email} onChangeText={(text) => {this.setState({email:text})}}></TextInput>
                <TextInput style={{width:200, height:40, borderWidth:1 }} value={this.state.password} onChangeText={(text) => {this.setState({password:text})}}></TextInput>
            
                <TouchableOpacity style = { Styles.customButton} onPress={this.onLoginPress}><Text style = {Styles.buttonText}>Login</Text></TouchableOpacity>
                <TouchableOpacity style = { Styles.customButton} onPress={this.onCreacteAccountPress}><Text style = {Styles.buttonText}>Create Account</Text></TouchableOpacity>
                <TouchableOpacity style = { Styles.customButton} onPress={this.onForgotPasswordPress}><Text style = {Styles.buttonText}>Forgot password...</Text></TouchableOpacity>
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