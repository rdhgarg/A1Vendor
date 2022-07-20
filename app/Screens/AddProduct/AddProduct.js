import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './AddProductStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';


export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrService: [1, 2, 3],
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Add Product', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
          
        })
    }

    paymentReview() {
        this.props.navigation.navigate('PaymentReview')
    }


    _renderUpComingItem = ({ item, index }) => {
        return (

            <View style={styles.history_view}>

                <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'contain'} source={images.test3} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fonts.fontSize14 }}>Service Name 1</Text>
                        {index == 0 ?
                            <TouchableOpacity style={{ position: 'absolute', right: 2 }}>
                                    <Image source={images.addservice} resizeMode={'contain'} style={{ height: 28, width: 72 }} />
                                </TouchableOpacity>:

                                <TouchableOpacity
                            onPress={() => this.gotToSelectAddress()} style={{
                                position: 'absolute', right: 2, borderWidth:1,borderColor:Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: fonts.fontSize12,color:Colors.black,
                            textAlign:'center' }}>Add</Text>
                        </TouchableOpacity>

                        }
                                

                                {/* <Text style={{ position: 'absolute', paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, right: 2 }}>- 1 +</Text> */}
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: fonts.fontSize17 }}>1500</Text>

                                <View style={{ position: 'absolute', right: 2, right: 2 }}>
                                    <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>Total - Rs. 1500</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                        <Text style={{
                            color: Colors.black, fontSize: 17,
                            fontFamily: fonts.PoppinsBold, fontWeight: 'bold', textAlign: 'center'
                        }}>Would you like to add some product for your service</Text>
                    </View>

                    <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[1, 2]}
                            renderItem={this._renderUpComingItem}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

                <View style={{
                    borderTopWidth: 1, borderTopColor: '#00000010',
                    backgroundColor: Colors.white,
                    elevation: 3,
                    bottom: 0, opacity: 100, width: '100%',
                    position: 'absolute', justifyContent: 'space-between',
                   height: 68, alignItems:'flex-end', paddingHorizontal: 20,justifyContent:'center'
                }}>
                    <View style={{ flexDirection: 'row',  }}>
                        <TouchableOpacity onPress={()=> this.paymentReview()} style={{marginRight:20,height:28,width:153,backgroundColor:Colors.black,borderRadius:14,justifyContent:'center'}}>
                            <Text style={{ fontSize: fonts.fontSize12,color:Colors.white,textAlign:'center' }}>Add Product & Next</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>  this.paymentReview()} style={{ borderWidth:1,borderColor:Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: fonts.fontSize12,color:Colors.black,textAlign:'center' }}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

};
