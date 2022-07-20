import React from 'react';
import { Text, View, ScrollView, Image, TextInput, Modal, Dimensions, FlatList, StyleSheet, DeviceEventEmitter, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import { handleNavigation } from '../../navigation/Navigation';
import ApiCallHelper from '../../config/ApiCallHelper'
import Helper from '../../config/Helper'
import Constant from '../../config/Constant'
import AppHeader from '../../Comman/AppHeader';
import RNPickerSelect from '../../Comman/CommonPicker'
import CameraController from '../../config/CameraController'

import RNPickerSelect1 from "react-native-picker-select";

export default class AddService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PasswordIcon: true,
            mobile_number: '',
            password: '',
            arrCategory: [],
            arrSubCategory: [],
            categoryID: null,
            subCategoryID: "",
            profile_Image: '',
            description: "",
            title: "",
            price: '',
            selectedItems: [],
            detailsModalVisible: false,
            multiService: [],
            arrServiceList: [],
            val: null,
            selectedLable: []
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Add Services', borderBottomRadius: 0 })

    }

    componentDidMount() {
        this.getCategory()
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
    };

    getCategory() {
        let data = {
            vendor_id: Helper.userData.id
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.userCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrCategory: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getSubCategory(value) {
        this.setState({ categoryID: value })
        let data = {
            category_id: value
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.subCategory, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.setState({ arrSubCategory: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }


    // http://dilkhushpvtltd.com/easybuddy/api/auth/vendor/service-list

    getServiceList(value) {
        this.setState({ subCategoryID: value })
        let data = {
            vendor_id: Helper.userData.id,
            category_id: this.state.categoryID,
            subcategory_id: value,
        }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.serviceList, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            if (response.status == true) {
                this.state.multiService = []
                this.state.selectedLable =[]
                this.setState({ arrServiceList: response.data, })
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    onPressedCamera = (data) => {
        CameraController.open((response) => {
            if (response.path) {
                console.log(response)
                this.setState({ profile_Image: response.path });
                //this.imageUpload(response.path)
            }
        });
    }

    addService() {
        Keyboard.dismiss()
        console.log("11111", this.state.multiService);
        if (this.state.categoryID == '') {
            Helper.showToast('Please select category')
            return false;
        }

        if (this.state.subCategoryID == '') {
            Helper.showToast('Please select sub category')
            return false;
        }
        if (this.state.multiService == '' || this.state.multiService.length <= 0) {
            Helper.showToast('Please enter service name')
            return false;
        }

        // if (this.state.profile_Image == '') {
        //     Helper.showToast('Please select image')
        //     return false;
        // }  

        // if (this.state.description == '') {
        //     Helper.showToast('Please enter description')
        //     return false;
        // } 

        // if (this.state.price == '') {
        //     Helper.showToast('Please enter price')
        //     return false;
        // } 
        let template = new FormData();

        template.append('user_id', Helper.userData.id);
        // template.append('title', this.state.title);
        //template.append('price', this.state.price);
        template.append('category_id', this.state.categoryID);
        template.append('subcategory_id', this.state.subCategoryID);
        template.append('service_id', this.state.multiService.toString());
        // if (this.state.profile_Image == '' || this.state.profile_Image == null) {
        // } else {
        //     template.append('image', {
        //         uri: this.state.profile_Image,
        //         name: 'test.jpeg',
        //         type: 'image/jpeg'
        //     });
        // }

        var data = {}
        data.user_id = Helper.userData.id
        data.category_id = this.state.categoryID
        data.subcategory_id = this.state.subCategoryID
        data.service_id = this.state.multiService


        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce(Constant.createService, JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            let data = response.data
            if (response.status == true) {
                DeviceEventEmitter.emit("AddService", 'done')
                this.props.navigation.goBack()
            } else {
                Helper.showToast(response.message)
            }
        }).catch(err => {
            Helper.globalLoader.hideLoader();
        })
        //  this.props.navigation.navigate('VerifyingDetails')
    }


    render() {
        const { selectedItems } = this.state;
        return (
            <SafeAreaView style={renderStyle.safe_area_view}>

                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text>Select Category</Text>
                        <View style={{ backgroundColor: '#F4EDED', marginTop: 10, paddingHorizontal: 5 }}>
                            <View style={{ marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
                                <RNPickerSelect1
                                    // onValueChange={(value) => console.log(value)}
                                    items={this.state.arrCategory}
                                    useNativeAndroidPickerStyle={false}
                                    style={{ inputAndroid: { color: 'black' } }}
                                    selectValue={this.state.categoryID}
                                    placeholder={{ label: 'Select a category...', value: null, }}
                                    onValueChange={(value) => { this.getSubCategory(value) }}
                                />
                                <Image source={images.dropdown} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 0, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />
                            </View>

                        </View>
                        <Text style={{ marginTop: 20 }}>Select sub Category</Text>
                        <View style={{ backgroundColor: '#F4EDED', paddingHorizontal: 5, marginTop: 10 }}>

                            <View style={{ marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
                                <RNPickerSelect1
                                    // onValueChange={(value) => console.log(value)}
                                    items={this.state.arrSubCategory}
                                    useNativeAndroidPickerStyle={false}
                                    style={{ inputAndroid: { color: 'black' } }}
                                    selectValue={this.state.categoryID}
                                    placeholder={{ label: 'Select a sub category...', value: null, }}
                                    onValueChange={(value) => { this.getServiceList(value) }}
                                />
                                <Image source={images.dropdown} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 0, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />
                            </View>
                         
                        </View>
                        <Text style={{ marginTop: 20 }}>Select sub Category Service</Text>
                        <TouchableOpacity onPress={() => this.setState({ detailsModalVisible: true })} style={{ backgroundColor: '#F4EDED', marginTop: 10, justifyContent: 'center', minHeight: 50, paddingHorizontal: 5 }}>
                            <Text>{this.state.selectedLable.toString()}</Text>
                            <Image source={images.dropdown} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 5, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.addService()} style={renderStyle.loginView}>
                            <Text style={renderStyle.loginTxt}>Save</Text>
                        </TouchableOpacity>



                    </View>
                </ScrollView>
                {this.detailsModal()}
            </SafeAreaView>
        )
    }


    selectAll(){
        this.state.arrServiceList.map((item, index)=> {
            console.log(item);
            this.state.multiService.push(item.value)
            this.state.selectedLable.push(item.label)

        })
       
        this.setState({})
    }

    selectMultiService(id, lable) {
        if (this.state.multiService.includes(id)) {
            var array = [...this.state.multiService]; // make a separate copy of the array
            var index = array.indexOf(id)
            array.splice(index, 1);
            this.setState({ multiService: array });

        } else {
            var array = [...this.state.multiService]; // make a separate copy of the array
            array.push(id);
            this.setState({ multiService: array });
        }



        if (this.state.selectedLable.includes(lable)) {
            var array = [...this.state.selectedLable]; // make a separate copy of the array
            var index = array.indexOf(lable)
            array.splice(index, 1);
            this.setState({ selectedLable: array });

        } else {
            var array = [...this.state.selectedLable]; // make a separate copy of the array
            array.push(lable);
            this.setState({ selectedLable: array });
        }


    }

    renderRequest = ({ item, index }) => {
        return <View style={{ paddingVertical: index == 0 ? 0 : 10 }}>
            <View style={{ width: '100%', height: index == 0 ? 0 : 0.5, backgroundColor: '#707070', }} />
            <TouchableOpacity onPress={this.selectMultiService.bind(this, item.value, item.label)} style={{ flexDirection: 'row', marginTop: 15 }}>
                {this.state.multiService.includes(item.value) ?
                    <Image source={images.radio_btn_selected} style={{ height: 20, width: 20, tintColor: '#000' }}></Image> :
                    <Image source={images.radio_btn_un_selected} style={{ height: 20, width: 20, tintColor: '#000' }}></Image>
                }
                <Text style={{ fontSize: 13, marginLeft: 10 }}>{item.label}</Text>
            </TouchableOpacity>
        </View>


    }

    detailsModal() {
        // console.log("isSetModalVisible", this.state.isSetModalVisible)
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.detailsModalVisible}>
                <View onPress={() => this.setState({ detailsModalVisible: false })}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>

                    <View style={{ padding: 15, width: Dimensions.get('window').width - 30, backgroundColor: 'white', marginHorizontal: 20 }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{ fontWeight: 'bold', flex:1}}>{"Select Service"}</Text>
                            <TouchableOpacity onPress={()=> this.selectAll()}>
                            <Text style={{ fontWeight:fonts.PoppinsBold,alignSelf:'flex-end' }}>{"Select All"}</Text>
                            </TouchableOpacity>
                        </View>


                        {this.state.arrServiceList.length <= 0 ?
                            <Text style={{ marginTop: 15 }}>{"No Service avalable"}</Text>

                            :
                            <View style={{ marginTop: 20, maxHeight: 250, marginHorizontal: 5 }}>
                                <FlatList
                                    // numColumns={3}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.arrServiceList}
                                    renderItem={this.renderRequest}
                                    extraData={this.state}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>}

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity style={{ flex: 1, height: 40, marginHorizontal: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.setState({ detailsModalVisible: false })} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, height: 40, marginHorizontal: 10, marginTop: 15, marginBottom: 5, borderRadius: 5, backgroundColor: "#000", justifyContent: 'center' }}
                                onPress={() => this.setState({ detailsModalVisible: false })} >
                                <Text style={{
                                    color: 'white', alignSelf: 'center', fontWeight: 'bold', fontSize: 14
                                }}>Done</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
};

const renderStyle = StyleSheet.create({
    safe_area_view: {
        flex: 1, backgroundColor: 'white'
    },
    titleCss: {
        fontSize: 15, marginTop: '5%', fontFamily: fonts.PoppinsBold, fontWeight: 'bold',
    },
    txtView: {
        flexDirection: 'column', marginTop: 20, backgroundColor: 'rgb(243,237,237)', borderRadius: 5, paddingHorizontal: 8,
    },
    inputCss: {
        fontSize: 15, fontWeight: 'bold',
    },
    loginView: {
        alignSelf: "center", marginTop: '10%', backgroundColor: 'black', width: 150, height: 45, justifyContent: 'center', borderRadius: 150 / 2
    },
    addDoc: {
        alignSelf: "center", marginTop: '10%', backgroundColor: 'black', width: '100%', height: 45, justifyContent: 'center', borderRadius: 50

    },
    loginTxt: {
        color: "white", fontSize: 14, alignSelf: 'center'
    },
    txtacc: {
        marginTop: 15, fontSize: 14, color: 'black'
    }
})



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
        textShadowColor: 'black',
        marginRight: 20,
        marginLeft: 8,
        marginBottom: 10,
        fontFamily: fonts.PoppinsExtraBold,
        color: 'black'
    },
});
