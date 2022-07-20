import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
// import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import { GButton } from '../../Comman/GButton';
import IconInput from '../../Comman/GInput';
import CameraController from '../../Comman/NewCameraController';

export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfle:{
                name: '',
                mobile: '',
                email: '',
                D_O_B: ''
            }
        }
    }


    signup_Submit() {

    }

    goToLogin() {
        this.props.navigation.navigate('LoginScreen')
    }


    setValues(key, value) {
        let userProfle = { ...this.state.userProfle }
        userProfle[key] = value;
        this.setState({ userProfle })
    }

    chooseImage = () => {
        this.setState({ isCameraShow: true })
    }

    onExitMethod() {
        this.setState({ isCameraShow: false })
    }

    UploadMediaMethod(uri) {
        this.setValues('profile_picture', uri)
        this.setState({ isCameraShow: false, avatarSource: uri })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <View style={{
                            borderWidth: 1, borderColor: '#0000004D', height: 125, width: 125,
                            alignItems: 'center', justifyContent: 'center', borderRadius: 125 / 2
                        }}>
                            <Image source={images.usereasybuddy} style={{ height: 70, width: 70, }}
                                resizeMode={'contain'} />
                        </View>
                        <TouchableOpacity
                         onPress={() => { this.chooseImage() }}
                          style={{
                            backgroundColor: Colors.black,
                            width: 30, height: 30, borderRadius: 30 / 2, justifyContent: 'center',
                            alignItems: 'center', position: 'absolute', bottom: 0, right: 150
                        }}>
                            <Image source={images.Iconfeathercamera}
                                resizeMode={'contain'}
                                style={{ height: 15, width: 15 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginVertical: 10,
                        marginTop: 20,
                        marginHorizontal: 25
                    }}>

                        <IconInput
                            imagePathRight={images.Iconawesomeuseralt}
                            label="Name"
                            rightHeight={18}
                            rightWidth={18}
                            placeholder="Raman Sinha"
                            placeholderTextColor={Colors.black}
                            setFocus={() => { this.mobile.focus(); }}
                            returnKeyType="next"
                            maxLength={30}
                            keyboardType={'default'}
                            onChangeText={(name) => this.setValues('name', name)}
                            value={this.state.userProfle.name}
                        />

                        <IconInput
                            imagePathRight={images.Iconawesomemobilealt}
                            label="Mobile"
                            rightHeight={18}
                            rightWidth={18}
                            placeholder="9830123456"
                            getFocus={(input) => { this.mobile = input }}
                            setFocus={(input) => { this.email.focus(); }}
                            placeholderTextColor={Colors.black}
                            returnKeyType="next"
                            maxLength={30}
                            keyboardType={'default'}
                            onChangeText={(mobile) => this.setValues('mobile', mobile)}
                            value={this.state.userProfle.mobile}
                        />


                        <IconInput
                            imagePathRight={images.Iconzocialemail}
                            label="Email"
                            rightHeight={18}
                            rightWidth={18}
                            placeholder="Add email"
                            getFocus={(input) => { this.email = input }}
                            setFocus={(input) => { this.D_O_B.focus(); }}
                            placeholderTextColor={Colors.black}
                            returnKeyType="next"
                            maxLength={30}
                            keyboardType={'default'}
                            onChangeText={(email) => this.setValues('email', email)}
                            value={this.state.userProfle.email}
                        />



                        <IconInput
                            imagePathRight={images.Iconawesomecalendaralt}
                            label="D.O.B"
                            rightHeight={18}
                            rightWidth={18}
                            placeholder="Add date of birth"
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.D_O_B = input }}
                            returnKeyType="next"
                            maxLength={30}
                            keyboardType={'default'}
                            onChangeText={(D_O_B) => this.setValues('D_O_B', D_O_B)}
                            value={this.state.userProfle.D_O_B}
                        />

                    </View>



                    <View style={{
                        marginVertical: 10,
                        marginTop: 15,
                        marginHorizontal: 25
                    }}>
                        <GButton
                            Text='NEXT'
                            width={'50%'}
                            height={50}
                            borderRadius={25}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>



                    {/* <View style={{ alignItems: 'center', marginVertical: 5, marginTop: 50 }}>
                        <View style={{ width: 300, justifyContent: 'center' }}>
                            <Text style={{
                                textAlign: 'center', fontSize: fonts.fontSize14,
                                color: Colors.black, fontFamily: fonts.RoBoToMedium_1
                            }}>We’ve successfully verified your account</Text>
                        </View>

                    </View> */}

                </ScrollView>
                {this.state.isCameraShow && <CameraController UploadMediaMethod={(data) => this.UploadMediaMethod(data)} onExitMethod={() => this.onExitMethod()}></CameraController>}
            </SafeAreaView>
        )
    }

};






