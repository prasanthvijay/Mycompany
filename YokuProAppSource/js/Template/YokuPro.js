const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Container, Content, InputGroup, Input, List,ListItem,Icon,Header,
	Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Spinner,Form} from 'native-base';
var {  StyleSheet, NetInfo,Text, View,ScrollView,WEBVIEW_REF, Navigator,Picker ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,TextInput } = ReactNative;
const retryImg = require('../images/retry.png');
var { Component } = React;
import FacebookTabBar from './FacebookTabBar';
const logo = require('../images/thumbs-up-michelin.jpg');
const michelin = require('../images/services-bib.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isModalVisible: false,sucessMsg:false, successmsg:[],loading:true,query:'',programDetails:[],retry:false,programId:''

    };

  }

async componentDidMount(){

	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	this.programDetails(empid,companyid);
	this.setState({routeName:this.props.routName });
}

programDetails(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

	var _this = this;
	var url="http://54.255.203.182/yokupro/web/manage/";
_this.setState({isVisible:true,retry:false});
		fetch(url+'manageappajax?type=ProgramDetails&empid='+empid+'&companyid='+companyid, {
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
			//alert( JSON.stringify(responseData));

			if(responseData!=""){
				
				_this.setState({
					programDetails:responseData,isVisible:false,retry:false
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
async onPress(){
		
		var _this=this;
		_this.setState({loading:false});
		
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var customerid = await AsyncStorage.getItem("customerid");
		var query=_this.state.query;	

			var url="http://54.255.203.182/yokupro/web/manage/";
			fetch(url+'manageappajax?type=askforhelp&empid='+empid+'&customerid='+customerid+'&companyid='+companyid+'&message='+query+'&passtype=query', {
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
						loading:true,query:"",sucessmessage:true
					});
				}
				
				
		
			})
			.done();
		
	}

async sendDetails(){

	var _this = this;
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var programId = _this.state.programId;
	var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=programFeedBack&companyid='+companyid+'&empid='+empid+'&programId='+programId, {
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
					sucessMsg:true,
				});

			}else{

			}
			
					
		
		})
		 .catch((error) => {
		console.error(error);
		})
		.done();
	
}
	
navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	

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

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.5,imageheight:height/3.3,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/6.6,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {

		
	var details=null;
	var _this=this;
		
 	var microAppList = _this.state.programDetails.map((programDetails, index) => {

            return (
	                 <Picker.Item label={programDetails.programname} value={programDetails.scheduleid} /> 
                   
            )
	});


	
	if(this.state.sucessMsg==true)
			{	
			var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'#6Bddd2', fontSize: 15,}}>Request Submitted Sucessfully...!</Text></View>; 	
			}
	
var content=null;
			var submitQuery=null;
			if(this.state.loading!=true){
				content= <Spinner color='blue' />;	
			}
			else{
			
			content=<CardItem header>                             
				<Body>
				<Button rounded info onPress={() => this.onPress()} style={{alignSelf:'flex-end' }}>
                                      <Text style={{color:'white'}}>Submit</Text>
                    		</Button>
				</Body>
				</CardItem>;	
			}

			if(this.state.sucessmessage==true){
				submitQuery=<View>
				<Text style={{color: 'red',alignSelf: 'center',fontSize: 20,}}>Query Submitted...!</Text>			
				</View>;
			}
		
		if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",}}>
					<TouchableOpacity activeOpacity={.3}   onPress={()=>this.componentDidMount()} style={{alignSelf:"center"}}>
					<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.componentDidMount()}></Image>
					</TouchableOpacity>  
					<Text>Please check your Connection..!</Text>		
			</View>;			
		}

    return (
	<Container >
	 <Header style={{backgroundColor: '#FFC46A',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
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

	
      <Content onLayout={(event) => this.handleLayoutChange(event)}>

	<ScrollableTabView  style={{marginTop: 20, }} initialPage={2} renderTabBar={() => <FacebookTabBar />}>
	<View tabLabel="Feedback">
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>

	<ScrollView>
			<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Program Feedback</Text>
			</View>
	<Card>
		<Picker selectedValue={this.state.programId} onValueChange={(programId) => this.setState({programId: programId})}>
		{microAppList}
		</Picker>	

	<CardItem>
	<Body>
	{sucMsg}
	<InputGroup regular>
	<Input placeholder="Type your feedback..." onChangeText={(description) => this.setState({description})}/>
	</InputGroup>
	
	</Body>
	</CardItem>
	<CardItem header>                             
	<Body>

	<Button  rounded info onPress={() => this.sendDetails()} style={{alignSelf:'flex-end' }}>
	<Text style={{color:'white'}}>Submit</Text>
	</Button>
	</Body>
	</CardItem>
	{retry}
	</Card>

	</ScrollView>		
	</View>
	</View>
	</View>
	</View>
	<View tabLabel="Ask for Help">
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>
	<ScrollView>
			<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Ask For Help</Text>
			</View>
			{submitQuery}
	<Card>
			<Form style={{marginBottom:20}}>   
			<TextInput
			style={{borderTopColor:"red"}}
			multiline={true}
			numberOfLines={4}
			onChangeText={(query) => this.setState({query})}
			placeholder="Type here..." 
			value={this.state.query}	
			/>

			</Form>
			{content}
	</Card>
	</ScrollView>		
	</View>
	</View>
	</View>
	</View>

	<View tabLabel="About us">
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>

	<ScrollView>
   	<Card>
                       <CardItem bordered>
                            <Left>
                                <Thumbnail />
                                <Body>
                                  <Text>Welcome to the world of YokuPro!</Text>
                                  <Text note>April 11, 2017</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Image style={{ width:this.state.imagewidth,height:this.state.imageheight,alignSelf:"center" }} source={require('./../images/logo_b.png')} />
                               <Text style={{   textAlign: "justify"}}>           YokuPro is a full feature learning and development (L&D) mobile application integrated with a intuitive management console to deliver structured content across any organisation.</Text>
 <Text>
The YokuPro platform consists of : </Text>
 <Text>        - Training Content Distribution over a range of devices </Text>
 <Text>        - Student Management</Text>
 <Text>        - Content Management</Text>
 <Text>        - Competency Management</Text>
 <Text>        - Organise and Manage Training Events</Text>
 <Text>        - Map stakeholders and entities</Text>
 <Text>        - User Interactions through Real-time Chat</Text>
 <Text>        - Training Feedback</Text>
 <Text>
Enjoy your usage of YokuPro and let us know how we could improve it further.</Text>
                                <Button transparent textStyle={{color: '#87838B'}}>
                                    <Icon name="thumbs-up" />
                                    <Text>1,926 stars</Text>
                                </Button>
                            </Body>
                        </CardItem>
                   </Card>
	</ScrollView>		
	</View>
	</View>
	</View>
	</View>
		</ScrollableTabView>


                 
                </Content>	


	</Container>

    );
  }
}
var styles = StyleSheet.create({
 
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
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


