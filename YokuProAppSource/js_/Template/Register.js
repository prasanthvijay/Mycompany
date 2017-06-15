const React = require('react');
const retryImg = require('../images/retry.png');
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Header,Button,Icon,Title,Left,Body,Right,Card,CardItem,Thumbnail,Spinner} from 'native-base';
var {  StyleSheet, Text, NetInfo,View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

export default class Register extends Component {
constructor(props) {
    super(props);
    this.state = {
   screenType: '',
	sucessMsg:false,
	 active: true,retry:false,loading:true,name:"",email:'',mobile:'',address:'',password:''

    };
}

async sendDetails(){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

	var _this = this;
	_this.setState({loading:true,retry:false});

	var name = _this.state.name;
	var email = _this.state.email;
	var mobile = _this.state.mobile;
	var address = _this.state.address;
	var password=_this.state.password;
	//var url="http://www.dotcue.in/contentDistribution/web/manage/";
	var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=registerDetails&name='+name+'&email='+email+'&mobile='+mobile+'&address='+address+'&password='+password, {
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
					sucessMsg:true,loading:true,name:"",email:'',mobile:'',address:'',password:''
				});

			}
			
								
		
		})
		.done();
		
		}else{
	
				this.setState({retry:true,loading:true,});
		}
	})
}

	
navigate(route){
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 });
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7});
		}

	};

  render() {
		
		if(this.state.sucessMsg==true)
			{	
			var sucMsg=<View style={{alignSelf:'center',}}>
					<Text style={{color:'#39d6ae', fontSize: 15,}}>
					<Text>Register Sucessfully...!</Text>
					<Text  style={{color:'#03ad82', fontSize: 16,}} onPress={() => this.navigate('Login')}> Click to Login</Text>
					</Text>
					</View>; 	

			}
		if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center"}}>
					<TouchableOpacity activeOpacity={.3}   onPress={()=>this.sendDetails()} style={{alignSelf:"center"}}>
					<Image source={retryImg} style={{width:40,height:40}} onPress={()=>this.sendDetails()}></Image>
					</TouchableOpacity>  
					<Text>Please check your Connection..!</Text>		
			</View>;			
		}
		var content=null;
		if(this.state.loading!=true){
				content=<Spinner color='#5BB9FF' style={{alignSelf:'flex-end' }} />;	
			}
			else{
			content=<Button  rounded info onPress={() => this.sendDetails()} style={{alignSelf:'flex-end' }}>
				<Text style={{color:'white'}}>Register</Text>
				</Button>;	
			}

		
    return (
	<Container >
	  <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Login')}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                </Left>
               <Body style={{paddingLeft:this.state.paddingBody}}>
                   <Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo-2.png')}
				></Image> 

                </Body>
                <Right />
            </Header>

	
      <Content onLayout={(event) => this.handleLayoutChange(event)}>
                     <Card>
                        <CardItem header style={{alignSelf:'center'}}>
                            <Text style={{color:'#5087C8',fontSize:25,}}>Customer Register Form</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
				{sucMsg}
				<InputGroup regular>
				<Icon active name='md-contact' style={{color: '#5087C8',}} />
				<Input placeholder='Name' onChangeText={(name) => this.setState({name})} value={this.state.name}/>
				</InputGroup>
				<InputGroup regular>
				<Icon active name='md-mail' style={{color: '#5087C8',}} />
				<Input placeholder='Email (username)'onChangeText={(email) => this.setState({email})} value={this.state.email}/>
				</InputGroup>
				<InputGroup regular>
				<Icon active name='md-key' style={{color: '#5087C8',}} />
				<Input placeholder='Password  'onChangeText={(password) => this.setState({password})} value={this.state.password}/>
				</InputGroup>
				<InputGroup regular>
				<Icon active name='md-tablet-portrait' style={{color: '#5087C8',}} />
				<Input placeholder=' Mobile No'onChangeText={(mobile) => this.setState({mobile})} keyboardType='numeric' value={this.state.mobile}/>
				</InputGroup>
				<InputGroup regular>
				<Icon active name='ios-pin' style={{color: '#5087C8',}} />
				<Input placeholder=' Address' onChangeText={(address) => this.setState({address})} value={this.state.address} />
				</InputGroup>
												
                            </Body>
					

                        </CardItem>
		{retry}
                        <CardItem header>                             
				<Body>

				{content}
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

});


