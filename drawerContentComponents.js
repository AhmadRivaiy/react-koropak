import React, { Component } from 'react';
import { DrawerNavigationItems } from 'react-navigation-drawer';
import { Text, View, StyleSheet, ImageBackground } from 'react-native'

class drawerContentComponents extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <ImageBackground source={require('./assets/img/bg_nav_header.jpg')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                        <Text style={styles.headerText}>Header Portion</Text>
                        <Text style={styles.headerText}>You can display here logo or profile image</Text>
                    </ImageBackground>
                </View>
            </View>

        )
      }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20, 
        textAlign: 'center'
    },
    selectedTextStyle: {
        fontWeight: 'bold',
        color: '#00adff'
    },
    activeBackgroundColor: {
        backgroundColor: 'grey'
    }
});

export default drawerContentComponents;
