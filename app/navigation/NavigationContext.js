import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import Colors from '../Assets/Colors'
import Routes from './Routes'
// import StudentRoutes from './StudentRoutes'
// import SeniorCitizenRoutes from './SeniorCitizenRoutes'
import Helper from '../Lib/Helper'
import SplashScreen from '../AuthScreens/SplashScreen/SplashScreen'

export default class NavigationProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {},
            userType: '',
            // userType 1 means home care manager
            // userType 2 means student
            // userType 3 senior citizen
        }
    }

    componentDidMount() {
        Helper.navRef = this;
    }

    switchNavigation = (value) => {
        this.setState({ userType: value })
    }

    render() {
        const { userType } = this.state 

        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.cerulean} />
                {/* {userType == '2' ?
                    <StudentRoutes />
                    : userType == '3' ?
                        <SeniorCitizenRoutes />
                        : userType == '1' ? */}
                            <Routes />

                            {/* //{/* : <SplashScreen /> */}
               {/* // } */} */}
            </View>
        )
    }
} 