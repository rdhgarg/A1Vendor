import React from 'react';
import { View, ActivityIndicator, Image, Dimensions, StyleSheet,ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image'
export default class ImageLoadView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
               <FastImage
                            style={this.props.style}
                            source={{
                                uri: this.props.source,
                                headers: { Authorization: 'someAuthToken' },
                               // priority: FastImage.priority.normal,
                            }}
                           
                           // resizeMode={this.props.resizeMode}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                          //  resizeMode={FastImage.resizeMode.contain}
                        >
                            <ActivityIndicator style={this.props.activityIndicatorStyle} animating={true} size='large'   color="#41599c"  animating={this.state.loading} />
                        </FastImage>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityIndicator: {
        position: 'absolute', zIndex: 1, backgroundColor: "transparent"
    }
})
