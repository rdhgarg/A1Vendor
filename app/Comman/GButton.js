import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../Assets/Colors';
import fonts from '../Assets/fonts';
import {images} from '../Assets/imagesUrl';



export const GButton = (params) => (
    <TouchableOpacity activeOpacity={0.5} onPress={params.onPress}
        style={{
            alignItems: 'center', borderRadius: params.borderRadius, backgroundColor: Colors.black,
            width: params.width, alignSelf: 'center', height: params.height, justifyContent: 'center', marginVertical: params.marginVertical
        }}>
        <Text style={{
            fontSize: fonts.fontSize14, color: Colors.white, lineHeight: 17,
            fontFamily:fonts.RoBoToMedium_1
        }}>
            {params.Text}</Text>
    </TouchableOpacity>
);


export const SocialButton = (params) => (
    <TouchableOpacity activeOpacity={0.5} onPress={params.onPress}
        style={{
            alignItems: 'center', borderRadius: params.borderRadius, backgroundColor: params.backgroundColor,
            width: params.width, alignSelf: 'center', height: params.height, justifyContent: 'center', marginVertical: params.marginVertical
        }}>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

            <Image
                resizeMode='contain'
                source={params.btnImage}
                // source={images.facebook_ic}
                style={{ width:params.imgWidth, height:params.imgHeight,marginHorizontal:5 }}
            />

            <Text style={{
                fontSize: fonts.fontSize14, color: Colors.white, lineHeight: 17,marginHorizontal:5,fontFamily:fonts.RoBoToMedium_1
            }}>
                {params.Text}</Text>

        </View>

    </TouchableOpacity>
);






// export const SocialButton = (params) => (
//   <View
//     style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: params.paddingVertical }}>

//     <TouchableOpacity style={{ paddingRight: 20, }} onPress={params.FBonPress}>
//       {/* <Image
//         resizeMode='contain'
//         source={Images.Home.facebook}
//         style={{ width: 48, height: 48, }}
//       /> */}
//     </TouchableOpacity>

//     <TouchableOpacity style={{ paddingLeft: 7, }} onPress={params.GonPress}>
//       {/* <Image
//         resizeMode='contain'
//         source={Images.Home.google}
//         style={{ width: 48, height: 48, }}
//       /> */}
//     </TouchableOpacity>

//   </View>
// );
