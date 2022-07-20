import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './SettingsScreenStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import SwitchToggle from "react-native-switch-toggle";
import AppHeader from '../../Comman/AppHeader';
import { handleNavigation } from '../../navigation/Navigation';
import Helper from '../../Lib/Helper';

export default class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchOnNotification: true,

        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Settings', borderBottomRadius: 25 })

    }
    
    onPressNotification = () => {
        this.setState({ switchOnNotification: !this.state.switchOnNotification })
    }

    goToChangePassword() {
        handleNavigation({ type: 'push', page: 'ChangePasswordScreen', navigation: this.props.navigation })
    }

    gotToChangeLanguage() {
        handleNavigation({ type: 'push', page: 'ChangeLanguageScreen', navigation: this.props.navigation })
    }

    goToAccountDetails() {
        handleNavigation({ type: 'push', page: 'AccountDetailsScreen', navigation: this.props.navigation })
    }

    goToRatingsReviews() {
        handleNavigation({ type: 'push', page: 'RatingsReviews', navigation: this.props.navigation })
    }

    gotToNotification() {
        handleNavigation({ type: 'push', page: 'NotificationsScreen', navigation: this.props.navigation })
    }

    gotToLogin() {
        Helper.navRef.switchNavigation('1'); 
        setTimeout(() => {
            handleNavigation({ type: 'setRoot', page: 'AfterSplash', navigation: this.props.navigation })
        }, 500);
    }


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>
                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={this.onPressNotification}
                            style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Notification</Text>
                            <View>
                                <SwitchToggle
                                    containerStyle={{ width: 20, height: 13.3, borderRadius: 8, padding: 0.1, borderColor: Colors.cerulean, borderWidth: 1 }}
                                    backgroundColorOn={Colors.cerulean}
                                    backgroundColorOff={Colors.greyishBrown}
                                    circleStyle={{ width: 10, height: 10, borderRadius: 5.5, }}
                                    switchOn={this.state.switchOnNotification}
                                    onPress={this.onPressNotification}
                                    circleColorOff={Colors.white}
                                    circleColorOn="#e5e1e0"
                                    duration={500}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={() => this.goToChangePassword()} style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Change Password</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={() => this.gotToChangeLanguage()}
                            style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Change Language</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={() => this.goToAccountDetails()}
                            style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Account Details</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={() => this.goToRatingsReviews()}
                            style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Ratings & Reviews</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Terms & Conditions</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={{ height: 12, width: 7 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity style={styles.settings_title_touch}>
                            <Text style={styles.settings_title_text}>Privacy Policy</Text>
                            <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.main_view_touch}>
                        <TouchableOpacity
                            onPress={() => this.gotToLogin()}
                            style={styles.settings_title_touch}>
                            <Text style={{ fontSize: fonts.fontSize14, color: Colors.cerulean, fontFamily: fonts.RoBoToMedium_1, lineHeight: 17 }}>Logout</Text>
                            {/* <Image source={images.setting_next} resizeMode={'contain'} style={styles.arrow_img} /> */}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

};
