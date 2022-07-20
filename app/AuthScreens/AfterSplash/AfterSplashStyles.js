import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default AfterSplashStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.white
    },
    image_back_ground: {
        flex: 1,
    },
    top_button_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginHorizontal: 16
    },
    de_view:{
        width: 83, 
        height: 34, 
        backgroundColor: Colors.white, 
        borderRadius: 26, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        alignItems: 'center'
    },
    de_text:{
        fontSize: fonts.fontSize14, 
        fontFamily: fonts.RoBoToMedium_1, 
        lineHeight: 17, 
        color: Colors.blackThree
    },
    switzer_img:{
        height: 20, 
        width: 30
    },
    en_view:{
        width: 95, 
        height: 34, 
        backgroundColor: Colors.white, 
        borderRadius: 26, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        alignItems: 'center'
    },
    en_text:{
        fontSize: fonts.fontSize10, 
        lineHeight: 13, 
        color: Colors.greyishBrown, 
        fontFamily: fonts.RoBoToMedium_1
    },
    en_img:{
        height: 15, 
        width: 20
    },
    after_splash_logo_view:{
        alignItems: 'center', 
        marginTop: 70
    },
    after_splash_logo:{
        height: 213, 
        width: 213
    },
    have_be_parent_view:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 32.8, 
        marginTop: 90
    },
    have_be_round_view:{
        height: 108, 
        width: 108, 
        backgroundColor: Colors.white, 
        borderRadius: 108 / 2, 
        borderWidth: 2, 
        borderColor: Colors.waterBlue, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    have_be_img:{
        height: 70, 
        width: 70
    },
    have_be_omy_text:{
        fontSize: fonts.fontSize10, 
        fontFamily: fonts.RoBoToMedium_1, 
        lineHeight: 13, 
        color: Colors.greyishBrown
    },
    have_account_view:{
        marginVertical: 10, 
        marginTop: 50, 
        marginHorizontal: 16, 
        alignItems: 'center'
    },
    have_account_text:{
        color: Colors.blackTwo, 
        fontSize: fonts.fontSize14, 
        lineHeight: 17, 
        fontFamily: fonts.RoBoToMedium_1
    },
    btn_view:{
        marginVertical: 10, 
        marginHorizontal: 16
    },
});