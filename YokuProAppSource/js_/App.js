import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  DrawerLayoutAndroid,
  Navigator,
  ToolbarAndroid,
  TouchableOpacity,
  Image,
  BackAndroid,
  StyleSheet,
Alert
} from 'react-native';

import MainMenu from './Template/MainMenu';
import UnderConstruction from './Template/UnderConstruction';
import Resource from './Template/Resource';
import Amigos from './Template/Amigos';
import YokuPro from './Template/YokuPro';
import IAFWorld from './Template/IAFWorld';
import ChatPage from './Template/ChatPage';
import ChatGroups from './Template/ChatGroups';
import Document from './Template/Document';
import Calendar from './Template/Calendar';
import ListPage from './Template/ListPage';
import GroupMemebers from './Template/GroupMemebers';
import Quotes from './Template/Quotes';
import Askforhelp from './Template/Askforhelp';
import Evaluate from './Template/Evaluate';
import Login from './Login';
import Register from './Template/Register';
import FeedBack from './Template/FeedBack';
import Summary from './Template/Summary';
import Indpage from './Template/Indpage';
import Rating from './Template/Rating';
import Ratingdetail from './Template/Ratingdetail';
import Chart from './Template/Chart';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [0],isModalVisible: true, exit:false

    }
        this.handlesBackButton = this.handlesBackButton.bind(this);
  }
  
  handlesBackButton() {
		    if (this._navigator && this._navigator.getCurrentRoutes().length > 0) {
		      try {
				Alert.alert('YokuPro', 'Do you wish to exit? ',  [ 
						{ text: 'Ok',onPress: this.exitApp }, 
						{text: 'Cancel', onPress: this.noPressed, style: 'cancel'},
						 ]);
		      } catch(e) {}
		      return true;
		    }
	  }
exitApp(){
	BackAndroid.exitApp();
}	
navigateTo(route) {

    this._navigator.push(route);
  }

  componentWillMount(){

    BackAndroid.addEventListener('hardwareBackPress', this.handlesBackButton);
	
  }


  render() {
	
    return(

 <Navigator
            initialRoute={{ name: 'Evaluate' }}
            renderScene={(route, navigator) => {
              const routeName = route.name;

              switch (routeName) {

                case 'Login':
                  return <Login navigator={navigator} {...route.passProps}  />;
 		case 'MainMenu':
                  return <MainMenu navigator={navigator} {...route.passProps}  />;
		case 'Resources':
                  return <Resource navigator={navigator} {...route.passProps}  />;
		case 'Amigos':
                  return <Amigos navigator={navigator} {...route.passProps}  />;
		case 'Konnect':
                  return <ChatGroups navigator={navigator} {...route.passProps}  />;
		case 'YokuPro':
                  return <YokuPro navigator={navigator} {...route.passProps}  />;
		case 'Document':
                  return <Document navigator={navigator} {...route.passProps}  />;
		case 'Iaf-World':
                  return <IAFWorld navigator={navigator} {...route.passProps}  />;
		case 'Events':
                  return <Calendar navigator={navigator} {...route.passProps}  />;
		case 'Summary':
                  return <Summary navigator={navigator} {...route.passProps}  />;
		case 'ListPage':
                  return <ListPage navigator={navigator} {...route.passProps}  />;
		 case 'ChatPage':
                  return <ChatPage navigator={navigator} {...route.passProps}  />;
 		case 'GroupMemebers':
                  return <GroupMemebers navigator={navigator} {...route.passProps}  />;
		case 'Quotes':
                  return <Quotes navigator={navigator} {...route.passProps}  />;
		case 'AskHelp':
                  return <Askforhelp navigator={navigator} {...route.passProps}  />;
		case 'Register':
                  return <Register navigator={navigator} {...route.passProps}  />;
		case 'Evaluate':
                  return <Evaluate navigator={navigator} {...route.passProps}  />;
		case 'FeedBackForm':
                  return <FeedBack navigator={navigator} {...route.passProps}  />;
		case 'Indpage':
                  return <Indpage navigator={navigator} {...route.passProps}  />;
		case 'Rating':
                  return <Rating navigator={navigator} {...route.passProps}  />;
		case 'Ratingdetail':
                  return <Ratingdetail navigator={navigator} {...route.passProps}  />;
		case 'Chart':
                  return <Chart navigator={navigator} {...route.passProps}  />;


		default:
                  return <UnderConstruction navigator={navigator} {...route.passProps}  />;
              }
            }}
            configureScene={(route, routeStack) =>
              Navigator.SceneConfigs.FadeAndroid
            }
            ref={(nav) => { this._navigator = nav; }}
        />



    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    height: 56,
    backgroundColor: '#2196F3',
    elevation: 4
  },
  appBarLogo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  appBarTitle: {
    fontSize: 20,
    color: '#fff',
    paddingLeft: 10
  }
});

export default App;
