import React from 'react';
import { Text, View, FlatList, Image, ScrollView, TouchableOpacity, StyleSheet, Linking, SafeAreaView, Platform,Modal,Dimensions,TextInput } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'
import fonts from '../../Assets/fonts';
import moment from 'moment'
var cartData = []
import { Card } from 'react-native-shadow-cards';
import RNPickerSelect1 from "react-native-picker-select";



export default class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params?.data,
            arrBooking: [],
            bookingDetaild: '',
            arrBooking_details: [],
            actionModalVisible: false,
            detailsModalVisible: false,
            staffId: null,
            booking_id: "",
            statusId: null,
            arrStaff:[]
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Booking Details', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            //bellIconClick: () => this.bellIconClick(),
            //settingIconClick: () => this.settingIconClick()
        })
    }


    componentDidMount() {
        console.log(this.props.route.params?.data,)
        this.getBiikingDetails()
    }

    getAllStatus() {
        var data = {}
        data.booking_id = this.props.route.params?.data?.booking_id

        Helper.globalLoader.showLoader();
        
        ApiCallHelper.getNetworkResponce(Constant.booking_arrived, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                let res = response.data
               // this.setState({ arrGetAllStatus: res, actionModalVisible: true })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getStaff(value) {
        this.setState({ booking_id: value })
        let data = {
            user_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.staffList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            //  console.log("myService -------staff---", response.data)
            if (response.status == true) {
                let res = response.data
                // let arr = []
                // for (let value of res) {
                //  arr.push({label : value.name, value : value.id})
                // }
                // console.log("myService -------staff---", arr)
                this.setState({ arrStaff: res, detailsModalVisible: true })
            } else { 
            Helper.showToast(response.message)

            }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    getBiikingDetails() {
        var data = {}
        data.booking_id = this.props.route.params?.data?.booking_id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.bookingDetails, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("boosking_Detail",response.data);
            if (response.status == true) {
                this.setState({ bookingDetaild: response.data, arrBooking_details: response.data.booking_details })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    providerCall(phoneNumber) {
        Linking.openURL(`tel:${phoneNumber}`)

    }

    detailsModal() {
        // console.log("isSetModalVisible", this.state.isSetModalVisible)
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.detailsModalVisible}>
                <View onPress={() => this.setState({ detailsModalVisible: false })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>

                    <View style={{ padding: 15, width: Dimensions.get('window').width - 30, backgroundColor: 'white', marginHorizontal: 20 }}>

                        <Text style={{ fontWeight: 'bold', }}>{"Select Staff"}</Text>

                        <View style={{ backgroundColor: '#F4EDED', marginTop: 20, paddingHorizontal: 5 }}>



                            <View style={{ marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
                                <RNPickerSelect1
                                    // onValueChange={(value) => console.log(value)}
                                    items={this.state.arrStaff}
                                    useNativeAndroidPickerStyle={false}
                                    style={{ inputAndroid: { color: 'black' } }}
                                    selectValue={this.state.staffId}
                                    placeholder={{ label: 'Select a staff...', value: null, }}
                                    onValueChange={(value) => { this.setState({ staffId: value }) }}
                                />
                                <Image source={images.dropdown} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 0, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />
                            </View>
                            {/* <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrStaff}
                                placeHolder={{}}
                                // placeholder={{
                                //     label: 'Select a staff...',
                                //     value: null,
                                // }}
                                placeholderTextColor="#000"
                                onValueChange={(value) => { this.setState({ staffId: value }) }}
                                selectValue={this.state.staffId}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            /> */}
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity style={{ flex: 1, height: 40, marginRight: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.setState({ detailsModalVisible: false })} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, height: 40, marginLeft: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.assignStaff()} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Done</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
        )
    }

    actionModal() {
        // console.log("isSetModalVisible", this.state.isSetModalVisible)
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.actionModalVisible}>
                <View onPress={() => this.setState({ actionModalVisible: false })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>

                    <View style={{ padding: 15, width: Dimensions.get('window').width - 30, backgroundColor: 'white', marginHorizontal: 20 }}>

                        <Text style={{ fontWeight: 'bold', }}>{"Select Action"}</Text>

                        <View style={{ backgroundColor: '#F4EDED', marginTop: 20, paddingHorizontal: 5 }}>
                            <View style={{ marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
                                <RNPickerSelect1
                                    // onValueChange={(value) => console.log(value)}
                                    items={this.state.arrGetAllStatus}
                                    useNativeAndroidPickerStyle={false}
                                    style={{ inputAndroid: { color: 'black' } }}
                                    selectValue={this.state.statusId}
                                    placeholder={{ label: 'Select a Action...', value: null, }}
                                    onValueChange={(value) => { this.setState({ statusId: value }) }}
                                />
                                <Image source={images.dropdown} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 0, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />
                            </View>
                        </View>

                        {this.state.statusId == "pending" || this.state.statusId == "Pending" ?

                            <View style={{ marginTop: 15 }}>


                                <Text style={{ fontWeight: 'bold' }}>Date</Text>
                                <TouchableOpacity onPress={() => this.setState({ showDatePicke: true })} style={renderStyle.txtView}>
                                    <TextInput
                                        style={renderStyle.inputCss}
                                        placeholderTextColor={'#000'}
                                        value={this.state.remarkDate}
                                        editable={false}
                                        onChangeText={(remarkDate) => this.setState({ remarkDate })}
                                    />
                                </TouchableOpacity>

                                <Text style={{ fontWeight: 'bold', marginTop: 15 }}>Remark</Text>
                                <View style={renderStyle.txtView}>
                                    <TextInput
                                        style={renderStyle.inputCss}
                                        placeholderTextColor={'#000'}
                                        value={this.state.remark}
                                        onChangeText={(remark) => this.setState({ remark })}
                                    />
                                </View>
                            </View>
                            : null}


                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity style={{ flex: 1, height: 40, marginRight: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.setState({ actionModalVisible: false })} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, height: 40, marginLeft: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.submitAction()} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Done</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    submitAction() {
        if (this.state.statusId == null) {
            alert("Please select Action")
            return
        }

        if (this.state.statusId == "pending" || this.state.statusId == "Pending") {
            if (this.state.remark == "") {
                alert("Please enter remark")
                return
            }
        }
        this.setState({ actionModalVisible: false })
        //  this.setState({ cityState: value }) 
        let data = {
            booking_id: this.state.booking_id,
            vendor_id: Helper.userData.id,
            status: this.state.statusId,
            role_id: Helper.userData.role_id,
            remark: this.state.remark,
            remark_date: this.state.remarkDate
        }

        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.bookingStatus, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("myService -------staff---", response.data)
            if (response.status == true) {

                this.getBiikingDetails()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })

    }
    getAllStat(id) {
        console.log(id);
        this.setState({ booking_id: id })
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.allStatus, "", Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                let res = response.data
                this.setState({ arrGetAllStatus: res, actionModalVisible: true })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    render() {
        let data = this.state.bookingDetaild
        console.log("aaaaaaaaaaaa", data);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                {this.actionModal()}
                {this.detailsModal()}
                <ScrollView>
                    <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
                        <Card style={{ padding: 10, top: 10, width: '100%' }}>
                            <View style={{ flex: 1, backgroundColor: Colors.white, alignItems: 'center' }}>
                                <Text style={styles.bookingtxt}>Booking id: {data.booking_id}</Text>
                            </View>
                        </Card>

                        <Card style={{ padding: 10, marginTop: 20, paddingVertical: 15, width: '100%' }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.white, }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Service Date:</Text>
                                <Text style={{ fontSize: 12, }}> {moment(data.delivery_date).format("DD-MM-YYYY")}</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Colors.white, }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Time Slot:</Text>
                                <Text style={{ fontSize: 12, }}> {data.delivery_time}</Text>
                            </View>
                        </Card>

                        <Text style={[styles.btxtCss, { marginTop: 20 }]}>Client Details</Text>

                        <Card style={{ padding: 10, marginTop: 10, width: '100%' }}>
                            <View style={{ marginTop: 0, backgroundColor: Colors.white, }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
                                    <Image source={{ uri: data?.user_details?.profile_image }} style={{ height: 60, width: 60 }}></Image>
                                    <View style={{ flexDirection: 'column', marginRight: 80, marginHorizontal: 10 }}>
                                        <Text numberOfLines={1} style={styles.btxtCss}>{data?.user_details?.name}</Text>
                                        {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Image resizeMode={'contain'} source={images.star} style={{ height: 20, width: 20 }}></Image>
                                            <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>{data?.user_details?.avg_ratings} {'('} {data?.user_details?.total_ratings} ratings)</Text>
                                        </View> */}

                                        <TouchableOpacity onPress={() => this.providerCall(data?.user_details?.mobile)} style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <Image resizeMode={'contain'} source={images.call} style={{ height: 16, width: 16 }}></Image>
                                            <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>Call Now</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Card>

                        {Helper.userData.role_id == "4" || data?.status == "assigned" || data?.assign_to_staff == null ? null :
                            <>
                                <Text style={[styles.btxtCss, { marginTop: 20 }]}>Technician Name</Text>

                                <Card style={{ padding: 10, marginTop: 10, width: '100%' }}>
                                    <View style={{ marginTop: 0, backgroundColor: Colors.white, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
                                            <Image source={{ uri: data?.staff_details?.profile_image }} style={{ height: 60, width: 60 }}></Image>
                                            <View style={{ flexDirection: 'column', marginRight: 80, marginHorizontal: 10 }}>
                                                <Text numberOfLines={1} style={styles.btxtCss}>{data?.staff_details?.name}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 20, width: 20 }}></Image>
                                                    <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>{data?.staff_details?.avg_ratings} {'('} {data?.staff_details?.total_ratings} ratings)</Text>
                                                </View>

                                                <TouchableOpacity onPress={() => this.providerCall(data?.staff_details?.mobile)} style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Image resizeMode={'contain'} source={images.call} style={{ height: 16, width: 16 }}></Image>
                                                    <Text style={{ fontSize: 12, marginLeft: 10, alignSelf: 'center' }}>Call Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                            </>
                        }
                        {data?.address_details ?
                            <>
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <Text style={[styles.btxtCss, { flex: 1 }]}>Location</Text>
                                    <TouchableOpacity onPress={() => { this.OpenDirectionMap(data) }}>
                                        <Image source={images.map_pin} style={{ height: 22, width: 22 }}></Image>
                                    </TouchableOpacity>

                                </View>


                                <Card style={{ padding: 10, marginTop: 10, width: '100%' }}>
                                    <View style={{ marginTop: 0, backgroundColor: Colors.white, }}>
                                        <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>{data?.address_details?.house_no} {" "}{data?.address_details?.apartment}
                                            {" "}{data?.address_details?.address_line_1} {" "}{data?.address_details?.city}</Text>

                                    </View>
                                </Card>
                            </>
                            : null
                        }

                        <Text style={[styles.btxtCss, { marginTop: 20 }]}>Booked Service Details</Text>
                        <Card style={{ padding: 10, marginTop: 10, width: '100%' }}>
                            <View style={{ marginTop: 0, backgroundColor: Colors.white, }}>
                                <View style={{ justifyContent: 'flex-start', }}>
                                    {data?.booking_details?.map((item, index) => {
                                        return <View style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row',  }}>
                                                <Text style={{flex:1,
                                                    color: Colors.black, fontSize: 13, fontWeight: 'bold', fontFamily: fonts.PoppinsBold, 
                                                }}>{item.service_name} </Text>
                                                <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {item.price} x {item.quantity}</Text>
                                            </View>
                                            <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {Number(item.price)} x {Number(item.quantity)}</Text>
                                        </View>
                                    })}
                                </View>
                            </View>
                        </Card>


                        <View style={{ marginTop: 10, backgroundColor: Colors.white, }}>
                            <View style={[styles.dateCss, { justifyContent: 'flex-start', }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Item total</Text>
                                    <Text style={{}}>Rs {data?.item_total}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Charge(1)</Text>
                                    <Text style={{}}>Rs {data?.charge_1}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Charge(2)</Text>
                                    <Text style={{}}>Rs {data?.charge_2}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Discount ({data.coupon_code})</Text>
                                    <Text style={{}}>Rs {data?.discount}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Add On Service Charge</Text>
                                    <Text style={{}}>Rs {data?.addon_service}</Text>
                                </View>

                                <View style={{ marginVertical: 10, height: 1, backgroundColor: '#c5c5c5' }} />

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 15, fontWeight: "bold" }}>Total</Text>
                                    <Text style={{}}>Rs {data?.item_total + (Number(data?.discount)) + (Number(data?.charge_1)) + (Number(data?.charge_2))}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, fontWeight: "bold" }}>Payment: {data?.payment_type}</Text>
                                    <Text style={{}}>You have Rs {data?.item_total}</Text>
                                </View>
                            </View>
                        </View>
                        {/* <TouchableOpacity onPress={() => { }} style={[styles.loginView, { marginTop: 20 }]}>
                            <Text style={[styles.accept, { marginHorizontal: 20 }]}>{data?.status}</Text>
                        </TouchableOpacity> */}

                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:'row',marginHorizontal:20,marginBottom:30}}>
                    {
                       (  data?.status == "confirmed" &&  data?.delivery_date == moment().format("YYYY-MM-DD")) &&
                    
                    <TouchableOpacity onPress={() => this.getAllStatus()} 
                            style={{ backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center' ,
                            flexDirection: 'row' ,  }}>
                    <Text style={{ color: 'white', fontSize: 13, paddingVertical: 8, paddingHorizontal: 20 }}>
                        Arrived
                    </Text>
                    </TouchableOpacity>
                    }
                     {
                       (  data?.status == "confirmed" ) &&
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChooseCategory",{data:data})} 
                            style={{ backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center' ,
                            flexDirection: 'row' , marginLeft:10  }}>
                    <Text style={{ color: 'white', fontSize: 12.2, paddingVertical: 8, paddingHorizontal: 20 }}>
                        Add Product
                    </Text>
                    </TouchableOpacity>
                    }
                     {
                        //data?.delivery_date == moment().format("YYYY-MM-DD") &&
                        (data?.status == "confirmed") && 
                        <TouchableOpacity onPress={() => this.getAllStat(data.booking_id)} style={{ backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center',marginLeft:10  }}>
                            <Text style={{ color: 'white', fontSize: 13, paddingVertical: 8, paddingHorizontal: 20 }}>Action</Text>
                        </TouchableOpacity>
                    }
                    {
                    data?.status == "confirmed" &&
                    <TouchableOpacity onPress={() => this.getStaff(data.booking_id)} style={{ backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center',marginLeft:10 }}>
                        <Text style={{ color: 'white', fontSize: 12.2, paddingVertical: 8, paddingHorizontal: 20 }}>Reassign</Text>
                        </TouchableOpacity>
                    }
</ScrollView>
                </ScrollView>
            </SafeAreaView>
        )
    }

    assignStaff(value) {

        if (this.state.staffId == null) {
            alert("Please select staff")
            return
        }
        this.setState({ detailsModalVisible: false })
        //  this.setState({ cityState: value }) 
        let data = {
            staff_id: this.state.staffId,
            booking_id: this.state.booking_id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.assignBookingStaff, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("myService -------staff---", response.data)
            if (response.status == true) {

                this.getBiikingDetails()
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }




    OpenDirectionMap(data) {
        let latitude = Number(data.address_details.latitude)
        let longitude = Number(data.address_details.longitude)
        let label = data.address_details.address_line_1

        if (latitude && longitude) {


            const url = Platform.select({
                ios: "maps:" + latitude + "," + longitude + "?q=" + label,
                android: "maps:" + latitude + "," + longitude + "?q=" + label
            });

            Linking.canOpenURL(url).then(supproted => {
                if (supproted) {
                    return Linking.openURL(url)
                } else {
                    let browser_url = "https://www.google.com/maps/dir/?api=1&destination=" + latitude + "," + longitude;
                    return Linking.openURL(browser_url)
                }
            });
        } else {
            Helper.showToast("Address invalide ")
        }
    }

}
const renderStyle = StyleSheet.create({
    txtView: {
        flexDirection: 'column', marginTop: 10, backgroundColor: 'rgb(243,237,237)', borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    safe_area_view: {
        flex: 1, backgroundColor: 'white'
    }, cardView: {

    }, accept: {
        fontSize: 12, color: 'black', alignSelf: 'center'
    },
    titleCss: {
        fontSize: 15, flex: 1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 12, fontFamily: fonts.PoppinsBold,
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

const styles = StyleSheet.create({
    txtView: {
        flexDirection: 'column', marginTop: 10, backgroundColor: 'rgb(243,237,237)', borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    bookingView: {
        elevation: 2, borderRadius: 10, borderWidth: 0.01, flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15
    }, bookingtxt: { fontSize: 15, fontFamily: fonts.PoppinsBold },
    dateCss: {
        elevation: 2, borderRadius: 10, borderWidth: 0.01, flex: 1, justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 10
    },
    btxtCss: { fontSize: 13, fontWeight: "bold", color: '#000', fontFamily: fonts.PoppinsRegular },
    loginView: {
        alignSelf: "center", marginTop: 10, borderColor: 'black', shadowRadius: 20, flex: 1, borderWidth: 1, height: 30, justifyContent: 'center', borderRadius: 150 / 2
    },
    loginView1: {
        alignSelf: "center", marginTop: 10, backgroundColor: 'black', marginLeft: 10, flex: 1, height: 30, justifyContent: 'center', borderRadius: 150 / 2
    },
    loginTxt: {
        color: "white", fontSize: 14, alignSelf: 'center'
    },
    accept: {
        fontSize: 12, color: 'black', alignSelf: 'center'
    },
})