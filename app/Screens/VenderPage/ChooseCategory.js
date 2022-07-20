import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import Colors from '../../Assets/Colors';
import { images } from '../../Assets/imagesUrl';
import fonts from '../../Assets/fonts';
import AppHeader from '../../Comman/AppHeader';
import Constant from '../../config/Constant';
import ApiCallHelper from '../../config/ApiCallHelper';
import Helper from '../../config/Helper';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSubcategory:[],
            index: 0,
            arrProduct: [],
            allproduct:[],
            arrSelectedProduct: [],
            user_id:null,
            cat:[],
            cat_id:0,
        }
        AppHeader({
            ...this.props.navigation, leftTitle: 'Category List', borderBottomRadius: 0,
            bellIcon: false,
            settingsIcon: false,
            headerBg: false,
            hideLeftBackIcon: false,

        })
    }



    componentDidMount() {
        var data = this.props.route.params?.data.user_id
      
        this.setState({user_id:data});
        this.getProductList(data);
        this.getCategory();
    }

    getCategory() {
        let data = {
            vendor_id: Helper.userData.id
        }
        // let data = {
        //     lat: Helper.Current_latitude,
        //     long: Helper.Current_longitude
        // }
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce("category", JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
           console.log("uuuuuuuuu--------------------",response.data);
         
            if (response.status == true) {
                
                this.setState({cat:response.data,})
                this.getSubcategory(response.data[0].value)
               
            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }

    getSubcategory(id) {
        var data = {}
        data.category_id =id
       
       
       
        Helper.globalLoader.showLoader();
        ApiCallHelper.getNetworkResponce("sub-category", JSON.stringify(data), Constant.APIPost).then((response) => {
            Helper.globalLoader.hideLoader();
            console.log("subbbbbbbbbbb",response)

            if (response.status == true) {
                this.setState({ arrSubcategory: response.data,cat_id:id })

            } else { }
        }).catch(err => {
            Helper.globalLoader.hideLoader()
        })
    }



    getProductList(id) {
       
        var formdata = new FormData();
        formdata.append('user_id', id);
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
          
          if (responseJson.status == true) {

                     this.setState({ arrProduct: responseJson.data,allproduct:responseJson.data })
                     Helper.globalLoader.hideLoader();
                 } else { }
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
                        this.getProductList(this.state.user_id)
                      
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


    render() {
        return (
            <SafeAreaView style={styles.safe_area_view}>
                  <View style={{marginTop:15,marginLeft:10}}>
                     <FlatList
                            horizontal={true}
                            style={{}}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.cat}
                            renderItem={({ item, index }) => (
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between', marginTop:13,marginBottom:26,marginLeft:10}}>
                            <TouchableOpacity
                                onPress={() => {
                                        
                                    this.getSubcategory(item["value"])         
                                    }}
                                    style={{
                                        width: hp("7.1%"),
                                        height: hp("7.5%"),
                                        marginRight: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    <View
                                        style={{
                                            borderRadius: 100,
                                            backgroundColor:'#f3f3ff',
                                            borderColor:this.state.cat_id == item.value ? "#000000" : "",
                                            borderWidth:this.state.cat_id == item.value ? 1 : 0,
                                            elevation:2,
                                            width: "100%",
                                            height: hp("7.1%"),
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                        <Image
                                            style={{width: hp("6.5%"), height: hp("6.5%"),  shadowColor: "#707070",
                                            shadowOffset: {
                                                width: 1,
                                                height: 5,
                                            },
                                            shadowOpacity: 0.6,
                                            borderRadius: 100,
                                            shadowRadius: 4,
                                            elevation: 5,}}
                                            source={{uri:item["image"]}}

                                            resizeMode={"contain"}/> 
                                        </View>
                                    <Text
                                        numberOfLines={2}
                                        style={{
                                            marginTop: 4,
                                            fontSize: hp("1.3%"),
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            height:hp("3.1%"),
                                            textAlign: "center",
                                            color: "#707070"
                                        }}>
                                        {item["label"]}
                                    </Text>
                            </TouchableOpacity>   
                        </View>   
                    )}
                />
            </View>
            <View>
                        <FlatList
                            numColumns={3}
                        
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.arrSubcategory}
                            style={{marginHorizontal:wp("4%")}}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate("ProductList",{data:{user_id:this.state.user_id,subcat_id:item["value"]}})}
                                    style={{marginHorizontal:7,marginBottom:20,   shadowColor: "#707070",
                                        shadowOffset: {
                                            width: 1,
                                            height: 5,
                                        },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 4,
                                    elevation: 5,backgroundColor:'#fff',width:wp('27%')}}> 
                                        <View style={{backgroundColor:"#f3f3ff",justifyContent:'center',alignItems:'center'}}>
                                                <Image
                                                        style={{
                                                            height:100,
                                                            width: 100,
                                                        }}
                                                            resizeMode={"contain"}
                                                            source={{uri:item["image"]}}
                                                        />
                                        </View>
                                            <View style={{backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
                                                <Text style={{
                                                        marginVertical: 10,
                                                        fontSize: hp("1.6%"),
                                                        fontWeight: "bold",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "center",
                                                        color:"#707070"
                                                }}>{item["label"]}</Text>
                                            </View>   
                                        </TouchableOpacity>
                                    )}
                            />
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