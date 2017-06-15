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
  AsyncStorage,
  Dimensions
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Icon, Title, Button } from 'native-base';
export default class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
	messages: [],
	useridnew:null,
	grpName:null,
	userid:this.props.userid,
	loadEarlier: true,
	isLoadingEarlier: false,
	height : Dimensions.get('window').height,
	width:Dimensions.get('window').width,
	screenType : '',
	groupId:'',programid:''
		};
    this.onSend = this.onSend.bind(this);
    //this.loadMessages = this.loadMessages.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this._isMounted = false;
  }
  async componentWillMount() {
	var _this = this;
	var groupId=_this.props.groupId;
    	this._isMounted = true;
			_this.setState({
			      groupId: groupId,
			    });
	this._interval = setInterval(() => {
		this.loadMessages();
	}, 3000);
  }

loadMessages()
{

		var _this = this;
		var userid=this.state.userid;
		var groupId=_this.props.groupId;
		var grpName=_this.props.grpName;
		var programid=_this.props.programid;
		_this.setState({grpName:grpName,useridnew:userid,programid:programid});

		var content=new Array();
		var msgUserId=null;
		var url="http://54.255.203.182/yokupro/web/manage/";
			fetch(url+'manageappajax?type=chatPage&userid='+userid+'&groupId='+groupId, {
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
				    name: 'React Native',
				    avatar: 'https://facebook.github.io/react/img/logo_og.png',
				  },
				},
			      );
				
			}
			_this.setState({
			      messages: content,
			    });
		})
		.done();
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
var msgText=messages[0].text;

		var url="http://54.255.203.182/yokupro/web/manage/";

			fetch(url+'manageappajax?type=sentMesg&userid='+userid+'&groupId='+groupId+"&msgText="+msgText, {
				method: 'POST',
				headers: {
		   		 'Accept': 'application/json',
		   		 'Content-Type': 'application/json'


				}
			})
		

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

async handleLayoutChange(event:Event){

		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width});
		}

	};
navigate(route){
		if(route!="GroupMemebers")
		{
			this.props.navigator.push({
				name: route, // Matches route.name
				passProps: 
				{ programid:this.state.programid	
					}
			})
		}
		else
		{
			this.props.navigator.push({
				name: route, 
				passProps: 
				{ groupId: this.state.groupId,
					}
			})
		}
	}


  render() {
var height=this.state.height;
var width=this.state.width;
var grpName=this.state.grpName;
    return (
	<View style={[styles.container,{height:height}]} onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Konnect')}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title><Text style={styles.welcome}>{grpName}</Text></Title>

                </Body>
                <Right>
                    <Button transparent onPress={() => this.navigate('GroupMemebers')}>
                        <Icon name='person' />
                    </Button>
		</Right>
            </Header>


		<View style={{height:height-60,top:-20}}>
			<GiftedChat style={{color:'red'}}
			messages={this.state.messages}
			onSend={this.onSend}
			loadEarlier={this.state.loadEarlier}
			onLoadEarlier={this.onLoadEarlier}
			user={{
			  _id: 2,
			}}
		      />  
		</View>
	</View>
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
});

