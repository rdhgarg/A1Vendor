// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, Share, FlatList, Image,Dimensions, StyleSheet,DeviceEventEmitter, TextInput, TouchableOpacity, } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import { Card } from 'react-native-shadow-cards';
import moment from 'moment';

import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'

export default class MyServiceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory: [],
            categoryId: '',
            apiRes:''
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'My Service Listing',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,
            booking: true,
            titleTxt: "+ Add Service",
            giveRating: () => this.addService(),
        })
    }

    addService() {
        this.props.navigation.navigate('VenderAddervice')
    }

    componentDidMount() {
        this.addStaffEvent = DeviceEventEmitter.addListener("AddService",(data)=>{
            this.getCategory()
        })
        this.getCategory()
    }

    componentWillUnmount(){
        this.addStaffEvent.remove()
    }

    // saveCategory() {

    //     if (this.state.categoryId == "") {
    //         Helper.showToast("Please selece category")
    //         return
    //     }

    //     let data = {
    //         vendor_id: Helper.userData.id,
    //         category_id: this.state.categoryId
    //     }
    //     Helper.globalLoader.showLoader();
    //     ApiCallHelper.getNetworkResponce(Constant.saveCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
    //         Helper.globalLoader.hideLoader();
    //         if (response.status == true) {
    //             this.props.navigation.goBack()
    //             Helper.showToast(response.message)
    //         } else { }
    //     }).catch(err => {
    //         Helper.globalLoader.hideLoader()
    //     })
    // }
    getCategory() {
        let data = {
            user_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.myService, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrCategory: response.data,apiRes:'' })
            } else {
                this.setState({apiRes : '1'})
             }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ backgroundColor: 'white',  marginHorizontal: 10,paddingBottom: 10 }}>

                    {/* <View style={renderStyle.search_box_view}>
                        <TouchableOpacity style={renderStyle.search_touch}>
                            <Image source={images.search_ic} resizeMode={'contain'} style={renderStyle.search_img} />
                        </TouchableOpacity>

                        <TextInput
                            style={renderStyle.input_text}
                            placeholder="Search"
                            keyboardType={'default'}
                            returnKeyType="done"
                            placeholderTextColor={"black"}
                            underlineColorAndroid='transparent'

                        />
                    </View> */}
{this.state.apiRes == '1' ?  <View style={{ height:Dimensions.get("window").height-179 , justifyContent:'center', alignItems:'center',}}>
                        <Text>No Service Available</Text>
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

    renderRequest = ({ item, index }) => {
        return <View style={{ marginTop: index == 0 ? 2 : 0 , paddingBottom:10, paddingHorizontal:5}}>

            <Card style={{ padding: 10, width: '100%', }}>
                <TouchableOpacity  style={{ flexDirection: 'row', }}>                  
                        <Image source={{uri : item.image}} style={{ height: 70, width: 70,}}></Image>
                        <View>
                        <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10, fontWeight:'bold' }}>{item.title}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10,marginTop:10 }}>{item.category_name}</Text>
                        <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10, }}>{item.subcategory_name}</Text>

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



