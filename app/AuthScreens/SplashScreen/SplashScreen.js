import React from 'react';
import { ImageBackground, View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';
import styles from './SplashScreenStyles';
import { images } from '../../Assets/imagesUrl';
import Colors from '../../Assets/Colors';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';
import Helper from '../../config/Helper';



export default class SplashScreen extends React.Component {

    componentDidMount() {
        // SplashScreen.hide()
        setTimeout(() => {
            Helper.getData('user_details').then((userDetails) => {
                console.log("IS_lgin", userDetails);
                if (userDetails) {
                    Helper.userData = userDetails;
                    Helper.user_id = userDetails.id
                    // this.props.navigation.replace('Slider')
                    this.props.navigation.replace('Home')
                }
                else {
                    Helper.getData('HideWelcomeScreen').then((screenData) => {
                        if (screenData) {
                            this.props.navigation.navigate('LoginScreen')
                        } else {
                              this.props.navigation.replace('LoginScreen')
                        }
                    })
                }
            })
        }, 1000)
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'#FFFFFF' }}>
                <Image source={images.splash} resizeMode={'cover'}
                    style={{ width: '100%', height: '100%' }} />
            </View>
        )
    }

};
