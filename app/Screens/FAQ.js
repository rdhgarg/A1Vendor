import React from 'react';
import { Text, View, ScrollView, StyleSheet,TextInput, Dimensions, SafeAreaView, } from 'react-native';
import AppHeader from '../Comman/AppHeader';


export default class FAQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.route.params?.type  
        }
        AppHeader({ ...this.props.navigation, leftTitle: 'Listing Details' })
    }
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
               <Text>Working</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
   
});