import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground,StyleSheet,TextInput, Dimensions, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './ContactUsStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'


const DeviceH = Dimensions.get('window').height;
const DeviceW = Dimensions.get('window').width;
export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userChangePassForm: {
                current_password: '',
                new_password: '',
                confirm_password: '',

            },
            arrLanguage: [
                { label: 'Select', value: '-1' },
                { label: 'test', value: 'en' },
                { label: 'test', value: 'sp' },
            ],
            language_code :'-1'
        }
        AppHeader({ ...this.props.navigation, leftTitle: this.props.route.params?.title })

    }

    componentDidMount() {

    }


    setValues(key, value) {
        let userChangePassForm = { ...this.state.userChangePassForm }
        userChangePassForm[key] = value;
        this.setState({ userChangePassForm })
    }

    change_password_Submit() {
        this.props.navigation.navigate('SettingsScreen')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                    <View style={{ marginVertical: 10, marginTop: 15, marginHorizontal: 16 }}>

                    <Text style={{ color: Colors.black, marginTop: 0, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter An Email Id</Text>
                           <View style={{ flexDirection: 'row', marginTop:10, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8,}}>
                            <TextInput
                                style={{ fontSize: 15,textAlignVertical:'top', flex:1, fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 0 }}
                                placeholder={''}
                                placeholderTextColor={'#000'}
                                onChangeText={() => this.setState({})}
                            // value={value}
                            />
                        </View>

                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14,marginTop:20, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Select An Issue Type</Text>
                      
                        <View style={{  backgroundColor:'#F4EDED', marginTop:10, paddingHorizontal:5}}>
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
                      
                           <Text style={{ color: Colors.black, marginTop: 20, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter Description</Text>
                           <View style={{ flexDirection: 'row',height:130, marginTop:10, backgroundColor: '#F4EDED', borderRadius: 10, paddingHorizontal: 8,}}>
                            <TextInput
                                style={{ fontSize: 15,textAlignVertical:'top', flex: 1,fontFamily: fonts.PoppinsBold, fontWeight: 'bold', marginLeft: 0 }}
                                placeholder={''}
                                placeholderTextColor={'#000'}
                                onChangeText={() => this.setState({})}
                            // value={value}
                            />
                        </View>
                      
                    </View>


                    <View style={{ marginVertical: 10, marginTop: 33, marginHorizontal: 16 }}>
                        <GButton
                            Text='Submit'
                            width={'50%'}
                            height={50}
                            borderRadius={25}
                        // onPress={() => { this.change_password_Submit() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>
                </ScrollView>
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

