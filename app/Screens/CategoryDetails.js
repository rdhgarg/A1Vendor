import React from 'react';
import { Text, View, FlatList, Image,ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import Colors from '../Assets/Colors';
import { images } from '../Assets/imagesUrl';
import AppHeader from '../Comman/AppHeader';
import ApiCallHelper from '../config/ApiCallHelper';
import Constant from '../config/Constant';
import Helper from '../config/Helper'


export default class CategoryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: this.props.route.params?.data?.category_id,
            subcategory_id: this.props.route.params?.data?.id,
            title: this.props.route.params?.data?.title,
            arrServices: [],
            index: 0,
            arrRating:[],
            arrService: [1, 2, 3],
        }
        AppHeader({
            ...this.props.navigation, leftTitle: this.state.title, borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }

    settingIconClick() {
        this.props.navigation.navigate('ListingDetails')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }

    gotToActivityDetail() {
        this.props.navigation.navigate('ActivityDetailScreen')
    }

    componentDidMount() {
        this.getServices()
    }

    getServices() {
        var data = {}
        data.category_id = this.state.category_id,
        data.subcategory_id = this.state.subcategory_id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.services, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------services services", response.data)
            if (response.status == true) {
                this.setState({ arrServices: response.data , })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    _renderUpComingItem = ({ item }) => {
        return (

            <View style={{
                borderWidth: 0.5,
                borderRadius: 10,
                marginHorizontal: 2,
                marginBottom: 10,
                borderColor: '#FCFBFB',
                backgroundColor: Colors.white,
                elevation: 3,
                marginTop: 2
            }}>

                <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'cover'} source={{ uri: item.image }} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{item.category_name}</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ListingDetails',{data : item}) }} style={{ position: 'absolute', right: 2}}>
                                <Text style={{ paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, }}>Add</Text>
                                    </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18 }}>{item.price}</Text>

                                <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                    <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>{item.avg_rating} {'('}{item.ratings} ratings)</Text>
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
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
               <ScrollView>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <Image resizeMode={'contain'} source={this.props.route.params.data.banner_image ? {uri :this.props.route.params.data.banner_image} : images.test3 } style={{ height: 180, width: '100%' }}></Image>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrServices}
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