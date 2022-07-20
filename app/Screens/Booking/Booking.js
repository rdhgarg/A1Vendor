import React from 'react';
import { Text, View, FlatList, TouchableOpacity,StyleSheet, SafeAreaView, } from 'react-native';
import styles from './BookingStyles';
import Colors from '../../Assets/Colors';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'



export default class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrService: [1, 2, 3],
            arrLanguage: [
                { label: 'All Booking', value: '-1' },
                { label: 'test', value: 'en' },
                { label: 'test', value: 'sp' },
            ],
            language_code :'-1'
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'My Booking', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            bellIconClick: () => this.bellIconClick(),
            settingIconClick: () => this.settingIconClick()
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }

    gotToActivityDetail() {
        this.props.navigation.navigate('ActivityDetailScreen')
    }

    _renderUpComingItem = ({ index }) => {
        return (

            <View style={styles.history_view}>
                {index == 0 ? null :
                    <View style={{ height: 1, backgroundColor: 'gray', width: '90%', marginBottom: 15, marginTop: 5, marginHorizontal: 16 }}></View>
                }
                <TouchableOpacity onPress={() => { }}>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Booking ID: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>12345</Text>
                    </View>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Booking Date: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>12/2/2022</Text>
                    </View>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Request: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>Pending</Text>
                    </View>
                    <View style={styles.img_calender_location_list_view}>
                        <Text style={{ fontFamily: fonts.PoppinsExtraBold, color: Colors.black, fontSize: 13, fontWeight: 'bold' }}>Status ID: </Text>
                        <Text style={{ fontSize: 12, color: 'gray' }}>upComming</Text>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

<View style={{  backgroundColor:'#F4EDED', marginTop:10,marginHorizontal:15, paddingHorizontal:5}}>
                                <RNPickerSelect
                                    //label={LanguagesIndex.translate('LanguagePreference')}
                                    items={this.state.arrLanguage}
                                    placeHolder={{}}
                                    
                                    onValueChange={(value) => { this.setState({ language_code: value }) }}
                                    selectValue={this.state.language_code}
                                    useNativeAndroidPickerStyle={false}
                                    style={pickerSelectStyles}
                                />
                           </View> 

                <View style={{ marginHorizontal: 15, marginTop: 10, paddingBottom: 15, elevation: 1, backgroundColor: Colors.white, borderRadius: 10, padding: 5 }} key="1">



                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[1, 2, 3]}
                        renderItem={this._renderUpComingItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
            </SafeAreaView>
        )
    }

};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        height: 40,
        color: '#000',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold,
        marginLeft: 10
    },
    inputAndroid: {
        fontSize: 14,
        height: 40,
        color: '#000',
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold
    },
});
