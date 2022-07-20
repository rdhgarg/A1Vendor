import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, } from 'react-native';
import Colors from '../Assets/Colors';
import { images } from '../Assets/imagesUrl';
import fonts from '../Assets/fonts';


export class LeftHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let { hideLeftBackIcon, leftTitle, leftIcon, leftIconStyle, leftTitleStyle,headerBg, leftClick } = this.props;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                { hideLeftBackIcon ? null :
                    <TouchableOpacity
                        hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
                        onPress={() => leftClick()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={leftIcon ? leftIcon : images.arrow_left}
                            style={[{ height: 15, width: 18, resizeMode: 'contain' }, leftIconStyle]} />
                    </TouchableOpacity>
                }
                <Text style={[{ color: leftIcon ?  Colors.black: Colors.black , marginLeft: 10, fontSize: fonts.fontSize16, fontFamily: fonts.RoBoToMedium_1, lineHeight: 19 }, leftTitleStyle]}>{leftTitle}</Text>
            </View>
        );
    }
}

export class RightHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let { booking,rightIcon,titleTxt, giveRating,rightIconStyle, profileIcon, profileIconClick,headerBg, bellIcon, bellIconClick, settingsIcon, settingIconClick } = this.props;

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                {profileIcon ?
                    <View style={{flexDirection:'column' ,}}>
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={{ color: 'black'}}>Current Location</Text>
                           
                            <View style={{flexDirection:'row',alignItems:'center',}}>
                            <Text style={{color:'white',fontWeight:'bold',fontFamily:fonts.PoppinsExtraBold, textAlign:'center'}}>India</Text>
                            <Image resizeMode={'contain'}
                            source={images.downs}
                            style={{height:12,marginLeft:5, width:12}} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    : (booking == true ?
                        <TouchableOpacity onPress={()=> giveRating()} style={{justifyContent:"center"}}>
                        <Text style={{ fontSize:15,marginRight:10,fontWeight:'bold', color: 'black'}}>{titleTxt}</Text>
                        </TouchableOpacity>

                        : null)
                }

                {/* {bellIcon ?
                    <TouchableOpacity
                        onPress={() => bellIconClick()}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={rightIcon ? rightIcon : images.bell_ic}
                            style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5 }, rightIconStyle]} />
                    </TouchableOpacity>
                    : null
                } */}

                {/* {settingsIcon ?
                    <TouchableOpacity
                        onPress={() => settingIconClick()}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <Image
                            resizeMode={'contain'}
                            source={rightIcon ? rightIcon : images.settings_ic}
                            style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5 }, rightIconStyle]} />
                    </TouchableOpacity>
                    : null
                } */}
            </View>
        );
    }
}

export default AppHeader = (props) => {
    return (
        props.setOptions({
            headerStyle: {
                backgroundColor: props.headerBg ? Colors.black : Colors.white,
                borderBottomLeftRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
                borderBottomRightRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
                elevation: 0,
                shadowOpacity: 0
            },

            headerLeft: () =>
                <LeftHeader
                    leftClick={() => {
                        if (props.leftClick) {
                            props.leftClick()
                        } else {
                            props.goBack()
                        }
                    }}
                    leftIcon={props.leftIcon}
                    leftTitleStyle={props.leftTitleStyle}
                    leftIconStyle={props.leftIconStyle}
                    leftTitle={props.leftTitle}
                    hideLeftBackIcon={props.hideLeftBackIcon}
                    headerBg={props.headerBg}
                />,
            headerRight: () =>
                <RightHeader
                    {...props}
                />,
            headerTitle: () => <></>,
        })

    )
} 


// import React from 'react';
// import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, } from 'react-native';
// import Colors from '../Assets/Colors';
// import { images } from '../Assets/imagesUrl';
// import fonts from '../Assets/fonts';


// export class LeftHeader extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         let { hideLeftBackIcon, leftTitle, leftIcon, leftIconStyle, leftTitleStyle, leftClick } = this.props;

//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>
//                 {hideLeftBackIcon ? null :
//                     <TouchableOpacity
//                     hitSlop={{ top: 40, left: 40, right: 40, bottom: 40 }}
//                     onPress={() => leftClick()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={leftIcon ? leftIcon : images.arrow_left}
//                             style={[{ height: 18, width: 18,  }, leftIconStyle]} />
//                     </TouchableOpacity>
//                 }
//                 <Text style={[{ color: Colors.black, marginLeft: 10, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToMedium_1, lineHeight: 19 }, leftTitleStyle]}>{leftTitle}</Text>
//             </View>
//         );
//     }
// }

// export class RightHeader extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }

//     render() {
//         let { rightIcon, rightIconStyle, profileIcon, profileIconClick, bellIcon, bellIconClick, settingsIcon, settingIconClick } = this.props;

//         return (
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
//                 {profileIcon ?
//                     <TouchableOpacity
//                         onPress={() => profileIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.user_edit_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }

//                 {bellIcon ?
//                     <TouchableOpacity
//                         onPress={() => bellIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.bell_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }

//                 {settingsIcon ?
//                     <TouchableOpacity
//                         onPress={() => settingIconClick()}
//                         style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
//                         <Image
//                             resizeMode={'contain'}
//                             source={rightIcon ? rightIcon : images.settings_ic}
//                             style={[{ height: 18.5, width: 18.5, resizeMode: 'contain', marginRight: 5,tintColor:Colors.black }, rightIconStyle]} />
//                     </TouchableOpacity>
//                     : null
//                 }
//             </View>
//         );
//     }
// }

// export default AppHeader = (props) => {

//     return (
//         props.setOptions({
//             headerStyle: {
//                 // backgroundColor: props.headerBg ? props.headerBg : Colors.cerulean,
//                 borderBottomLeftRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
//                 borderBottomRightRadius: props.borderBottomRadius ? props.borderBottomRadius : 0,
//                 elevation: 0,
//                 shadowOpacity: 0
//             },

//             headerLeft: () =>
//                 <LeftHeader
//                     leftClick={() => {
//                         if (props.leftClick) {
//                             props.leftClick()
//                         } else {
//                             props.goBack()
//                         }
//                     }}
//                     leftIcon={props.leftIcon}
//                     leftTitleStyle={props.leftTitleStyle}
//                     leftIconStyle={props.leftIconStyle}
//                     leftTitle={props.leftTitle}
//                     hideLeftBackIcon={props.hideLeftBackIcon}
//                 />,
//             headerRight: () =>
//                 <RightHeader
//                     {...props}
//                 />,
//             headerTitle: () => <></>,
//         })

//     )
// } 