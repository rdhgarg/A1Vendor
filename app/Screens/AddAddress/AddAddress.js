import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, DeviceEventEmitter, } from 'react-native';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';

import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'
import Helper from '../../config/Helper'



const DeviceH = Dimensions.get('window').height;
const DeviceW = Dimensions.get('window').width;
export default class AddAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
                flat_house_number: '',
                apartment: '',
                address_Line_1: '',
                Address_Line_2: '',
                City_Village: '',
                Near_By_Location: '',
                addressType :  'Home'
            

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Add Address' })

    }

    componentDidMount() {

    }


    add_address_Submit() {
        // this.props.navigation.navigate('SettingsScreen')
            if (this.state.flat_house_number == '') {
                Helper.showToast('Please enter flat/house number')
                return;
            } if (this.state.address_line_1 == '') {
                Helper.showToast('Please enter address')
                return;
            } if (this.state.City_Village == '') {
                Helper.showToast('Please enter city/village')
                return;
            } if (this.state.addressType == '') {
                Helper.showToast('Please select address type')
                return;
            } 

         
            var data = {}
            data.user_id = Helper.user_id
            data.house_no = this.state.flat_house_number
            data.apartment = this.state.apartment
            data.city = this.state.City_Village
            data.address_type = this.state.addressType
            data.address_line_1 = this.state.address_Line_1
            data.latitude = ""
            data.longitude = ""
            data.address_line_2 = this.state.Address_Line_2
            data.near_by = this.state.Near_By_Location

            Helper.globalLoader.showLoader();
            ApiCallHelper.getNetworkResponce(Constant.addAddress, JSON.stringify(data), Constant.APIPost).then((response) => {
                Helper.globalLoader.hideLoader();
                let data = response.data
                if (response.status == true) {
                    this.props.navigation.goBack()
                    DeviceEventEmitter.emit("AddressUpdate", "done")
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
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                    <View style={{ marginVertical: 10, marginTop: 15, marginHorizontal: 16 }}>

                        <View style={{
                            borderWidth: 0.5, borderRadius: 5, marginHorizontal: 2, alignItems: 'center',
                            marginBottom: 10, borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3, marginTop: 10
                        }}>
                            <Image source={images.currentLoaction} style={{ width: 250, height: 50 }} />
                        </View>

                        <Text style={{
                            color: Colors.black, marginTop: 10,
                            fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1,
                            fontWeight: 'bold'
                        }}>Flat / House Number</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.black}
                            setFocus={() => { this.apartment.focus(); }}
                            returnKeyType="next"
                            maxLength={12}
                            placeholderTextColor={Colors.black}
                            keyboardType={'default'}
                            onChangeText={(flat_house_number) => this.setState({flat_house_number})}
                            value={this.state.flat_house_number}
                        />

                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>Apartment</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.warmGrey}
                            getFocus={(input) => { this.apartment = input }}
                            setFocus={(input) => { this.address_Line_1.focus(); }}
                            returnKeyType="next"
                            maxLength={20}
                            placeholderTextColor={Colors.black}
                            keyboardType={'default'}
                            onChangeText={(apartment) => this.setState({apartment})}
                            value={this.state.apartment}
                        />

                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>Address Line 1</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.warmGrey}
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.address_Line_1 = input }}
                            setFocus={(input) => { this.Address_Line_2.focus(); }}
                            returnKeyType="done"
                            maxLength={100}
                            keyboardType={'default'}
                            onChangeText={(address_Line_1) => this.setState({address_Line_1})}
                            value={this.state.address_Line_1}
                        />


                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>Address Line 2</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.warmGrey}
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.Address_Line_2 = input }}
                            setFocus={(input) => { this.City_Village.focus(); }}
                            returnKeyType="done"
                            maxLength={100}
                            keyboardType={'default'}
                            onChangeText={(Address_Line_2) => this.setState({Address_Line_2})}
                            value={this.state.Address_Line_2}
                        />

                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>City / Village</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.warmGrey}
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.City_Village = input }}
                            setFocus={(input) => { this.Near_By_Location.focus(); }}
                            returnKeyType="done"
                            maxLength={25}
                            keyboardType={'default'}
                            onChangeText={(City_Village) => this.setState({City_Village})}
                            value={this.state.City_Village}
                        />

                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>Near By Location</Text>
                        <IconInput
                            placeholder=""
                            placeholderTextColor={Colors.black}
                            getFocus={(input) => { this.Near_By_Location = input }}
                            setFocus={() => { this.add_address_Submit() }}
                            returnKeyType="done"
                            maxLength={100}
                            keyboardType={'default'}
                            onChangeText={(Near_By_Location) => this.setState({Near_By_Location})}
                            value={this.state.Near_By_Location}
                        />


                    </View>

                    <View style={{ marginHorizontal: 16 }}>
                        <Text style={{
                            color: Colors.black, fontSize: fonts.fontSize14,
                            fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold'
                        }}>Address Type</Text>
                    </View>


                    <View style={{ marginHorizontal: 16, flexDirection: 'row', marginVertical: 10 }}  >
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=> this.setState({addressType : "Home"})}>
                            <Image resizeMode={'contain'} source={this.state.addressType == "Home"? images.radio_btn_selected : images.radio_btn_un_selected }
                                style={{ width: 18, height: 18, tintColor: Colors.black }} />
                            <Text style={{ color: Colors.black, fontSize: fonts.fontSize13,
                             fontFamily: fonts.PoppinsRegular, marginLeft: 5 }}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',marginLeft:10 }} onPress={()=> this.setState({addressType : "Office"})}>
                            <Image resizeMode={'contain'} source={this.state.addressType == "Office"? images.radio_btn_selected : images.radio_btn_un_selected }
                                style={{ width: 18, height: 18, tintColor: Colors.black }} />
                            <Text style={{ color: Colors.black, fontSize: fonts.fontSize13,
                             fontFamily: fonts.PoppinsRegular, marginLeft: 5 }}>Office</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',marginLeft:10  }} onPress={()=> this.setState({addressType : "Other"})}>
                            <Image resizeMode={'contain'} source={this.state.addressType == "Other"? images.radio_btn_selected : images.radio_btn_un_selected }
                                style={{ width: 18, height: 18, tintColor: Colors.black }} />
                            <Text style={{ color: Colors.black, fontSize: fonts.fontSize13, 
                            fontFamily: fonts.PoppinsRegular, marginLeft: 5 }}>Other</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginVertical: 10, marginTop: 33, marginHorizontal: 16 }}>
                        <GButton
                            Text='Save'
                            width={'50%'}
                            height={50}
                            borderRadius={25}
                         onPress={() => { this.add_address_Submit() }}

                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};

const styles =  StyleSheet.create({
    inputBox:{

    }
})


