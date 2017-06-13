const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail} from 'native-base';
var Spinner = require('react-native-spinkit');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage,NetInfo, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isVisible:true,types:'Circle', color: "#6BCAE2", size: 50,isModalVisible: false,resultData:false,retry:false

    };

  }
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async componentDidMount(){
	var _this = this;
	var url =  await AsyncStorage.getItem("url");
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var programid=this.props.programid;
	this.setState({programid:programid,url:url});
	_this.EventFunction(empid,companyid,programid);
}
EventFunction(empid,companyid,programid){
NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
		var _this = this;
		var url =_this.state.url;

		fetch(url+'manageappajax?type=ModuleDetails&empid='+empid+'&customerid='+companyid+'&programid='+programid, {
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
					eventsDetails:responseData,isVisible:false
				});

			}
			else{
			_this.setState({
						isVisible:false,resultData:true
					});
			}
					
			
		})
		 .catch((error) => {
			this.setState({retry:true,isVisible:false,});
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
	  var routeNma='Events';
	this.props.navigator.push({
	    name: route, 
		passProps: {
		routName:routeNma
      		}
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,imageheightnew:height/1.4 ,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,imageheightnew:height/3,headerimagewidth:width/3 ,
			headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {
		var details=null;
		var _this=this;

		if(_this.state.eventsDetails!=null){
			for (var i = 0; i <_this.state.eventsDetails.length; i++) {
				
				details=
				 <Card >
                        <CardItem>
                            <Left>
                                <Thumbnail square size={80}  source={require('./../images/TrainingPrograms.png')} />
                                <Body>
                                    <Text>{_this.state.eventsDetails[i].batchname}</Text>
                                    <Text note>{_this.state.eventsDetails[i].programname}</Text>
                                </Body>
                            </Left>
 								
                          </CardItem>
                         
                          <CardItem content>
                              <Text>{_this.state.eventsDetails[i].description}</Text>
                          </CardItem>
                          <CardItem>
                              <Left>
                                  <Button transparent>
                       			<Icon  name="ios-pin" />
                                      <Text style={styles.welcome}> In {_this.state.eventsDetails[i].location}</Text>
                                  </Button>
                              </Left>
                              <Right>
                                <Text style={{fontSize:17}}>{_this.state.eventsDetails[i].programdate}</Text>
                            </Right>
                        </CardItem>
                   </Card>;
			}
		}
		else{
			details="";
			}

	if(this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Events available</Text>		
			</View>;			
		}

if(_this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;			
		}
		
    return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	  	 
	<View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>Program Details</Text>
	</View>

	        <ScrollView>
					{resultData}
						{details}
		{retry}
	<View style={{alignSelf:"center"}}>
	<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
                 
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
    fontSize: 18,
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


