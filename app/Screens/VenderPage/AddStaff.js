import React from 'react';
import { Text, View, ScrollView, Image, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Keyboard, DeviceEventEmitter } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'
import CameraController from '../../config/CameraController'

export default class AddStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_number: '',
            password: '',
            emailID: "",
            name: "",
            arrCategory: [],
            arrSubCategory: [],
            categoryID: '',
            subCategoryID: "",
            serviceID: "",
            profile_Image: "",
            data: this.props.route.params?.data,
            mode: this.props.route.params?.data ? this.props.route.params?.data : "add"
        }
        AppHeader({ ...this.props.navigation, leftTitle: this.state.mode == "add" ? 'Add Staff' : "Profile", borderBottomRadius: 0 })
    }

    componentDidMount() {
        console.log("dasdasdasd------------", this.state.mode)

        let userData = this.props.route.params?.data

        if (userData) {
            this.state.name = userData.name
            this.state.mobile_number = userData.mobile_no
            this.state.emailID = userData.email
            this.setState({})
        }
        // this.getCategory()
    }



    getCategory() {
        let data = {
            vendor_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.userCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrCategory: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    onPressedCamera = (data) => {
        CameraController.open((response) => {
            if (response.path) {
                console.log(response)
                this.setState({ profile_Image: response.path });
                //this.imageUpload(response.path)

            }
        });
    }


    addStaff() {
        Keyboard.dismiss()
        if (this.state.name == '') {
            Helper.showToast('Please enter staff name')
            return false;
        } if (this.state.mobile_number == '') {
            Helper.showToast('Please enter mobile number')
            return false;
        } if (this.state.mobile_number.length < 10) {
            Helper.showToast('Please enter valid mobile number')
            return false;
        }
        // if (this.state.emailID == '') {
        //     Helper.showToast('Please enter staff emailID')
        //     return false;
        // }
        if (this.state.password == '') {
            Helper.showToast('Please enter password')
            return false;
        } if (this.state.password.length < 6) {
            Helper.showToast('Please enter valid password')
            return false;
        }
        let template = new FormData();
        template.append('user_id', Helper.userData.id);
        template.append('name', this.state.name);
        template.append('mobile_no', this.state.mobile_number);
        template.append('email', this.state.emailID);
        template.append('password', this.state.password);
        template.append('services', this.state.serviceID);
        if (this.state.profile_Image == '' || this.state.profile_Image == null) {
        } else {
            template.append('profile_image', {
                uri: this.state.profile_Image,
                name: 'test.jpeg',
                type: 'image/jpeg'
            });
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.createStaff, template, Constant.APIImageUploadAndroid).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {

                DeviceEventEmitter.emit("AddStaff", 'done')
                this.props.navigation.goBack()
                //   handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
            } else {
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })
        //  this.props.navigation.navigate('VerifyingDetails')
    }

    editStaf() {
        Keyboard.dismiss()
        if (this.state.name == '') {
            Helper.showToast('Please enter staff name')
            return false;
        } if (this.state.mobile_number == '') {
            Helper.showToast('Please enter mobile number')
            return false;
        } if (this.state.mobile_number.length < 10) {
            Helper.showToast('Please enter valid mobile number')
            return false;
        }
        let template = new FormData();
        template.append("role_id", Helper.userData.role_id)
        template.append('user_id', Helper.userData.id);
        template.append('name', this.state.name);
        template.append('mobile_no', this.state.mobile_number);
        template.append('email', this.state.emailID);
        template.append('staff_id', this.props.route.params?.data?.id);
        //  template.append('services', this.state.serviceID);
        if (this.state.profile_Image == '' || this.state.profile_Image == null) {
        } else {
            template.append('profile_image', {
                uri: this.state.profile_Image,
                name: 'test.jpeg',
                type: 'image/jpeg'
            });
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.editStaff, template, Constant.APIImageUploadAndroid).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {

                DeviceEventEmitter.emit("AddStaff", 'done')
                this.props.navigation.goBack()
                //   handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
            } else {
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })
        //  this.props.navigation.navigate('VerifyingDetails')
    }




    render() {
        return (
            <SafeAreaView style={renderStyle.safe_area_view}>

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 20 }}>


                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                placeholder={"Staff Name"}
                                //secureTextEntry={true}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>

                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                placeholder={"Staff Mobile Number"}
                                //secureTextEntry={true}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                                value={this.state.mobile_number}
                                onChangeText={(mobile_number) => this.setState({ mobile_number })}
                            />
                        </View>

                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                placeholder={"Staff Email Id"}
                                //secureTextEntry={true}
                                keyboardType={'email-address'}
                                value={this.state.emailID}
                                onChangeText={(emailID) => this.setState({ emailID })}
                            />
                        </View>

                        {this.state.mode == "add" ?
                            <View style={renderStyle.txtView}>
                                <TextInput
                                    style={renderStyle.inputCss}
                                    placeholderTextColor={'#000'}
                                    placeholder={"Staff Password"}
                                    //secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </View>
                            : null}

                        <TouchableOpacity
                            onPress={() => this.onPressedCamera()}
                            style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                placeholder={"Upload Profile Image"}
                                //secureTextEntry={true}
                                editable={false}
                                value={this.state.profile_Image}
                            //  onChangeText={(password) => this.setState({ password })}
                            />
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={()=> this.onPressedCamera()} style={[renderStyle.txtView,{paddingVertical:10,alignItems:'center', flexDirection:'row'}]}>
                            <Text
                                style={[renderStyle.inputCss,{backgroundColor:'#707070', width:130,borderRadius:19,paddingVertical:4, fontSize:12} ]}
                            >  Upload Profile Image</Text>
                            <Text numberOfLines={1} style={{marginLeft:10, width:'55%'}}>{this.state.profile_Image}</Text>
                        </TouchableOpacity> */}


                        {/* <View style={{ backgroundColor: '#F4EDED', marginTop: 20, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrCategory}
                                placeHolder={{}}
                                onValueChange={(value) => { this.setState({ serviceID: value }) }}
                                selectValue={this.state.serviceID}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View> */}

                        {/* <View style={[renderStyle.txtView, { height: 200 }]}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                placeholder={"Service Description"}
                                // secureTextEntry={true}
                                value={this.state.mobile}
                                onChangeText={(mobile) => this.setState({ mobile })}
                            />
                        </View> */}

                        {/* <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                // secureTextEntry={true}
                                multiline={true}
                                value={this.state.mobile}
                                placeholder={"Service Amount"}
                                onChangeText={(mobile) => this.setState({ mobile })}
                            />
                        </View> */}

                        {/* <View style={{ backgroundColor: '#F4EDED', marginTop: 20, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrSubCategory}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({ language_code: value }) }}
                                selectValue={this.state.language_code}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View> */}

                        <TouchableOpacity onPress={() => this.state.mode == "add" ? this.addStaff() : this.editStaf()} style={renderStyle.loginView}>
                            <Text style={renderStyle.loginTxt}>{this.state.mode == "add" ? "Save" : "Update"}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};

const renderStyle = StyleSheet.create({
    safe_area_view: {
        flex: 1, backgroundColor: 'white'
    },
    titleCss: {
        fontSize: 15, marginTop: '5%', fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    txtView: {
        flexDirection: 'column', marginTop: 20, backgroundColor: 'rgb(243,237,237)', borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontWeight: 'bold',
    },
    loginView: {
        alignSelf: "center", marginTop: '10%', backgroundColor: 'black', width: 150, height: 45, justifyContent: 'center', borderRadius: 150 / 2
    },
    addDoc: {
        alignSelf: "center", marginTop: '10%', backgroundColor: 'black', width: '100%', height: 45, justifyContent: 'center', borderRadius: 50

    },
    loginTxt: {
        color: "white", fontSize: 14, alignSelf: 'center'
    },
    txtacc: {
        marginTop: 15, fontSize: 14, color: 'black'
    }
})



const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        height: 40,
        color: '#000',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold,
        marginLeft: 10
    },
    inputAndroid: {
        fontSize: 14,
        height: 40,
        color: '#000',
        textShadowColor: 'black',
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold
    },
});
