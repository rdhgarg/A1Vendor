import React from 'react';
import { Text, View, ScrollView, StyleSheet,TextInput, Dimensions, SafeAreaView, } from 'react-native';
import AppHeader from '../Comman/AppHeader';
import { WebView } from 'react-native-webview';
import Helper from '../Lib/Helper';

export default class WebPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.route.params?.type  
        }
        AppHeader({ ...this.props.navigation, leftTitle: this.props.route.params?.title  })
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView source={{ uri: this.props.route.params?.link}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                /> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
   
});