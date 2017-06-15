const React = require('react');
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Button,Icon,Form,Item,Spinner} from 'native-base';
import styles from './styles';
const background = require('../images/shadow.jpg');
const logo = require('../images/Michelin.png');

var {  StyleSheet, Text, View,ScrollView, Navigator ,AsyncStorage, Dimensions,Image } = ReactNative;
var { Component } = React;
import LinearGradient from 'react-native-linear-gradient';
module.exports = class Login extends Component {

constructor(props) {
    super(props);
    this.state = { Username: '',Password: '',userDetails: [],loading:true,checkValidate:false, };

  }


 async onPress(){
		
		var _this=this;
		_this.setState({loading:false});	
		var Username=_this.state.Username;	
		var Password =_this.state.Password;
		
			var url="http://www.dotcue.in/contentDistribution/web/manage/";
			fetch(url+'manageappajax?type=LoginCheck&username='+Username+'&password='+Password, {
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
						userDetails:responseData,
					});
					_this.navigate();
			
				}
				else{
					_this.setState({
						loading:true,checkValidate:true,
					});

				}	
		
			})
			.done();
		
	}
	
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/5,imageheight:height/3.5});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/6.5 ,imageheight:height/3});
	

		}

	};

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

			if(this.state.loading!=true){
				content= <Spinner color='blue' />;	
			}
			else{
			content=<Button  rounded info onPress={() => this.onPress()} style={{alignSelf:'flex-start' }}>
                                                <Text style={{color:'white'}}>Login</Text><Icon name='arrow-forward' />
                    	</Button>;	
			}
			if(this.state.checkValidate==true)
			{	
			var errorMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 20,}}>Invalid login...!</Text></View>; 	
			}				
			
    return (
	<Container>

<LinearGradient colors={['#078BD5','#6FDfE3', '#078BD5']} style={{  flex: 1}} >
		        <ScrollView>
		<View style={{ 	flexDirection:'row',justifyContent: 'center',alignItems: 'center'}} onLayout={(event) => this.handleLayoutChange(event)}>  
			<Image
				style={{width: 350, height: 106,marginTop:this.state.imageheight, marginBottom:0   }}
				source={logo}
				/> 	
			</View>

 		<Content>
			{errorMsg}
		                    <Form style={{marginBottom:20}}>
                        <InputGroup style={{borderColor: '#000000'}}>
				<Icon active name='ios-person'style={{color: '#5087C8'}} />
                            	<Input placeholder="Username" onChangeText={(Username) => this.setState({Username})}/>
                        </InputGroup>
                        <InputGroup  style={{borderColor: '#000000'}}>
				<Icon active name='eye' style={{color: '#5087C8'}}/>
                            <Input secureTextEntry placeholder="Password" onChangeText={(Password) => this.setState({Password})}/>
                        </InputGroup>
                    </Form>
			<View style={{ 	flexDirection:'row',
					justifyContent: 'center',
					alignItems: 'center' 
			}}>  
			{content}
						</View>

                </Content>
        </ScrollView>
	</LinearGradient>

 	</Container>
    );
  }
}


