// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import {
  Text,
  View,
  Share,
  FlatList,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import {images} from '../../Assets/imagesUrl';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';
import Helper from '../../config/Helper';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import RNPickerSelect1 from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import CodeInput from 'react-native-confirmation-code-input';
import {showMessage} from 'react-native-flash-message';

export default class BookingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrItem: [
        {
          page: 'Profile',
          title: 'New',
          type: '1',
          icon: images.metro_profile,
        },
        {
          page: 'VenderAddervice',
          title: 'Today',
          type: '2',
          icon: images.change_password,
        },
        {
          page: 'ChangePassword',
          title: 'Upcoming',
          type: '3',
          icon: images.change_password,
        },
        {
          page: 'AddAddress',
          title: 'Unassigned',
          type: '4',
          icon: images.address_book,
        },
        {
          page: 'RatingReview',
          title: 'Completed',
          type: '5',
          icon: images.star_full,
        },
      ],
      arrItem1: [
        {
          page: 'VenderAddervice',
          title: 'Today',
          type: '2',
          icon: images.change_password,
        },
        {
          page: 'ChangePassword',
          title: 'Upcoming',
          type: '3',
          icon: images.change_password,
        },
        {
          page: 'RatingReview',
          title: 'Completed',
          type: '5',
          icon: images.star_full,
        },
      ],
      arrService: [],
      serviceType: this.props.route.params?.data,
      detailsModalVisible: false,
      staffId: null,
      booking_id: '',
      statusId: null,
      arrGetAllStatus: [],
      actionModalVisible: false,
      remark: '',
      remarkDate: '',
      showDatePicke: false,
      isFetching: false,
      code: '',
      message: '',
    };
    AppHeader({
      ...this.props.navigation,
      leftTitle: 'Booking List',
      bellIcon: false,
      settingsIcon: false,
      profileIcon: false,
      hideLeftBackIcon: false,
    });
  }

  componentDidMount() {
    //  alert(this.state.serviceType)
    this.getRequest();
  }

  detailsModal() {
    // console.log("isSetModalVisible", this.state.isSetModalVisible)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.detailsModalVisible}>
        <View
          onPress={() => this.setState({detailsModalVisible: false})}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              padding: 15,
              width: Dimensions.get('window').width - 30,
              backgroundColor: 'white',
              marginHorizontal: 20,
            }}>
            <Text style={{fontWeight: 'bold'}}>{'Select Staff'}</Text>

            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 20,
                paddingHorizontal: 5,
              }}>
              <View style={{marginTop: Platform.OS == 'ios' ? 15 : 0}}>
                <RNPickerSelect1
                  // onValueChange={(value) => console.log(value)}
                  items={this.state.arrStaff}
                  useNativeAndroidPickerStyle={false}
                  style={{inputAndroid: {color: 'black'}}}
                  selectValue={this.state.categoryID}
                  placeholder={{label: 'Select a staff...', value: null}}
                  onValueChange={(value) => {
                    this.setState({staffId: value});
                  }}
                />
                <Image
                  source={images.dropdown}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                    position: 'absolute',
                    right: 0,
                    top: Platform.OS == 'ios' ? 3 : 15,
                    width: 15,
                  }}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  marginHorizontal: 10,
                  marginTop: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({detailsModalVisible: false})}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  marginHorizontal: 10,
                  marginTop: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                }}
                onPress={() => this.assignStaff()}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  assignStaff(value) {
    if (this.state.staffId == null) {
      alert('Please select staff');
      return;
    }
    this.setState({detailsModalVisible: false});
    //  this.setState({ cityState: value })
    let data = {
      staff_id: this.state.staffId,
      booking_id: this.state.booking_id,
    };
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.assignBookingStaff,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService -------staff---', response.data);
        if (response.status == true) {
          this.getRequest();
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  clickAction(type) {
    this.setState({serviceType: type});

    this.getRequest(type, '0');
  }

  getRequest(type, p) {
    let data = {
      vendor_id: Helper.userData.id,
      role_id: Helper.userData.role_id,
      list: p == '0' ? type : this.state.serviceType,
    };
    this.setState({arrService: []});

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.booking,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response.data);
        if (response.status == true) {
          this.setState({arrService: response.data, apiResp: '2'});
        } else {
          this.setState({apiResp: '1'});
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  acceptRegect(sta, id) {
    console.log('-----------', id);
    let data = {
      status: sta,
      booking_id: id,
    };

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.bookingAccept,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response.data);
        if (response.status == true) {
          this.getRequest();
          // this.setState({ arrService: response.data, })
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  getStaff(value) {
    this.setState({booking_id: value});
    let data = {
      user_id: Helper.userData.id,
    };
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.staffList,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        //  console.log("myService -------staff---", response.data)
        if (response.status == true) {
          let res = response.data;

          this.setState({arrStaff: res, detailsModalVisible: true});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  _renderUpComingItem = ({item, index}) => {
    // console.log(item);
    return (
      <View style={{height: 30, marginLeft: index == 0 ? 0 : 10}}>
        <TouchableOpacity
          onPress={() => {
            this.clickAction(item.type);
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              backgroundColor:
                this.state.serviceType == item.type ? 'black' : 'white',
              borderRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fonts.PoppinsExtraBold,
                color: this.state.serviceType == item.type ? 'white' : 'black',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log('AAAAAAA--------', Helper.userData.role_id);
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        {this.detailsModal()}
        {this.actionModal()}
        {this.state.showDatePicke && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(day) => this.selectDate(day)}
          />
        )}
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 10,
            marginHorizontal: 10,
            paddingBottom: 10,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={
              Helper.userData.role_id == '4'
                ? this.state.arrItem1
                : this.state.arrItem
            }
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={this._renderUpComingItem}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={renderStyle.search_box_view}>
            <TouchableOpacity style={renderStyle.search_touch}>
              <Image
                source={images.search_ic}
                resizeMode={'contain'}
                style={renderStyle.search_img}
              />
            </TouchableOpacity>

            <TextInput
              style={renderStyle.input_text}
              placeholder="Search"
              keyboardType={'default'}
              returnKeyType="done"
              placeholderTextColor={'black'}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={{marginBottom: '34%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.arrService}
              renderItem={this.renderRequest}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    );
  }
  renderRequest = ({item, index}) => {
    return (
      <View
        style={{
          margin: 2,
          marginBottom: 15,
          paddingVertical: index == 0 ? 0 : 5,
        }}>
        <View>
          <TouchableOpacity
            style={{}}
            onPress={() =>
              this.props.navigation.navigate('BookingDetails', {data: item})
            }>
            <Card
              style={{
                padding: 10,
                top: 10,
                width: Dimensions.get('window').width - 25,
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={{fontWeight: 'bold', flex: 1}}>
                  {item.user_details?.name}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.providerCall(item.provider_details?.mobile_no)
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.call}
                    style={{height: 10, width: 10}}></Image>
                  <Text style={{fontSize: 10}}> Call Now</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', flex: 1, flexShrink: 1}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                  Booking Id:
                </Text>
                <Text style={{fontSize: 12, flex: 1}}>{item.booking_id}</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text
                  style={{
                    fontSize: 12,
                    flexShrink: 1,
                    fontWeight: 'bold',
                    flex: 0.7,
                  }}>
                  Service Date & Time:
                </Text>
                <Text yle={{fontSize: 12, flex: 1}}>
                  {' '}
                  {moment(item.delivery_date).format('DD-MM-YYYY')} |{' '}
                  {moment(item.delivery_time, 'HH:mm:ss').format('HH:mm A')}
                </Text>
              </View>

              <View style={{flexDirection: 'row', flex: 1, flexShrink: 1}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                  Location:
                </Text>
                <Text style={{fontSize: 12, flex: 1}}>
                  {item.address_details?.address_line_1}
                </Text>
              </View>

              <View style={{flexDirection: 'row', flex: 1, flexShrink: 1}}>
                <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                  Service Request:
                </Text>
                <Text style={{fontSize: 12, flex: 1}}>
                  {item?.service_name}
                </Text>
              </View>

              {this.state.serviceType == '4' ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.getStaff(item.booking_id)}
                    style={[renderStyle.loginView, {width: 120}]}>
                    <Text style={renderStyle.accept}>Assign Staff</Text>
                  </TouchableOpacity>
                </View>
              ) : this.state.serviceType == '1' ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.acceptRegect(1, item.booking_id)}
                    style={renderStyle.loginView}>
                    <Text style={renderStyle.accept}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.acceptRegect(0, item.booking_id)}
                    style={renderStyle.loginView1}>
                    <Text style={renderStyle.loginTxt}>Reject</Text>
                  </TouchableOpacity>
                </View>
              ) : this.state.serviceType == '3' ||
                this.state.serviceType == '2' ? (
                <View style={{flexDirection: 'column'}}>
                  <Text style={{fontWeight: 'bold', fontSize: 12}}>
                    Assigned:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 1}}>{item?.staff_details?.name}</Text>
                    <TouchableOpacity
                      onPress={() => this.getAllStatus(item.booking_id)}
                      style={{
                        backgroundColor: '#000',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          paddingHorizontal: 10,
                        }}>
                        Action
                      </Text>
                    </TouchableOpacity>
                    {Helper.userData.role_id == '4' ? null : (
                      <>
                        <View style={{width: 5}}></View>
                        <TouchableOpacity
                          onPress={() => this.getStaff(item.booking_id)}
                          style={{
                            backgroundColor: '#000',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 11,
                              paddingVertical: 5,
                              paddingHorizontal: 10,
                            }}>
                            Reassign
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              ) : null}
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getAllStatus(id) {
    this.setState({booking_id: id});
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(Constant.allStatus, '', Constant.APIPost)
      .then((response) => {
        Helper.globalLoader.hideLoader();
        if (response.status == true) {
          let res = response.data;
          DeviceEventEmitter.emit('Action', 'Done');
          this.setState({arrGetAllStatus: res, actionModalVisible: true});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }
  actionModal() {
    // console.log("isSetModalVisible", this.state.isSetModalVisible)
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.actionModalVisible}>





                    
        <View
          onPress={() => this.setState({actionModalVisible: false})}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View
            style={{
              padding: 15,
              width: Dimensions.get('window').width - 30,
              backgroundColor: 'white',
              marginHorizontal: 20,
            }}>
            <Text style={{fontWeight: 'bold'}}>{'Select Action'}</Text>
            <CodeInput
              ref="codeInputRef2"
              codeLength={4}
              allowFontScaling={false}
              keyboardType="number-pad"
              compareWithCode={null}
              autoFocus={true}
              ignoreCase={true}
              inputPosition="center"
              activeColor="blue"
              inactiveColor="gray"
              size={40}
              onFulfill={(code) =>
                this.setState({
                  code,
                })
              }
              containerStyle={{marginTop: 10}}
              codeInputStyle={{
                borderWidth: 1,
                backgroundColor: '#fff',
                height: 52,
                width: 52,
                borderRadius: 6,
                marginRight: '5%',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: '6%',

                // borderWidth: 2,

                // backgroundColor: '#fff',
                // height: 46,
                // width: 46,
                // borderRadius: 6,
                // marginLeft: '4%',
                // // marginLeft:7,

                // color: '#000',
                // fontWeight: 'bold',
                // fontSize: 18,
                // marginTop: '6%',
              }}
            />

<Text style={{textAlign:"center",fontsize:16,fontWeight:"bold",marginTop:"-5%",color:"red"}}>{this.state.message}</Text>


            <View
              style={{
                backgroundColor: '#F4EDED',
                marginTop: 20,
                paddingHorizontal: 5,
                marginTop: '30%',
              }}>
              <View style={{marginTop: Platform.OS == 'ios' ? 15 : 0}}>
                <RNPickerSelect1
                  // onValueChange={(value) => console.log(value)}
                  items={this.state.arrGetAllStatus}
                  useNativeAndroidPickerStyle={false}
                  style={{inputAndroid: {color: 'black'}}}
                  selectValue={this.state.statusId}
                  placeholder={{label: 'Select a Action...', value: null}}
                  onValueChange={(value) => {
                    this.setState({statusId: value});
                  }}
                />
                <Image
                  source={images.dropdown}
                  style={{
                    height: 15,
                    resizeMode: 'contain',
                    position: 'absolute',
                    right: 0,
                    top: Platform.OS == 'ios' ? 3 : 15,
                    width: 15,
                  }}
                />
              </View>
            </View>

            {this.state.statusId == 'pending' ||
            this.state.statusId == 'Pending' ? (
              <View style={{marginTop: 15}}>
                <Text style={{fontWeight: 'bold'}}>Date</Text>
                <TouchableOpacity
                  onPress={() => this.setState({showDatePicke: true})}
                  style={renderStyle.txtView}>
                  <TextInput
                    style={renderStyle.inputCss}
                    placeholderTextColor={'#000'}
                    value={this.state.remarkDate}
                    editable={false}
                    onChangeText={(remarkDate) => this.setState({remarkDate})}
                  />
                </TouchableOpacity>

                <Text style={{fontWeight: 'bold', marginTop: 15}}>Remark</Text>
                <View style={renderStyle.txtView}>
                  <TextInput
                    style={renderStyle.inputCss}
                    placeholderTextColor={'#000'}
                    value={this.state.remark}
                    onChangeText={(remark) => this.setState({remark})}
                  />
                </View>
              </View>
            ) : null}

<View style={{flexDirection: 'row', marginTop: 15}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  marginRight: 10,
                  marginTop: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({
                  message:"",
                  actionModalVisible: false})}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              {
                this.state.code==""?
                <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                }}
                onPress={() => alert("Please enter otp")}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>:
                <TouchableOpacity
                style={{
                  flex: 1,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                }}
                onPress={() => this.submitAction()}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
              }

            
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  selectDate(date) {
    this.setState({
      showDatePicke: false,
      remarkDate: moment(date).format('DD-MM-YYYY'),
    });
  }

  submitAction() {
    if (this.state.statusId == null) {
      alert('Please select Action');
      return;
    }

    if (this.state.statusId == 'pending' || this.state.statusId == 'Pending') {
      if (this.state.remark == '') {
        alert('Please enter remark');
        return;
      }
    }
    // this.setState({actionModalVisible: false});
    //  this.setState({ cityState: value })
    let data = {
      booking_id: this.state.booking_id,
      vendor_id: Helper.userData.id,
      status: this.state.statusId,
      role_id: Helper.userData.role_id,
      remark: this.state.remark,
      remark_date: this.state.remarkDate,
      otp : this.state.code
    };

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.bookingStatus,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService -------staff---', response.data);
        if (response.status == true) {
            this.setState({
              message:response.msg,
              actionModalVisible:false
            })
              showMessage({
                  message: response.msg,
                  type: 'success',
                });
            this.getRequest();
          } else {
            this.setState({
               message:response.msg,
               actionModalVisible:true
            })
              // showMessage({
              //     message: response.msg,
              //     type: 'danger',
              //   });
  
          }
        // if (response.status == true) {
        //   DeviceEventEmitter.emit('Action', 'Done');
        //   this.getRequest();
        // } else {
        // }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }
}

const renderStyle = StyleSheet.create({
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
  safe_area_view: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardView: {},
  accept: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'center',
  },
  titleCss: {
    fontSize: 15,
    flex: 1,
    fontFamily: fonts.PoppinsBold,
    fontWeight: 'bold',
  },
  search_touch: {
    marginLeft: 15,
  },
  search_img: {
    height: 18,
    width: 18,
    tintColor: 'black',
  },
  input_text: {
    height: 50,
    width: 280,
    paddingLeft: 10,
    color: 'black',
    fontSize: fonts.fontSize12,
    fontFamily: fonts.RoBoToRegular_1,
  },
  search_box_view: {
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: '#9F9F9F',
    borderWidth: 1,
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 25,
  },
  loginView: {
    alignSelf: 'center',
    marginTop: 10,
    borderColor: 'black',
    shadowRadius: 20,
    borderWidth: 1,
    width: 80,
    height: 30,
    justifyContent: 'center',
    borderRadius: 150 / 2,
  },
  loginView1: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'black',
    marginLeft: 10,
    width: 80,
    height: 30,
    justifyContent: 'center',
    borderRadius: 150 / 2,
  },
  loginTxt: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
  },
});
