import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {images} from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      confirm_password: '',
    };
    AppHeader({
      ...this.props.navigation,
      leftTitle: 'Update Password',
      borderBottomRadius: 0,
    });
  }

  componentDidMount() {}

  changePassword() {
    Keyboard.dismiss();
    if (this.state.password == '') {
      Helper.showToast('Please enter password');
      return false;
    }
    if (this.state.password.length < 6) {
      Helper.showToast('Please enter valid password');
      return false;
    }
    if (this.state.password !== this.state.confirm_password) {
      Helper.showToast('Please enter valid confirm password');
      return;
    }

    var data = {};
    data.user_id = Helper.user_id;
    data.old_password = this.state.old_password;
    data.password = this.state.password;
    data.confirm_password = this.state.confirm_password;
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.changePassword,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        let data = response.data;
        if (response.status == true) {
          Helper.showToast(response.message);
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
          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={images.logo}
                style={{height: 200, width: '90%'}}
                resizeMode={'contain'}
              />
            </View>

            <Text
              style={{
                fontSize: 15,
                marginTop: 30,
                fontFamily: fonts.PoppinsBold,
                fontWeight: 'bold',
              }}>
              New Password
            </Text>
            <View style={style.borderView}>
              <TextInput
                style={style.inputCss}
                placeholder={''}
                secureTextEntry={true}
                placeholderTextColor={'#000'}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />
            </View>

            <Text
              style={{
                fontSize: 15,
                marginTop: 20,
                fontFamily: fonts.PoppinsBold,
                fontWeight: 'bold',
              }}>
              Confirm New Password
            </Text>
            <View style={style.borderView}>
              <TextInput
                style={style.inputCss}
                placeholder={''}
                secureTextEntry={true}
                placeholderTextColor={'#000'}
                onChangeText={(confirm_password) =>
                  this.setState({confirm_password})
                }
                value={this.state.confirm_password}
              />
            </View>

            <TouchableOpacity
              onPress={() => this.changePassword()}
              style={style.submitView}>
              <Text style={style.submitTxt}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  submitTxt: {
    color: 'white',
    fontSize: 14,
  },
  submitView: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderView: {
    flexDirection: 'row',
    marginTop: 5,
    backgroundColor: '#F4EDED',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  inputCss: {
    fontSize: 15,
    width: '100%',
    flexShrink: 1,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'bold',
  },
});
