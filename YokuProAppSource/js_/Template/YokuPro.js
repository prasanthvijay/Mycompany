const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,
	Button,Title,Left,Body,Right,Card,CardItem,Thumbnail} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

const logo = require('../images/thumbs-up-michelin.jpg');
const michelin = require('../images/services-bib.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',eventsDetails:[],isModalVisible: false

    };

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
		
		
    return (
	<Container >
	  <Header style={{backgroundColor: '#FED989',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                        <Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
                    </Button>
                </Left>
                <Body style={{paddingLeft:this.state.paddingBody,alignSelf:"center"}}>
                   <Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_b.png')}
				></Image> 

                </Body>
 <Right>
 			    
	           </Right >
            </Header>

	
      <Content onLayout={(event) => this.handleLayoutChange(event)}>
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
                               <Text >           YokuPro is a full feature learning and development (L&D) mobile application integrated with a intuitive management console to deliver structured content across any organisation.</Text>
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
    fontSize: 25,
    color: '#4c1cea',
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


