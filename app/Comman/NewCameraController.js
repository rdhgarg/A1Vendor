
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { Platform, Modal, SafeAreaView, TouchableOpacity, View, Image, Text,Linking,Alert } from "react-native";
import { images } from '../Assets/imagesUrl';
import Colors from '../Assets/Colors';
import { check, PERMISSIONS, RESULTS,request } from 'react-native-permissions';


export default class CameraController extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.CameraScreen()}
            </View>
        )
    }
    onCameraClick() {
        var per = Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

        this.checkCameraPermission(per)
    }

   async checkPermission(typePermission) {

    let tempPermission;
        if (typePermission == 'camera') {
            tempPermission = Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
        }
        else {
            tempPermission = Platform.OS == 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        }
      await  check(tempPermission)
            .then(result => {
                if (result === "granted") {
                    if (typePermission == 'camera') {
                        if(Platform.OS == 'android'){
                            this.checkPermission('camera_storage')
                        }
                        else{
                            this.openCameraMethod()
                        }
                    }
                    else if (typePermission == 'camera_storage') {
                        this.openCameraMethod()
                    }
                    else {
                        this.openGalleryMethod()
                    }
                }
                else  if (result === "blocked" || result === "unavailable") {
                    this.DeniedPermissionPopup(typePermission)
                }
                else{
                    request(tempPermission).then((status) => {
                        if (status === "granted") {
                            if (typePermission == 'camera') {
                                if(Platform.OS == 'android'){
                                    this.checkPermission('camera_storage')
                                }
                                else{
                                    this.openCameraMethod()
                                }
                            }
                            else if (typePermission == 'camera_storage') {
                                this.openCameraMethod()
                            }
                            else {
                                this.openGalleryMethod()
                            }
                         } else {
                            console.log('permission denied');
                        }
                    });
                }
            })
            .catch(error => {
                // …
                alert(error)
            });
    }
    openCameraMethod() {
        // Launch Camera:
        let options = { storageOptions: { skipBackup: true, path: 'images', allowsEditing: true } }

        ImagePicker.launchCamera(options, (response) => {
            // Same code as in above section!
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let uri = Platform.OS == 'ios' ? response.uri.replace("file://", "") : response.uri
                this.props.UploadMediaMethod(uri)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }

        });

    }
    openGalleryMethod() {
        // Open Image Library:
        let options = { storageOptions: { skipBackup: true, path: 'images', allowsEditing: true } }
        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let uri = Platform.OS == 'ios' ? response.uri.replace("file://", "") : response.uri
                this.props.UploadMediaMethod(uri)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    }
    DeniedPermissionPopup(type) {
        var msg;
        
        if (type == 'camera') {
            msg = "App doesn't have camera access permissions. Please go to settings and allow PotSmoking for camera access permissions."
        }
        else if (type == 'camera_storage') {
            msg = "App doesn't have storage access permissions. Please go to settings and allow PotSmoking for storage access permissions."
        }
        else {
            msg = "App doesn't have gallery access permissions. Please go to settings and allow PotSmoking for gallery access permissions."
        }
        Alert.alert(
            'PotSmoking',
            msg
            ,
            [
                { text: 'Cancel', onPress: () => {console.log('OK Pressed') } },
                { text: 'Settings', onPress: () => this.openSettingPage() },
            ],
            { cancelable: false }
        )

    }
    openSettingPage() {
        if(Platform.OS == 'android'){
            Linking.openSettings()
        }
        else{
            Linking.canOpenURL('app-settings:').then(supported => {
                if (!supported) {
                    console.log('Can\'t handle settings url');
                } else {
                    return Linking.openURL('app-settings:');
                }
            }).catch(err => console.error('An error occurred', err));
        }

    }
    CameraScreen() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.showModal}
                onRequestClose={() => {
                }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(255.0,255.0,255.0,0.8)', justifyContent: 'flex-end' }}>
                    {/* <TouchableOpacity style={{ height: 30, width: 30, marginRight: 10, marginBottom: 10, alignSelf: 'flex-end', justifyContent: 'flex-end' }} onPress={() => { this.props.onExitMethod() }}>
                            <Image style={{ height: 30, width: 30 }} resizeMode={'contain'} source={images.CameraScreen.cancel}></Image>
                        </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => this.checkPermission('camera')} style={{ elevation: 3, paddingHorizontal: 10, height: 50, backgroundColor: Colors.white, shadowOpacity: 1.0, shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 1, height: 1 }, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 20, width: 20 }} resizeMode={"contain"} source={images.user_camera} />
                        <Text style={{ marginHorizontal: 10, fontSize: 17, color: Colors.black }}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.checkPermission('gallery')} style={{ elevation: 3, paddingHorizontal: 10, height: 50, backgroundColor: Colors.white, shadowOpacity: 1.0, shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 1, height: 1 }, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 20, width: 20,tintColor:Colors.cerulean }} resizeMode={"contain"} source={images.gallery_image} />
                        <Text style={{ marginHorizontal: 10, fontSize: 17, color: Colors.black }}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.onExitMethod() }} style={{ elevation: 3, paddingHorizontal: 10, height: 50, backgroundColor: Colors.white, shadowOpacity: 1.0, shadowColor: 'rgba(0,0,0,0.5)', shadowOffset: { width: 1, height: 1 }, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 20, width: 20 ,tintColor:Colors.cerulean}} resizeMode={"contain"} source={images.wrong_ic} />
                        <Text style={{ marginHorizontal: 10, fontSize: 17, color: Colors.black }}>Cancel</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        )
    }



}
