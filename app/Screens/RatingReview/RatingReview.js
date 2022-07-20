import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView,TextInput } from 'react-native';
import styles from './RatingReviewStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';



export default class RatingReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Rating & Review', })

    }
    change_Language_submit() {
        this.props.navigation.navigate('SettingsScreen')
    }


   


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={{ marginHorizontal: 25, marginTop: 5 }}>
                        <Text style={{ color: Colors.black,fontSize: fonts.fontSize15, fontFamily: fonts.PoppinsExtraBold,
                        fontWeight:'bold' }}>Give Rating to the Technician</Text>
                    </View>

                    <View style={{ marginHorizontal: 25, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity>
                            <Image source={images.star_ic} resizeMode={'contain'} style={{ height: 26, width: 26 }} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={images.star_ic} resizeMode={'contain'} style={{ height: 26, width: 26 }} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={images.star_ic} resizeMode={'contain'} style={{ height: 26, width: 26 }} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={images.star_ic} resizeMode={'contain'} style={{ height: 26, width: 26 }} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image source={images.star_outline_ic} resizeMode={'contain'} style={{ height: 26, width: 26 }} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginHorizontal: 25, marginTop: 25 }}>
                        <Text style={{ color: Colors.black, fontSize: fonts.fontSize15, fontFamily: fonts.RoBoToMedium_1,
                        fontWeight:'bold' }}>Review</Text>
                    </View>
                    <View style={{
                        marginVertical: 10,
                        marginHorizontal: 25,
                        backgroundColor:'#F4EDED',
                        borderRadius: 5,
                        borderColor: Colors.whiteTwo,
                        elevation: 1.5,
                        height:130,
                        shadowOpacity: 0.5,
                        shadowColor: '#172C3326',

                    }}>
                    <TextInput
                    multiline
                    placeholder="ever since the 1500s."
                        style={{textAlignVertical:'top',textAlign:'justify',}}
                    />
                       

                    </View>

                    <View style={styles.update_btn_view}>
                        <GButton
                            Text='Submit'
                            width={'40%'}
                            height={45}
                            
                            borderRadius={22.5}
                            onPress={() => { this.change_Language_submit() }}
                        // onPress={() => { this.login_Submit() }}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }

};
