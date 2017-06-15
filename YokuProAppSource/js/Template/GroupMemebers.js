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
  AsyncStorage
} from 'react-native';
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Icon, Title, Button } from 'native-base';
export default class ChatGroups extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [],userid:null,groupUsers:[]};
	this.chatPage=this.chatPage.bind(this);
  }
navigate(route){
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}
 async componentWillMount() {
var _this = this;
var userid=await AsyncStorage.getItem('empid');
var groupId=_this.props.groupId;
		var url="http://54.255.203.182/yokupro/web/manage/";

			fetch(url+'manageappajax?type=GroupMembers&userid='+userid+'&groupId='+groupId, {
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
			var empArray=new Array();
			empArray=responseData;

			
			this.setState({
				userid:userid,
				groupUsers:empArray,
			    });
		})
		.done();
  }
  chatPage(groupId,userid,grpName)
  {
	this.props.navigator.push({ name: 'ChatPage' , passProps: {groupId: groupId, userid: userid, grpName:grpName}});
  }
  render() {

	var groupList=this.state.groupUsers;
	var returnData=[];
		groupList.map((y) => {
				var empName=y.empName;
                            returnData.push(<ListItem thumbnail>
				        <Left>
						<Icon name='person' />
				        </Left>
				        <Body>
				            <Text style={{fontWeight:'bold'}}>{empName}</Text>
				            <Text note>contact details</Text>
				        </Body>
				</ListItem>

					);
                        })

    return (
		 <Container>
	 <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Konnect')}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title></Title>

                </Body>
                <Right />
            </Header>
			<Content>
				<View>
					<Text style={styles.welcome}>Group Members</Text>
				</View>
				{returnData}
			</Content>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#4B87C8',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

