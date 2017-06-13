const React = require('react');
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Row,Toast} from 'native-base';
import SearchBar from 'react-native-searchbar';
import Modal from 'react-native-modal';
var { NetInfo, StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
import ActionButton from 'react-native-action-button';
const retryImg = require('../images/retry.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',categoryDetails:[],
	isVisible:true,types:'Circle', color: "#7EFF71", size: 50,isModalVisible: false,retry:false,resultData:false,programid:'',results : []
    };

  }
async componentDidMount(){
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var programid=this.props.programid;
	var url =  await AsyncStorage.getItem("url");
	this.setState({programid:programid,url:url });
	this.resourseload(empid,companyid,programid);

}
resourseload(empid,companyid,programid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

	var _this = this;
	var url =_this.state.url;
		_this.setState({isVisible:true,retry:false});
		fetch(url+'manageappajax?type=resourescategoryDetails&empid='+empid+'&customerid='+companyid+'&programid='+programid, {
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
					categoryDetails:responseData,isVisible:false,retry:false
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

	 var routeNma='Resources';
	this.props.navigator.push({
	    name: route, 
		passProps: {
		routName:routeNma
      		}
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
onPress(path,id,extension,filename,filetype,sessionname){
	 this.props.navigator.push({
	    name: 'Document', // Matches route.name
		passProps: {
          	path: path,
		extension:extension,
		filename:filename,
		filetype:filetype,
		sessionname:sessionname,
		programid:this.state.programid
      		}
	  });
this.createHistory(id);
		
}
async createHistory(contentId){

	var _this = this;
	var empid = await AsyncStorage.getItem('empid');
	var programid=_this.state.programid;
	var companyid = await AsyncStorage.getItem("companyid");
	var url =_this.state.url;

		fetch(url+'manageappajax?type=readingHistory&empid='+empid+'&companyid='+companyid+'&contentId='+contentId+'&programid='+programid, {
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
		 .catch((error) => {
			this.setState({retry:true,isVisible:false,});
		})
		.done();	

}

_handleResults(results) {
  this.setState({ results });
}
 render() {
		var details=null;
		var _this=this;


 		var microAppList = _this.state.categoryDetails.map((categoryDetails, index) => {

			var extension=categoryDetails.extension;
				if(categoryDetails.filetype=='story'){
					extension="story"
				}else if(categoryDetails.filetype=='url'){
					extension="url"
				}else{
					extension=categoryDetails.extension;
				}
							

            return (


                            <ListItem thumbnail key={index}>
		                <Left>
		                    <Thumbnail square size={80} source={require('./../images/reading.png')} />
		                </Left>
		                <Body>
				<TouchableOpacity onPress={() => _this.onPress(categoryDetails.filepath,categoryDetails.id,categoryDetails.extension,categoryDetails.filename,categoryDetails.filetype,categoryDetails.sessionname)} > 
		                    <Text>{categoryDetails.sessionname}</Text>
		                    <Text note>{categoryDetails.filetype} </Text>
			</TouchableOpacity>
		                </Body>
		                <Right>
		                    <Button transparent onPress={() => _this.onPress(categoryDetails.filepath,categoryDetails.id,categoryDetails.extension,categoryDetails.filename,categoryDetails.filetype,categoryDetails.sessionname)}>
					 <Text style={{color:"#6BCAE2",flexDirection:"row"}} >View <Text style={{fontSize:10,color:"#000000"}}>.{extension}</Text></Text>
		                    </Button>
		                </Right>
		            </ListItem>

                    
            )
	});

	if(_this.state.results!=""){
	
 	microAppList =  _this.state.results.map((categoryDetails, index) => {


            var extension=categoryDetails.extension;
				if(categoryDetails.filetype=='story'){
					extension="story"
				}else if(categoryDetails.filetype=='url'){
					extension="url"
				}else{
					extension=categoryDetails.extension;
				}
							

            return (

                            <ListItem thumbnail key={index}>
		                <Left>
		                    <Thumbnail square size={80} source={require('./../images/reading.png')} />
		                </Left>
		                <Body>
                  <TouchableOpacity onPress={() => _this.onPress(categoryDetails.filepath,categoryDetails.id,categoryDetails.extension,categoryDetails.filename,categoryDetails.filetype,categoryDetails.sessionname)} > 
		                    <Text>{categoryDetails.sessionname}</Text>
		                    <Text note> </Text>
			</TouchableOpacity>
		                </Body>
					
		                <Right>
		                    <Button transparent onPress={() => _this.onPress(categoryDetails.filepath,categoryDetails.id,categoryDetails.extension,categoryDetails.filename,categoryDetails.filetype,categoryDetails.sessionname)}>
					 <Text style={{color:"#6BCAE2",flexDirection:"row"}} >View <Text style={{fontSize:10,color:"#000000"}}>.{extension}</Text></Text>
		                    </Button>
		                </Right>
		            </ListItem>
		)

	});
	}

	
	if(_this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Resources available</Text>		
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
		var search= <SearchBar
		  ref={(ref) => this.searchBar = ref}
		  data={this.state.categoryDetails}
		  handleResults={(results)=>this._handleResults(results)}
		  showOnLoad
		/>;
	
}
		
    return (
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
		<Content>


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
    backgroundColor: '#f9f9f9',
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
    fontSize: 25,
    color: '#4c1cea',
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


