import React, { Component } from 'react';
import {
  View,
  Image,
  BackHandler, StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class AnatomyExample extends Component {
    constructor(props){
        super(props);
            this.state = {
            timePassed: false
        };
    }
      
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        try {
          AsyncStorage.getItem('SPLogin').then(asyncStorageRes => {
            if (asyncStorageRes !== null) {
              // We have data!!
              var result = JSON.parse(asyncStorageRes)
              if(result.logined == '1'){
                //this.setState({ SPlogined : true });
                this.props.navigation.navigate('Home')
              }else{
                setTimeout(() => {
                  this.props.navigation.navigate('Login');
                  }, 1500);
              }
            }else{
              setTimeout(() => {
                this.props.navigation.navigate('Login');
                }, 1500);
              console.log('Null');
            }
          });
        } catch (error) {
          // Error retrieving data
            console.log(error);
        };
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        //this.handleBackButton;
    }
    
    handleBackButton() {
        BackHandler.exitApp()
        return true;
    }

    render() {
        return (
            <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image style={{width: 150, height: 150}}source={require('../src/Sp_ic.png')}/>
        </View>
        );
    }
}

export default AnatomyExample;