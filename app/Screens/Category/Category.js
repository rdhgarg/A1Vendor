import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './CategoryStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';

import { handleNavigation } from '../../navigation/Navigation';
//import Helper from '../../Lib/Helper';
import Helper from '../../config/Helper'
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSubcategory: [],
            refreshing: false,
            isLoading: true,
            category_id: this.props.route.params.data?.id,
            title: this.props.route.params.data?.title,

            index: 0,
            arrService: [1, 2, 3],
        }
        AppHeader({
            ...this.props.navigation, leftTitle: this.state.title, borderBottomRadius: 0,
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

    // _renderCategoryItem = ({ item, index }) => {
    //     return (
    //         <View style={{ alignItems: 'center', }}>
    //             <TouchableOpacity style={{ paddingHorizontal: 8, marginTop: 10 }} 
    //             onPress={() => { }}>
    //                 <Image resizeMode={'contain'} source={images.rating_she_img} style={{ height: 105, width: 105, }} />
    //             </TouchableOpacity>
    //             <View style={{ marginVertical: 5 }}>
    //                 <Text style={{ color: Colors.black, fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsBold, fontWeight: 'bold' }}>Category 1</Text>
    //             </View>
    //         </View>
    //     )
    // }


    componentDidMount() {
        this.getSubcategory()
    }

    getSubcategory() {
        var data = {}
        data.category_id = this.state.category_id
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.subcategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------home subcategory", response.data)
            if (response.status == true) {
                this.setState({ arrSubcategory: response.data })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    goToCategoryDetails(item) {
        handleNavigation({
            type: 'push', page: 'CategoryDetails', navigation: this.props.navigation, passProps: {
                data: item
            }
        })
    }

    _renderActivity = ({ item, index }) => {
        return (
            <View style={{ flex: 1, marginTop: index == 0 || index == 1 || index == 2 ? 0 : 10 }}>
                <TouchableOpacity onPress={() => this.goToCategoryDetails(item)}
                    style={{ marginHorizontal: 5, }}>
                    <Image source={{ uri: item.image }} resizeMode={'stretch'}
                        style={{ height: 100, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
                <Text style={{ color: "#4C4C4C", textAlign: 'center', fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsRegular, fontWeight: 'bold' }}>{item.title}</Text>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView>
                    <View style={{ marginHorizontal: 10, backgroundColor: Colors.white, }} key="1">
                        <Image resizeMode={'cover'} source={this.props.route.params.data.banner_image ? { uri: this.props.route.params.data.banner_image } : images.test3} style={{ height: 180, width: '100%' }}></Image>
                        <View style={{ marginTop: 20, marginHorizontal: 5 }}>
                            <FlatList
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                data={this.state.arrSubcategory}
                                renderItem={this._renderActivity}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
                            <View style={{
                                width: "100%", backgroundColor: '#FFF7F7',
                                borderRadius: 5, borderColor: '#D4D4D4', borderWidth: 1,
                            }}>
                                <View style={{ padding: 10 }}>
                                    <Text style={{ color: Colors.black, fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsRegular }}>
                                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14, fontWeight: 'bold' }}>Note:</Text>  {this.props.route.params?.data?.note}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};