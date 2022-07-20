import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';


export default class VerificationCodeSend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('EnterTheverificationcode')
        }, 500)
    }
    goToLogin() {
        this.props.navigation.navigate('LoginScreen')
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginTop: 150 }}>
                        <Image source={images.Groupright} style={{ height: 100, width: 100 }} resizeMode={'contain'} />
                    </View>


                    <View style={{ alignItems: 'center', marginVertical: 5, marginTop: 50 }}>
                        <View style={{ width: 300, justifyContent: 'center' }}>
                            <Text style={{
                                textAlign: 'center', fontSize: fonts.fontSize14,
                                color: Colors.black, fontFamily: fonts.RoBoToMedium_1
                            }}>We’ve sent a verification code to your mobile number.</Text>
                        </View>

                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }

};






