// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, Share, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import { Card } from 'react-native-shadow-cards';
import moment from 'moment';

import ApiCallHelper from '../../config/ApiCallHelper'
import Constant from '../../config/Constant'

export default class SelectCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCategory:[],
            categoryId:[],
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Add Category',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,
            booking:true,
            titleTxt:"Save",
            giveRating: () => this.saveCategory(),
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    componentDidMount(){
        this.getCategory()
    }

   saveCategory(){
    if(this.state.categoryId == ""){
        Helper.showToast("Please selece category")
        return
    }

    let data = {
        vendor_id: Helper.userData.id,
        category_id :this.state.categoryId
    }
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(Constant.saveCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
        Helper.globalLoader.hideLoader();
        if (response.status == true) {
            this.props.navigation.goBack()
            Helper.showToast(response.message)
        } else { }
    }).catch(err => {
        Helper.globalLoader.hideLoader()
    })
   }
    getCategory() {
        let data = {
            vendor_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.allCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
           console.log("uuuuuuuuu--------------------",response.data);
         
            if (response.status == true) {
                setTimeout(() => {
                    response.data.map((item, index)=> {
                        console.log(item);
                        if(item.is_checked == 1){
                            console.log("------------------", item);
                            this.state.categoryId.push(item.value)
                            //this.setState({})
                        }
            
                    })
                    this.setState({})
                }, 200);
                
                this.setState({ arrCategory: response.data, })
               
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }
  

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ backgroundColor: 'white', paddingTop: 10, marginHorizontal: 10, paddingBottom: 10 }}>

                    <View style={renderStyle.search_box_view}>
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
                    </View>
                    <Card style={{ padding: 10, width: '100%', top: 10, }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrCategory}
                            renderItem={this.renderRequest}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Card>

                </View>
            </View>
        )
    }

    selectMultiService(value) {
        if (this.state.categoryId.includes(value)) {
            var array = [...this.state.categoryId]; // make a separate copy of the array
            var index = array.indexOf(value)
            array.splice(index, 1);
            this.setState({ categoryId: array });

        } else {
            var array = [...this.state.categoryId]; // make a separate copy of the array
            array.push(value);
            this.setState({ categoryId: array });
        }

    }

    renderRequest = ({ item, index }) => {
        return <View style={{ paddingVertical: index == 0 ? 0 : 10 }}>
            <View style={{width:'100%',height:index == 0 ? 0 :0.5,backgroundColor:'#707070', }}/>
                <TouchableOpacity onPress={this.selectMultiService.bind(this, item.value)} style={{flexDirection:'row', marginTop:15 }}>
                {this.state.categoryId.includes(item.value) ?
                    <Image source={images.radio_btn_selected} style={{height:20, width:20, tintColor:'#000'}}></Image> : 
                    <Image source={images.radio_btn_un_selected} style={{height:20, width:20, tintColor:'#000'}}></Image>
                }
                    <Text style={{fontSize:13, marginLeft:10}}>{item.label}</Text>
                </TouchableOpacity>
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



