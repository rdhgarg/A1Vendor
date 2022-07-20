import React from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from './AddServiceStyles';
import { GButton } from '../../Comman/GButton';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import ViewPager from '@react-native-community/viewpager';
import AppHeader from '../../Comman/AppHeader';
import ApiCallHelper from '../../config/ApiCallHelper';
import Constant from '../../config/Constant';
import Helper from '../../config/Helper'

export default class AddService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            qty:0,
            total_amount:0,
            arrService:[],
            
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Add Service', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,
            bellIconClick: () => this.bellIconClick(),
            settingIconClick: () => this.settingIconClick()
        })
    }

    componentDidMount(){
        Helper.getData('CartItem').then((data) => {
            console.log("CartItem------", data);
            if (data) {
                this.setState({arrService : data })
            } else {
            }
            console.log("CartItem------", this.state.arrService);
        })
    }

    settingIconClick() {
        this.props.navigation.navigate('SettingsScreen')
    }

    bellIconClick() {
        this.props.navigation.navigate('NotificationsScreen')
    }

    gotToSelectAddress() {
        let data ={
            totalAmount : this.state.total_amount,
            arrCount : this.state.arrService.length,
            arrService : this.state.arrService
        }
        this.props.navigation.navigate('BookingReview', {data : data})
       // this.props.navigation.navigate('SelectAddress')
    }


    _addQty  (index , pr) {
        var data = this.state.arrService;
        data[index].quantity = data[index].quantity + 1;
        //data[index].price = pr *  data[index].quantity;
        //this.setState({quntity:data});
        this.setState({total_amount : Number(this.state.total_amount)+ Number(data[index].price)});
        console.log("qqqqqqqqqqqqqqqqq",data[index].quantity)
       // this.addCart( data[index].product_id, data[index].quantity , data[index].price);


    //    let markers = [...this.state.arrService];
    //    let index = markers.findIndex(el => el.quantity === data[index].quantity);
    //    markers[index] = {...markers[index], key: value};
    //    this.setState({ markers });

    }
    DecreQty  (index , pr) {
        var data = this.state.arrService;
        if( data[index].quantity == 0){

         return;
          }else{
        data[index].quantity = data[index].quantity - 1;
      //  data[index].price = data[index].price -  pr;
      //  this.setState({quntity:data});
        this.setState({total_amount :  Number(this.state.total_amount) - Number(data[index].price)});
       // this.addCart( data[index].product_id, data[index].quantity , data[index].price);
          }
    }

    
    _renderUpComingItem = ({ item, index }) => {
        return (
            <View style={[styles.history_view,{paddingHorizontal: 10, }]}>

                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'cover'} source={{uri : item.image}} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: fonts.fontSize14 }}>{item.category_name}</Text>

                               <View style={{position: 'absolute', right: 2, alignItems:'center', borderRadius:16, borderWidth:1,paddingHorizontal:10, paddingVertical:2, flexDirection:'row' }}>
                                   <TouchableOpacity onPress={()=> this.DecreQty(index , item.price)}>
                                     <Image  source={images.minus} style={{height : 16, width :16}}/>
                                       </TouchableOpacity>
                                      
                                       <Text style={{marginHorizontal:5, fontSize:14}} >{item.quantity}</Text>
                                      
                                       <TouchableOpacity  onPress={()=> this._addQty(index , item.price)}>
                                       <Image source={images.plus} style={{height : 16, width :16}}/>
                                       </TouchableOpacity>
                               </View>
                                {/* <TouchableOpacity style={{ }}>
                                    <Image source={images.addservice} resizeMode={'contain'} style={{ height: 28, width: 72 }} />
                                </TouchableOpacity> */}

                                {/* <Text style={{ position: 'absolute', paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, right: 2 }}>- 1 +</Text> */}
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: fonts.fontSize17 }}>{item.price}</Text>

                                <View style={{ position: 'absolute', flexDirection: 'row', right: 2, right: 2 }}>
                                    <Image resizeMode={'contain'} source={images.star} style={{ height: 15, width: 15 }} />
                                    <Text style={{ fontSize: 10, color: '#555555', marginLeft: 5 }}>{item.avg_rating} {'('}{item.ratings} ratings)</Text>
                                </View>

                            </View>
                        </View>
                    </View>
               

            </View>
        )
    }




    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>

                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <Image resizeMode={'contain'} source={images.test4} style={{ height: 180, width: '100%' }}></Image>
                    <View style={{ marginTop: 20, height:'58%' }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrService}
                            renderItem={this._renderUpComingItem}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

                <View style={{borderTopWidth:1,borderTopColor:'#00000010',
                     backgroundColor: Colors.white, 
                    elevation:3,
                    bottom: 0,  opacity: 100,  width: '100%',
                    position: 'absolute', justifyContent: 'space-between', 
                    flexDirection: 'row', height: 68, alignItems: 'center', paddingHorizontal: 20
                }}>

                    <View style={{ flexDirection: 'row',alignItems:'center' }}>

                        <View style={{
                            backgroundColor: '#F8EFEF', width: 26, height: 26,
                            borderRadius: 26 / 2, borderWidth: 1,
                            borderColor: '#CBC5C5', justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: Colors.black, fontSize: fonts.fontSize10, fontFamily: fonts.PoppinsRegular
                            }}>{this.state.arrService.length}</Text>

                        </View>

                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                            <Text style={{ fontSize: fonts.fontSize17 }}>{this.state.total_amount}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                    onPress={()=>this.gotToSelectAddress()} style={{ backgroundColor: Colors.black, height: 28, width: 73, borderRadius: 28 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Colors.white }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
   
};
