import { StyleSheet } from 'react-native';
import fonts from '../../Assets/fonts';
import Colors from '../../Assets/Colors';


export default ProfileScreenStyles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: Colors.white
    },
    profile_view:{
        backgroundColor: Colors.cerulean, 
        height:50,
        // paddingVertical: 35, 
        width: '100%', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25
    },
    profile_img_view:{
        height: 82, 
        width: 82, 
        borderRadius: 20, 
        position: 'absolute', 
        bottom: -40, 
        alignSelf: 'center'
    },
    profile_img:{
        height: '100%', 
        width: '100%', 
        borderRadius: 20,
    },
    input_view:{
        marginVertical: 10, 
        marginTop: 60, 
        marginHorizontal: 16
    },
    input_zip_city_view:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    input_zip_view:{
        flex: 4, 
        marginRight: 5
    },
    input_city_view:{
        flex: 4, 
        marginLeft: 5
    },
});