import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../../Assets/Colors';
import {images} from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Helper from '../../config/Helper';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userForgotPassForm: {
        email: '',
      },
    };
    AppHeader({
      ...this.props.navigation,
      leftTitle: 'Forgot Password',
      borderBottomRadius: 0,
    });
  }

  componentDidMount() {}

  forgotPass() {
    if (this.state.email == '') {
      Helper.showToast('Please enter email');
      return;
    }
    if (!Helper.EmailReg.test(this.state.email)) {
      Helper.showToast('Please enter valid email id');
      return;
    }
    var data = {};
    data.email = this.state.email;
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.forgotPassword,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        if (response.status == true) {
          Helper.showToast(response.msg);
          this.props.navigation.goBack();
        } else {
          Helper.showToast(response.message);
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
    //  this.props.navigation.navigate('VerifyingDetails')
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{paddingBottom: 22}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Image
              source={images.logo}
              style={{height: 200, width: '90%'}}
              resizeMode={'contain'}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: fonts.fontSize14,
                textAlign: 'center',
                fontFamily: fonts.RoBoToBold_1,
              }}>
              Enter your registered email id OTP will be sent to entered email
              id{' '}
            </Text>
          </View>

          <View style={{marginTop: 30}}>
            <View style={{marginHorizontal: 20}}>
              <Text style={renderStyle.titleCss}>Email ID</Text>
              <View style={renderStyle.txtView}>
                <TextInput
                  style={renderStyle.inputCss}
                  placeholderTextColor={'#000'}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.forgotPass()}
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
