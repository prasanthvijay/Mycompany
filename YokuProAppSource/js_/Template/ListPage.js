const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail} from 'native-base';
var Spinner = require('react-native-spinkit');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

const logo = require('../images/thumbs-up-michelin.jpg');
const michelin = require('../images/services-bib.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isVisible:true,types:'Circle', color: "#6BCAE2", size: 50,isModalVisible: false

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
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var date=_this.props.date;
	date = date.getUTCFullYear() + '-' +
	    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
	    ('00' + (date.getUTCDate()+1)).slice(-2);

	var url="http://54.255.203.182/yokupro/web/manage/";

		fetch(url+'manageappajax?type=ModuleDetails&empid='+empid+'&customerid='+companyid+'&date='+date+'&detailsType='+_this.props.type, {
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
					eventsDetails:responseData,isVisible:false
				});

			}
					
		
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
                                <Thumbnail source={logo} />
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
                                      <Icon active name="thumbs-up" />
                                      <Text>12 Likes</Text>
                                  </Button>
                              </Left>
                            <Body>
                                <Button transparent>

                                     <Text style={styles.welcome}>In {_this.state.eventsDetails[i].location}</Text>
                                </Button>
                            </Body>
                            <Right>
				<Icon active name="grid" />
                                <Text >{_this.state.eventsDetails[i].programdate}</Text>
                            </Right>
                        </CardItem>
                   </Card>;
			}
		}
		else{
			details="";
			}
		
    return (
	<Container >
	 <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Events')}>
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
	<Text style={styles.titleViewText}>Program Details</Text>
	</View>

	        <ScrollView>
        <View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>

						{details}
<View style={{alignSelf:"center",}}>
			
		<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
		</View>
		                      
       </View>
	

	       </ScrollView>	
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


