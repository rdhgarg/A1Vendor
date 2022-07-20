import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './BookingReviewStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';


export default class BookingReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: this.props.route.params?.data
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Booking Review', borderBottomRadius: 0,
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

    gotToSelectAddress() {
        this.props.navigation.navigate('SelectAddress')
    }






    render() {
        let data = this.state.bookingData
        console.log("data------", JSON.stringify(data));
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <ScrollView>
                    <View style={{ flex: 1, marginVertical: 10, marginBottom: 70 }}>
                        <View style={[styles.history_view, { marginHorizontal: 21 }]}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 15 }}>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Item Total</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Charge 1</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Charge 2</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, fontWeight: 'bold' }}>Discount (coupon code:)</Text>
                                </View>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. {data.totalAmount}</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. 0</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>Rs. 0</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsExtraBold, }}>- Rs. 500</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 15, }}>
                                <View style={{ height: 1, backgroundColor: '#707070', width: '100%' }}></View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, marginVertical: 5 }}>
                                <Text style={{ padding: 5, color: Colors.black, fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold' }}>Total</Text>

                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 15, fontFamily: fonts.PoppinsBold, fontWeight: 'bold' }}>4500</Text>
                                    <Text style={{ padding: 5, color: Colors.black, fontSize: 12, fontFamily: fonts.PoppinsRegular }}>You save Rs. 500</Text>
                                </View>
                            </View>

                        </View>



                        <View style={[styles.history_view, { marginHorizontal: 21, marginTop: 10 }]}>
                            <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{
                                            color: Colors.black, fontSize: 15,
                                            fontWeight: 'bold', fontFamily: fonts.PoppinsBold
                                        }}>NEWUSER</Text>
                                        <Text style={{
                                            marginLeft: 15,
                                            color: Colors.black, fontSize: 11,
                                            fontFamily: fonts.PoppinsRegular, backgroundColor: '#F8EFEF', paddingTop: 5,
                                            borderWidth: 1, borderColor: '#CBC5C5', paddingHorizontal: 10, paddingVertical: 1, borderRadius: 16
                                        }}>Applied Successfully</Text>

                                    </View>
                                    <TouchableOpacity>
                                        <Image source={images.Icon_close_circle_outline}
                                            resizeMode={'contain'}
                                            style={{ width: 22, height: 22 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular
                                }}>Rs. 500 Discounted Value</Text>
                            </View>

                        </View>
                        <View style={[styles.history_view, { marginHorizontal: 21,paddingBottom:9,  marginTop: 10 }]}>
                   {data.arrService.map((item, index)=>{
                       return  <View style={{ paddingHorizontal: 15 , marginTop:10 }}>
                               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                   <Text style={{
                                       color: Colors.black, fontSize: 13, fontWeight: 'bold', fontFamily: fonts.PoppinsBold
                                   }}>{item.category_name}</Text>
                                   <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {item.price} x {item.quantity}</Text>
                               </View>
                               <Text style={{ color: Colors.black, fontSize: 13, fontFamily: fonts.PoppinsRegular }}>Rs. {item.price * item.quantity}</Text>
                           </View>
                      
                  
                   })}
                        </View>

                    </View>
                </ScrollView>



                <View style={{
                    borderTopWidth: 1, borderTopColor: '#00000010',
                    backgroundColor: Colors.white,
                    elevation: 3,
                    bottom: 0, opacity: 100, width: '100%',
                    position: 'absolute', justifyContent: 'space-between',
                    flexDirection: 'row', height: 68, alignItems: 'center', paddingHorizontal: 20
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#F8EFEF', width: 26, height: 26,
                            borderRadius: 26 / 2, borderWidth: 1, borderColor: '#CBC5C5', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{color: Colors.black, fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular }}>{data.arrCount}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: fonts.fontSize17 }}>{data.totalAmount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectAddress')}
                        style={{ backgroundColor: Colors.black, height: 28, width: 90, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            color: Colors.white, fontSize: 12,
                            fontFamily: fonts.PoppinsRegular
                        }}>Book Now</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }

};
