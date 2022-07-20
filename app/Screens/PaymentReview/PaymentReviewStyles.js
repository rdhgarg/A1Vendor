import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default PaymentReviewStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    up_his_btn_view:{
        marginHorizontal: 16, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 25
    },
    up_coming_touch:{
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 160,
        height: 40, 
        borderWidth: 1, 
        borderRadius: 10,
    },
    up_coming_text:{
        lineHeight: 17, 
        fontFamily: fonts.RoBoToMedium_1,
        fontSize: fonts.fontSize14,
    },
    history_touch:{
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 160, 
        height: 40,
        borderWidth: 1, 
        borderRadius: 10,
    },
    history_text:{
        fontSize: fonts.fontSize14, 
        lineHeight: 17,
        fontFamily: fonts.RoBoToMedium_1
    },
    view_pager:{
        flex: 1,
    },
    up_coming_view:{
        marginTop: 10, 
        backgroundColor: Colors.white, 
        paddingVertical: 5 
    },
    up_coming_profile_view:{
        marginVertical: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginHorizontal: 16, 
        justifyContent: 'space-between'
    },
    profile_flex_view:{
        flex: 1.2,
    },
    profile_img_view:{
        width: 35, 
        height: 35, 
        borderRadius: 10,
    },
    profile_img:{
        width: '100%', 
        height: '100%'
    },
    user_name_flex:{
        flex: 7,
    },
    user_name_text:{
        color: Colors.black, 
        fontSize: fonts.fontSize15, 
        fontFamily: fonts.RoBoToBold_1, 
        lineHeight: 14,
    },
    rate_view:{
        flex: 2, 
        alignItems: 'flex-end'
    },
    rate_text:{
        color: Colors.black, 
        fontSize: fonts.fontSize15, 
        fontFamily: fonts.RoBoToBold_1, 
        lineHeight: 14,
    },
    view_text_img_small:{
        marginHorizontal: 16, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 5
    },
   dog_img_view:{
    flex: .7
   },
   dog_img:{
    width: 13, 
    height: 12.2
   },
   title_view:{
    flex: 9.2
   },
   title_name:{
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   calender_view:{
    flex: .4 
   },
   calender_img:{
    width: 10.7, 
    height: 11.8
   },
   date_view:{
    flex: 9.6
   },
   date_text:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   location_img_view:{
    flex: .4
   },
   location_img:{
    width: 8.7, 
    height: 12.1
   },
   location_text_view:{
    flex: 9.6
   },
   location_text:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_view:{
    borderWidth:0.5,
    borderRadius:10,
    marginHorizontal:2,
    marginBottom:10,
    borderColor:'#FCFBFB',
    backgroundColor: Colors.white, 
    elevation:3,
    marginTop:2
   
   },
   img_calender_location_list_view:{
    marginHorizontal: 16, 
    flexDirection: 'row', 
    alignItems: 'center', 
   
   },
   flex_img_view:{
    flex: .4
   },
   flex_text_view:{
    flex: 9.6
   },
   history_dog_img:{
    width: 13, 
    height: 12.2
   },
   dog_title:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_calender_img:{
    width: 10.7, 
    height: 11.8
   },
   history_date_title:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },
   history_location_img:{
    width: 8.7, 
    height: 12.1
   },
   history_address:{
    marginLeft: 8.3, 
    fontSize: fonts.fontSize12, 
    lineHeight: 14, 
    fontFamily: fonts.RoBoToRegular_1, 
    color: Colors.warmGreyThree
   },


});