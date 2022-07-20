import React from 'react';
import NavigationProvider from './app/navigation/NavigationContext';
import { View } from 'react-native';
import Routes from './app/navigation/Routes';
import ActivityIndicatorApp from './app/config/ActivityIndicatorApp'
import RemotePushController from './app/config/RemotePushController'
import FlashMessage from "react-native-flash-message";


export default class App extends React.Component {
  render() {
    return (
      // <NavigationProvider />

      <View style={{ flex: 1 }}>
        <Routes />
        <RemotePushController />
        <ActivityIndicatorApp />
        <FlashMessage
          position="bottom"
          floating
          icon={{ icon: "auto", position: "left" }}
          style={{  marginBottom: "10%",backgroundColor:"#000" }}
        />
      </View>
    )
  }
};