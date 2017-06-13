/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,NetInfo,
  Dimensions,TouchableOpacity,Image
} from 'react-native';
const retryImg = require('../images/TrainingPrograms.png');
import { GiftedChat } from 'react-native-gifted-chat';
var Spinner = require('react-native-spinkit');
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Icon, Title, Button } from 'native-base';
export default class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
	messages: [],
	useridnew:null,
	userid:this.props.empid,
	loadEarlier: true,
	isLoadingEarlier: false,
	height : Dimensions.get('window').height,
	width:Dimensions.get('window').width,
	screenType : '',
	groupId:'',programid:this.props.programid,isVisible:true,types:'Circle', color: "#4376FC", size: 50
		};
    this.onSend = this.onSend.bind(this);
    //this.loadMessages = this.loadMessages.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isMounted = false;
  }
async componentDidMount(){
	var url =  await AsyncStorage.getItem("url");
	var customerid =  await AsyncStorage.getItem("customerid");
	var companyid =  await AsyncStorage.getItem("companyid");
	var _this=this;
	var programid=_this.props.programid;	
	_this.setState({url:url,customerid:customerid,companyid:companyid,programid:programid});	
	_this.componentWillMount();

}
  async componentWillMount() {
	var _this = this;
	var programid=_this.props.programid;
    	this._isMounted = true;
			_this.setState({
			      programid: programid,
			    });
	this._interval = setInterval(() => {
		this.loadMessages();
	}, 3000);
  }

loadMessages()
{
	NetInfo.isConnected.fetch().then(isConnected => {
		
	if(isConnected){
		var _this = this;
		var userid=this.state.userid;

		var programid=_this.state.programid;
		var companyid=this.state.companyid;
		_this.setState({useridnew:userid,programid:programid});

		var content=new Array();
		var msgUserId=null;
		var url =_this.state.url;
			fetch(url+'manageappajax?type=chatPage&empid='+userid+'&programid='+programid+'&companyid='+companyid, {
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
			var msgsArr=new Array();			
			msgArray=responseData;				



			for(var i=(msgArray.length-1);i>=0;i--)
			{
				var year=msgArray[i].year;
				var day=msgArray[i].day;
				var month=msgArray[i].month-1;
				var minute=msgArray[i].minute;
				var hour=msgArray[i].hour;
					if(msgArray[i].userid==_this.state.useridnew)
					{
						msgUserId=2;
					}
					else
					{
						msgUserId=1;
					}

			content.push({
			_id: msgArray[i].id,
			text: msgArray[i].msg,
			createdAt: new Date(Date.UTC(year, month, day, hour, minute, 0)),
			user: {
			_id: msgUserId,
			name: msgArray[i].empName,
			avatar: msgArray[i].imagepath,
			},
			},
			);

			}
			_this.setState({
			messages: content,retry:false,isVisible:false
			});

			
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

  componentWillUnmount() {
    this._isMounted = false;
  }


  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('./old_messages.js')),
            loadEarlier: true,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

 async onSend(messages = []) {
			var _this = this;
			var groupId=_this.props.groupId;
			var userid=this.state.userid;
			var customerid=_this.state.customerid;
			var companyid=_this.state.companyid;
			var programid=_this.state.programid;
			var msgText=messages[0].text;
			var url =_this.state.url;
			fetch(url+'manageappajax?type=sentMesg&empid='+userid+'&programid='+programid+'&msgText='+msgText+'&customerid='+customerid+'&companyid='+companyid, {
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
				

			this.setState((previousState) => {
			return {
			messages: GiftedChat.append(previousState.messages, messages),
			};
			});
			})
 		.catch((error) => {
			this.setState({isVisible:true,});
		})
		.done();
			
  }

async handleLayoutChange(event:Event){

		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,paddingBody:width/7});
		}

	};
navigate(route){
		if(route!="GroupMemebers")
		{
			var routeNma='Amigos';
			this.props.navigator.push({
				name: route, // Matches route.name
				passProps: 
				{ programid:this.state.programid,
			routName:routeNma	
					}
			})
		}
		else
		{
			this.props.navigator.push({
				name: route, 
				passProps: 
				{ programid: this.state.programid,
					}
			})
		}
	}


  render() {
var height=this.state.height;
var width=this.state.width;
var retry='';
if(this.state.retry==true){
	
			 retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;
}
else{
	if(this.state.isVisible==true){	
			
			retry=<View style={{alignSelf:"center",}}>
			<Spinner  style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View>;
	 }else{
		retry=<GiftedChat 
			messages={this.state.messages}
			onSend={this.onSend}
			onLoadEarlier={this.onLoadEarlier}
			user={{_id: 2,}}
		      />  
	}	
}



    return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
				<Header style={{backgroundColor: '#4376FC',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('ProgramDetails')}>
                        <Icon name='arrow-back' />
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
                    <Button transparent onPress={() => this.navigate('GroupMemebers')}>
                        <Icon name='person' />
                    </Button>
		</Right>
            </Header>
		<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Amigos Chats</Text>
		</View>
		{retry}

			
	</Container>
  );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
titleViewText: {
    fontSize: 20,
    color: '#3b5998',
alignSelf:'center'	
   
  },
spinner: {
alignSelf: 'center',
    marginTop: 150
  },	
});

