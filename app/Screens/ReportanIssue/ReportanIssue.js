import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground,TextInput, Dimensions, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './ReportanIssueStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';



const DeviceH = Dimensions.get('window').height;
const DeviceW = Dimensions.get('window').width;
export default class ReportanIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userChangePassForm: {
                current_password: '',
                new_password: '',
                confirm_password: '',

            }

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Report an Issue' })

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

                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter An Email Id</Text>
                        <IconInput
                            // placeholder="Current Password"
                            placeholderTextColor={Colors.black}
                            secureTextEntry={true}
                            setFocus={() => { this.new_password.focus(); }}
                            returnKeyType="next"
                            maxLength={12}
                            placeholderTextColor={Colors.black}
                            keyboardType={'default'}
                            onChangeText={(current_password) => this.setValues('current_password', current_password)}
                            value={this.state.userChangePassForm.current_password}
                        />

                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Select An Issue Type</Text>
                        <IconInput
                            placeholder="Select"
                            placeholderTextColor={Colors.black}
                            secureTextEntry={true}
                            getFocus={(input) => { this.new_password = input }}
                            setFocus={(input) => { this.confirm_password.focus(); }}
                            returnKeyType="next"
                            maxLength={12}
                            placeholderTextColor={Colors.black}
                            keyboardType={'default'}
                            onChangeText={(new_password) => this.setValues('new_password', new_password)}
                            value={this.state.userChangePassForm.new_password}
                        />

                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize14, fontFamily: fonts.RoBoToBold_1, fontWeight: 'bold' }}>Enter Description</Text>
                        <TextInput
                            style={{ height: 100, backgroundColor: "#F4EDED", }}
                        />
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



