import React from 'react';
import { Text, View, ScrollView, Image, TextInput, StyleSheet, SafeAreaView, } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Helper from '../../config/Helper'

import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import CameraController from '../../config/CameraController'
import RNPickerSelect from '../../Comman/CommonPicker'


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchOnNotification: true,
            name: Helper.userData.name,
            mobile: Helper.userData.mobile_no,
            email: Helper.userData.email,
            dob: '',
            profileImage: '',
            datePicker: false,
            profile_Image: Helper.userData.profile_image,
            arrCity: [],
            arrState: [],
            country:Helper.userData.country,
            cityState: Helper.userData.state,
            city:Helper.userData.city,
            Pincode :Helper.userData.pincode,
            Address : Helper.userData.address,
            business_name:Helper.userData.business_name,
            alternate_mobile : Helper.userData.alternate_mobile,
            experience : Helper.userData.experience,
            arrCountry: [
                { label: '', value: '' },
                { label: 'India', value: 'India' },
                { label: 'UK', value: 'UK' },
            ],
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Profile', borderBottomRadius: 0 })

    }

    componentDidMount() {
        console.log(Helper.userData);
        this.getCountry()

    }


    setDate = (event, date) => {
        this.setState({ dob: moment(date).format('DD-MM-YYYY'), datePicker: false })
    };




    getStateValue(value) {
      
        this.setState({ cityState: value }) 
        let data = {
            country_id: value
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.states, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("myService ----------", response.data)
            if (response.status == true) {
                this.setState({ arrState: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getCountry() {
        let data ={
            user_id : Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.country,"", Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("myService ----------", response.data)
            if (response.status == true) {
                this.setState({ arrCountry: response.data, });
               

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getCity(value) {
        this.setState({ cityState: value })
        //  this.setState({ cityState: value }) 
        let data = {
            state_id: value
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.city, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("myService ----------", response.data)
            if (response.status == true) {
                this.setState({ arrCity: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                {this.state.datePicker && (
                    <DateTimePicker
                        //  testID="dateTimePicker"
                        value={new Date()}
                        mode={'date'}
                        is24Hour={false}
                        display="default"
                        onChange={this.setDate}
                    // onChange={(day)=>this.onChange(day)}
                    />
                )}
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ height: 160, alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ height: 150, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 150 / 2, borderWidth: 1 }}>
                                <Image source={this.state.profile_Image == '' ? images.user : { uri: this.state.profile_Image }}
                                    style={{ height: 150, width: 150, borderRadius: 150 / 2, }}></Image>

                                <View style={{ height: 30, width: 30, position: 'absolute', justifyContent: 'center', backgroundColor: '#000', borderRadius: 30 / 2, bottom: 10, right: 5 }}>
                                    <TouchableOpacity onPress={() => this.onPressedCamera()}>
                                        <Image source={images.camera} resizeMode={'contain'} style={{ alignSelf: 'center', height: 16, width: 16, }}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <Text style={renderStyle.titleCss}>Vender Id</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                editable={false}
                                value={''+Helper.userData.vendor_id}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Name</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name })}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Email ID</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                

                                value={this.state.email}
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Mobile Number</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.mobile}
                                keyboardType={'phone-pad'}
                                editable={false}
                                onChangeText={(mobile) => this.setState({ mobile })}
                            />
                        </View>
                        <Text style={renderStyle.titleCss}>Business Name</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.business_name}
                              
                                onChangeText={(business_name) => this.setState({ business_name })}
                            />
                        </View>
                        
{Helper.userData.role_id == "4" ? null :
<>
                        <Text style={renderStyle.titleCss}>Alternate Mobile Number</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.alternate_mobile}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                                onChangeText={(alternate_mobile) => this.setState({ alternate_mobile })}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Work Experience</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholder={"eg.(5 year)"}
                                placeholderTextColor={'#C2C2C2'}
                                value={this.state.experience}
                                keyboardType={'phone-pad'}
                                onChangeText={(experience) => this.setState({ experience })}
                            />
                        </View>
                        <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>Country</Text>
                        <View style={{ backgroundColor: '#F4EDED', marginTop: 10, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrCountry}
                                placeHolder={{}}

                                onValueChange={(value) => { this.getStateValue(value) }}
                                selectValue={this.state.country}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>
                        <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>State</Text>
                        <View style={{ backgroundColor: '#F4EDED', marginTop: 10, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrState}
                                placeHolder={{}}

                                onValueChange={(value) => { this.getCity(value) }}
                                selectValue={this.state.cityState}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>


                        <Text style={[renderStyle.titleCss, { marginTop: 15 }]}>City</Text>
                        <View style={{ backgroundColor: '#F4EDED', marginTop: 10, paddingHorizontal: 5 }}>
                            <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrCity}
                                placeHolder={{}}

                                onValueChange={(value) => { this.setState({ city: value }) }}
                                selectValue={this.state.city}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Address</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.Address}
                                keyboardType={'phone-pad'}
                                onChangeText={(Address) => this.setState({ Address })}
                            />
                        </View>

                        <Text style={renderStyle.titleCss}>Pincode</Text>
                        <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                value={this.state.Pincode}
                                maxLength={6}
                                keyboardType={'phone-pad'}
                                onChangeText={(Pincode) => this.setState({ Pincode })}
                            />
                        </View>


</>
    }
                        <TouchableOpacity onPress={() => this.updateProfile()}>
                            <View style={{ width: 200, height: 50, alignSelf: 'center', marginTop: 50, backgroundColor: 'black', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 14,  }}>Done</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }


    onPressedCamera = (data) => {
        CameraController.open((response) => {
            if (response.path) {
                console.log(response.path)
                this.setState({ profile_Image: response.path });
                this.imageUpload(response.path)

            }
        });
    }

    imageUpload(path) {

        let template = new FormData();

        template.append('user_id', Helper.userData.id);
        if (this.state.profile_Image == '' || this.state.profile_Image == null) {
        } else {
            template.append('profile_pic', {
                uri: path,
                name: 'test.jpeg',
                type: 'image/jpeg'
            });
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.putApiResponse(Constant.uploadImage, template, Constant.APIImageUploadAndroid).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                let data = response.data
                console.log("+++++++++++++++++++++++++++",data);

                Helper.userData = data
                Helper.setData('user_details', data)
                Helper.showToast(response.message)
            } else {
                Helper.showToast(response.message)
                Helper.globalLoader.hideLoader()
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })

    }


    updateProfile() {
        if (this.state.name == '') {
            Helper.showToast('Please enter mobile number')
            return;
        } if (this.state.email == '') {
            Helper.showToast('Please enter email')
            return;
        } if (!Helper.EmailReg.test(this.state.email)) {
            Helper.showToast('Please enter valid email id')
            return;
        } 
        var data = {}
        data.user_id = Helper.userData.id
        data.name = this.state.name
        data.email = this.state.email
        data.mobile_no = this.state.mobile
        data.country=this.state.country,
        data.state = this.state.cityState
        data.city = this.state.city
        data.pincode = this.state.Pincode
        data.address = this.state.Address
        data.experience = this.state.experience
        data.alternate_mobile = this.state.alternate_mobile
        data.role_id =  Helper.userData.role_id
        console.log("qqqqq------", JSON.stringify(data));
       // return
        Helper.globalLoader.showLoader();

        ApiCallHelper.getNetworkResponce(Constant.updateProfile, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
           
            if (response.status == true) {
                let data = response.data
                Helper.userData = data
                Helper.setData('user_details', data)
                Helper.showToast(response.message)
                this.props.navigation.goBack() 
               
            } else {
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })
        //  this.props.navigation.navigate('VerifyingDetails')
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
        flexDirection: 'column', marginTop: 10, backgroundColor: 'rgb(243,237,237)', borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
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
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold
    },
});

