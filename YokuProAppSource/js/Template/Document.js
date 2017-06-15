const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
module.exports = class Document extends Component {

onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}


state = {
    loginempid:[],
    loadmoduleid:[],
	screenType : '',
	height : Dimensions.get('window').height,
	isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false,programid:''
  };
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){
			await this.setState({screenType: 'Landscape', height : height,modalBody:0});
		
		} else {

			await this.setState({screenType: 'Portrait', height : height,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

async componentDidMount(){
var _this = this;
var empid = await AsyncStorage.getItem('empid');
var moduleid = await AsyncStorage.getItem('moduleid');
var path=_this.props.path;
var extension=_this.props.extension;
var programid=_this.props.programid;
		_this.setState({
		loginempid:empid,
		loadmoduleid:moduleid,path:path,extension:extension,
		programid:programid
		});		 
}

navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	
	  this.props.navigator.push({
	    name: route,
		passProps: {
		programid:this.state.programid
      		}	
	  })
	}

  render() {

var module= this.state.path;
var extension= this.state.extension;
var returnarray=null;
	 returnarray= <ScrollView >  
 			<WebView source={{uri: "http://54.255.203.182/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+module+"&extension="+extension}}  style={{height:this.state.height/1.2 }} />
		</ScrollView>
;
	

   return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	<Header style={{backgroundColor: '#53FF3B',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Resources')}>
                       <Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
                    </Button>
                </Left>
              <Body style={{paddingLeft:this.state.paddingBody}}>
                  <TouchableOpacity onPress={() => this.navigate('MainMenu')} > 
				<Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_b.png')}

				></Image> 
		</TouchableOpacity>

                </Body>
		 <Right>
 			
	           </Right >
            </Header>
		<View style={{height:this.state.height}} onLayout={(event) => this.handleLayoutChange(event)}>	
		{returnarray}

		
	     	</View>
 		
  
	</Container>

    );
	
  }
}
var styles = StyleSheet.create({

	


});


