import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './SelectPaymentModeStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';


export default class SelectPaymentMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCashonhome: false,
            isCreditCard: false,
            isDebitCard: false,
            isNetBanking:false,

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Select Payment Mode', })

    }
    change_Language_submit() {
        this.props.navigation.navigate('SettingsScreen')
    }


    renderLanguageOption = (paymenMode, isChosen) => {

        chooseLanguage = () => {
            if (paymenMode === "Cash on home") {
                this.setState({
                    isCashonhome: true,
                    isCreditCard: false,
                    isDebitCard: false,
                    isNetBanking:false,


                });
            } else if (paymenMode === "Credit Card") {
                this.setState({
                    isCashonhome: false,
                    isCreditCard: true,
                    isDebitCard: false,
                    isNetBanking:false,

                });
            }else if (paymenMode === "Debit Card") {
                this.setState({
                    isCashonhome: false,
                    isCreditCard: true,
                    isDebitCard: true,
                    isNetBanking:false,

                });
            } else {
                this.setState({
                    isCashonhome: false,
                    isCreditCard: false,
                    isDebitCard: false,
                    isNetBanking:true,
                })
            }
        };

        return (
            <View style={styles.lang_view}>
                <TouchableOpacity onPress={chooseLanguage} style={styles.lang_radio_touch_text}>
                    <Image
                        source={isChosen ? images.radio_btn_selected : images.radio_btn_un_selected}
                        style={styles.radio_img}
                    />
                    <Text style={styles.lang_select_text}>{paymenMode}</Text>
                </TouchableOpacity>
                {/* <View style={{height:1,backgroundColor:"#172C3326",marginVertical:5}}></View> */}
            </View>
        );
    };


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                <View style={{
                        marginVertical: 10,
                        marginTop: 33,
                        paddingHorizontal:5,
                        marginHorizontal: 25,
                        paddingVertical:10,
                        backgroundColor:Colors.white,
                        borderRadius:5,
                        borderColor:Colors.whiteTwo,
                        elevation:1.5,
                        shadowOpacity: 0.5,
                        shadowColor:'#172C3326',
                        
                    }}>
                    {this.renderLanguageOption("Cash on home", this.state.isCashonhome)}
                    {this.renderLanguageOption("Credit Card", this.state.isCreditCard)}
                    {this.renderLanguageOption("Debit Card", this.state.isDebitCard)}
                    {this.renderLanguageOption("Net Banking", this.state.isNetBanking)}

                    </View>

                    <View style={styles.update_btn_view}>
                        <GButton
                            Text='Proceed'
                            width={'35%'}
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
