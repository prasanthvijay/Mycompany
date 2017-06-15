const React = require('react');
const retryImg = require('../images/retryw.png');
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Button,Form,Item,Card, CardItem, Body,Toast } from 'native-base';
import {   Spinner } from 'native-base';
import styles from './styles';
const background = require('../images/shadow.jpg');
const logo = require('../images/logo-3.png');
var {  StyleSheet, Text, View,ScrollView, Navigator ,AsyncStorage, Dimensions,Image,TouchableOpacity,NetInfo} = ReactNative;
var { Component } = React;
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
var GCM = require('react-native-gcm-push-notification');
module.exports = class Login extends Component {

constructor(props) {
    super(props);
    	this.state = { Username: '',Password: '',userDetails: [],loading:true,checkValidate:false,retry:false,
			showPasswordValue:true,
			usernameValidation:false,passwordValidation:false};

  }
 	
 async onPress(){
		NetInfo.isConnected.fetch().then(isConnected => {
		if(isConnected){
		var _this=this;
		_this.setState({loading:false,retry:false});	
		var Username=_this.state.Username;	
		var Password =_this.state.Password;
			
			if(Username==""){
				_this.setState({
					usernameValidation:true,loading:true
					});
				return false;
			}			
			else{
				_this.setState({
					usernameValidation:false
					});
				
			}
			if(Password==""){
				_this.setState({
					passwordValidation:true,loading:true
					});
					return false;
			}
			else{
			_this.setState({
					passwordValidation:false
					});
				
				
			var url="http://54.255.203.182/yokupro/web/manage/";
			fetch(url+'manageappajax?type=LoginCheck&username='+Username+'&password='+Password+'&customerType=YokuPro', {
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
						userDetails:responseData,loading:false
					});
					_this.navigate();

					_this.GCMFunction();
			
				}
				else{
					_this.setState({
						loading:true,checkValidate:true,
					});

				}	
		
			})
			.done();
			}
			} else{
				this.setState({retry:true,});
			}
			
		})
		
	}
async GCMFunction(){
		var _this=this;
		var userDetailsList=_this.state.userDetails;
		var companyid= userDetailsList['companyid'];
		var gcmRegisterId = await AsyncStorage.getItem("gcmId");
		var url="http://54.255.203.182/yokupro/web/manage/";	
		//alert(url+'manageappajax?type=gcmDetails&gcmRegisterId='+gcmRegisterId+'&companyid='+companyid);	
		fetch(url+'manageappajax?type=gcmDetails&gcmRegisterId='+gcmRegisterId+'&companyid='+companyid, {
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
		
		})
		.done();
        

}
onRegister(route){
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width/1.3,imagewidth:width/5,imageheight:height/12,imagewidthicon:width/2.5 ,imageheighticon:height/5.8});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width/1.1,imagewidth:width/6.5 ,imageheight:height/6,imagewidthicon:width/1.5 ,imageheighticon:height/8.5,});
	

		}

	};
async showPassword(showval){
 var _this = this;
if(showval == true)
{
	await _this.setState({
		showPasswordValue:false
	});
} else {
	await _this.setState({
		showPasswordValue:true
	});
}
		
}

async navigate(){
		var _this=this;
		var userDetailsList=_this.state.userDetails;
		AsyncStorage.setItem("empid", userDetailsList['empid']+"");
		AsyncStorage.setItem("companyid", userDetailsList['companyid']+"");
		AsyncStorage.setItem("employeename", userDetailsList['employeename']+"");
		AsyncStorage.setItem("customerid", userDetailsList['customerid']+"");

		
	this.props.navigator.push({
	    name: 'MainMenu', // Matches route.name
	  })
			    	
	
	}
  render() {

			var content=null;
			var showPasswordrender=null;
			if(this.state.loading!=true){
				content= <Spinner color='#5BB9FF' />;	
			}
			else{
			content=<View >
					 <Button  rounded info onPress={() => this.onPress()} style={{alignSelf:'flex-end' }}>
                                                <Text style={{color:'white'}}>Login</Text>
						<Icon active name='arrow-right' style={{color: '#FFFFFF',fontSize:15,paddingLeft:4 }}/>
                    	</Button>
				</View>;	
			}
			var errorMsg=null;
			if(this.state.checkValidate==true)
			{	
			errorMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Invalid login...!</Text></View>; 	
			}
			if(this.state.usernameValidation==true)
			{	
			errorMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Enter User Name...!</Text></View>; 	
			}
			if(this.state.passwordValidation==true)
			{	
			errorMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Enter Password...!</Text></View>; 	
			}


			if(this.state.showPasswordValue!=true){
			
				showPasswordrender=<Icon active name='eye-slash' style={{color: '#5087C8',alignSelf:"flex-end",fontSize:20}}/>;
						
			}
			else{
				showPasswordrender=<Icon active name='eye' style={{color: '#5087C8',alignSelf:"flex-end",fontSize:20}}/>;
			}	
		if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",}}>
					<TouchableOpacity activeOpacity={.3}   onPress={()=>this.onPress()} style={{alignSelf:"center"}}>
					<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.onPress()}></Image>
					</TouchableOpacity>  
					<Text style={{color:"#FFFFFF"}}>Please check your Connection..!</Text>		
			</View>;			
		}

				
			
    return (
	<Container>

			<LinearGradient colors={['#078BD5','#6FDfE3', '#078BD5']} style={{  flex: 1}} >
		        <ScrollView>
		<View style={{ 	flexDirection:'row',justifyContent: 'center',alignItems: 'center'}} onLayout={(event) => this.handleLayoutChange(event)}>  
			<Image
				style={{width:this.state.imagewidthicon,height:this.state.imageheighticon,marginTop:this.state.imageheight, marginBottom:50   }}
				source={logo}
				/> 	
			</View>

			<Card style={{width:this.state.width,alignSelf:"center" }}>
                        <CardItem>

 		           <Icon name='lock' style={{color: '#5087C8',fontSize:20}}/>
                      		<Text style={{paddingLeft:5,fontSize:15}}>Sign in to start your	session</Text>
                  
                        </CardItem>
                        <CardItem>
                            <Body>
				{errorMsg}
                        <InputGroup style={{borderColor: '#000000'}}>
				<Icon active name='envelope-o' style={{color: '#5087C8',fontSize:20}} />
                            	<Input placeholder="Email" onChangeText={(Username) => this.setState({Username})}/>
                        </InputGroup>
                        <InputGroup  style={{borderColor: '#000000'}}>
				<Icon active name='key' style={{color: '#5087C8',fontSize:20}}/>
                            <Input secureTextEntry={this.state.showPasswordValue} placeholder="Password" onChangeText={(Password) => this.setState({Password})}/>
				<TouchableOpacity activeOpacity={.3}   onPress={() => this.showPassword(this.state.showPasswordValue)} >
				{showPasswordrender}
				</TouchableOpacity>  		
                        </InputGroup>
			                         
                            </Body>
                        </CardItem>
                        <CardItem header>
							
				<Body>
					{content}
					
				</Body>
						<TouchableOpacity activeOpacity={.3}   onPress={() => this.onRegister('Register')} >
						<Icon active name='hand-o-down' style={{color: '#5087C8',fontSize:20,alignSelf:"flex-end" }}/>
						<Text>Register Here</Text>	
						</TouchableOpacity>  
                        </CardItem>
                   </Card>
		{retry}
        </ScrollView>
	</LinearGradient>

 	</Container>
    );
  }
}


