import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {images} from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import {handleNavigation} from '../../navigation/Navigation';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';
import Constant from '../../config/Constant';
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker';
import CameraController from '../../config/CameraController';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      name: '',
      mobile_number: '',
      password: '',
      email: '',
      business_name: '',
      pincode: '',
      address: '',
      alternate_mobile: '',
      service_provided: '',
      docImage: '',
      arrDocument: [
        {label: '', value: ''},
        {label: 'Aadhaar Card', value: 'Aadhaar Card'},
        {label: 'Pan Card', value: 'Pencard'},
        {label: 'Driving Licence', value: 'Driving License'},
        {label: 'Passport', value: 'Passport'},
      ],
      documentValue: '',

      arrLanguage: [
        {label: 'All Booking', value: '-1'},
        {label: 'test', value: 'en'},
        {label: 'test', value: 'sp'},
      ],
      language_code: '-1',

      arrCountry: [
        {label: '', value: ''},
        {label: 'India', value: 'India'},
        {label: 'UK', value: 'UK'},
      ],
      country: '',

      arrState: [
        {label: '', value: ''},
        {label: 'Rajastahn', value: 'Rajastahn'},
        {label: 'panjab', value: 'panjab'},
      ],
      cityState: '',

      arrCity: [
        {label: '', value: ''},
        {label: 'Jaipur', value: 'Jaipur'},
        {label: 'Ajmer', value: 'Ajmer'},
      ],
      city: '',
    };
    AppHeader({
      ...this.props.navigation,
      leftTitle: 'Vendor Registration',
      borderBottomRadius: 0,
    });
  }

  componentDidMount() {
    this.getCountry();
  }

  goToForgotPass() {
    this.props.navigation.navigate('ForgotPasswordScreen');
  }

  goToSingUp() {
    this.props.navigation.navigate('SignUpScreen');
  }

  getCountry() {
    let data = {
      user_id: Helper.userData.id,
    };
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(Constant.country, '', Constant.APIPost)
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response.data);
        if (response.status == true) {
          this.setState({arrCountry: response.data});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  getStateValue(value) {
    this.setState({country: value});
    //  this.setState({ cityState: value })
    let data = {
      country_id: value,
    };
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.states,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response.data);
        if (response.status == true) {
          this.setState({arrState: response.data});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  getCity(value) {
    this.setState({cityState: value});
    //  this.setState({ cityState: value })
    let data = {
      state_id: value,
    };
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.city,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response.data);
        if (response.status == true) {
          this.setState({arrCity: response.data});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  onPressedCamera = (data) => {
    CameraController.open((response) => {
      console.log('response', response);
      if (response.path) {
        console.log(response.path);
        this.setState({docImage: response.path});
        //    this.imageUpload(response.path)
      }
    });
  };

  login_Submit() {
    Keyboard.dismiss();
    if (this.state.name == '') {
      Helper.showToast('Please enter name');
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
    if (this.state.email == '') {
      Helper.showToast('Please enter email');
      return false;
    }

    let template = new FormData();
    template.append('name', this.state.name);
    template.append('mobile_number', this.state.mobile_number);
    template.append('password', this.state.password);
    template.append('email', this.state.email);
    template.append('business_name', this.state.business_name);
    template.append('country', this.state.country);
    template.append('state', this.state.cityState);
    template.append('city', this.state.city);
    template.append('pincode', this.state.pincode);
    template.append('address', this.state.address);
    template.append('alternate_mobile', this.state.alternate_mobile);
    template.append('service_provided', this.state.service_provided);
    template.append('doc_type', this.state.documentValue);
    if (this.state.docImage == '' || this.state.docImage == null) {
    } else {
      template.append('doc_file', {
        uri: this.state.docImage,
        name: 'test.jpeg',
        type: 'image/jpeg',
      });
    }

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.register,
      template,
      Constant.APIImageUploadAndroid,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        let data = response.data;
        if (response.status == true) {
          Helper.userData = data;
          Helper.setData('user_details', data);
          Helper.setData('HideWelcomeScreen', 'done');
          // handleNavigation({ type: 'setRoot', page: 'BottomTab', navigation: this.props.navigation.navigate("LoginScreen") })
          this.props.navigation.navigate('LoginScreen');
        } else {
          Helper.showToast(response.message);
          this.props.navigation.navigate('LoginScreen');
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
            <Text style={renderStyle.titleCss}>Name</Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Mobile Number
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
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Email ID
            </Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Business Name
            </Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.business_name}
                onChangeText={(business_name) => this.setState({business_name})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>Country</Text>
            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <RNPickerSelect
                //label={LanguagesIndex.translate('LanguagePreference')}
                items={this.state.arrCountry}
                placeHolder={{}}
                onValueChange={(value) => {
                  this.getStateValue(value);
                }}
                selectValue={this.state.country}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>State</Text>
            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <RNPickerSelect
                //label={LanguagesIndex.translate('LanguagePreference')}
                items={this.state.arrState}
                placeHolder={{}}
                onValueChange={(value) => {
                  this.getCity(value);
                }}
                selectValue={this.state.cityState}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>City</Text>
            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <RNPickerSelect
                //label={LanguagesIndex.translate('LanguagePreference')}
                items={this.state.arrCity}
                placeHolder={{}}
                onValueChange={(value) => {
                  this.setState({city: value});
                }}
                selectValue={this.state.city}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>Address</Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.address}
                onChangeText={(address) => this.setState({address})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>Pincode</Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                maxLength={6}
                keyboardType={'phone-pad'}
                value={this.state.pincode}
                onChangeText={(pincode) => this.setState({pincode})}
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Alternative Mobile Number
            </Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                keyboardType={'phone-pad'}
                maxLength={10}
                value={this.state.alternate_mobile}
                onChangeText={(alternate_mobile) =>
                  this.setState({alternate_mobile})
                }
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Service Provided by Vendor
            </Text>
            <View style={renderStyle.txtView}>
              <TextInput
                style={renderStyle.inputCss}
                placeholderTextColor={'#000'}
                value={this.state.service_provided}
                onChangeText={(service_provided) =>
                  this.setState({service_provided})
                }
              />
            </View>

            <Text style={[renderStyle.titleCss, {marginTop: 15}]}>
              Upload Documents
            </Text>
            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 10,
                paddingHorizontal: 5,
              }}>
              <RNPickerSelect
                //label={LanguagesIndex.translate('LanguagePreference')}
                items={this.state.arrDocument}
                placeHolder={{}}
                onValueChange={(value) => {
                  this.setState({documentValue: value});
                }}
                selectValue={this.state.documentValue}
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.onPressedCamera()}
                style={renderStyle.addDoc}>
                <Text style={renderStyle.loginTxt}>Add Documents</Text>
              </TouchableOpacity>
              {this.state.docImage != '' ? (
                <Image
                  source={images.right}
                  style={{
                    height: 30,
                    position: 'absolute',
                    top: 40,
                    tintColor: 'white',
                    right: 10,
                    width: 30,
                  }}></Image>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => this.login_Submit()}
              style={renderStyle.loginView}>
              <Text style={renderStyle.loginTxt}>Submit</Text>
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
    marginTop: '5%',
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
  addDoc: {
    alignSelf: 'center',
    marginTop: '10%',
    backgroundColor: 'black',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    borderRadius: 50,
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
    marginLeft: 10,
  },
  inputAndroid: {
    fontSize: 14,
    height: 40,
    color: '#000',
    marginRight: 20,
    marginLeft: 8,
    marginBottom: 10,
    fontFamily: fonts.PoppinsExtraBold,
  },
});
