import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default VerifyingDetailsStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    welcome_text_view:{
        position: 'absolute', 
        marginTop: 60, 
        alignSelf: 'center'
    },
    welcome_text:{
        color: Colors.white, 
        lineHeight: 32, 
        fontSize: fonts.fontSize26, 
        fontFamily: fonts.RoBoToBold_1,
    },
    user_pro_img_view:{
        position: 'absolute', 
        marginTop: 140, 
        alignSelf: 'center'
    },
    user_img:{
        height: 82, 
        width: 82, 
        borderRadius: 20,
    },
    camera_img_touch:{
        height: 26, 
        width: 26, 
        borderRadius: 26 / 2, 
        alignSelf: 'center', 
        marginTop: -15 
    },
    camera_img:{
        width: '100%', 
        height: '100%'
    },
    input_parent_view:{
        marginVertical: 10, 
        marginTop: 25, 
        marginHorizontal: 16
    },
    post_city_parent_view:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
   post_view:{
    flex: 4, 
    marginRight: 5
   },
   city_view:{
    flex: 4, 
    marginLeft: 5
   },
   check_box_text_view:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 35
   },
   check_box_touch:{
    height: 15, 
    width: 15
   },
   box_check_img:{
    height: '100%', 
    width: '100%',
    tintColor:Colors.white,
   },
   terms_text:{
    marginLeft: 10, 
    fontSize: fonts.fontSize12, 
    lineHeight: 22, 
    color: Colors.white, 
    fontFamily: fonts.RoBoToRegular_1 
   },
   sign_up_btn:{
    marginVertical: 10, 
    // marginTop: 5, 
    marginHorizontal: 35 
   },
   or_view:{
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    marginVertical: 10
   },
   or_line_view:{
    backgroundColor: Colors.warmGreyTwo, 
    height: 1, 
    width: 15
   },
   or_text:{
    marginHorizontal: 5, 
    fontSize: fonts.fontSize12, 
    color: Colors.warmGreyTwo, 
    fontFamily: fonts.RoBoToBold_1
   },
   social_btn_view:{
    marginVertical: 10, 
    marginHorizontal: 16
   },
   already_account_touch:{
    marginVertical: 10, 
    marginHorizontal: 16, 
    alignItems: 'center'
   },
   already_text:{
    lineHeight: 14, 
    fontSize: fonts.fontSize12, 
    color: Colors.black, 
    fontFamily: fonts.RoBoToRegular_1
   },
   login_text:{
    fontSize: fonts.fontSize12, 
    color: Colors.azul, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToMedium_1
   },
   


});