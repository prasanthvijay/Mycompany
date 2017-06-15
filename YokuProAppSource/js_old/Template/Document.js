const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView } = ReactNative;
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
	isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false
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
		_this.setState({
		loginempid:empid,
		loadmoduleid:moduleid,path:path

		});		 
}

navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}

  render() {

var module= this.state.path;
var returnarray=null;
	 returnarray= <ScrollView >  
 	<WebView source={{uri: "http://54.255.203.182/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+module}}  style={{height:this.state.height/1.2 }} />
		</ScrollView>
;
	

   return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Resources')}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                </Left>
                 <Body style={{paddingLeft:this.state.paddingBody}}>
                   <Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo-2.png')}
				></Image> 

                </Body>
                <Right>
 			    
	           </Right >
            </Header>
		<View style={{height:this.state.height}} onLayout={(event) => this.handleLayoutChange(event)}>	
		{returnarray}

		
	     	</View>
 		
   <Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                         <CardItem onPress={() => this.navigate('FeedBackForm')}>
                       <Icon active name="md-text" />
                       <Text>Feed Back</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem >
 			<CardItem onPress={() => this.navigate('AskHelp')}>
                       <Icon active name="md-help" />
                       <Text>Ask for Help</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem>
 			<CardItem onPress={() =>this.navigate('Login')}>
                       <Icon active name="md-log-out" />
                       <Text>Logout</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem>
                    </Card>
		</View>
        </Modal>
        <ActionButton buttonColor="rgba(231,76,60,1)"  onPress={()=>this.showModal()}>
       
        </ActionButton>
	</Container>

    );
	
  }
}
var styles = StyleSheet.create({

	


});


