const React = require('react');

var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Header,Button,Icon,Title,Left,Body,Right,Card,CardItem,Thumbnail} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

export default class Register extends Component {
constructor(props) {
    super(props);
    this.state = {
   screenType: '',
	sucessMsg:false,
	 active: true

    };
}

async sendDetails(){
	var _this = this;
	var name = _this.state.name;
	var email = _this.state.email;
	var mobile = _this.state.mobile;
	var address = _this.state.address;

	var url="http://54.255.203.182/yokupro/web/manage/";

		fetch(url+'manageappajax?type=registerDetails&name='+name+'&email='+email+'&mobile='+mobile+'&address='+address, {
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
					sucessMsg:true,
				});

			}
			
			
					
		
		})
		.done();
	
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
			var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'#6Bddd2', fontSize: 15,}}>Request Submitted Sucessfully...!</Text></View>; 	
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
                        <CardItem header>
                            <Text>Register Form</Text>

	
                        </CardItem>
                        <CardItem>
                            <Body>
				{sucMsg}
				<InputGroup regular>
				<Input placeholder='Name' onChangeText={(name) => this.setState({name})}/>
				</InputGroup>
				<InputGroup regular>
				<Input placeholder='Email'onChangeText={(email) => this.setState({email})}/>
				</InputGroup>
				<InputGroup regular>
				<Input placeholder='Mobile No'onChangeText={(mobile) => this.setState({mobile})} keyboardType='numeric' />
				</InputGroup>
				<InputGroup regular>
				<Input placeholder='Address' onChangeText={(address) => this.setState({address})}/>
				</InputGroup>
												
                            </Body>
					

                        </CardItem>
                        <CardItem header>                             
				<Body>

				<Button  rounded info onPress={() => this.sendDetails()} style={{alignSelf:'flex-end' }}>
				<Text style={{color:'white'}}>Register</Text>
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

});


