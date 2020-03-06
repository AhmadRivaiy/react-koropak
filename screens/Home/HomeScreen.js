import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    StatusBar, Image, ScrollView, Alert
  } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View, Badge } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component {
  constructor(props){
    super(props);
     this.state = {
       namaUser: '',
       emaiUser: '',
       namaJabUser: ''
     }
  }

  componentDidMount(){
    this.getDataStore();
  }

  getDataStore = async () => {
    try {
      const nama          = await AsyncStorage.getItem('SPNama')
      const email         = await AsyncStorage.getItem('SPEmail')
      const nama_jabatan  = await AsyncStorage.getItem('SPNAMA_Jabatan')

      var resNama = JSON.parse(nama)
      var resEmail = JSON.parse(email)
      var resNamaJab = JSON.parse(nama_jabatan)

      this.setState({
        namaUser: resNama.nama,
        emaiUser: resEmail.email,
        namaJabUser: resNamaJab.nama_jabatan
      })
      console.log('Readed')
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  delShared(){
    try {
      // let keyValue =  JSON.stringify({ logined: '0' })
      // AsyncStorage.setItem('SPLogin', keyValue);
      AsyncStorage.clear().then(() => console.log('Logouted'))
      // console.log('Logouted')
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#f1f1f1'}}>
            <Body>
                <Title style={{fontWeight: 'bold', color: 'gray'}}>Home</Title>
            </Body>
            <Right>
                <TouchableOpacity style={styles.icNotif}>
                  <MaterialCommunityIcons name='bell' size={22} color={'#ffc04d'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icMenu} onPress={
                    () => Alert.alert(
                      'Logout',
                      'Keluar Dari Aplikasi?',
                      [
                        {text: 'NO', onPress: () => '', style: 'cancel'},
                        {text: 'YES', onPress: () => this.delShared() & this.props.navigation.dispatch(StackActions.reset({index: 0,actions: [NavigationActions.navigate({ routeName: 'Login' })],}))},
                      ]
                    )
                  }>
                  <MaterialCommunityIcons name='dots-vertical' size={22} color={'#ffc04d'}/>
                </TouchableOpacity>
            </Right>
        </Header>
        <StatusBar backgroundColor="#436775" barStyle="light-content" />
        <Content>
          <ScrollView>
          <Grid style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Row>
                <View style={styles.photoProfile}>
                  <Image 
                  source={{uri : 'https://img.icons8.com/bubbles/2x/admin-settings-male.png'}}
                  //source={require('./src/img/user.png')}
                  style={{width: 120, height: 120, borderRadius: 150/2, marginTop: 17, marginBottom: 13}} />
                </View>
              </Row>
              <Row>
                <Text style={{fontWeight: 'bold', color: '#7a7a7a'}}>{this.state.namaUser}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 14, color: '#7a7a7a'}}>{this.state.emaiUser}</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 12, color: '#7a7a7a'}}>{this.state.namaJabUser}</Text>
              </Row>
              <Row style={{padding: 10}}>
                <View style={{width: '100%', height: 1, backgroundColor: 'gray'}}></View>
              </Row>
              <Row>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#7a7a7a'}}>Today</Text>
              </Row>
              <Row>
                <Text style={{fontSize: 12, color: '#7a7a7a'}}>Jum, 28 Feb 2020 10:10:10</Text>
              </Row>
          </Grid>
          <Grid style={{margin: 8}}>
            <Row style={{padding: 5}}>
              <TouchableOpacity style={styles.notifDisMasuk} onPress={() => this.props.navigation.navigate('Disposisi')}>
                <Grid>
                  <Col size={5}><Text style={styles.fontNotif}>Disposisi Masuk</Text></Col>
                  <Col><Badge danger><Text style={styles.fontBadge}>1</Text></Badge></Col>
                </Grid>
              </TouchableOpacity>
            </Row>
            <Row style={{padding: 5}}>
              <TouchableOpacity style={styles.notifSrtMasuk} onPress={() => this.props.navigation.navigate('SuratMasuk')}>
                <Grid>
                  <Col size={5}><Text style={styles.fontNotif}>Surat Masuk</Text></Col>
                  <Col><Badge danger><Text style={styles.fontBadge}>3</Text></Badge></Col>
                </Grid>
              </TouchableOpacity>
            </Row>
            <Row style={{padding: 5}}>
              <TouchableOpacity style={styles.notifSrtKeluar}>
                <Grid>
                  <Col size={5}><Text style={styles.fontNotif}>Surat Keluar</Text></Col>
                  <Col><Badge danger><Text style={styles.fontBadge}>5</Text></Badge></Col>
                </Grid>
              </TouchableOpacity>
            </Row>
          </Grid>
          </ScrollView>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: '#fdfdfd'}}>
              <Grid>
                  <Col>
                    <TouchableOpacity style={styles.bottomMenu} onPress={() => this.props.navigation.navigate('SuratMasuk')}>
                        <MaterialCommunityIcons name='email-outline' size={18} color={'gray'}/>
                        <Text style={styles.fontMenu}>Inbox</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.bottomMenu}>
                        <MaterialCommunityIcons name='email-open-outline' size={18} color={'gray'}/>
                        <Text style={styles.fontMenu}>Outbox</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.bottomMenuSelected}>
                        <MaterialCommunityIcons name='home-outline' size={24} color={'#5cacee'}/>
                        <Text style={styles.fontMenuSelected}>Home</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.bottomMenu} onPress={() => this.props.navigation.navigate('Disposisi')}>
                        <MaterialCommunityIcons name='file-document-outline' size={18} color={'gray'}/>
                        <Text style={styles.fontMenu}>Disposisi</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity style={styles.bottomMenu}>
                        <MaterialCommunityIcons name='history' size={18} color={'gray'}/>
                        <Text style={styles.fontMenu}>Riwayat</Text>
                    </TouchableOpacity>
                  </Col>
              </Grid>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icNotif: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  icMenu: {
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  photoProfile: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  notifDisMasuk: {
    backgroundColor: '#5cacee',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  notifSrtMasuk: {
    backgroundColor: '#0086ad',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  notifSrtKeluar: {
    backgroundColor: '#00c78c',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  bottomMenu: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    alignItems: 'center',
    paddingTop: 9
  },

  bottomMenuSelected: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    alignItems: 'center',
    paddingTop: 5
  },

  fontMenu:{
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'capitalize',
    color: 'gray'
  },

  fontMenuSelected:{
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'capitalize',
    color: '#5cacee'
  },

  fontNotif: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
    padding: 5
  },

  fontBadge: {
    fontSize: 11,
    color: 'white',
    fontWeight: 'bold',
    padding: 2
  },
})

export default HomeScreen;