const React = require('react');
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row,Toast} from 'native-base';
import Modal from 'react-native-modal';
var { NetInfo, StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
import ActionButton from 'react-native-action-button';
import SearchBar from 'react-native-searchbar';

module.exports = class ProgramDetails extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',programDetails:[],
	isVisible:true,types:'Circle', color: "#64BFFF", size: 50,isModalVisible: false,retry:false,resultData:false,routeName:'',results : []
    };

  }
async componentDidMount(){

	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var url =  await AsyncStorage.getItem("url");
	this.resourseload(empid,companyid);
	this.setState({routeName:this.props.routName,url:url,empid:empid});
}

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

resourseload(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

		var _this = this;
		var url =_this.state.url;
		_this.setState({isVisible:true,retry:false});
		fetch(url+'manageappajax?type=ProgramDetails&empid='+empid+'&companyid='+companyid, {
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

			if(responseData!=""){
				
				_this.setState({
					programDetails:responseData,isVisible:false,retry:false
				});

			}
			else{
			_this.setState({
					isVisible:false,resultData:true
				});

			}
					
		
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

	
navigate(route){

if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}

	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 ,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};
onPress(route,programid){
	if(route=='Amigos'){
		var empid=this.state.empid;
	}

	 this.props.navigator.push({
	    name: route, 
		passProps: {
          	programid: programid,
		empid:empid
      		}
	  });
		
}
_handleResults(results) {
  this.setState({ results });
}

  render() {
		var details=null;
		var _this=this;
		

 	var microAppList = _this.state.programDetails.map((programDetails, index) => {

            return (


                            <ListItem thumbnail key={index}>
		                <Left>
                 		 <TouchableOpacity onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) } > 
		                    <Thumbnail square style={{width:25,height:25}} source={require('./../images/TrainingPrograms.png')} />
		</TouchableOpacity>
		                </Left>
		                <Body>
                 		 <TouchableOpacity onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) } > 
		                    <Text style={{color:'#000000',fontSize:15}}>{programDetails.batchname}  <Text style={{color:'red',fontSize:13}}> > {programDetails.programname}</Text>
					</Text>
		                    
		                    <Text note>{programDetails.programdate}</Text>
		</TouchableOpacity>
		                </Body>
		                <Right>
		                    <Button transparent onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) }>
		                        <Text style={{color:"#6BCAE2"}}>{_this.state.routeName}</Text>
		                    </Button>
		                </Right>
		            </ListItem>

                    
            )
	});

	if(_this.state.results!=""){
	
 	microAppList = _this.state.results.map((programDetails, index) => {

            return (


                            <ListItem thumbnail key={index} >
		                <Left>
                 		 <TouchableOpacity onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) } > 
		                    <Thumbnail square style={{width:25,height:25}} source={require('./../images/TrainingPrograms.png')} />
		</TouchableOpacity>
		                </Left>
		                <Body>
                 		 <TouchableOpacity onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) } > 
		                    <Text style={{color:'#000000',fontSize:15}}>{programDetails.batchname} <Text style={{color:'red',fontSize:13}}> > {programDetails.programname}</Text>
					</Text>
		                    
		                    <Text note>{programDetails.programdate}</Text>
		</TouchableOpacity>
		                </Body>
		                <Right>
		                    <Button transparent onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid) }>
		                        <Text style={{color:"#6BCAE2"}}>{_this.state.routeName}</Text>
		                    </Button>
		                </Right>
		            </ListItem>

                    
            )
	});
	}

	if(this.state.resultData==true){
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Programs available</Text>		
			</View>;			
		}
if(_this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;			
		}
if(this.state.isVisible!=true){
	var search=<SearchBar
		  ref={(ref) => this.searchBar = ref}
		  data={this.state.programDetails}
		  handleResults={(results)=>this._handleResults(results)}
		  showOnLoad
		/>;
	}

		
		
    return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	
		
                <Content>
		<View style={{backgroundColor:'#e3ebfc'}}>
		<Text style={styles.titleViewText}>Training Programs</Text>
		</View>
		<View style={{alignSelf:"center",}}>
		<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>

		</View>
		<View style={{paddingBottom:50,}}>
		{search}
		</View>
		<ScrollView>
		<List>
			{microAppList}
			{resultData}
			{retry}
		</List>
		</ScrollView>
	
	                    </Content>

	</Container>

    );
  }
}
var styles = StyleSheet.create({
 
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
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
    color: '#3b5998',
    fontSize: 20,
alignSelf: 'center',

   
  },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },	
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
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


