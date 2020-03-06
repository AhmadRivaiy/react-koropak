import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet, Switch,
  ImageBackground, StatusBar
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Container, Header, ListItem, Content, Card, CardItem, Button, Left, Right, Body, Text, Input, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';

import Feather from 'react-native-vector-icons/dist/Feather';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';

import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/Home/HomeScreen'

import DisposisiScreen from './screens/Disposisi/DisposisiScreen'
import DetailDisposisiScreen from './screens/Disposisi/DetailDisposisi'
import SuratMasukScreen from './screens/SuratMasuk/SuratMasukScreen';
import DetailSuratMasukScreen from './screens/SuratMasuk/DetailSuratMasuk'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      SPlogined: false,
      showPassword: true,
      email: '',
      password: '',
      dataSource: []
    };
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

    
  logoutBtn() {
    Alert.alert(
      'Logout',
      'Keluar Dari Aplikasi?',
      [
        {text: 'NO', onPress: () => '', style: 'cancel'},
        {text: 'YES', onPress: () => this.props.navigation.dispatch(resetAction)},
      ]
    );
  }

  handleLogin = () => {
    var emailData = this.state.email;
    var passwordData = this.state.password;
    return fetch('http://103.108.158.181/LetterApp/Login_Disdik/ceklogin?email=' + emailData + '&password=' + passwordData, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.statusLogin.map((item, i)=>{
        if(item.status == 'true'){
          try {
            let keyValue    =  JSON.stringify({ logined: '1' })
            let level       =  JSON.stringify({ level: item.level })
            let id_jabatan  =  JSON.stringify({ id_jabatan: item.id_jabatan })
            let email       =  JSON.stringify({ email: item.email })
            let nama        =  JSON.stringify({ nama: item.nama })
            let id_bidang   =  JSON.stringify({ id_bidang: item.id_bidang })
            let id_kantor   =  JSON.stringify({ id_kantor: item.id_kantor })
            let nama_jabatan=  JSON.stringify({ nama_jabatan: item.nama_jabatan })
            let id_master   =  JSON.stringify({ id_master: item.id_master })

            AsyncStorage.setItem('SPLogin', keyValue);
            AsyncStorage.setItem('SPLevel', level);
            AsyncStorage.setItem('SPEmail', email);
            AsyncStorage.setItem('SPID_Jabatan', id_jabatan);
            AsyncStorage.setItem('SPNama', nama);
            AsyncStorage.setItem('SPID_Bidang', id_bidang);
            AsyncStorage.setItem('SPID_Kantor', id_kantor);
            AsyncStorage.setItem('SPNAMA_Jabatan', nama_jabatan);
            AsyncStorage.setItem('SPID_Master', id_master);

            this.props.navigation.navigate('Home')
          } catch (error) {
            // Error saving data
            console.log(error);
          }
        }else{
          Alert.alert('', 'Username atau Password Salah')
        }
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <Container>
        <StatusBar backgroundColor="#192d74" barStyle="light-content" />
        <ImageBackground source={require('./src/img/bg_login.jpg')} style={{flex: 1, justifyContent: 'center'}} >
        <Content style={{marginLeft: 30, marginRight: 30 , marginTop: 120}}>
            <Card style={{borderRadius: 8, padding: 15}}>
              <Grid>
                <Row>
                  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 20}}>
                    <Text>Koropak APP</Text>
                  </View>
                  </Row>
                    <Row>
                      <View style={{flex: 1, marginBottom: 5}}>
                        <Grid>
                          <Col style={{backgroundColor: '#737A82'}} size={1}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Fontisto name='email' size={25} color='#fff' />
                            </View>
                          </Col>
                          <Col size={6}>
                            <TextInput
                              style={{ height: 45, borderColor: '#505863', borderWidth: 1, backgroundColor: '#505863', color: '#E3E3E3' }}
                              placeholder='Email'
                              placeholderTextColor="#E3E3E3"
                              textContentType='emailAddress'
                              onChangeText={(email) => this.setState({email})}
                              value={this.state.email}
                            />
                          </Col>
                        </Grid>
                      </View>
                    </Row>
                    <Row>
                      <View style={{flex: 1, marginTop: 5}}>
                        <Grid>
                          <Col style={{backgroundColor: '#737A82'}} size={1}>
                            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                              <Feather name='lock' size={25} color='#fff' />
                            </View>
                          </Col>
                          <Col size={6}>
                            <Input
                              style={{ height: 45, borderColor: '#505863', borderWidth: 1, backgroundColor: '#505863', color: '#E3E3E3', fontSize: 14 }}
                              placeholder='Password'
                              placeholderTextColor="#E3E3E3"
                              secureTextEntry={this.state.showPassword}
                              onChangeText={(password) => this.setState({password})}
                              value={this.state.password}
                            />
                          </Col>
                        </Grid>
                      </View>
                    </Row>
                  <Row>
                    <View style={{ flexDirection: 'row', marginTop:15, marginBottom: 15 }}>
                    <Switch
                      onValueChange={this.toggleSwitch}
                      value={!this.state.showPassword}
                    /> 
                    <Text>Show Pasword</Text>
                    </View>
                  </Row>
                  <Row>
                  <View style={{flex: 1, marginLeft:10, marginRight: 10}}>
                    <Button 
                    full success //onPress={() => this.props.navigation.navigate('Home')}
                    onPress={this.handleLogin}>
                      <Text style={{fontWeight: 'bold'}}> Login </Text>
                    </Button>
                  </View>
                </Row>
              </Grid>
            </Card>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const KoropakApp = createStackNavigator({
  Splash: { screen: SplashScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Login: { screen : LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Home: { screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Disposisi: { screen: DisposisiScreen },
  DetailDisposisi: { screen: DetailDisposisiScreen,
    navigationOptions: { 
      title: 'Detail Disposisi'
    }
  },
  SuratMasuk: { screen: SuratMasukScreen,
    navigationOptions: {
      title: 'Surat Masuk'
    }
  },
  DetailSuratMasuk: { screen: DetailSuratMasukScreen,
    navigationOptions: { 
      title: 'Detail Surat'
    }
  },
},
{
  initialRouteName: 'Splash'
})

export default createAppContainer(KoropakApp);