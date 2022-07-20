import React from 'react';
import { Text, View, ScrollView, Image, TextInput, StyleSheet, SafeAreaView, Button } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import OTPInput from 'react-native-otp';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import { GButton } from '../../Comman/GButton';
import AppHeader from '../../Comman/AppHeader';


export default class EnterTheverificationcode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ''
        }
        AppHeader({
            ...this.props.navigation, leftTitle: '',
            hideLeftBackIcon: false,
        })
    }

    clearOTP = () => {
        this.setState({ otp: undefined })
    }

    autoFill = () => {
        this.setState({ otp: '2211' })
    }

    goToVerified() {
        this.props.navigation.navigate('Verified')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginVertical: 5, marginTop: '20%' }}>
                        <View style={{ width: 200, justifyContent: 'center' }}>
                            <Text style={{
                                textAlign: 'center', fontSize: fonts.fontSize14,
                                color: Colors.black, fontWeight: 'bold',
                                fontFamily: fonts.RoBoToMedium_1
                            }}>Enter The verification code</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>

                        <View style={{ height: 48, width: 48, borderWidth: 1, borderColor: '#D4D4D4', borderRadius: 48 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'5'}
                                maxLength={1}
                                
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, marginHorizontal: 10, borderColor: '#D4D4D4', borderWidth: 1, borderRadius: 48 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'9'}
                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, borderWidth: 1, borderRadius: 48 / 2, borderColor: '#D4D4D4', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'0'}
                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                        <View style={{ height: 48, width: 48, marginLeft: 10, borderWidth: 1, borderRadius: 48 / 2, borderColor: '#D4D4D4', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                placeholder={'3'}
                                maxLength={1}
                                style={{ fontSize: 20, textAlign: 'center' }}
                            />
                        </View>
                    </View>


                    {/* <View>
<OTPInputView
                            style={{ width: '60%', height: 50, }}
                            pinCount={4}
                            onCodeChanged={code => { this.setState({  }) }}
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                        /> 
</View> */}



                    <View style={{
                        marginVertical: 10,
                        marginTop: 15,
                        marginHorizontal: 25
                    }}>
                        <GButton
                            Text='VERIFY'
                            width={'90%'}
                            height={50}
                            borderRadius={25}
                            onPress={() => { this.goToVerified() }}
                        />
                    </View>


                    <View style={{
                        alignItems: 'center', justifyContent: 'space-between', marginVertical: 10,
                        flexDirection: 'row', marginHorizontal: 40
                    }}>

                        <TouchableOpacity onPress={this.clearOTP}>
                            <Text style={{ color: '#94A5A6', fontSize: 12 }}>Change Number</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={this.autoFill}>
                            <Text style={{ color: '#000', fontSize: 12 }}>Resend OTP after 30 sec</Text>
                        </TouchableOpacity>



                    </View>




                </ScrollView>
            </SafeAreaView>
        )
    }

};


const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 50,
        height: 50,

        borderWidth: 1,
        fontSize: 25,
        borderRadius: 3,
        borderColor: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});
