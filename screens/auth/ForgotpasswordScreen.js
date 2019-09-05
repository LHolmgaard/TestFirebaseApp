
import React from 'react';
import {StyleSheet, View, Text, TextInput, Button } from 'react-native';
import {NavigationActions, StackActions} from  'react-navigation'
export default class ForgotPaasswordScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            email:""
        }
    }

    onResetPasswordPress = () => {

        var navActions = StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:"Login"})
            ]
        })
        this.props.navigation.dispatch(navActions);
    }

    onBackPress = () =>{
        
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
            
                <Button title="Reset password" onPress={this.onResetPasswordPress}></Button>
                <Button title="Back to login" onPress={this.onBackPress}></Button>
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
});