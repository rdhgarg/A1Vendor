import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../Assets/Colors';
import { images } from '../Assets/imagesUrl';
import AppHeader from '../Comman/AppHeader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import ApiCallHelper from '../config/ApiCallHelper';
import Constant from '../config/Constant';
import Helper from '../config/Helper'

export default class ListingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            serviceData:"",
            arrRating:[],
            arrService: [1, 2, 3],
            cartItem:[],
            serviceId : this.props.route.params?.data?.id,

        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Listing Details', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }

   
componentDidMount(){
    Helper.getData('CartItem').then((data) => {
        console.log("CartItem------", data);
        if (data) {
            this.setState({cartItem : data })
        } else {
        }
        console.log("CartItem------", this.state.cartItem);
    })
    this.getServices()
  //  console.log("1234567890-oihgcvbnm", this.props.route.params?.data);
}

gotToAddServiceDetail(data) {
    let val = data
    this.state.cartItem.push(val)
    this.setState({})
    console.log("CartItem------", this.state.cartItem);
    console.log("CartItem------", data);
    Helper.setData('CartItem',  this.state.cartItem)
    this.props.navigation.navigate('AddService')
}


    getServices() {
        var data = {}
        data.service_id = this.state.serviceId,
      
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.serviceDetails, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.setState({ serviceData: response.data , arrRating : response.data?.ratingsarr })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    _renderUpComingItem = ({item, index }) => {
        return (

            <View style={{
                borderWidth: 0.5,
                marginBottom: 10, borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 1, marginTop: 2
            }}>
                <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.title}</Text>
                                <View style={{ position: 'absolute', paddingVertical: 2, right: 2 }}>

                                <AirbnbRating
                                    showRating={false}
                                    selectedColor={'#FDCC0D'}
                                    count={5}
                                    //  onFinishRating={this.ratingCompleted}
                                    defaultRating={Number(item.rating)}
                                    isDisabled={true}
                                    size={10} />
                                </View>
                            </View>
                            <Text style={{ fontSize: 12 }}>{item.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let data = this.state.serviceData
        return (
            <SafeAreaView style={{ flex: 1,backgroundColor: '#fff' }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                        <Image resizeMode={'contain'} source={{uri : data.banner_image}} style={{ height: 180, width: '100%' }}></Image>

                        <View style={{
                            borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                            marginBottom: 10, borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3, marginTop: 10
                        }}>
                            <View style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                                    <Image resizeMode={'cover'} source={{uri :  data.image}} style={{ height: 60, width: 60 }} />
                                    <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                                        <TouchableOpacity
                                         onPress={()=>this.gotToAddServiceDetail(data)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{data.category_name}</Text>
                                          
                                            <Text style={{ position: 'absolute', paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, right: 2 }}>Add</Text>
                                          
                                        </TouchableOpacity>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                            <Text style={{ fontSize: 18 }}>{data.price}</Text>

                                            <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                                <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                                <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>{data.avg_rating} {'('}{data.ratings} ratings)</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            marginTop: 12, paddingHorizontal: 8, paddingVertical: 5, borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                            borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3,
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Description</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>{data.description}</Text>

                        </View>
                        <Text style={{ fontWeight: 'bold', marginVertical: 12, fontSize: 14 }}> Rating & Reviews 4.5</Text>

                        <View style={{
                            marginTop: 12, paddingHorizontal: 8, marginBottom: 10, paddingVertical: 5, borderWidth: 0.5, borderRadius: 10, marginHorizontal: 2,
                            borderColor: '#FCFBFB', backgroundColor: Colors.white, elevation: 3,
                        }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrRating}
                                renderItem={this._renderUpComingItem}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}
