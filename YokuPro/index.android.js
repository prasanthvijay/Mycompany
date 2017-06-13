/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from './js/App';
var React = require('react'); // RN 0.25+
var {
  AppRegistry,Text,
  View,AsyncStorage,
  DeviceEventEmitter,StyleSheet
} = require('react-native');

var GCM = require('react-native-gcm-push-notification');

var notification = GCM.popInitialNotification();
if (notification) {
  var info = JSON.parse(notification.info);
  Notification.create({
    subject: info.subject,
    message: info.message,
  });
  GcmAndroid.stopService();
} else {

  var YokuPro = React.createClass({
    componentDidMount: function() {
	AsyncStorage.setItem("url", "http://yokupro.com/manage/");
      GCM.addEventListener('register', function(data){
        if(!data.error){

		AsyncStorage.setItem("gcmId", data.registrationToken+"");
        }

	
      });
      GCM.addEventListener('notification', function(notification){
        console.log('receive gcm notification', notification);
        var info = JSON.parse(notification.data.info);
        if (!GcmAndroid.isInForeground) {
          Notification.create({
            subject: info.subject,
            message: info.message,
          });
        }
      });

      GCM.requestPermissions();
    },
    render: function() {
      return (
     	<App />
      );
    }
  });

  AppRegistry.registerComponent('YokuPro', () => YokuPro);
}
