import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default SettingsScreenStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.white
    },
    main_view_touch:{
        marginHorizontal:16.5,
    },
    settings_title_touch:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:15,
        borderBottomColor:Colors.whiteFour,
        borderBottomWidth:1.5,
    },
    settings_title_text:{
        fontSize:fonts.fontSize14,
        color:Colors.blackTwo,
        fontFamily:fonts.RoBoToMedium_1,
        lineHeight:17
    },
    arrow_img:{
        height: 12, 
        width: 7
    },
   


});