const React = require('react');
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
const retryImg = require('../images/retry.png');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Toast} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,NetInfo } = ReactNative;
var { Component } = React;
const logo = require('../images/TrainingPrograms.png');
const michelin = require('../images/services-bib.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isVisible:true,types:'Circle', color: "#F4282D", size: 50,isModalVisible: false,retry:false,resultData:false

    };

  }
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

async componentDidMount(){
		var empid = await AsyncStorage.getItem('empid');
		var companyid = await AsyncStorage.getItem("companyid");
		this.quotes(empid,companyid);
}
quotes(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
		
	if(isConnected){
	var _this = this;
	var url="http://54.255.203.182/yokupro/web/manage/";
	_this.setState({isVisible:true,retry:false});
		fetch(url+'manageappajax?type=readingQuotes&empid='+empid+'&customerid='+companyid, {
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
			if(responseData!=""){
									
				_this.setState({
					eventsDetails:responseData,isVisible:false,retry:false
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
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,
imageheight:height/2.4,width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {

		var details=null;
		var _this=this;
		
 	var microAppList = _this.state.eventsDetails.map((eventsDetails, index) => {
            return (
                           <Card >
                        <CardItem style={{backgroundColor:"#E4CDEC"}}>
                            <Left>
                                <Thumbnail square style={{width:40,height:40}} source={logo} />
                                <Body>
                                    <Text style={styles.contentText} >{eventsDetails.contenttitle}</Text>
                                </Body>
                            </Left>
 								
                          </CardItem>
                         
                          <CardItem content>
                              <Text style={styles.wordaday}>Word a day : <Text style={{color:"#494340",fontSize: 15,}}>{eventsDetails.wordaday}</Text></Text>
                          </CardItem>
 			<CardItem content>
 	                             <Text style={styles.questionaday}>Question a day : <Text style={{color:"#494340",fontSize: 15,}}>{eventsDetails.questionaday}</Text> </Text>
                          </CardItem>
                          <CardItem>
                              <Left>
                                  <Button transparent>
                                      <Icon active name="thumbs-up" />
                                      <Text>12 Likes</Text>
                                  </Button>
                              </Left>
                                                     
                        </CardItem>
                   </Card>

                    
            )
	});	
if(_this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Nuggets Avaliable...!</Text>		
			</View>;			
		}		

if(_this.state.retry==true){
	
		var retry=<View style={{alignSelf:"center",paddingTop:150}}>
				<TouchableOpacity activeOpacity={.3}   onPress={()=>this.componentDidMount()} style={{alignSelf:"center"}}>
				<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.componentDidMount()}></Image>
				</TouchableOpacity>  
				<Text>Please check your Connection..!</Text>		
		</View>;			
		}
		
    return (
	<Container >
 <Header style={{backgroundColor: '#F12A28',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                       <Icon name='md-arrow-round-back' />
                    </Button>
                </Left>
              <Body style={{paddingLeft:this.state.paddingBody}}>
                  <TouchableOpacity onPress={() => this.navigate('MainMenu')} > 
				<Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_w.png')}

				></Image> 
		</TouchableOpacity>

                </Body>
		 <Right>
 			
	           </Right >
            </Header>
		 <View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>"Nuggets"</Text>
	</View>
	        <ScrollView>
        <View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>


<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
						{microAppList}

			
		{resultData}
		{retry}
       </View>
	

	       </ScrollView>
  <Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                          <CardItem>
                       <Icon active name="md-text" />
                     	<TouchableOpacity onPress={() =>this.navigate('YokuPro')}>  
                       <Text>Feed Back</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
                     </CardItem >
 			<CardItem >
                       <Icon active name="md-help" />
                     	<TouchableOpacity onPress={() =>this.navigate('YokuPro')}>  
                       <Text>Ask for Help</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
                     </CardItem>
 			<CardItem >
                      	<Icon active name="md-log-out" />
                     	<TouchableOpacity onPress={() =>this.navigate('Login')}>  
			<Text>Logout</Text>
			</TouchableOpacity>	
                       <Right>
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
contentText: {
    color: '#E21414',
    fontSize: 18,
alignSelf: 'center',

   
  },
wordaday: {
    color: '#328CFD',
    fontSize: 20,
alignSelf: 'center',

   
  },
questionaday: {
    color: '#328CFD',
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


