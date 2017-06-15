const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row} from 'native-base';
var {  NetInfo,StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
module.exports = class Document extends Component {

onNavigationStateChange(navState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}


state = {
	screenType : '',
	height : Dimensions.get('window').height,isVisible:false,types:'Circle', color: "black", size: 50,isModalVisible: false,programid:'',extension:'',path:'',resultData:false,retry:false,
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
	var companyid = await AsyncStorage.getItem("companyid");
	var programid=this.props.programid;
	this.setState({programid:programid});
	this.synopsisload(companyid,programid);

}
synopsisload(companyid,programid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
	var url="http://54.255.203.182/yokupro/web/manage/";
		_this.setState({isVisible:true,retry:false});

		fetch(url+'manageappajax?type=SynopsisDetails&customerid='+companyid+'&programid='+programid, {
		method: 'POST',
		headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json'
		}
		})

		.then((response) => response.json())
		.then((responseData) => {
		    console.log(
			"POST Response",
			"Response Body -> " + JSON.stringify(responseData)
		    )
			if(responseData!=null){
									
				_this.setState({
					isVisible:false,retry:false,path:responseData[0].filepath,extension:responseData[0].extension
				});

			}
			else{
			_this.setState({
					isVisible:false,resultData:true
				});

			}
					
		
		})
		.done();
		}else{
							this.setState({retry:true,isVisible:false,});
		}
		})
}
navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	
	  var routeNma='Summary';
	this.props.navigator.push({
	    name: route, 
		passProps: {
		routName:routeNma
      		}
	  })
	}

  render() {

var path= this.state.path;
var extension= this.state.extension;
var returnarray=null;
if(path!=""){
	 returnarray= <ScrollView >  
 			<WebView source={{uri: "http://54.255.203.182/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+path+"&extension="+extension}}  style={{height:this.state.height/1.2 }} />
		</ScrollView>;
}
if(this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Synopsis Avaliable..!</Text>		
			</View>;			
		}	
if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",paddingTop:150}}>
					<TouchableOpacity activeOpacity={.3}   onPress={()=>this.componentDidMount()} style={{alignSelf:"center"}}>
					<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.componentDidMount()}></Image>
					</TouchableOpacity>  
					<Text>Please check your Connection..!</Text>		
			</View>;			
		}
   return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#FEFF58',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('ProgramDetails')}>
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

<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Synopsis</Text>
		</View>
			<ScrollView>
		{returnarray}
		{resultData}
<View style={{alignSelf:"center",}}>
<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
</View> 		
  		</ScrollView>
	</Container>

    );
	
  }
}
var styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  welcome: {
    fontSize: 15,
    color: '#4c1cea',
  },
  welcomeNew: {
	paddingLeft: 30,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
 hasEventCircle: {
      backgroundColor: '#30dbdb',
		
    },
titleViewText: {
    color: '#3b5998',
    fontSize: 20,
alignSelf: 'center',

   
  },
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },

 titleContainer: {
    flex: 1,
    alignItems: "center"
  },
  Text: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  titleValue: {
    flex: 1,
    color: "white"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
	borderColor: "white"	
  }

});


