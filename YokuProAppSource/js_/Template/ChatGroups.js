import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,
  AsyncStorage,Image,Dimensions,NetInfo
} from 'react-native';
const retryImg = require('../images/retry.png');
var Spinner = require('react-native-spinkit');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';

import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header,Card,CardItem, Icon, Title, Button,Toast } from 'native-base';
export default class ChatGroups extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [],userid:null,groupCount:false,isVisible:true,types:'Circle', color: "#1F83FB", size: 50,isModalVisible: false,isModalVisible: false,retry:false};
	this.chatPage=this.chatPage.bind(this);
  }
navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}
async componentDidMount(){
		var empid =  await AsyncStorage.getItem("empid");

		this.Chatpage(empid);
}
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
 Chatpage(userid) {

	NetInfo.isConnected.fetch().then(isConnected => {
		
	if(isConnected){
		var _this = this;
		var url="http://54.255.203.182/yokupro/web/manage/";
		_this.setState({isVisible:true,retry:false});
			fetch(url+'manageappajax?type=ChatGroups&userid='+userid, {
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
			var msgArray=new Array();
			msgArray=responseData;	
			if(responseData!=null)
			{
				this.setState({
			      		groups: msgArray,isVisible:false,retry:false
				});
			}
			else
			{
				this.setState({
			      		groupCount: true,isVisible:false
				});
			}
			this.setState({
				userid:userid,
			    });
		})
		.done();
		}else{
				this.setState({retry:true,isVisible:false,});
		
		}
		})

  }
  chatPage(groupId,userid,grpName)
  {
	this.props.navigator.push({ name: 'ChatPage' , passProps: {groupId: groupId, userid: userid, grpName:grpName}});
  }

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,calwidth:width/3,imageheight:height/1.4,modalBody:0 });

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,calwidth:width/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,imageheight:height/3,modalBody:width/2});
		}

	};


  render() {

	var groupList=this.state.groups;
	var usrId=this.state.userid;
	var returnData=[];
	var groupCount=this.state.groupCount;
		if(groupCount==false)
		{
		groupList.map((y) => {
				var grpId=y.id;
				var grpName=y.groupName;
                            returnData.push(<ListItem thumbnail onPress={()=>this.chatPage(grpId,usrId,grpName)}>
				        <Left>
				            <Thumbnail square size={80} source={require('./../images/one.png')} />
				        </Left>
				        <Body>
				            <Text style={{fontWeight:'bold'}}>{y.groupName}</Text>
				            <Text note>{groupCount}</Text>
				        </Body>
				</ListItem>

					);
                        })
		}
		else
		{
			   returnData.push(<View style={styles.container}><Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Groups Available</Text></View>); 
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
		 <Container>
	 <Header style={{backgroundColor: '#1F83FB',}}>
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
			<Content>
				<View onLayout={(event) => this.handleLayoutChange(event)}>
					<Text style={styles.titleViewText}>Chat Groups</Text>
				</View>
				{returnData}

			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin:10,
  },
titleViewText: {
    fontSize: 25,
	alignSelf: 'center',
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#4B87C8',
    fontWeight: 'bold',
  },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },	
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

