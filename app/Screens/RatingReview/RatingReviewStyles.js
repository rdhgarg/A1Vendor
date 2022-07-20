import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default RatingReviewStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.white
    },
    select_lang_pre_view:{
        marginHorizontal: 17, 
        marginTop:20,
        marginVertical:10
    },
    select_lang_pre_text:{
        fontSize: fonts.fontSize14, 
        color: Colors.blackTwo, 
        fontFamily: 
        fonts.RoBoToMedium_1, 
        lineHeight: 17
    },
    update_btn_view:{
        marginVertical: 10, 
        marginTop: 33, 
        marginHorizontal: 16
    },
    lang_view:{
        marginHorizontal: 17, 
        marginVertical: 15
    },
    lang_radio_touch_text:{
        flexDirection:'row'
    },
    radio_img:{
        height:14,
        width:14
    },
    lang_select_text:{
        marginLeft:10,
        fontSize:fonts.fontSize14,
        fontFamily:fonts.RoBoToRegular_1,
        lineHeight:17,
        color:Colors.warmGreyThree
    },


});