import React from 'react';
import { SafeAreaView, View, Text, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../Screens/HomeScreen/HomeScreen'; 
import Colors from '../Assets/Colors';
import fonts from '../Assets/fonts';
//new files easybuddy
import Services from '../Screens/Services/Services';
import Booking from '../Screens/Booking/Booking';
import Account from '../Screens/Account/Account';


import {images} from '../Assets/imagesUrl'; 


const Tabs = createBottomTabNavigator();
const DeviceW = Dimensions.get('screen').width

const RenderTabIcons = (props) => {
    const { icon, lable, name, activeIcon, isFocused } = props;
    return (
        <View style={[{ alignItems: "center", justifyContent: "center", width: DeviceW / 5, height: 57, }, (isFocused) ? {} : '']}>
            <Image
                source={(isFocused) ? activeIcon : icon}
                style={{ height: 20, width: 20, resizeMode: 'contain', marginTop: 10 }}
            />
            <Text style={[{lineHeight:13, color: Colors.black, fontSize:fonts.fontSize10 ,fontFamily:fonts.RoBoToRegular_1}, (isFocused) ? { color: Colors.greyishBrown, fontSize:fonts.fontSize10,fontFamily:fonts.RoBoToRegular_1,lineHeight:13 } : '']}>{name}</Text>

        </View>
    );
}


const ReturnNavigator = createStackNavigator();
function HomeStackNavigator() {
    return (
        <ReturnNavigator.Navigator>
            <ReturnNavigator.Screen name="HomeScreen" component={HomeScreen} />
        </ReturnNavigator.Navigator>
    )
}
const ServicesNavigator = createStackNavigator();
function ServicesStackNavigator() {
    return (
        <ServicesNavigator.Navigator >
            <ReturnNavigator.Screen name="Services" component={Services}  />
        </ServicesNavigator.Navigator>
    )
}


const BookingNavigator = createStackNavigator();
function BookingStackNavigator() {
    return (
        <BookingNavigator.Navigator >
            <ReturnNavigator.Screen name="Booking" component={Booking}  />
        </BookingNavigator.Navigator>
    )
}

const AccountNavigator = createStackNavigator();
function AccountStackNavigator() {
    return (
        <AccountNavigator.Navigator >
            <ReturnNavigator.Screen name="Account" component={Account}  />
        </AccountNavigator.Navigator>
    )
}

export default class BottomTab extends React.Component {
    render() {
        return (
            <Tabs.Navigator
                tabBarOptions={{
                    style: {
                        height: 50,
                    },
                }}
            >
                <Tabs.Screen
                    name="HomeScreen"
                    component={HomeStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={images.Icon_material_home}
                                    activeIcon={images.Icon_material_home}
                                    name={'Home'}
                                    isFocused={focused}
                                />
                            );
                        },
                    }}
                />
                <Tabs.Screen
                    name="Services"
                    component={ServicesStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={images.Icon_ionic_ios_settings}
                                    activeIcon={images.Icon_ionic_ios_settings}
                                    name={'Services'}
                                    isFocused={focused}
                                />
                            );
                        },

                    }}
                />
                
                <Tabs.Screen
                    name="Booking"
                    component={BookingStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={images.Icon_ionic_md_paper}
                                    activeIcon={images.Icon_ionic_md_paper}
                                    name={'Booking'}
                                    isFocused={focused}
                                />
                            );
                        },

                    }}
                />
                <Tabs.Screen
                    name="Account"
                    component={AccountStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={images.Icon_awesome_user_edit}
                                    activeIcon={images.Icon_awesome_user_edit}
                                    name={'Account'}
                                    isFocused={focused}
                                />
                            );
                        },
                    }}
                />
            </Tabs.Navigator>

        )
    }
}



