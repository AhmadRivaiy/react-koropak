import React, { Component } from 'react';
import { TouchableOpacity, BackHandler } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Image, Thumbnail, Content, Card, CardItem, Button, Left, Right, Body, Icon, Text, View, Grid, Col, Row } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class SuratMasukScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mskData: [],
            idKantorUser: ''
        }
    }

    navigateToScreen = (route) => (
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.getDataStore();
    }

    componentWillUnmount() {
        this.backHandler.remove()
        try{
            this.focusListener.remove();
          }catch(err){
            console.log(err)
        }
    }
    
    handleBackPress = () => {
        this.props.navigation.goBack(null); // works best when the goBack is async
        return true;
    }

    getDataStore = async () => {
        try {
          const id_kantor = await AsyncStorage.getItem('SPID_Kantor')
          var resIdKan = JSON.parse(id_kantor)
          this.setState({
            idKantorUser: resIdKan.id_kantor
          })
          console.log('Readed List Surat Masuk :' + this.state.idKantorUser)
          this.getDataInbox();
        } catch(e) {
          console.log(e)
          // error reading value
        }
      }

    getDataInbox(){
      const { navigation } = this.props;
        try{
            this.focusListener = navigation.addListener('didFocus', () => {
                axios.get('http://103.108.158.181/LetterApp/Msg_Pimpinan/listSrtMasuk?id_kantor=' + this.state.idKantorUser)
                .then(res =>{
                    var dataResult = res.data.list_message
                    this.setState({ mskData : dataResult })
                    console.log('Data Terambil')
                }).catch((err) => {
                    console.log(err);
                })
            })
        }catch (error){
            console.log(error)
        }
    }

  render() {
    var listInbox = this.state.mskData.map((sheet, i) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailSuratMasuk', {id: sheet.id_surat_msk})} key={i}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://cdn3.iconfinder.com/data/icons/minimal-utility/512/mail.png'}} />
                            <Body>
                                <Grid>
                                    <Row style={{paddingTop: 3}}><Grid><Col size={4}><Text>{sheet.judul}</Text></Col><Col size={1} style={{alignContent: 'flex-end'}}><Text>{sheet.tgl_surat_msk}</Text></Col></Grid></Row>
                                    <Row><Text note>{sheet.isi_surat_msk}</Text></Row>
                                </Grid>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    })
    return (
      <Container>
        <Content>
            {listInbox}
        </Content>
      </Container>
    );
  }
}

export default SuratMasukScreen;