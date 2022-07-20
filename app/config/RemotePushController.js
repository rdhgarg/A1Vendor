import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
import Helper from '../config/Helper'
//import Constant from './app/config/Constant'


const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token.token)
       // alert(token.token)
        Helper.setData('device_key', token.token)
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)

        
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '428245657505',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])

  return null
}

export default RemotePushController