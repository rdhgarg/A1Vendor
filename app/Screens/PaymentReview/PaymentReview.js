import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './PaymentReviewStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';


export default class PaymentReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Payment Review', borderBottomRadius: 0,
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

    gotToActivityDetail() {
        this.props.navigation.navigate('ActivityDetailScreen')
    }






    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView>

                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={{
                             borderColor: '#FCFBFB',
                            backgroundColor: Colors.white, borderWidth: 1,
                            elevation: 2, marginHorizontal: 20,borderRadius: 8
                        }}>
                            <View style={{ marginBottom:5, paddingHorizontal: 20, }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ justifyContent: 'center' }}>

                                        <Text style={{
                                            fontWeight: 'bold', marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,

                                        }}>
                                            Service Charge (3)
                                        </Text>

                                        <Text style={{
                                            fontWeight: 'bold', marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>
                                            Product Amount (1)
                                        </Text>

                                        <Text style={{
                                            fontWeight: 'bold', marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>
                                            Charge 2
                                        </Text>

                                        <Text style={{
                                            fontWeight: 'bold', marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>
                                            Discount (coupon code:)
                                        </Text>

                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={{
                                            marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>Rs. 4500</Text>
                                        <Text style={{
                                            marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>Rs. 1500</Text>
                                        <Text style={{
                                            marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>Rs. 450</Text>
                                        <Text style={{
                                            marginTop: 5,
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize13, color: Colors.black,
                                        }}>- Rs. 500</Text>
                                    </View>
                                </View>

                                <View style={{ marginVertical: 15, }}>
                                    <View style={{ backgroundColor: Colors.warmGreyTwo, height: .5, width: '100%' }}></View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ sjustifyContent: 'center' }}>

                                        <Text style={{
                                            fontWeight: 'bold', fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize14, color: Colors.black,
                                        }}>Total</Text>
                                    </View>

                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={{
                                            fontWeight: 'bold', fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize14, color: Colors.black,
                                        }}>5950</Text>

                                        <Text style={{
                                            fontFamily: fonts.PoppinsBold,
                                            fontSize: fonts.fontSize14, color: Colors.black,
                                        }}>You save Rs. 500</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                   

                   

                </ScrollView>

                <View style={{borderTopWidth:1,borderTopColor:'#00000010',
                     backgroundColor: Colors.white, 
                    elevation:3,
                    bottom: 0,    width: '100%',
                    position: 'absolute', justifyContent: 'space-between', 
                    flexDirection: 'row', height: 68, alignItems: 'center', 
                    paddingHorizontal: 20
                }}>
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>

                        <View style={{
                          
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: Colors.black, fontSize: fonts.fontSize20,
                                fontFamily: fonts.PoppinsBold,fontWeight:'bold'
                            }}>Total</Text>

                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: fonts.fontSize17 }}>7500</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: Colors.black, height: 28, width: 90, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.white,fontSize:fonts.fontSize12,fontFamily:fonts.PoppinsRegular }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

};
