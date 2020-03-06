import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

class DisposisiScreen extends React.Component {
    navigateToScreen = (route) => (
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      })

  render() {
    return (
      <Container>
        <Content style={{margin: 50}}>
          <Text>
            List Disposisi
          </Text>
          <Button onPress={this.navigateToScreen('DetailDisposisi')}>
              <Text>Ke Detail Disposisi</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default DisposisiScreen;