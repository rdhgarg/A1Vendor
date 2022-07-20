// AppHeader({ ...this.props.navigation, leftTitle: 'Account',
// hideLeftBackIcon: false, })
import React from 'react';
import { Text, View, ScrollView, Share, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import IconInput from '../../Comman/GInput';
import KeyboardScroll from '../../Comman/KeyboardScroll';
import AppHeader from '../../Comman/AppHeader';
import fonts from '../../Assets/fonts';

export default class SelectSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrMonthDayItem: [
                {
                    monthday: "15 Dec",
                },
                {
                    monthday: "16 Dec",
                },
                {
                    monthday: "17 Dec",
                },
                {
                    monthday: "18 Dec",
                },
                {
                    monthday: "19 Dec",
                },
                {
                    monthday: "20 Dec",
                },
                {
                    monthday: "21 Dec",
                },
                {
                    monthday: "22 Dec",
                },
                {
                    monthday: "23 Dec",
                },
                {
                    monthday: "24 Dec",
                },
            ],


            arrTime: [
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
                {
                    time: "8:00 AM",
                },
            ],



        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Select Slot',
            bellIcon: false, settingsIcon: false, profileIcon: false,
            hideLeftBackIcon: false,

        })
    }

    selectSlot() {
        this.props.navigation.navigate('AddProduct')
    }


    _renderMonthDayItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={{ marginVertical: 5, marginHorizontal: 8 }}>
                <TouchableOpacity style={{
                    backgroundColor: index === 0 ? Colors.black : Colors.white,
                    paddingVertical: 8,
                    paddingHorizontal: 20, borderRadius: 18, borderWidth: 1, borderColor: Colors.black
                }}>
                    <Text style={{
                        color: index === 0 ? Colors.white : Colors.black, fontSize: 12, fontWeight: 'bold',
                        fontFamily: fonts.PoppinsBold
                    }}>{item.monthday}</Text>
                </TouchableOpacity>
            </View>
        )
    }



    _renderTimeItem = ({ item, index }) => {
        // console.log(item);
        return (
            <View style={styles.timeView}>
                <TouchableOpacity onPress={()=> this.selectSlot()} style={styles.touchCss}>
                    <Text style={styles.timeCss}>{item.time}</Text>
                </TouchableOpacity>
            </View>
        )
    }




    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{ marginTop: 10, marginHorizontal: 5, }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrMonthDayItem}
                        renderItem={this._renderMonthDayItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>


                <View style={{ marginTop: 10, marginHorizontal: 15, alignItems: 'center' }}>
                    <Text style={styles.avlTime}>AVAILABLE TIME SLOTS</Text>
                </View>

                <View style={styles.listBorder}>
                    <FlatList

                        numColumns={4}
                        data={this.state.arrTime}
                        renderItem={this._renderTimeItem}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>


            </View>
        )
    }

};

const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    timeView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', marginVertical: 10,
        marginHorizontal: 5
    },
    touchCss: {
        justifyContent: 'center', alignItems: 'center',
        borderColor: '#FCFBFB',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: 10,
        height: 70,
        width: 70,
        elevation: 1,
        // paddingVertical:15,
        // paddingHorizontal:10
    },
    timeCss: {
        color: Colors.black, fontSize: 13,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.PoppinsBold
    },
    listBorder: {
        marginTop: 20, marginHorizontal: 5, marginHorizontal: 10, borderRadius: 15,
        elevation: 2,
    },
    avlTime:{ color: Colors.black, fontSize: 15, fontWeight: 'bold', fontFamily: fonts.PoppinsBold }

});





