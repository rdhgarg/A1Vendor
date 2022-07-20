import React from 'react';
import { Text, View, FlatList, SafeAreaView, Dimensions, TouchableOpacity, ScrollView, TextInput, Image, ImageBackground } from 'react-native';
import styles from './HomeScreenStyles';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import { GButton } from '../../Comman/GButton';
import AppHeader from '../../Comman/AppHeader';
import Carousel from 'react-native-banner-carousel';
//import Imagaes from '../../Assets/newImage.'
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import { handleNavigation } from '../../navigation/Navigation';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_activity: '',
            arrCategory: [],
            arrBanner: [],

            arrOffers: [],

            arrActivity: [
                {
                    title: 'Beauty Parlour',
                    walking_img: require('../../Assets/newImage/hairdye.png'),
                },
                {
                    title: 'Wipe',
                    walking_img: require('../../Assets/newImage/wipe.png'),
                },
                {
                    title: 'Haircut',
                    walking_img: require('../../Assets/newImage/haircut.png'),
                },
                {
                    title: 'Repair',
                    walking_img: require('../../Assets/newImage/repairtools.png'),
                },
                {
                    title: 'Massage at home',
                    walking_img: require('../../Assets/newImage/massage.png'),
                },
                {
                    title: 'Plumbing',
                    walking_img: require('../../Assets/newImage/plumber.png'),
                }, {
                    title: 'Carpenter',
                    walking_img: require('../../Assets/newImage/carpenter.png'),
                }, {
                    title: 'Electronics',
                    walking_img: require('../../Assets/newImage/washingmachine.png'),
                }, {
                    title: 'Makeup',
                    walking_img: require('../../Assets/newImage/skinproblem.png'),
                },
            ]
        }

        AppHeader({
            ...this.props.navigation,
            leftTitle: Helper.userData.name,
            leftIcon: {uri: Helper.userData.profile_pic},
            profileIcon: true,
            bgColor: true,
            // hideLeftBackIcon: false,
            headerBg: true,
            leftIconStyle: { height: 40, width: 40, borderRadius: 40 / 2, resizeMode: 'cover' },

        })

    }

    goToCategoryScreen(item) {
        handleNavigation({
            type: 'push', page: 'Category', navigation: this.props.navigation, passProps: {
                data: item
            }
        })
    }

    // goToCategoryScreen() {
    //     this.props.navigation.navigate('Category')
    // }

    componentDidMount() {
        this.getBanner()
        this.getCategory()

    }

    getBanner() {
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.banner, '', Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("Banner ----------", response.data)
            if (response.status == true) {
                this.setState({ arrBanner: response.data , arrOffers : response.best_offer})
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getCategory() {
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.category, '', Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("------home list date", response.data)
            if (response.status == true) {
                this.setState({ arrCategory: response.data })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    _renderCategoryitem = ({ item, index }) => {
        console.log("*******item---", item.title)
        return (
            <View style={{ flex: 1, marginTop: index == 0 || index == 1 || index == 2 ? 0 : 10 }}>
                <TouchableOpacity onPress={() => this.goToCategoryScreen(item)}
                    style={{ marginHorizontal: 5, paddingVertical: 10 }}>
                    <Image source={{ uri: item.image }} resizeMode={'contain'}
                        style={{ height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
                <Text style={{ color: "#4C4C4C", textAlign: 'center', fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsRegular, fontWeight: 'bold' }}>{item.title}</Text>
            </View>
        )
    }

    renderPage(item, index) {
        return (
            <View style={{ justifyContent: 'center', paddingVertical: 5, alignItems: 'center' }} key={index}>
                <Image style={{ width: '92%', borderRadius: 20, height: 150 }} source={{ uri: item.banner }} />
            </View>
        );
    }
    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22, backgroundColor: 'white' }}>
                    <View style={{ backgroundColor: Colors.white }}>
                        <View style={styles.search_box_blue}>
                            <View style={{ marginHorizontal: 16 }}>
                                <View style={styles.search_box_view}>
                                    <TouchableOpacity style={styles.search_touch}>
                                        <Image source={images.search_ic} resizeMode={'contain'} style={styles.search_img} />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={styles.input_text}
                                        placeholder="Search for service"
                                        keyboardType={'default'}
                                        returnKeyType="done"
                                        placeholderTextColor={Colors.black}
                                        underlineColorAndroid='transparent'

                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 10,}}>
                    <Carousel
                        autoplay
                        autoplayTimeout={3000}
                        loop
                        pageIndicatorContainerStyle={{marginBottom:-20}}
                        activePageIndicatorStyle={{ backgroundColor:'#000'}}
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {this.state.arrBanner.map((item, index) => this.renderPage(item, index))}
                    </Carousel>
                    </View>
                   

                    <FlatList
                        style={{ marginTop: 30, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrCategory}
                        numColumns={3}
                        renderItem={this._renderCategoryitem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: fonts.PoppinsLight }}>Best</Text>
                        <Text style={{ fontSize: 16, fontFamily: fonts.PoppinsRegular }}> Offers</Text>
                        <View style={{ width: 100, marginLeft: 10, height: 1, marginTop: 12, backgroundColor: 'gray' }}></View>
                    </View>
                    <FlatList
                        style={{ marginTop: 0, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrOffers}
                        horizontal
                        renderItem={this.offersRender}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={{ flexDirection: 'row', alignContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: fonts.PoppinsLight }}>Feature</Text>
                        <Text style={{ fontSize: 16, fontFamily: fonts.PoppinsRegular }}> Service</Text>
                        <View style={{ width: 100, marginLeft: 10, marginTop: 12, height: 1, backgroundColor: 'gray' }}></View>
                    </View>
                    <FlatList
                        style={{ marginTop: 0, backgroundColor: Colors.white, paddingHorizontal: 10 }}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrOffers}
                        horizontal
                        renderItem={this.offersRender}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
    offersRender = ({ item }) => {
        return (
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity onPress={() => { }}
                    style={{ marginHorizontal: 5, }}>
                    <Image source={{uri : item.banner}} resizeMode={'contain'}
                        style={{ height: 130, width: 250, alignItems: 'center', justifyContent: 'center' }}>
                    </Image>
                </TouchableOpacity>
                {/* <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: Colors.black, fontSize: fonts.fontSize13, fontFamily: fonts.PoppinsBold, fontWeight: 'bold' }}>Salon at home for Women</Text>
                    <Text style={{ color: "#4C4C4C", fontSize: fonts.fontSize12, fontFamily: fonts.PoppinsRegular, }}>Min. 40% Off</Text>
                </View> */}
            </View>
        )
    }
};