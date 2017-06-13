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
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isModalVisible: false,sucessMsg:false, successmsg:[],loading:true,query:'',programDetails:[],retry:false,programId:'',url:'',responce:false,description:'',feeErrMsg:false,feedloading:true

    };

  }

async componentDidMount(){

	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var url =  await AsyncStorage.getItem("url");
	this.programDetails(empid,companyid);
	this.setState({routeName:this.props.routName,url:url,empid:empid,companyid:companyid });
}

programDetails(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
		var url =_this.state.url;
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



async onPressaskforhelp(){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
		var _this=this;
		_this.setState({loading:false});
		var url =_this.state.url;
		var empid = _this.state.empid;
		var companyid = _this.state.companyid;
		var query=_this.state.query;	
		var customerid='';
		if(query==""){	
			_this.setState({loading:true,errMsg:true});
		}
		else{	
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
						loading:true,query:"",responce:true
					});
				}
				
				
		
			})
			.catch((error) => {
				this.setState({retry:true,loading:true});
			})
			.done();
		}
		}else{
			this.setState({retry:true,loading:true});
		}
	})
					

	}

async sendDetails(){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
	_this.setState({feedloading:false});
	var empid = _this.state.empid;
	var companyid = _this.state.companyid;
	var programId = _this.state.programId;
	var description = _this.state.description;
	var url =_this.state.url;
	
		if(programId==0){
			this.setState({feeprogErrMsg:true,feedloading:true});
			return false;
		}
		else{
				_this.setState({feeprogErrMsg:false,});
				
		}
		if(description==''){
				_this.setState({feeErrMsg:true,feedloading:true});
					return false;
			}
		else{
			fetch(url+'manageappajax?type=programFeedBack&companyid='+companyid+'&empid='+empid+'&programId='+programId+'&description='+description, {
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
						feeErrMsg:false,sucessMsg:true,description:'',feedloading:true
					});

				}else{

				}
			
					
		
			})
			.catch((error) => {
				this.setState({retry:true,feedloading:true});
			})
			.done();
			}
			
		}else{
			this.setState({retry:true,feedloading:true});
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

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.3 ,imageheight:height/8,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {

		
			var details=null;
			var _this=this;
		
		 	var microAppList = _this.state.programDetails.map((programDetails, index) => {
				var lable=programDetails.programname+" ("+programDetails.programdate+")";
			    return (

					 <Picker.Item label={lable} value={programDetails.scheduleid} /> 
				   
			    )
			});
			if(this.state.feedloading==false){
				feedbackContent= <Spinner color='#5BB9FF' />;	
			}
			if(this.state.feedloading==true){
				feedbackContent=<CardItem header>                             
				<Body>
				<Button  rounded info onPress={() => this.sendDetails()} style={{alignSelf:'flex-end' }}>
				<Text style={{color:'white'}}>Submit</Text>
				</Button>
				</Body>
				</CardItem>;	
			}
	
			if(this.state.sucessMsg==true)
					{	
					var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'#63c655', fontSize: 15,}}>Feedback submitted</Text></View>; 	
					}
			if(this.state.feeErrMsg==true){
					var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Please enter a Program Feedback.</Text></View>; 	
	
			}
			if(this.state.feeprogErrMsg==true){
					var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Please select a Program.</Text></View>; 	
	
			}
			var content=null;
			var submitQuery=null;



			if(this.state.loading==false){
				content= <Spinner color='#5BB9FF' />;	
			}
			if(this.state.loading==true){
			content=<CardItem header>                             
				<Body>
				<Button rounded info onPress={() => this.onPressaskforhelp()} style={{alignSelf:'flex-end' }}>
                                      <Text style={{color:'white'}}>Submit</Text>
                    		</Button>
				</Body>
				</CardItem>;	
			}
			if(this.state.responce==true){
				submitQuery=<View>
				<Text style={{color: '#63c655',alignSelf: 'center',fontSize: 15,}}>Query submitted.</Text>			
				</View>;
			}
			if(this.state.errMsg==true){
				submitQuery=<View>
				<Text style={{color: 'red',alignSelf: 'center',fontSize: 15,}}>Field cannot be blank</Text>			
				</View>;
			}
		
		if(this.state.retry==true){
	
			var retry=
	<View style={{alignSelf:"center",flex:1,paddingTop:10}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;			
		}

    return (
	<Container>	
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
	{sucMsg}
			<Picker selectedValue={this.state.programId} onValueChange={(programId) => this.setState({programId: programId})}>
		{microAppList}
		</Picker>

		<TextInput
			style={{borderTopColor:"red"}}
			multiline={true}
			numberOfLines={4}
			onChangeText={(description) => this.setState({description})}
			placeholder="Type your feedback..." 
			value={this.state.description}	
			/>

	
			{feedbackContent}

	</Card>
	{retry}
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

			<TextInput
			style={{borderTopColor:"red"}}
			multiline={true}
			numberOfLines={4}
			onChangeText={(query) => this.setState({query})}
			placeholder="Type your query here..." 
			value={this.state.query}	
			/>

			{content}
	</Card>
	{retry}
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
                                  <Text>YokuPro, where learning is just a touch away!</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Body>
                                <Image style={{ width:this.state.imagewidth,height:this.state.imageheight,alignSelf:"center" }} source={require('./../images/logo_b.png')} />

 <Text style={{alignSelf: 'center'}} >{"\n"}Welcome to the world of YokuPro! </Text>
                               <Text style={{textAlign: "justify"}}> {"\n"}YokuPro is a feature-rich, first of it’s kind Learning and Development (L&D) mobile application. The mobile app is integrated with an intuitive web-based admin console that is designed to manage and deliver structured content in a blended format.{"\n"}</Text>
 <Text style={{fontWeight: 'bold'}}> The YokuPro platform features the following:  {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Distribution of Learning Content over a range of devices {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Student / Trainee Management in groups, just as you’d do in a classroom {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Content Management that makes it faster for the Trainer to access and push content to learner groups {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Competency Management through an in-built assessment engine {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Organise and Manage Learning Events through a global calendar{"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Facilitates User Interactions through Real-time Chat {"\n"}</Text>
 <Text>        <Image
                style={{width:30,height:35 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image> Collages Feedback – both on training programs attended and other areas where you want to solicit feedback or learner inputs {"\n"}</Text>
 <Text>
We wish you the best as you use YokuPro! As the tool is designed for both efficiency and effectiveness in L&D, do let us know what more you’d need from YokuPro to take your L&D initiatives to the next level. </Text>
                                
                            </Body>
                        </CardItem>
			 <CardItem>
                            <Body>
                               
 <Text style={{fontWeight: 'bold'}}>About the design of our interface {"\n"}</Text>
                                <Text style={{textAlign: 'justify'}}>          The ‘Magic Cube’ has fascinated people of all ages for several decades now and still remains to most bought puzzle in the world! If you’ve never ‘fixed’ a cube (logically!), it is mind boggling trying to get it right. However, those who have learnt to ‘fix’ the Magic Cube know that there is a science and an algorithm to it. YokuPro is that algorithm to meet the learning needs of the present day context – away yet connected. Our philosophy and approach to L&D is reflected in the timeless Magic Cube. As you use this, may you unravel faster and better ways of solving your ‘Learning Cube’!

</Text>                               
                            </Body>

                        </CardItem>
			 <CardItem>
                            <Body>
                                <Text style={{fontWeight:'bold'}}>Konnect{"\n"}</Text>
                               <Text style={{textAlign: "justify"}}>           Konnect is the directory of your learning community. It is sorted alphabetically, like a phone book, so that with just a few touches you can get to the person whom you’d like to be in contact with. This is a very useful feature for both trainers and organizations.

</Text>                               
                            </Body>
                        </CardItem>
 			<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Resources {"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>           Find all content related to the trainings you’ve attended or have been assigned to. Just select the Training Program and you will have access to all content you’d need to revisit and strengthen what you learnt in the Training Program


</Text>                               
                            </Body>
                        </CardItem>
<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Evaluate {"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>          Use this link to collect feedback on training programs. This is a fundamental and most popular use of this tool. Advanced users can configure this tool to conduct competency assessments before and after a training program.


</Text>                               
                            </Body>
                        </CardItem>
<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Events{"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>           Your global learning calendar goes here. Learners can see what programs are on offer and then choose to nominate themselves for various events. When linked to your company’s Learning Management System, a learner can directly apply from YokuPro, and all your data is captured in your company’s own Learning Management System. If you don’t yet have one, YokuPro fills up that space, so you won’t need one!


</Text>                               
                            </Body>
                        </CardItem>
<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Amigos{"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>           One of the powerful ways to learn is to team up with someone with similar learning needs or with someone who knows and wants to share his / her expertise with you. Amigos is that link that puts you in contact with your learning buddy. All buddy assignments appear in this link and are usually related to the training programs that you have attended. Again, the buddy teams are listed under the programs you’ve attended. Just touch the program name and you are in touch with your Amigo!


</Text>                               
                            </Body>
                        </CardItem>
<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Synopsis{"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>           If you are looking for a quick summary of what you learnt in a training program, this is the link to touch. You will find content that can help revisit the learning, in less than 10 minutes. So if you want to brush up, real quick, this is the place


</Text>                               
                            </Body>
                        </CardItem>

<CardItem>
                            <Body>
 <Text style={{fontWeight:'bold'}}>Nuggets {"\n"}</Text>
                                                             <Text style={{   textAlign: "justify"}}>           This is the ‘Today’s Special’ of the L&D world. Here you will find useful messages related to the current learning focus of your organization. Spend 5 minutes a day here, and you’d assimilate a significant portion of knowledge as you use this each day. Fresh Nuggets, every single day!


</Text>                               
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


