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
  StyleSheet,Alert,Dimensions
} from 'react-native';
import { Container, Content, InputGroup, Input, List,ListItem,Icon,Header,
	Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Spinner,Form} from 'native-base';

import DrawerMenu from './Template/DrawerMenu';
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
import Login from './Login';
import ProgramDetails from './Template/ProgramDetails';
import ProgramEvaluate from './Template/ProgramEvaluate';
import Synopsis from './Template/Synopsis';
import Askforhelp from './Template/Askforhelp';
import Register from './Template/Register';
import FeedBack from './Template/FeedBack';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [0],
      drawerClosed: true,
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);
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


  toggleDrawer() {
    if (this.state.drawerClosed) {
      this.DRAWER.openDrawer();
    } else {
      this.DRAWER.closeDrawer();
    }
  }

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed
    });
  }

  navigateTo(route,type) {
    this.DRAWER.closeDrawer();
	if(type=="Resources"){
	 var routeNma='Resources';
	}
	if(type=="Amigos"){
	 var routeNma='Amigos';
	}
	if(type=="Events"){
	 var routeNma='Events';
	}
	if(type=="Evaluate"){
	 var routeNma='Evaluate';
	}
	if(type=="Synopsis"){
	 var routeNma='Synopsis';
	}	
    this._navigator.push({name: route,
			passProps: {
				routName:routeNma
      			}
		});
  }

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

		await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.5,imageheight:height/3.3,modalBody:0});


		} else {

		await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.3 ,imageheight:height/8,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};
  render() {
    return(

		<Navigator
		initialRoute={{ name: 'MainMenu' }}
		renderScene={(route, navigator) => {
		const routeName = route.name;
		switch (routeName) {
		case 'Login':
                  return <Login navigator={navigator} {...route.passProps}  />;              
 		case 'MainMenu':
                  return <MainMenu navigator={navigator} {...route.passProps}  />;
		case 'Resources':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#66FF4D',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'ProgramDetails','Resources')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header>


			<Resource navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Konnect':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header  style={{backgroundColor: '#539DFC',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'MainMenu')}>
			<Icon name='md-arrow-round-back' />
			</Button>
			</Left>
			<Body style={{paddingLeft:55}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}
			></Image>
			</TouchableOpacity> 

			</Body>
                	<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
           	 </Header><Amigos navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Amigos':
			return	<ChatPage navigator={navigator} {...route.passProps}  />;
		case 'YokuPro':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header style={{backgroundColor: '#FFC46A',}} onLayout={(event) => this.handleLayoutChange(event)}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this, 'MainMenu')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity  onPress={this.navigateTo.bind(this, 'MainMenu')}> 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header>


			<YokuPro navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Document':
			return <Document navigator={navigator} {...route.passProps}  />;
		case 'Iaf-World':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#FFAA3F',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'MainMenu')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:30}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>
			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header><IAFWorld navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Events':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#64BFFF',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'ProgramDetails','Events')}>
			<Icon name='md-arrow-round-back'/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
			</Header><ListPage navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Quotes':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#F12A28',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'MainMenu')}>
			<Icon name='md-arrow-round-back' />
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
			</Header><Quotes navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'ListPage':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#64BFFF',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'ProgramDetails')}>
			<Icon name='md-arrow-round-back'/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
			</Header><ListPage navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		 case 'ChatPage':
			return <ChatPage navigator={navigator} {...route.passProps}  />;
 		case 'GroupMemebers':
			return <GroupMemebers navigator={navigator} {...route.passProps}  />;
		case 'ProgramDetails':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#64BFFF',}}>

			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'MainMenu')}>
			<Icon name='md-arrow-round-back'/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
			</Header><ProgramDetails navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'ProgramEvaluate':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header style={{backgroundColor: '#FFC46A',}} onLayout={(event) => this.handleLayoutChange(event)}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this, 'MainMenu')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity  onPress={this.navigateTo.bind(this, 'MainMenu')}> 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header><ProgramEvaluate navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Evaluate':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#86FF76',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'ProgramDetails','Evaluate')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header><ProgramEvaluate navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'Synopsis':
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#FEFF58',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'ProgramDetails','Synopsis')}>
			<Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_b.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#000000'}}/>
			</Button>
			</Right >
			</Header><Synopsis navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
		case 'AskHelp':
                  return <Askforhelp navigator={navigator} {...route.passProps}  />;
		case 'FeedBackForm':
                  return <FeedBack navigator={navigator} {...route.passProps}  />;
		case 'Register':
                  return <Register navigator={navigator} {...route.passProps}  />;

		default:
			return <DrawerLayoutAndroid
			drawerWidth={250}
			ref={(drawerElement) => { this.DRAWER = drawerElement; }}
			drawerPosition={DrawerLayoutAndroid.positions.Right}
			onDrawerOpen={this.setDrawerState}
			onDrawerClose={this.setDrawerState}
			renderNavigationView={() => <DrawerMenu navigate={this.navigateTo} />}>
			<Header onLayout={(event) => this.handleLayoutChange(event)} style={{backgroundColor: '#64BFFF',}}>
			<Left>
			<Button transparent onPress={this.navigateTo.bind(this,'MainMenu')}>
			<Icon name='md-arrow-round-back' />
			</Button>
			</Left>
			<Body style={{paddingLeft:this.state.paddingBody}}>
			<TouchableOpacity onPress={this.navigateTo.bind(this,'MainMenu')} > 
			<Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('./images/logo_w.png')}

			></Image> 
			</TouchableOpacity>

			</Body>
			<Right>
			<Button transparent onPress={this.toggleDrawer} >
			<Icon name='menu' style={{color:'#FFFFFF'}}/>
			</Button>
			</Right >
			</Header><UnderConstruction navigator={navigator} {...route.passProps}  /></DrawerLayoutAndroid>;
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
    paddingLeft: 10,
alignSelf:"center"	
  }
});

export default App;
