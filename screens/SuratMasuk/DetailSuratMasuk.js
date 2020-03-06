import React, { Component } from 'react';
import { BackHandler, View, Text, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';

import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';

class DetailSuratMasuk extends React.Component {
    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        this.state = {
            idSuratMsk: params.id,
            detailMsk: [],
            idKantorUser: '',
            nameFile: []
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.getDataStore();
    }
    
    componentWillUnmount() {
        this.backHandler.remove()
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
          this.getDetailInbox();
        } catch(e) {
          console.log(e)
          // error reading value
        }
    }

    getDetailInbox(){
        try{
            axios.get('http://103.108.158.181/LetterApp/Msg_Pimpinan/detailSrtMasuk?id_surat_msk=' + this.state.idSuratMsk + '&id_kantor=' + this.state.idKantorUser)
            .then(res =>{
                var array_data = [];
                array_data.push(res.data)
                this.setState({ detailMsk : array_data })
                this.getImgFile();
                console.log(array_data)
            }).catch((err) => {
                console.log(err);
            })
        }catch (error){
            console.log(error)
        }
    }

    getImgFile(){
        try{
            axios.get('http://103.108.158.181/LetterApp/Msg_Pimpinan/getImg?id_surat_msk=' + this.state.idSuratMsk)
            .then(res =>{
                this.setState({ nameFile : res.data.list_img })
                console.log(res.data.list_img)
            }).catch((err) => {
                console.log(err);
            })
        }catch (error){
            console.log(error)
        }
    }

    render() {
        var srf = this.state.detailMsk.map((sheet, i) => {
            return(
                <Card
                    key={i}
                    containerStyle={{borderRadius: 10}}
                    title='Surat Masuk'>
                        <View>
                            <Text style={styles.titleList}>Asal Surat : </Text>
                            <Text>{sheet.asal_surat_msk}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>Tanggal Surat : </Text>
                            <Text>{sheet.tgl_surat_msk}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>Nomor Surat : </Text>
                            <Text>{sheet.no_surat_msk}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>Nomor Agenda : </Text>
                            <Text>{sheet.no_agenda_msk_tikomdik}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>Isi Ringkasan Surat : </Text>
                            <Text>{sheet.isi_surat_msk}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>Keterangan Surat : </Text>
                            <Text>{sheet.keterangan_msk}</Text>
                        </View>

                        <View style={styles.viewList}>
                            <Text style={styles.titleList}>File : </Text>
                            <Text>{sheet.files}</Text>
                        </View>
                </Card>
            )
        })

        var imgList = this.state.nameFile.map((row, i) => {
            return(
                <View key={i}>
                    <Text style={{marginTop: 10}}>Lembar ke-{row.halaman}</Text>
                    <Image
                        source={{ uri: 'http://103.108.158.181/Koropak-app/uploads/surat_masuk/' + row.img_files }}
                        style={{ width: '100%', height: 400, borderRadius: 12 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
            )
        })

        return (
          <Container>
            <Tabs>
              <Tab heading="Detail Surat">
                <ScrollView>
                    <View>
                        {srf}
                    </View>
                    <View>
                        <Card
                            containerStyle={{borderRadius: 10}}
                            >
                            {imgList}
                        </Card>
                    </View>
                </ScrollView>
              </Tab>
              <Tab heading="Input Disposisi">
                <InputDisposisi />
              </Tab>
            </Tabs>
          </Container>
        );
      }
}

class InputDisposisi extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true
        }
    }

    ActivityIndicatorLoadingView() {
        //making a view to show to while loading the webpage
        return (
            <View style={[styles.containerSpin, styles.horizontalSpin]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
      }

    render(){       
        return(
            <View style={{flex: 1}}>
                <WebView
                    style={{margin: 10}}
                    source={{ uri: 'http://103.108.158.181/LetterApp/C_FormDisposisi/FormDisKadis' }}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView}
                    startInLoadingState={true}
                    keyboardDisplayRequiresUserAction={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewList: {
        marginTop: 10
    },
    titleList: {
        fontWeight: 'bold'
    },
    containerSpin: {
        flex: 5,
        justifyContent: 'center'
    },
    horizontalSpin: {
        padding: 10
    }
})

export default DetailSuratMasuk;