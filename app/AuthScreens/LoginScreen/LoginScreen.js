import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {images} from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';
import Constant from '../../config/Constant';
import IconInput from '../../Comman/Input_new';
import Colors from '../../Assets/Colors';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceKey: '',
      PasswordIcon: true,
      vendor_id: '', //2292903
      mobile_number: '', //1111111111
      password: '', //alliswell
    };
  }

  // vendor_id: "9436156",
  // mobile_number: '1122334455',
  // password: '12345678'

  componentDidMount() {
    Helper.getData('device_key').then((screenData) => {
      this.state.deviceKey = screenData;

      // alert('Imran khan- ' + screenData)
    });
  }

  goToForgotPass() {
    this.props.navigation.navigate('ForgotPasswordScreen');
  }

  goToSingUp() {
    this.props.navigation.navigate('SignUpScreen');
  }
  ShowPassword() {
    this.setState({PasswordIcon: !this.state.PasswordIcon});
  }

  homePage() {
    // this.props.navigation.navigate('Home')
    //return
    Keyboard.dismiss();
    if (this.state.vendor_id == '') {
      Helper.showToast('Please enter valide vender id');
      return false;
    }
    if (this.state.mobile_number == '') {
      Helper.showToast('Please enter mobile number');
      return false;
    }
    if (this.state.mobile_number.length < 10) {
      Helper.showToast('Please enter valid mobile number');
      return false;
    }
    if (this.state.password == '') {
      Helper.showToast('Please enter password');
      return false;
    }
    if (this.state.password.length < 6) {
      Helper.showToast('Please enter valid password');
      return false;
    }
    var data = {};
    data.vendor_id = this.state.vendor_id;
    data.mobile_number = this.state.mobile_number;
    data.password = this.state.password;
    data.device_key = this.state.deviceKey;

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.login,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        let data = response.data;
        if (response.status == true) {
          Helper.userData = data;
          Helper.setData('user_details', data);
          Helper.setData('HideWelcomeScreen', 'done');
          this.props.navigation.navigate('Home');
          DeviceEventEmitter.emit('LOGIN', 'done');
          //  handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation })
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  render() {
    return (
      <SafeAreaView style={renderStyle.safe_area_view}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{paddingBottom: 22}}>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15%',
              }}>
              <Image
                source={images.logo}
                style={{height: 200, width: '90%'}}
                resizeMode={'contain'}
              />
            </View>

            <Text style={renderStyle.titleCss}>Enter Vendor ID</Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.vendor_id}
                maxLength={20}
                onChangeText={(vendor_id) => this.setState({vendor_id})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Enter Mobile Number
            </Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.mobile_number}
                maxLength={10}
                keyboardType={'phone-pad'}
                onChangeText={(mobile_number) => this.setState({mobile_number})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Password
            </Text>
            {/* <View style={renderStyle.txtView}>
                            <TextInput
                                style={renderStyle.inputCss}
                                placeholderTextColor={'#000'}
                                secureTextEntry={true}
                                maxLength={20}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </View> */}

            <View style={renderStyle.txtView}>
              <IconInput
                placeholder=""
                secureTextEntry={this.state.PasswordIcon}
                imagePathRight={
                  this.state.PasswordIcon ? images.eye_hidden : images.eye
                }
                show={() => {}}
                tintColor={Colors.black}
                rightHeight={16}
                rightWidth={22}
                ClickPass={() => this.ShowPassword()}
                maxLength={60}
                placeholderTextColor={'#000'}
                keyboardType={'default'}
                style={{backgroundColor:"red"}}
                getFocus={(input) => {
                  this.password = input;
                }}
                // setFocus={() => {
                //   this.login_Submit();
                // }}
                returnKeyType="done"
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.homePage()}
              style={renderStyle.loginView}>
              <Text style={renderStyle.loginTxt}>login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.goToSingUp()}
              style={{alignSelf: 'center'}}>
              <Text style={renderStyle.txtacc}>Create Your Account?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.goToForgotPass()}
              style={{alignSelf: 'center'}}>
              <Text style={renderStyle.txtacc}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const renderStyle = StyleSheet.create({
  safe_area_view: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleCss: {
    fontSize: 15,
    // marginTop: '15%',
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'bold',
  },
  txtView: {
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: 'rgb(243,237,237)',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  inputCss: {
    fontSize: 15,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'bold',
  },
  loginView: {
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: 'black',
    width: 150,
    height: 45,
    justifyContent: 'center',
    borderRadius: 150 / 2,
  },
  loginTxt: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
  },
  txtacc: {
    marginTop: 15,
    fontSize: 14,
    color: 'black',
  },
});
