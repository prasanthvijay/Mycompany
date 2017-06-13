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
  AsyncStorage,TouchableOpacity,Image,NetInfo
} from 'react-native';
var Spinner = require('react-native-spinkit');
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Icon, Title, Button } from 'native-base';
export default class ChatGroups extends Component {

  constructor(props) {
    super(props);
    this.state = {groups: [],empid:null,groupUsers:[],isVisible:true,types:'Circle', color: "#6BCAE2", size: 50,retry:false,resultData:false,programid:'' };

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

 async componentDidMount() {
		var _this = this;
		var empid=await AsyncStorage.getItem('empid');
		var companyid=await AsyncStorage.getItem('companyid');
		var programid=_this.props.programid;
		var url =  await AsyncStorage.getItem("url");
		this.setState({url:url,programid:programid ,empid:empid});

_this.groupMemberFunction(empid,companyid,programid);

}
groupMemberFunction(empid,companyid,programid){
		var _this = this;
		var url =_this.state.url;
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

		fetch(url+'manageappajax?type=GroupMembers&empid='+empid+'&programid='+programid+'&companyid='+companyid, {
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
			this.setState({	groupUsers:responseData,isVisible:false,resultData:false,retry:false });
		}
		else{
			_this.setState({
					isVisible:false,resultData:true
				});

		}
		})	
		 .catch((error) => {
			_this.setState({retry:true,isVisible:false,});
		})
		.done();
		}else{
		_this.setState({retry:true,isVisible:false,});
		}
		})
  }
 navigate(route){
	  this.props.navigator.push({
	    name: route, 
		passProps: 
			{ programid: this.state.programid,empid:this.state.empid
				}
	
	  })
	}
  render() {


	var _this=this;
 		var microAppList = _this.state.groupUsers.map((groupUsers, index) => {

		var fileUrl = {};
		fileUrl["uri"] = groupUsers.filename;
            return (


                            <ListItem thumbnail key={index}>
		                <Left>
		                    <Thumbnail square size={80} source={fileUrl}/>
		                </Left>
		                <Body>
		                    <Text style={{color:"#6BCAE2" ,fontSize: 18,}}>{groupUsers.employeename}</Text>
		                    <Text note>{groupUsers.mobileno} </Text>
		                </Body>
		               
		            </ListItem>

                    
            )
	});


	if(this.state.resultData==true){

		var resultData=<View style={{alignSelf:"center",padding:15}}>
			<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Amigos available</Text>		
		</View>;			
	}


	if(this.state.retry==true){

		var retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

		<Text style={{color:"#000000"}}>You seem to be offline</Text>

		<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
		<Text style={{color:'white'}}>Go Online</Text>
		</Button>

		</View>;			
	}

    return (
		 <Container onLayout={(event) => this.handleLayoutChange(event)}>
		 <Header style={{backgroundColor: '#4376FC',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('ChatPage')}>
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
                
            </Header>                
          
		<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Amigos</Text>
		</View>
			<Content>
			<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 	
			{resultData}
			{retry}
			{microAppList}
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
titleViewText: {
    fontSize: 20,
    color: '#3b5998',
alignSelf:'center'	
   
  },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },		
});

