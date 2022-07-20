// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, Share, FlatList, Image, TouchableOpacity, DeviceEventEmitter, } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import Constant from '../../config/Constant';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrVender: [
                {
                    page:"Dashboard",
                    title: 'Dashboard',
                    icon: images.active_home,
                },
                {
                    page:"Profile",
                    title: 'My Profile',
                    icon: images.metro_profile,
                },
                // { 
                //     page:"SelectCategory",
                //     title: 'Add Category',
                //     icon: images.change_password,
                // },
                {
                    page:"ChangePassword",
                    title: 'Change Password',
                    icon: images.change_password,
                },
                
                // {
                //     page:"MyServiceList",
                //     title: 'My Service List',
                //     icon: images.address_book,
                // },
                {
                    page:"MyStaffList",
                    title: 'My Staff List',
                    icon: images.address_book,
                },
                // {
                //     page:"AddAddress",
                //     title: 'Service',
                //     icon: images.address_book,
                // },
                // {
                //     page:"RatingReview",
                //     title: 'Staff',
                //     icon: images.star_full,
                // },
                {
                    page:"WebPage",
                    title: 'Privacy Policy',
                    icon: images.privacy,
                },
                {
                    page:"WebPage",
                    title: 'Terms & Conditions',
                    icon: images.terms,
                }, 
                // {
                //     page:"WebPage",
                //     title: 'Setting',
                //     icon: images.works,
                // },
                // {
                //     page:"WebPage",
                //     title: 'How It Works',
                //     icon: images.works,
                // },
                {
                    page:"WebPage",
                    title: 'Bookings',
                    icon: images.works,
                },
               
                // {   
                //     page:"ContactUs",
                //     title: 'Contact Us',
                //     icon: images.support,
                // }, 
                // {
                //     page:"FAQ",
                //     title: 'FAQ',
                //     icon: images.faq,
                // }, 
                {
                    page:"LogOut",
                    title: 'LogOut',
                    icon: images.logout,
                },
            ],
            arrStaff: [
                {
                    page:"Profile",
                    title: 'My Profile',
                    icon: images.metro_profile,
                },
               
                {
                    page:"ChangePassword",
                    title: 'Change Password',
                    icon: images.change_password,
                },
               
               
                {
                    page:"WebPage",
                    title: 'Privacy Policy',
                    icon: images.privacy,
                },
                {
                    page:"WebPage",
                    title: 'T&C',
                    icon: images.terms,
                }, 
                
                {
                    page:"WebPage",
                    title: 'How It Works',
                    icon: images.works,
                },
                {
                    page:"WebPage",
                    title: 'Bookings',
                    icon: images.works,
                },
               
                {   
                    page:"ContactUs",
                    title: 'Contact Us',
                    icon: images.support,
                }, {
                    page:"FAQ",
                    title: 'FAQ',
                    icon: images.faq,
                }, 
                {
                    page:"LogOut",
                    title: 'LogOut',
                    icon: images.logout,
                },
            ],


        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Menu',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,
         
        })
    }

componentDidMount(){
    console.log("usr----------------------", JSON.stringify( Helper.userData));
}

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    clickAction(val, title){
       
        if (val == 'Share'){
         this.onShare()
        }else if(val == "LogOut"){
            
            Helper.removeItemValue('user_details')
           Helper.userData = {}
            Helper.user_id = ''
           //this.props.navigation.goBack()
           this.props.navigation.navigate('LoginScreen')
           // this.props.navigation.navigate(val,{title : title})
           // Helper.navigationRef.replace('LoginScreen')
        }
        else if(title == "FAQ"){
            this.props.navigation.navigate("WebPage",{title : "FAQ", link : Constant.faq})
        }
        else if(title == "Contact Us"){
            this.props.navigation.navigate("WebPage",{title : "Contact Us", link : Constant.contactUs})
        }
        else if(title == "About"){
            this.props.navigation.navigate("WebPage",{title : "About", link : Constant.about})

        }else if(title == "Terms & Conditions"){
            this.props.navigation.navigate("WebPage",{title : "Terms & Conditions", link : Constant.TermsAndCondition})

        }else if(title == "Privacy Policy"){
            this.props.navigation.navigate("WebPage",{title : "Privacy Policy", link : Constant.privacy})

        }
        
         else if (title == "Dashboard"){
             DeviceEventEmitter.emit("Action","done")
            this.props.navigation.navigate('Home')
        }
        else if (title == "Bookings"){
            this.props.navigation.navigate('BookingList', { data: '1' })
        }
        else{
            this.props.navigation.navigate(val,{title : title})
        }
       
    }

     onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Hi this is testing message',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    }

    _renderUpComingItem = ({ item, index }) => {
       // console.log(item);
        return (
            <View style={{ marginHorizontal: 16 }}>
                {index == 0 ? null :
                    <View style={{ height: 1, backgroundColor: '#C5C5C5', width: '100%', marginBottom: 15, marginTop: 15, }}></View>
                }
                <TouchableOpacity onPress={() => {this.clickAction(item.page, item.title) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image resizeMode={'contain'} style={{ height: 23, width: 22, }} source={item.icon}></Image>
                        <Text style={{ marginLeft: 10, fontFamily: fonts.PoppinsExtraBold, color: '#555555', fontSize: 15, fontWeight: 'bold' }}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'white', paddingTop: 10, paddingBottom: 10 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={Helper.userData.role_id == "2" ? this.state.arrVender: this.state.arrStaff}
                    renderItem={this._renderUpComingItem}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

};





