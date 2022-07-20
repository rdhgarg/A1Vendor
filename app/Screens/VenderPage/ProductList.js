import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';


export default class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            arrProduct: [],
            allproduct:[],
            arrSelectedProduct: [],
            user_id:null,
            subcat_id:null,
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Product List', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }



    componentDidMount() {
        var data = this.props.route.params?.data.user_id
        var subcat_id = this.props.route.params?.data.subcat_id
        console.log(data)
        this.setState({user_id:data,subcat_id:subcat_id});
        this.getProductList(data,subcat_id);

    }

    getProductList(id,subcat_id) {
       
        var formdata = new FormData();
        formdata.append('user_id', id);
        formdata.append("subcat_id",subcat_id)
        Helper.globalLoader.showLoader();
        let completeUrl = "https://easybuddy.in/api/auth/products"
        let headersObj = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      }
      fetch(completeUrl, {
        body: formdata,
        method: 'POST',
        headers: headersObj,
    }).then(response => response.json())
        .then(responseJson => {
            console.log(responseJson);
          if (responseJson.status == true) {

                     this.setState({ arrProduct: responseJson.data,allproduct:responseJson.data })
                     Helper.globalLoader.hideLoader();
                 } else { 
                    Helper.globalLoader.hideLoader();

                 }
        }).catch(err => {
            console.log('response error : ', err)
            Helper.globalLoader.hideLoader();
        })
        // ApiCallHelper.getNetworkResponce(Constant.products, JSON.stringify(data), Constant.APIPost).then((response) => {
        //     Helper.globalLoader.hideLoader();
        //     if (response.status == true) {
        //         this.setState({ arrProduct: response.data })

        //     } else { }
        // }).catch(err => {
        //     Helper.globalLoader.hideLoader()
        // })
    }

    gotToAddServiceDetail(id) {
      // alert(Helper.userData.id)
       var data = {}
       data.product_id = id,
       data.user_id = this.state.user_id
       console.log(data);

       Helper.globalLoader.showLoader();
       let completeUrl = "https://easybuddy.in/api/auth/add-to-cart-product"
       let headersObj = {
         Accept: 'application/json',
         'Content-Type': 'application/json',
     }
     fetch(completeUrl, {
       body: JSON.stringify(data),
       method: 'POST',
       headers: headersObj,
   }).then(response => response.json())
       .then(responseJson => {
         console.log(responseJson);
         if (responseJson.status == true) {
                  this.getProductList(this.state.user_id)
                  Helper.showToast(responseJson.message)
          } else { }
        }).catch(err => {
            console.log('response error : ', err)
            Helper.globalLoader.hideLoader();
        })

      

   }
   _addQty(index, pr) {
        var data = this.state.arrProduct;
        console.log("data--------------------", data);
        data[index].quantity = Number(data[index].quantity)  + 1;
      
        console.log("qqqqqqqqqqqqqqqqq", data[index].quantity)
        this.incrementDecrement(data[index].id,"1")
  }

          incrementDecrement(id,type) {
            var data = {}
            data.product_id = id,
            data.user_id = this.state.user_id
            data.type = type
            
            Helper.globalLoader.showLoader();
              let completeUrl = "https://easybuddy.in/api/auth/quantity-counter-product"
              let headersObj = {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
          fetch(completeUrl, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: headersObj,
          }).then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              if (responseJson.status == true) {
                        this.getProductList(this.state.user_id,this.state.subcat_id)
                      
                } else { }
              }).catch(err => {
                  console.log('response error : ', err)
                  Helper.globalLoader.hideLoader();
              })

          }


DecreQty(index, pr) {
    var data = this.state.arrProduct;
    if (data[index].quantity == 0) {

    return;
    } else {
        data[index].quantity = Number(data[index].quantity) - 1;
        //  data[index].price = data[index].price -  pr;
        
       this.incrementDecrement(data[index].id, "2")
       // this.incrementDecrement(id, "2")
    }
    if (data[index].quantity == 0) {
      //  var deletedItem = this.state.arrProduct.splice(index, 1);
        //  this.setState({arrService : deletedItem})
       // console.log("--------------------------", deletedItem)
    }
}
    _renderUpComingItem = ({ item, index }) => {
      console.log(item);
        return (
            <View style={styles.listView}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ProductDetails', { data: item })

                }} style={{ paddingHorizontal: 10, marginTop: 3, alignItems: 'center', }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%' }}>
                        <Image resizeMode={'stretch'} source={{ uri: item?.image }} style={{ height: 60, width: 60 }} />
                        <View style={{ flexDirection: 'column', flex: 1, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                <Text numberOfLines={2} style={{ fontFamily: fonts.PoppinsBold, fontSize: 14, }}>{item?.title}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 2 }}>
                                <Image resizeMode={'contain'} source={images.rupe} style={{ height: 17, width: 17 }} />
                                <Text style={{ fontSize: 18, marginTop: 5, fontFamily: fonts.PoppinsRegular }}>{item?.price}</Text>

                            </View>
                            {item.quantity == 0 ?
                                <TouchableOpacity onPress={() => { this.gotToAddServiceDetail(item.id) }} style={{ position: 'absolute', right: 2 }}>
                                    <Text style={{ paddingHorizontal: 15, borderWidth: 1, fontSize: 12, borderRadius: 16, paddingVertical: 2, }}>Add</Text>
                                </TouchableOpacity> :

                                <View style={{ position: 'absolute', right: 2, alignItems: 'center', borderRadius: 16, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.DecreQty(index, item)}>
                                        <Image source={images.minus} style={{ height: 16, width: 16 }} />
                                    </TouchableOpacity>

                                    <Text style={{ marginHorizontal: 5, fontSize: 14 }} >{item.quantity}</Text>

                                    <TouchableOpacity onPress={() => this._addQty(index, item.id)}>
                                        <Image source={images.plus} style={{ height: 16, width: 16 }} />
                                    </TouchableOpacity>
                                </View>

                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    searchproduct = (text) => {
       
        if(text != ""){
          
            var search = text.toLowerCase();
            var condition = new RegExp(search);
            
            var arrProduct = this.state.arrProduct;
            var result = arrProduct.filter(function (el) {
              return condition.test(el.title .toLowerCase());
            });
            
            if(result){
              this.setState({arrProduct:result})
            }
            else{

                console.log("in else")
                var arrProduct = this.state.allproduct;
                this.setState({arrProduct:arrProduct})
            }
        }
        else{ 
                console.log("in else")
                var arrProduct = this.state.allproduct;
                this.setState({arrProduct:arrProduct})
                
                }
       
    } 

    ListEmptyView = () => {
        return (
            <View style={{justifyContent: 'center',flex:1,margin: 10,alignItems:'center',marginTop:'70%'}}>
 
                        
                          
                            <Text style={{textAlign:'center',marginTop:5,fontWeight:'bold',fontSize:18}}>No Record Found</Text>
     
          </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                 <View style={{  marginTop: 10,backgroundColor: 'white',borderColor: '#9F9F9F',borderWidth: 1,width: '95%',height: 40,alignItems: 'center',alignSelf:'center',flexDirection: 'row',borderRadius: 25,
                        }}>
        
                        <TouchableOpacity style={{marginLeft:15}}>
                            <Image source={images.search_ic} resizeMode={'contain'} style={{  height: 18,width: 18,tintColor: 'black'}} />
                        </TouchableOpacity>

                        <TextInput
                            style={{
                                    height: 50,
                                    width: 280,
                                    paddingLeft: 10,
                                    color: 'black',
                                    fontSize: fonts.fontSize12,
                                    fontFamily: fonts.RoBoToRegular_1
                                }}
                                    placeholder="Search"
                                    keyboardType={'default'}
                                    returnKeyType="done"
                                    onChangeText={(name) => this.searchproduct(name)}
                                    placeholderTextColor={"black"}
                                    underlineColorAndroid='transparent'
                            />
                    </View>
                <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, }} key="1">

                    <View style={{ marginTop: 20, marginHorizontal: 0 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.arrProduct}
                            renderItem={this._renderUpComingItem}
                            ListEmptyComponent={this.ListEmptyView()}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>


            </SafeAreaView>
        )
    }

};


const styles = StyleSheet.create({
    safe_area_view: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listView: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 2,
        marginBottom: 10,
        borderColor: '#FCFBFB',
        backgroundColor: Colors.white,
        elevation: 3,
        marginTop: 2
    },
})