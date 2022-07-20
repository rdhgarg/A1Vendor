import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, } from 'react-native';
import Colors from '../Assets/Colors';
import fonts from '../Assets/fonts';


class GInput extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.input_container}>

                <View style={{ flexDirection: 'row',  }}>
                    <Image
                        source={this.props.imagePathRight}
                        resizeMode='contain'
                        style={{
                            height: this.props.rightHeight, width: this.props.rightWidth,
                            tintColor: this.props.tintColor
                        }}
                    />

                    <Text style={{
                        left: 10, justifyContent: 'center',
                        fontSize: fonts.fontSize14,
                        color: Colors.black,
                        fontFamily: fonts.RoBoToMedium_1,
                    }}>{this.props.label}</Text>
                </View>


                <View style={styles.input_view}>
                    <TextInput
                        secureTextEntry={this.props.secureTextEntry}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        underlineColorAndroid="transparent"
                        autoCorrect={false}
                        value={this.props.value}
                        onChangeText={this.props.onChangeText}
                        keyboardType={this.props.keyboardType}
                        maxLength={this.props.maxLength}
                        returnKeyType={this.props.returnKeyType}
                        blurOnSubmit={this.props.blurOnSubmit}
                        onSubmitEditing={this.props.setFocus}
                        ref={this.props.getFocus}
                        editable={this.props.inputedit}
                        placeholder={this.props.placeholder}
                        style={styles.input_style}
                        placeholderTextColor={this.props.placeholderTextColor}
                    />
                </View>

            </View>
        );
    }
}

export default GInput;


const styles = StyleSheet.create({
    input_style: {
        fontSize: fonts.fontSize14,
        color: Colors.warmGrey,
        alignItems: 'center',
        height: 50,
        fontFamily: fonts.RoBoToMedium_1,

    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#F4EDED',
        height: 50,
    },
    input_view: {
        flex:1
    },
    image_view: {
        flex: 0.1, justifyContent: 'center', marginLeft: 18,

    },
    image_right_view: {
        flex: 0.1, justifyContent: 'center',

    }

});
