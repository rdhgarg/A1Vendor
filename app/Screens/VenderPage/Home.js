import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  DeviceEventEmitter,
  Modal,
  Dimensions,
  FlatList,
  Linking,
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
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import RNPickerSelect1 from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import CodeInput from 'react-native-confirmation-code-input';
import {showMessage} from 'react-native-flash-message';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PasswordIcon: true,
      mobile_number: '',
      password: '',
      arrRequest: [],
      arrStaff: [],
      detailsModalVisible: false,
      actionModalVisible: false,
      staffId: null,
      booking_id: '',
      apiResp: '0',
      newrequest: [],
      todaysbooking: [],
      upcomingbooking: [],
      unassignrequest: [],
      statusId: null,
      arrGetAllStatus: [],
      code: '',
      remark: '',
      remarkDate: '',
      showDatePicke: false,
      completerequest: [],
      message:""
    };
    AppHeader({
      ...this.props.navigation,
      leftTitle: 'Home',
      borderBottomRadius: 0,
      leftIcon: images.menu,
      leftClick: () => this.props.navigation.navigate('Menu'),
      profileIcon: false,
    });
  }

  componentDidMount() {
   
    console.log('aaaaaaaa-------', Helper.userData);
    this.getRequest();
    this.loginData = DeviceEventEmitter.addListener('LOGIN', (data) => {
      this.getRequest();
    });

    this.Action = DeviceEventEmitter.addListener('Action', (data) => {
      this.getRequest();
    });

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getRequest();
    });
  }

  componentWillUnmount() {
    this.loginData.remove();
    this.Action.remove();
  }

  getRequest() {
    let data = {
      vendor_id: Helper.userData.id,
      role_id: Helper.userData.role_id,
    };
    this.setState({arrRequest: []});

    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(
      Constant.homeBookings,
      JSON.stringify(data),
      Constant.APIPost,
    )
      .then((response) => {
        Helper.globalLoader.hideLoader();
        console.log('myService ----------', response);
        if (response.status == true) {
          this.state.newrequest = response.newrequest;
          this.state.todaysbooking = response.todaysbooking;
          this.state.upcomingbooking = response.upcomingbooking;
          this.state.unassignrequest = response.unassignrequest;
          this.state.completerequest = response.completerequest;
          this.setState({apiResp: '2'});
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
    //  this.setState({booking_id :id})
    //  return
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
          // this.setState({ arrRequest: response.data, })
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
          // let arr = []
          // for (let value of res) {
          //  arr.push({label : value.name, value : value.id})
          // }
          // console.log("myService -------staff---", arr)
          this.setState({arrStaff: res, detailsModalVisible: true});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  homePage() {
    this.props.navigation.navigate('VenderAddervice');
  }

  providerCall(phoneNumber) {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  renderRequest = ({item, index}) => {
    return (
      <View style={{margin: 2, paddingVertical: index == 0 ? 0 : 5}}>
        <TouchableOpacity
          style={{marginBottom: 10}}
          onPress={() =>
            this.props.navigation.navigate('BookingDetails', {data: item})
          }>
          <Card style={{padding: 10, top: 10}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{fontWeight: 'bold', flex: 1}}>
                {item.user_details?.name}
              </Text>

              <TouchableOpacity
                onPress={() => this.providerCall(item.user_details?.mobile)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={images.call}
                  style={{height: 10, width: 10}}></Image>
                <Text style={{fontSize: 10}}> Call Now</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                Booking Id:
              </Text>
              <Text style={{fontSize: 12, flex: 1}}>
              {item?.booking_id}
              </Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                Service Date:
              </Text>
              <Text style={{fontSize: 12, flex: 1}}>
                {moment(item.delivery_date).format('DD-MM-YYYY')}
              </Text>
            </View>
            
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                Service Time:
              </Text>
              <Text style={{fontSize: 12, flex: 1}}>{item.delivery_time}</Text>
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
              <Text style={{fontSize: 12, flex: 1}}>{item?.service_name}</Text>
            </View>
            {item.list == '5' ? null : (
              <>
                {item.list == '4' ? (
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => this.getStaff(item.booking_id)}
                      style={[renderStyle.loginView, {width: 120}]}>
                      <Text style={renderStyle.accept}>Assign Staff</Text>
                    </TouchableOpacity>
                  </View>
                ) : item.list == '1' ? (
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
                ) : item.list == '3' || item.list == '2' ? (
                  <View style={{flexDirection: 'column'}}>
                    {/* <View style={{flexDirection:'row'}}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, }}>Assigned:</Text>
                                    <Text style={{ flex: 1 }}>  {item?.staff_details?.name}</Text>
                                    </View> */}
                    <View
                      style={{flexDirection: 'row', flex: 1, flexShrink: 1}}>
                      <Text
                        style={{fontSize: 12, fontWeight: 'bold', flex: 0.7}}>
                        Assigned:
                      </Text>
                      <Text style={{fontSize: 12, flex: 1}}>
                        {item?.staff_details?.name}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
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
                            fontSize: 11,
                            paddingVertical: 5,
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
              </>
            )}
          </Card>
        </TouchableOpacity>
      </View>
    );
  };
  selectDate(date) {
    this.setState({
      showDatePicke: false,
      remarkDate: moment(date).format('DD-MM-YYYY'),
    });
  }

  render() {
    return (
      <SafeAreaView style={renderStyle.safe_area_view}>
        {this.detailsModal()}
        {this.actionModal()}
        {this.state.apiResp != '0' ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={{paddingBottom: 22}}>
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
            {this.state.apiResp == '1' ||
            (this.state.newrequest.length <= 0 &&
              this.state.todaysbooking.length <= 0 &&
              this.state.upcomingbooking.length <= 0 &&
              this.state.unassignrequest.length <= 0 &&
              this.state.completerequest?.length <= 0) ? (
              <View
                style={{
                  flex: 1,
                  height: Dimensions.get('window').height - 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>No Booking Available</Text>
              </View>
            ) : (
              <>
                <View style={{marginHorizontal: 16}}>
                  {this.state.newrequest.length <= 0 ? null : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={renderStyle.titleCss}>New Request</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('BookingList', {
                            data: '1',
                          })
                        }>
                        <Text style={[renderStyle.viewAll, {marginRight: 5}]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.newrequest}
                    renderItem={this.renderRequest}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={{marginHorizontal: 16}}>
                  {this.state.todaysbooking.length <= 0 ? null : (
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Text style={renderStyle.titleCss}>Today’s Booking</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('BookingList', {
                            data: '2',
                          })
                        }>
                        <Text style={[renderStyle.viewAll, {marginRight: 5}]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.todaysbooking}
                    renderItem={this.renderRequest}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={{marginHorizontal: 16}}>
                  {this.state.upcomingbooking.length <= 0 ? null : (
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Text style={renderStyle.titleCss}>Upcoming Booking</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('BookingList', {
                            data: '3',
                          })
                        }>
                        <Text style={[renderStyle.viewAll, {marginRight: 5}]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.upcomingbooking}
                    renderItem={this.renderRequest}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={{marginHorizontal: 16}}>
                  {this.state.unassignrequest.length <= 0 ? null : (
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Text style={renderStyle.titleCss}>
                        Unassigned Booking
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('BookingList', {
                            data: '4',
                          })
                        }>
                        <Text style={[renderStyle.viewAll, {marginRight: 5}]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.unassignrequest}
                    renderItem={this.renderRequest}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>

                <View style={{marginHorizontal: 16}}>
                  {this.state.completerequest?.length <= 0 ? null : (
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                      <Text style={renderStyle.titleCss}>
                        Completed Booking
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('BookingList', {
                            data: '5',
                          })
                        }>
                        <Text style={[renderStyle.viewAll, {marginRight: 5}]}>
                          View All
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.completerequest}
                    renderItem={this.renderRequest}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </>
            )}
          </ScrollView>
        ) : null}
      </SafeAreaView>
    );
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
                  selectValue={this.state.staffId}
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
              {/* <RNPickerSelect
                                //label={LanguagesIndex.translate('LanguagePreference')}
                                items={this.state.arrStaff}
                                placeHolder={{}}
                                // placeholder={{
                                //     label: 'Select a staff...',
                                //     value: null,
                                // }}
                                placeholderTextColor="#000"
                                onValueChange={(value) => { this.setState({ staffId: value }) }}
                                selectValue={this.state.staffId}
                                useNativeAndroidPickerStyle={false}
                                style={pickerSelectStyles}
                            /> */}
            </View>

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
                  detailsModalVisible: false})}>
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
                  marginLeft: 10,
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
            // height: 400,
          }}>
          <View
            style={{
              padding: 15,
              width: Dimensions.get('window').width - 30,
              backgroundColor: 'white',
              marginHorizontal: 20,
              
            //   width:200
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
                backgroundColor:"#fff",
                height: 52,
                width: 52,
                borderRadius: 6,
                marginRight: "5%",
                color: "#000",
                fontWeight: "bold",
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
                marginTop:"30%"
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
    // if (this.state.message=="Otp not matched"){
    //   this.setState({actionModalVisible: true})
    // }
    // else{
    //   this.setState({actionModalVisible: false});

    // }
    {
    //   this.state.message==="Otp not matched"?
    // this.setState({actionModalVisible: true}):


    }
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
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  getAllStatus(id) {
    this.setState({booking_id: id});
    Helper.globalLoader.showLoader();
    ApiCallHelper.getNetworkResponce(Constant.allStatus, '', Constant.APIPost)
      .then((response) => {
        Helper.globalLoader.hideLoader();
        if (response.status == true) {
          let res = response.data;
          this.setState({arrGetAllStatus: res, actionModalVisible: true});
        } else {
        }
      })
      .catch((err) => {
        Helper.globalLoader.hideLoader();
      });
  }

  //staffId
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
  viewAll: {
    fontSize: 12,
    fontFamily: fonts.PoppinsBold,
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
    textShadowColor: 'black',
    marginRight: 20,
    marginLeft: 8,
    marginBottom: 10,
    fontFamily: fonts.PoppinsExtraBold,
  },
});
