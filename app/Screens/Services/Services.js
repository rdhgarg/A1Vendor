import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './ServiceStyle';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';


export default class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrService: [1, 2, 3],
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'My Service', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            bellIconClick: () => this.bellIconClick(),
            settingIconClick: () => this.settingIconClick()
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }

    gotToActivityDetail() {
        this.props.navigation.navigate('ActivityDetailScreen')
    }

    _renderUpComingItem = ({ item, index }) => {
        return (

            <View style={styles.history_view}>

                <TouchableOpacity style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} onPress={() => { }}>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'contain'} source={images.test3} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Service Name 1</Text>
                                <Text style={{ position: 'absolute', paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, right: 2 }}>Add</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18 }}>1500</Text>

                                <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                    <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>4.5 (250 ratings)</Text>
                                </View>

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>


            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <Image resizeMode={'contain'} source={images.test4} style={{ height: 180, width: '100%' }}></Image>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={[1, 2, 3]}
                            renderItem={this._renderUpComingItem}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }

};
