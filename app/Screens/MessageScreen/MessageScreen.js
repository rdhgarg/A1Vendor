import React from 'react';
import { View, Image ,Text} from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import styles from './MessageScreenStyles';
import IconInput from '../../Comman/GInput';
import KeyboardScroll from '../../Comman/KeyboardScroll';
import AppHeader from '../../Comman/AppHeader';


export default class MessageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'services',
        hideLeftBackIcon: false, })
    }

    render() {
        return (
            <View style={styles.safe_area_view}>
                <KeyboardScroll contentContainerStyle={{ paddingBottom: 22 }}>
                   
                <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:200}}>
                        <Text style={{color:Colors.black,fontSize:fonts.fontSize24,fontWeight:'bold'}}>Comming Soon</Text>
                    </View>
                </KeyboardScroll>
            </View>
        )
    }

};





