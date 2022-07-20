import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Screens/Splash";
import { View, Text, Image } from "react-native";
import Colors from "../Assets/Colors";
import { images } from "../Assets/imagesUrl";

//care home manager
import SplashScreen from "../AuthScreens/SplashScreen/SplashScreen";
import AfterSplash from '../AuthScreens/AfterSplash/AfterSplash';
import LoginScreen from '../AuthScreens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from '../AuthScreens/ForgotPasswordScreen/ForgotPasswordScreen';
import ChangePasswordScreen from '../AuthScreens/ChangePasswordScreen/ChangePasswordScreen';

import SignUpScreen from '../Screens/SignUpScreen/SignUpScreen';
import BottomTab from '../navigation/BottomTab';



import SettingsScreen from "../AuthScreens/SettingsScreen/SettingsScreen";


import VerifyingDetails from "../AuthScreens/VerifyingDetails/VerifyingDetails";
import Slider from "../AuthScreens/Slider/Slider";
import Slider1 from "../AuthScreens/Slider/Slider1";
import Slider2 from "../AuthScreens/Slider/Slider2";
import EnterTheverificationcode from '../Screens/EnterTheverificationcode/EnterTheverificationcode';
import Verified from '../Screens/EnterTheverificationcode/Verified';
import UserProfile from '../Screens/UserProfile/UserProfile';
import SelectPaymentMode from '../Screens/SelectPaymentMode/SelectPaymentMode';
import RatingReview from '../Screens/RatingReview/RatingReview';
import VerificationCodeSend from '../AuthScreens/VerificationCodeSend/VerificationCodeSend';

import Category from '../Screens/Category/Category';
import AddService from '../Screens/AddService/AddService';
import SelectAddress from '../Screens/SelectAddress/SelectAddress';
import PaymentReview from '../Screens/PaymentReview/PaymentReview';
import ContactUs from '../Screens/ContactUs/ContactUs';
import ReportanIssue from '../Screens/ReportanIssue/ReportanIssue';
import AddAddress from '../Screens/AddAddress/AddAddress';
import WebPage from '../Screens/WebPage';
import FAQ from '../Screens/FAQ'
import CategoryDetails from '../Screens/CategoryDetails'
import ListingDetails from '../Screens/ListingDetails';

import SelectSlot from '../Screens/SelectSlot/SelectSlot';
import BookingReview from '../Screens/BookingReview/BookingReview';
import AddProduct from '../Screens/AddProduct/AddProduct';

// vender code

import Home from '../Screens/VenderPage/Home'
import VenderAddervice from '../Screens/VenderPage/AddService'
import Menu from '../Screens/VenderPage/Menu'
import BookingList from '../Screens/VenderPage/BookingList'
import BookingDetails from '../Screens/VenderPage/BookingDetails'
import Profile from '../Screens/VenderPage/Profile';
import ChangePassword from '../Screens/VenderPage/ChangePassword';
import SelectCategory from '../Screens/VenderPage/SelectCategory';
import MyServiceList from '../Screens/VenderPage/MyServiceList';
import MyStaffList from '../Screens/VenderPage/MyStaffList';
import AddStaff from '../Screens/VenderPage/AddStaff'
import ProductList from "../Screens/VenderPage/ProductList";
import ChooseCategory from '../Screens/VenderPage/ChooseCategory';
const Stack = createStackNavigator();
function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="AddAddress"
        initialRouteName="SplashScreen"
      // initialRouteName="AfterSplash"
      >

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }} />

        <Stack.Screen
          name="AfterSplash"
          component={AfterSplash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: true }}
        />

        {/* <Stack.Screen
          name="Slider"
          component={Slider}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen
          name="Slider1"
          component={Slider1}
          options={{ headerShown: false }}
        /> */}

        {/* <Stack.Screen
          name="Slider2"
          component={Slider2}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="VerifyingDetails"
          component={VerifyingDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Verified"
          component={Verified}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="EnterTheverificationcode"
          component={EnterTheverificationcode}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VerificationCodeSend"
          component={VerificationCodeSend}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="BookingDetails"
          component={BookingDetails}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="SelectCategory"
          component={SelectCategory}
          options={{ headerShown: true }}
        />




        <Stack.Screen
          name="BookingList"
          component={BookingList}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="VenderAddervice"
          component={VenderAddervice}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="MyServiceList"
          component={MyServiceList}
          options={{ headerShown: true }}
        />

        <Stack.Screen
          name="MyStaffList"
          component={MyStaffList}
          options={{ headerShown: true }}
        />


        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SelectPaymentMode"
          component={SelectPaymentMode}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RatingReview"
          component={RatingReview}
        // options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />


        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />


        <Stack.Screen
          name="Category"
          component={Category}
        />

        <Stack.Screen
          name="AddService"
          component={AddService}
        />

        <Stack.Screen
          name="SelectAddress"
          component={SelectAddress}
        />

        <Stack.Screen
          name="PaymentReview"
          component={PaymentReview}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
        />

        <Stack.Screen
          name="ReportanIssue"
          component={ReportanIssue}
        />

        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
        />
        <Stack.Screen
          name="WebPage"
          component={WebPage}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
        />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetails}
        />
        <Stack.Screen
          name="ListingDetails"
          component={ListingDetails}
        />

      <Stack.Screen
          name="AddStaff"
          component={AddStaff}
        />
         <Stack.Screen
          name="ProductList"
          component={ProductList}
        />
      <Stack.Screen
         name="ChooseCategory"
        component={ChooseCategory}
      />

        <Stack.Screen
          name="SelectSlot"
          component={SelectSlot}
        />


        <Stack.Screen
          name="BookingReview"
          component={BookingReview}
        />


        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
