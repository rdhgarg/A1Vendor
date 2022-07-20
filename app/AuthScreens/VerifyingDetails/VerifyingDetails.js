import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet,  SafeAreaView, } from 'react-native';
import styles from './VerifyingDetailsStyles';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';



export default class VerifyingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('VerificationCodeSend')
        }, 500)
    }

    goToLogin() {
        this.props.navigation.navigate('LoginScreen')
    }

    // goToHomeScreen() {
    //     this.props.navigation.navigate('BottomTab')
    // }


   

    render() {
        return (
            <SafeAreaView  style={{ flex: 1,backgroundColor:Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginTop: 100 }}>
                        <Image source={images.VerifyingDetails} style={{ height: 90, width: 90 }} resizeMode={'contain'} />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{
                            color: Colors.black,
                            fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1
                        }}>Verifying your details</Text>
                    </View>
                   
                </ScrollView>
            </SafeAreaView>
        )
    }

};






