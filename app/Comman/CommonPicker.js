import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Fonts from '../Assets/fonts'
import colors from '../Assets/Colors'
import images from '../Assets/imagesUrl'
import RNPickerSelect from 'react-native-picker-select';


export default class TextInputCommon extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            secureTextEntry: this.props.placeHolder == 'Password' ? true : false
        }
    }

    render() {
        return (
            <View style={{ marginHorizontal: this.props.marginHorizontal, marginTop: this.props.marginTop }}>
                    <View style={{  marginTop: Platform.OS == 'ios' ? 15 : 0 }}>
                        <RNPickerSelect
                            placeholder={this.props.placeHolder}
                            items={this.props.items}
                            placeholderTextColor="#000"
                            style={ {inputAndroid: {color: 'black'} }}
                            value={this.props.selectValue}
                            onValueChange={(value) => this.props.onValueChange(value)}
                            useNativeAndroidPickerStyle={false}
                            style={this.props.pickerSelectStyles}
                        />
                        <Image  source={require("../Assets/newImage/dropdown.png")} style={{ height: 15, resizeMode: "contain", position: "absolute", right: 0, top: Platform.OS == 'ios' ? 3 : 15, width: 15 }} />
                    </View>

                </View>
          
        );
    }

    hideShowpass() {
        this.setState({ secureTextEntry: !this.state.secureTextEntry })
    }

};


const styles = StyleSheet.create({
    textLabel: {
        color: colors.black, fontSize: 13, marginTop: 20, fontFamily: Fonts.PoppinsExtraBold
    },
    textValue: {
        flex: 1, color: colors.black, fontSize: 16, marginTop: 5, paddingVertical: 5, fontFamily: Fonts.PoppinsExtraBold
    }
})



