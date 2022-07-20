import * as React from 'react';
import Helper from './Helper';
import Constant from './Constant';
import NetworkUtils from "./NetworkUtils";
//import ActivityIndicator from './ActivityIndicator'
export default class ApiCallHelper extends React.Component {

    static async getNetworkResponce(url, SendData, apiType) {
        let isConnected = await NetworkUtils.isNetworkAvailable()
        let completeUrl = Constant.Base_Url + url
        Helper.showConsole('completeUrl---', completeUrl)
        Helper.showConsole('apiType---', apiType)
        Helper.showConsole('SendData---', SendData)

        let headersObj = {
            Accept: 'application/json',
            'Content-Type': apiType == Constant.APIImageUploadAndroid ? 'multipart/form-data' : 'application/json',
        }
        if (isConnected == true) {
            //  alert('connected')
           //  ActivityIndicator.loaderComponent(true)
            return fetch(completeUrl, {
                body: SendData,
                method: 'POST',
                headers: headersObj,
            }).then(response => response.json())
                .then(responseJson => {
                    Helper.showConsole('Api Responce ---', JSON.stringify(responseJson))
                
                    return responseJson;
                }).catch(err => {
                    console.log('response error : ', err)
                })
        } else {
            Helper.showTost(Constant.InternetError)
        }

    }

    static async getallApiResultwith_HeaderPostMethod(url, SendData, apiType) {

        let isConnected = await NetworkUtils.isNetworkAvailable()
        let completeUrl = Constant.Base_Url + url
       

        let headersObj = {
            Accept: 'application/json',
            'Content-Type': apiType == Constant.APIImageUploadAndroid ? 'multipart/form-data' : 'application/json',
           // "Authorization": "Bearer " + Helper.Security_token
        }

        Helper.showConsole('completeUrl---', completeUrl)
        Helper.showConsole('apiType---', apiType)
        Helper.showConsole('SendData---', SendData)
        Helper.showConsole('Authorization---', "Bearer " +JSON.stringify(headersObj))

        if (isConnected == true) {
            //  alert('connected')
          //  ActivityIndicator.loaderComponent(true)
            return fetch(completeUrl, {
                body: SendData,
                method: apiType == Constant.APIImageUploadAndroid ? 'PUT' : 'POST',
                headers: headersObj,
            }).then(response => response.json())
                .then(responseJson => {
                    console.log('responseJsonAPI : ', responseJson)
                    if(responseJson.status == 401){
                        Helper.logoutData()
                        setTimeout(() => {
                            alert(responseJson.message)
                        }, 500);
                       
                    }else{
                      
                    }
                    return responseJson;
                }).catch(err => {
                    console.log('response : ', err)
                })
        } else {
            Helper.showTost(Constant.InternetError)
        }
    }

    static async putApiResponse(url, SendData, apiType) {
        let isConnected = await NetworkUtils.isNetworkAvailable()
        let completeUrl = Constant.Base_Url + url
        let headersObj = {
            Accept: 'application/json',
            'Content-Type': apiType == Constant.APIImageUploadAndroid ? 'multipart/form-data' : 'application/json',
           // "Authorization": "Bearer " + Helper.Security_token
        }
        Helper.showConsole('completeUrl---', completeUrl)
        Helper.showConsole('apiType---', apiType)
        Helper.showConsole('SendData---', SendData)
       // Helper.showConsole('Authorization---', "Bearer " +JSON.stringify(headersObj))
        if (isConnected == true) {
            //  alert('connected')
          //  ActivityIndicator.loaderComponent(true)
            return fetch(completeUrl, {
                body: SendData,
                method: 'POST',
                headers: headersObj,
            }).then(response => response.json())
                .then(responseJson => {
                    console.log('responseJsonAPI : ', responseJson)
                    if(responseJson.status == 401){
                        Helper.logoutData()
                        setTimeout(() => {
                            alert(responseJson.message)
                        }, 500);
                       
                    }else{
                      
                    }
                    return responseJson;
                }).catch(err => {
                    console.log('response : ', err)
                })
        } else {
            Helper.showTost(Constant.InternetError)
        }
    }

    static async getMethodApiResponce(url, SendData, apiType) {
        let isConnected = await NetworkUtils.isNetworkAvailable()
        let completeUrl = Constant.Base_Url + url
        let headersObj = {
            Accept: 'application/json',
            'Content-Type':'application/json',
            "Authorization": "Bearer " + Helper.Security_token
        }
        Helper.showConsole('completeUrl---', completeUrl)
        Helper.showConsole('apiType---', apiType)
        Helper.showConsole('SendData---', SendData)
        Helper.showConsole('Authorization---', "Bearer " +JSON.stringify(headersObj))

        if (isConnected == true) {
            //  alert('connected')
          //  ActivityIndicator.loaderComponent(true)
            return fetch(completeUrl, {
               // body: SendData,
                method: 'GET',
                headers: headersObj,
            }).then(response => response.json())
                .then(responseJson => {
                    console.log('responseJsonAPI : ', responseJson)
                    if(responseJson.status == 401){
                        Helper.logoutData()
                        setTimeout(() => {
                            alert(responseJson.message)
                        }, 500);
                       
                    }else{
                      
                    }
                    return responseJson;
                }).catch(err => {
                    console.log('response : ', err)
                })
        } else {
            Helper.showTost(Constant.InternetError)
        }
    }
}
