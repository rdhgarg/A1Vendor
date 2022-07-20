import React from 'react';
import { Text, View, ScrollView, Image, ImageBackground, SafeAreaView,TouchableOpacity } from 'react-native';
import styles from './AfterSplashStyles';
import { GButton } from '../../Comman/GButton';
import { images } from '../../Assets/imagesUrl';
import { handleNavigation } from '../../navigation/Navigation';

export default class AfterSplash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    logInClick = () => {
        handleNavigation({type:'push',page:'LoginScreen',navigation:this.props.navigation})
        // this.props.navigation.navigate('LoginScreen')
    }


    signupSenior = () => {
        handleNavigation({type:'push',page:'SeniorSignUpScreen',navigation:this.props.navigation})
        // this.props.navigation.navigate('SeniorSignUpScreen')
    }

    sigInUpInClick = () => {
        handleNavigation({type:'push',page:'StudentSignUpScreen',navigation:this.props.navigation})
        // this.props.navigation.navigate('StudentSignUpScreen')
    }



    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                <ImageBackground source={images.After_splash} style={styles.image_back_ground} resizeMode="cover">
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} contentContainerStyle={{ paddingBottom: 22 }}>

                        <View style={styles.top_button_view}>
                            <TouchableOpacity style={styles.de_view}>
                                <Text style={styles.de_text}>DE</Text>
                                <Image source={images.switzerland_ic} resizeMode={'contain'} style={styles.switzer_img} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.en_view}>
                                <Text style={styles.en_text}>Enterprise</Text>
                                <Image source={images.enterprise_ic__blue} resizeMode={'contain'} style={styles.en_img} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.after_splash_logo_view}>
                            <Image source={images.after_splash_logo} resizeMode={'contain'} style={styles.after_splash_logo} />
                        </View>

                        <View style={styles.have_be_parent_view}>
                            <TouchableOpacity 
                            onPress={()=>this.sigInUpInClick()} style={styles.have_be_round_view}>
                                <Image source={images.have_omy_black} resizeMode={'contain'} style={styles.have_be_img} />
                                <Text style={styles.have_be_omy_text}>Have VENDERAPP</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            onPress={()=>this.signupSenior()} style={styles.have_be_round_view}>
                                <Image source={images.be_omy_blue} resizeMode={'contain'} style={styles.have_be_img} />
                                <Text style={styles.have_be_omy_text}>Be VENDERAPP</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.have_account_view}>
                            <Text style={styles.have_account_text}>Already have an account?</Text>
                        </View>
                        <View style={styles.btn_view}>
                            <GButton
                                Text='LOGIN'
                                width={'40%'}
                                height={40}
                                borderRadius={5}
                                onPress={() => { this.logInClick() }}
                            />
                        </View>



                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        )
    }

};



