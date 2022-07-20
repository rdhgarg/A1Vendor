import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default HomeScreenStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.whiteFive
    },
    search_box_blue: {
        // backgroundColor: Colors.cerulean,
        // height:65,
        // borderBottomLeftRadius: 25,
        // borderBottomRightRadius: 25
    },
    search_box_view: {
        marginTop:10,
        backgroundColor: Colors.white,
        borderColor:Colors.black,
        borderWidth:1,
        width: '100%',
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25,
    },
    search_touch: {
        marginLeft: 20
    },
    search_img: {
        height: 18,
        width: 18,
        tintColor:Colors.black
    },
    input_text: {
        height: 50,
        width: 280,
        paddingLeft: 10,
        color: Colors.black,
        fontSize: fonts.fontSize12,
        fontFamily: fonts.RoBoToRegular_1
    },
    recent_activity_view: {
        backgroundColor: Colors.white,
        marginTop: 5,
        paddingVertical: 10,
    },
    dog_view: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    flex_img_view: {
        flex: .7
    },
    flex_text_view: {
        flex: 9.3
    },
    title_date_address_text: {
        color: Colors.warmGreyThree,
        fontSize: fonts.fontSize12,
        fontFamily: fonts.RoBoToRegular_1,
        lineHeight: 14
    },


});