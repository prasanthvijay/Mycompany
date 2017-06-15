const React = require('react');
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row,Toast} from 'native-base';
import Modal from 'react-native-modal';
var { NetInfo, StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
const logo = require('../images/thumbs-up-michelin.jpg');
import ActionButton from 'react-native-action-button';
const michelin = require('../images/services-bib.png');
const retryImg = require('../images/retry.png');
module.exports = class ProgramDetails extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',programDetails:[],
	isVisible:true,types:'Circle', color: "#7EFF71", size: 50,isModalVisible: false,retry:false,resultData:false,routeName:''
    };

  }
async componentDidMount(){

	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	this.resourseload(empid,companyid);
	this.setState({routeName:this.props.routName });
}

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

resourseload(empid,companyid){
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

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 ,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};
onPress(route,programid){
	 this.props.navigator.push({
	    name: route, 
		passProps: {
          	programid: programid,
      		}
	  });
		
}

  render() {
		var details=null;
		var _this=this;
		
 	var microAppList = _this.state.programDetails.map((programDetails, index) => {

            return (


                            <ListItem thumbnail key={index}>
		                <Left>
		                    <Thumbnail square style={{width:25,height:25}} source={require('./../images/TrainingPrograms.png')} />
		                </Left>
		                <Body>
		                    <Text style={{color:'#000000',fontSize:15}}>{programDetails.programname}  <Text style={{color:'red',fontSize:13}}> > {programDetails.batchname}</Text>
					</Text>
		                    
		                    <Text note>{programDetails.programdate}</Text>
		                </Body>
		                <Right>
		                    <Button transparent onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) }>
		                        <Text style={{color:"#6BCAE2"}}>Details</Text>
		                    </Button>
		                </Right>
		            </ListItem>

                    
            )
	});

	if(this.state.resultData==true){
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Programs Avaliable..!</Text>		
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
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#64BFFF',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                       <Icon name='md-arrow-round-back'/>
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

		<Content>
		 <View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>Training Programs</Text>
	</View>
<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>

			

		{microAppList}
{resultData}
		{retry}
		</Content>

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
    backgroundColor: '#FFFFFF',
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
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },	
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
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


