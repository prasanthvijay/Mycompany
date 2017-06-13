const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,Linking} = ReactNative;
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
	isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false,programid:'',ClearArray:false,retry:false
  };

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
	var url =  await AsyncStorage.getItem("url");
	var empid = await AsyncStorage.getItem('empid');
	var moduleid = await AsyncStorage.getItem('moduleid');
	var path=_this.props.path;
	var filename=_this.props.filename;
	var filetype=_this.props.filetype;
	var sessionname=_this.props.sessionname;
	var extension=_this.props.extension;
	var programid=_this.props.programid;
	_this.setState({
	loginempid:empid,
	loadmoduleid:moduleid,path:path,extension:extension,
	programid:programid,filename:filename,filetype:filetype,url:url,sessionname:sessionname
	});
			 
}

navigate(route){

if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	if(this.state.extension=="mp4" || this.state.extension=="mp3"){
		this.setState({ClearArray:true});
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
	var filename= this.state.filename;
	var extension= this.state.extension;
	var filetype= this.state.filetype;
	var returnarray=null;
	var openarray=null;

	if(module==undefined ){
		var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Documents available</Text>		
			</View>;
	}	
	if(filetype=='url'){
		openarray= <ScrollView>  
					<WebView
					ref={(ref) => { this.webview = ref; }}
					source={{ uri:filename }}
					onNavigationStateChange={(event) => {
					if (event.url !== filename) {
					this.webview.stopLoading();
					Linking.openURL(event.url);
					}
					}}
					/>
				</ScrollView>;
	}
	else if(filetype=='story'){
		var storyPath="http://yokupro.com/uploadfiles/"+module;
		openarray= <ScrollView>  
					<WebView
					ref={(ref) => { this.webview = ref; }}
					source={{ uri:storyPath }}
					onNavigationStateChange={(event) => {
					if (event.url !== filename) {
					this.webview.stopLoading();
					Linking.openURL(event.url);
					}
					}}
					/>
				</ScrollView>;
	}	
	else if(extension=='pdf' || extension=='odt' || extension=='odp' || extension=='ods' ||extension=='mp4' || extension=='mp3' ||extension=='jpg' || extension=='png' || extension=='gif'){

		returnarray= <ScrollView>  
 			<WebView source={{uri: "http://34.225.214.153/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+module+"&extension="+extension+"&filename="+filename+"&sessionname="+this.state.sessionname}}  style={{height:this.state.height/1.2 }} />
		</ScrollView>;
	
	}
	
	if(this.state.ClearArray==true){
		returnarray=<ScrollView>
				</ScrollView>;
	}			
	if(this.state.retry==true){
	
			var retry=
<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;			
		}

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
		<View style={{height:this.state.height}}>	
		{returnarray}
		{openarray}
		{resultData}
		{retry}
	     	</View>  
	</Container>

    );
	
  }
}
var styles = StyleSheet.create({

	


});


