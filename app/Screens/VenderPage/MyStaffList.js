// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, Share, FlatList, Linking, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, DeviceEventEmitter, } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import { Card } from 'react-native-shadow-cards';
import moment from 'moment';

import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'

export default class MyStaffList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],
            categoryId: '',
            apiRes: '',
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'My Staff Listing',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,
            booking: true,
            titleTxt: "+ Add Staff",
            giveRating: () => this.addService(),
        })
    }

    addService() {
        this.props.navigation.navigate('AddStaff')
    }

    componentDidMount() {
        this.addStaffEvent = DeviceEventEmitter.addListener("AddStaff", (data) => {
            this.getStaffList()
        })
        this.getStaffList()
    }


    componentWillUnmount() {
        this.addStaffEvent.remove()
    }

    getStaffList() {
        let data = {
            user_id: Helper.userData.id,
            status: '1'
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.staffList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrCategory: response.data, apiRes: '' })
            } else {
                this.setState({ apiRes: '1' })
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    activeStaff(id,st) {
        let data = {
            user_id: id,
            status: st ==  "1" ? "0" :"1"
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.staffStatus, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.getStaffList()
            } else {
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }
    

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ backgroundColor: 'white', marginHorizontal: 10, paddingBottom: 10 }}>

                    {this.state.apiRes == '1' ? <View style={{ height: Dimensions.get("window").height - 179, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>No Staff Available</Text>
                    </View> :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrCategory}
                            renderItem={this.renderRequest}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </View>
            </View>
        )
    }

    selectMultiService(id) {
        if (this.state.categoryId.includes(id)) {
            var array = [...this.state.categoryId]; // make a separate copy of the array
            var index = array.indexOf(id)
            array.splice(index, 1);
            this.setState({ categoryId: array });

        } else {
            var array = [...this.state.categoryId]; // make a separate copy of the array
            array.push(id);
            this.setState({ categoryId: array });
        }

    }

    providerCall(phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`)

    }

    renderRequest = ({ item, index }) => {
        console.log("---------", item);
        return <View style={{ marginTop: index == 0 ? 5 : 0, paddingHorizontal: 5, paddingBottom: 15, }}>

            <Card style={{ width: '100%', }}>
                <TouchableOpacity style={{ flexDirection: 'row', padding: 5 }} onPress={() => this.props.navigation.navigate('AddStaff', { data: item })}>
                    <Image source={{ uri: item.profile_image }} style={{ height: 70, width: 70, }}></Image>
                    <View>
                        <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10, fontWeight: 'bold' }}>{item.name} ({item.vendor_id})</Text>
                        <Text numberOfLines={1} style={{ fontSize: 10, marginLeft: 10, marginTop: 10 }}>{item.mobile_no}</Text>
                        {/* <Text numberOfLines={1} style={{ fontSize: 10, marginLeft: 10, marginTop: 10 }}>Id: {item.mobile_no}</Text> */}

                        <View style={{flexDirection:'row', width:Dimensions.get('screen').width - 120, alignItems:"center" , }}>
                            <TouchableOpacity onPress={() => this.providerCall(item.mobile_no)} style={{ marginLeft: 10, flex:1, flexDirection: 'row', }}>
                                <Image source={images.call} style={{ height: 10, width: 10 }}></Image>
                                <Text style={{ fontSize: 10 }}>  Call Now</Text>
                            </TouchableOpacity>
                           <TouchableOpacity onPress={()=> this.activeStaff(item.id,item.status)}>
                           <Image style={{ height: 30, width: 30, }} source={item.status == "1" ?images.toggleOn : images.toggleOff}></Image>
                           </TouchableOpacity>

                        </View>


                    </View>
                </TouchableOpacity>
            </Card>
        </View>


    }
};


const renderStyle = StyleSheet.create({
    safe_area_view: {
        flex: 1, backgroundColor: 'white'
    }, cardView: {

    }, accept: {
        fontSize: 12, color: 'black', alignSelf: 'center'
    },
    titleCss: {
        fontSize: 15, flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    search_touch: {
        marginLeft: 15
    },
    search_img: {
        height: 18,
        width: 18,
        tintColor: 'black'
    },
    input_text: {
        height: 50,
        width: 280,
        paddingLeft: 10,
        color: 'black',
        fontSize: fonts.fontSize12,
        fontFamily: fonts.RoBoToRegular_1
    },
    search_box_view: {
        marginTop: 10,
        backgroundColor: 'white',
        borderColor: '#9F9F9F',
        borderWidth: 1,
        width: '100%',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25,
    },
    loginView: {
        alignSelf: "center", marginTop: 10, borderColor: 'black', shadowRadius: 20, borderWidth: 1, width: 80, height: 30, justifyContent: 'center', borderRadius: 150 / 2
    },
    loginView1: {
        alignSelf: "center", marginTop: 10, backgroundColor: 'black', marginLeft: 10, width: 80, height: 30, justifyContent: 'center', borderRadius: 150 / 2
    },
    loginTxt: {
        color: "white", fontSize: 14, alignSelf: 'center'
    },
})



