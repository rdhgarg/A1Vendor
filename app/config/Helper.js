
import * as React from 'react';
import Config from "../config/Constant";
//import { NavigationActions, StackActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import { Alert, ActivityIndicator, View, Platform, StatusBar, StyleSheet, DeviceEventEmitter, Text, Dimensions, PermissionsAndroid, Linking } from 'react-native';

import DeviceInfo from 'react-native-device-info'
//import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { check, request, PERMISSIONS, openSettings } from 'react-native-permissions';
export default class Helper extends React.Component {
    url = "";
    static GoogleApiKey = "AIzaSyDg_0y8Q42T7nIDOOFu9geqPyq-NWnaaWI";
    // AIzaSyDg_0y8Q42T7nIDOOFu9geqPyq-NWnaaWI    beauty account
    //AIzaSyADKJ0J87cRHB5MjXjRHyzk6V7SGvBifuk    old
    static mainApp;
    static toast;
    static user = {};
    static navigationRef;
    static Loader;
    static device_type = Platform.OS == 'android' ? 'ANDROID' : 'IOS';
   
    static hasNotch = DeviceInfo.hasNotch();
    
    static userData = {};
    static device_token = "ABC12345";
    static user_id = "";
    
    static Current_latitude = 27.0119906
    static Current_longitude = 75.771765
   
    static globalLoader;
   





    // Validation Reg

    static EmailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static NameReg = /^[a-zA-Z \s]*$/;
    static MobileReg = /^([0|\+[0-9]{1,5})?([0-9]{6})$/;
    static showToast(msg) {
        if (msg) {
            Toast.show(msg, Toast.LONG);

        } else { }
    }

    static registerLoader(mainApp) {
        Helper.globalLoader = mainApp;
    }

    static registerNavigator(ref) {
        Helper.navigationRef = ref;
    }

    static showConsole(title, msg) {
        console.log(title, msg)
    }

    static getFormData(obj) {
        let formData = new FormData();
        for (let i in obj) {
            formData.append(i, obj[i]);
        }
        return formData;
    }


    constructor(props) {
        super(props)
    }


    // static showLoader() {
    //     Helper.mainApp.setState({ loader: true })
    // }

    // static hideLoader() {
    //     Helper.mainApp.setState({ loader: false })
    // }

    componentDidMount() {
    }

    static alert(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }


    static listEmptyComponent = () => {
        return (
            <View style={{ flex: 1, height: Dimensions.get('screen').height - 300, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray' }}>Data not available</Text>
            </View>
        )
    }



    static confirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'OK', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'Cancel', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static confirmPopUp(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'YES', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
                { text: 'NO', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static permissionConfirm(alertMessage, cb) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: 'NOT NOW', onPress: () => { if (cb) cb(false); }, style: 'cancel' },
                { text: 'SETTINGS', onPress: () => { if (cb) cb(true); console.log('OK Pressed') } },
            ],
            { cancelable: false }
        )
    }


    static cameraAlert(alertMessage, Camera, Gallery, Cancel, cbCamera, cbGallery) {
        Alert.alert(
            Config.app_name,
            alertMessage,
            [
                { text: Camera, onPress: () => { if (cbCamera) cbCamera(true); console.log('OK Pressed') } },
                { text: Gallery, onPress: () => { if (cbGallery) cbGallery(true); console.log('OK Pressed') } },
                { text: Cancel, onPress: () => { if (cbCamera) cbCamera(false); }, style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    static async setData(key, val) {
        try {
            let tempval = JSON.stringify(val);
            await AsyncStorage.setItem(key, tempval);
        } catch (error) {
            console.error(error, "AsyncStorage")
            // Error setting data 
        }
    }
    static async getData(key) {
        try {
            let value = await AsyncStorage.getItem(key);
            if (value) {
                let newvalue = JSON.parse(value);
                return newvalue;
            } else {
                return value;
            }
        } catch (error) {
            console.error(error, "AsyncStorage")
            // Error retrieving data
        }
    }
    static async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    static logoutData() {
        Helper.removeItemValue('user_details')
       
        Helper.userData = {}
        Helper.user_id = ''
       // this.props.navigation.navigate('LoginScreen')
        Helper.navigationRef.replace('LoginScreen')
    }

    static ShowLoader = () => (
        <View style={{ position: 'absolute', zIndex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.40)' }}>
            <ActivityIndicator size='large' color={'black'} />
        </View>)

    static StatusBar = () => (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )

    static onLocationEnablePressed = () => {
        if (Platform.OS === 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({})
                .then(data => {
                    console.log('DDDDD', data)
                    if (data == 'enabled') {
                        // Helper.getCurrentLatLong()
                        //this.callLocation();
                        this.LocationUpdate()
                    }

                }).catch((err) => {
                    alert("Error " + err.message + ", Code : " + err.code);
                });
        } else {

        }
    }


    static callLocation() {
        if (this.watchID) {
            Geolocation.clearWatch(this.watchID);
        }
        this.watchID = Geolocation.watchPosition(position => {
            console.log('watchPosition---------position', position)
            const { latitude, longitude } = position.coords;
            console.log("Current_latitude", latitude);
            console.log("Current_longitude", longitude);
            Helper.Current_latitude = latitude
            Helper.Current_longitude = longitude
            DeviceEventEmitter.emit('UpdateAddress', 'done')
            // Helper,this.getCurrentAddress(latitude,longitude)
        },
            error => console.log('watchPosition---------', error),

            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000, distanceFilter: 30 }
            // { enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 20 }
        ).catch((err) =>
            console.log("watchPosition---------err", err)
        )
    }
    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    static checkLocationPermission(cb) {
        if (Platform.OS == 'android') {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({})
                .then(data => {
                    console.log('DDDDD', data)
                    if (data == 'enabled') {
                        // Helper.getCurrentLatLong()
                        //  this.callLocation();
                        this.LocationUpdate()
                        cb(true);

                    } else if (data == 'already-enabled') {
                        this.LocationUpdate()
                        // this.callLocation();
                        cb(true);

                    } else {
                        cb(false);
                    }

                }).catch((err) => {
                    console.log("Error " + err.message + ", Code : " + err.code);
                    // alert("Error " + err.message + ", Code : " + err.code);
                });
        } else {
            check(Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            })).then(result => {
                // geolocation.requestAuthorization()

                console.log("result---------111000----Permission", result)
                if (result === "granted") {
                    console.log("result-------22222------Permission", result)
                    this.LocationUpdate()
                    //  Helper.callLocation();
                    cb(true);
                } else if (result === "blocked" || result === "unavailable") {
                    cb(false);
                    Helper.DeniedPermissionPopup()

                }
                else {
                    request(
                        Platform.select({
                            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                        })
                    ).then((status) => {
                        if (status === "granted") {
                            console.log('You can use the location');
                            cb(true);
                        } else {
                            cb(false);
                            Helper.DeniedPermissionPopup()
                            console.log('location permission denied');
                        }
                    });
                }
            });
        }
    }



    static async LocationUpdate() {
        await check(Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_ALWAYS
        })).then(result => {
            if (result === "granted") {
                Geolocation.getCurrentPosition(position => {
                    this.setLocation(position);
                });
                return;
            }
            else {
                request(
                    Platform.select({
                        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                        ios: PERMISSIONS.IOS.LOCATION_ALWAYS
                    })
                ).then((status) => {
                    if (status === "granted") {
                        Geolocation.getCurrentPosition(position => {
                            this.setLocation(position);
                        });
                        return false;
                    } else {
                    }
                });
            }

        });
    }


    static setLocation = (data) => {
        let tempdata = {
            lat: data.coords.latitude,
            long: data.coords.longitude,

        }

        Helper.GetAddressFromLatLong(tempdata.lat, tempdata.long, (response) => {
            if (response) {
                Helper.Current_latitude = tempdata.lat
                Helper.Current_longitude = tempdata.long
                console.log("Current_latitude", tempdata.lat);
                console.log("Current_longitude", tempdata.long);
                DeviceEventEmitter.emit('UpdateAddress', 'done')
            }
        });

    }
    static GetAddressFromLatLong(latitude, longitude, cb) {
        console.log('lat --- ' + latitude, 'long --- ' + longitude)
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + Helper.GoogleApiKey)
            .then((response) => response.json())
            .then((responseJson) => {
                return cb(responseJson.results[0].formatted_address)
            }).catch((err) => {
                Helper.alert("Unable to get your location")
            })
    }

    ////////////////////

    static DeniedPermissionPopup() {
        var msg = "App doesn't have location access permissions. Please go to settings and allow Beauty for location access permissions.";
        Alert.alert(
            'Beauty',
            msg
            ,
            [
                { text: 'Cancel', onPress: () => { console.log('OK Pressed') } },
                { text: 'Settings', onPress: () => Helper.openSettingPage() },
            ],
            { cancelable: false }
        )

    }
    static openSettingPage() {

        if (Platform.OS == 'android') {
            Linking.openSettings()
        }
        else {
            Linking.canOpenURL('app-settings:').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle settings url');
                } else {
                    return Linking.openURL('app-settings:');
                }
            }).catch(err => console.error('An error occurred', err));
        }

    }



    // static async geoCurrentLocation(alert = 1, cb) {
    //     if (Constant.platform == 'android') {
    //         await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 }).then(data => {
    //             console.log("result-------------CurrentLocation",data)

    //            this.accessLocation(alert, cb)
    //         }).catch(err => {
    //             cb({ latitude: "", longitude: "" });
    //         });
    //     } else {
    //         this.accessLocation(alert, cb)
    //     }
    // }

    //    accessLocation(alert, cb) {
    //         check(Platform.select({
    //             android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //             ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    //         })).then(result => {
    //             console.log("result-------------accessLocation",result)

    //             if (result === "granted") {
    //                 console.log('already allow the location');
    //                 this.slectLatLong(cb);
    //                 return;
    //             }
    //             if (result === "blocked" || result === "unavailable") {
    //                 if (alert == 1) {
    //                     Helper.permissionConfirm("Access to the location has been prohibited please enable it in the Settings app to continue.", ((status) => {
    //                         if (status) {
    //                             openSettings().catch(() => {
    //                                 console.warn('cannot open settings')
    //                             });
    //                         }
    //                     }));
    //                     return;
    //                 }
    //             }
    //             request(
    //                 Platform.select({
    //                     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //                     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    //                 })
    //             ).then((status) => {
    //                 if (status === "granted") {
    //                     console.log('You can use the location');
    //                     slectLatLong(cb);
    //                 } else {
    //                     cb({ latitude: "", longitude: "" });
    //                     console.log('location permission denied');
    //                 }
    //             });
    //         });
    //     }

    //    slectLatLong(cb) {
    //         Geolocation.getCurrentPosition((info) => {
    //             if (info && info.coords && info.coords.latitude) {
    //                 console.log(info)
    //                 let form = {
    //                     latitude: info.coords.latitude,
    //                     longitude: info.coords.longitude,
    //                 }
    //                 cb(form);
    //             }
    //         },
    //             (error) => this.errorCurrentLocation(error),
    //             { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000, distanceFilter: 30 }
    //         );
    //     }

    //   errorCurrentLocation(error) {
    //         console.log("Current location error-----", error.message)
    //         Helper.alert("Sorry, something is wrong \nPlease check your Device location Permission")
    //     }


}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});
