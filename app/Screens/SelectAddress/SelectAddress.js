import React from 'react';
import { Text, View, ScrollView, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, DeviceEventEmitter, } from 'react-native';
import styles from './SelectAddressStyle';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';

import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
export default class SelectAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: "",
            arrAddress: [],

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Select Address', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            bellIconClick: () => this.bellIconClick(),
            settingIconClick: () => this.settingIconClick()
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }

    gotToSelectSlot() {
        this.props.navigation.navigate('SelectSlot')
    }

    componentDidMount() {
        this.getAddressUpdate = DeviceEventEmitter.addListener("AddressUpdate", (data) => {
            this.getAddressList()
        })
        Helper.globalLoader.showLoader();
        this.getAddressList()

    }

    getAddressList() {
        let data = {
            user_id: Helper.userData.id
        }

        ApiCallHelper.getNetworkResponce(Constant.listAddress, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("Banner ----------", response.data)
            if (response.status == true) {
                this.setState({ arrAddress: response.data })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    addressRender = ({ item, index }) => {

        return <TouchableOpacity style={styles.mainView} onPress={() => this.setState({ selectedId: index })}>
            <View style={{ backgroundColor: Colors.warmGreyTwo, height: index == 0 ? 0 : 1, marginHorizontal: 5, marginTop: index == 0 ? 0 : 10 }}></View>

            <View style={{ marginTop: 20, paddingHorizontal: 10, }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <Image source={this.state.selectedId == index ? images.radio_btn_selected : images.radio_btn_un_selected}
                            resizeMode={'contain'}
                            style={{ height: 20, width: 20, tintColor: Colors.warmGreyTwo }}
                        />
                        <Text style={{
                            fontWeight: 'bold', fontFamily: fonts.PoppinsBold,
                            fontSize: fonts.fontSize14, color: Colors.black, marginLeft: 10
                        }}>{item.address_type}</Text>
                    </View>

                    <TouchableOpacity onPress={() => this.deleteAddress(item)}>
                        <Image source={images.delete} resizeMode={'contain'} style={{ height: 20, width: 20, }} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: 150, marginLeft: 20, marginTop: 10 }}>
                    <Text style={{
                        color: Colors.warmGreyTwo, fontSize: fonts.fontSize13, fontFamily: fonts.PoppinsBold,
                    }}>{item.house_no} {item.apartment} {item.address_line_1} {item.city} {item.near_by}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }

    deleteAddress(val) {
        let data = {
            address_id: val.id,
            user_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.deleteAddress, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();

            if (response.status == true) {
                this.getAddressList()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    addressAction() {
        this.props.navigation.navigate("AddAddress", { title: "Add address" })
    }
    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView>

                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={() => this.addressAction()} style={style.addressView}>
                                <Text style={{
                                    color: Colors.black, fontSize: fonts.fontSize15,
                                    fontWeight: 'bold', fontFamily: fonts.PoppinsBold
                                }}>Add Address +</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ marginTop: 20, paddingBottom: 10, borderRadius: 5, elevation: 2, }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrAddress}
                                renderItem={this.addressRender}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ marginVertical: 20, marginTop: 100 }}>
                            <GButton
                                Text='Next'
                                width={'45%'}
                                height={50}
                                borderRadius={25}
                                onPress={() => { this.gotToSelectSlot() }}
                            // onPress={() => { this.login_Submit() }}
                            />
                        </View>
                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }

};

const style = StyleSheet.create({
    mainView: {
        height: 235, borderColor: '#FCFBFB',
        backgroundColor: Colors.white, borderWidth: 1,
        elevation: 2, marginHorizontal: 20,
        borderRadius: 8
    },
    addressView: {
        height: 54, borderColor: '#FCFBFB',
        backgroundColor: Colors.white, borderWidth: 1,
        elevation: 2,
        justifyContent: 'center', alignItems: 'center',
        borderRadius: 8
    }
})