const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
const retryImg = require('../images/retry.png');
import { Container, Content, Card,CardItem,InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Thumbnail,Toast} from 'native-base';
var {  StyleSheet, NetInfo,Text, View,ScrollView, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
module.exports = class Amigos extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',
	width:'',amigosDetails:[],isVisible:true,types:'Circle', color: "#539DFC", size: 50,isModalVisible: false,retry:false,resultData:false
    };

  }
async componentDidMount(){
	var companyid = await AsyncStorage.getItem("companyid");
		this.amigosload(companyid);
}
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

 amigosload(companyid){
	NetInfo.isConnected.fetch().then(isConnected => {

	if(isConnected){
	var _this = this;
	_this.setState({isVisible:true,retry:false});
	var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=amigosDetails&customerid='+companyid, {
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
					amigosDetails:responseData,isVisible:false,retry:false
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

			await this.setState({screenType: 'Landscape', height : height,width : width,modalBody:0});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2,imageheight:height/4.5});
		}

	};

  render() {

		var details=null;
		var _this=this;

 	var microAppList = _this.state.amigosDetails.map((amigosDetails, index) => {
            return (
       			<ListItem >
                        <Text>{amigosDetails.amigosname} - {amigosDetails.amigoscontactno}</Text>
                    	</ListItem>
  
           		)
		});
		
		if(_this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",paddingTop:150}}>
					<TouchableOpacity activeOpacity={.3}   onPress={()=>this.componentDidMount()} style={{alignSelf:"center"}}>
					<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.componentDidMount()}></Image>
					</TouchableOpacity>  
					<Text>Please check your Connection..!</Text>		
			</View>;			
		}
		if(_this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Amigos Avaliable..!</Text>		
			</View>;			
		}		
		
    return (
	<Container >
	 <Header style={{backgroundColor: '#539DFC',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
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
        
<View style={styles.headerTitleView}>
	<Text style={styles.titleViewText}>Amigos Details</Text>
	</View>

		 <Content onLayout={(event) => this.handleLayoutChange(event)}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			{microAppList}
			{resultData}
		{retry}
                </Content>

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
 
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
  },
  welcome: {
    fontSize: 20,
	paddingLeft: 30,
    textAlign: 'left',
    margin: 10,
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
    fontSize: 25,
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
 headerIcon: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#30dbdb'
  },
 headerIconnew: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'red',
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


