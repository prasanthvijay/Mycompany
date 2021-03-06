const React = require('react');
const retryImg = require('../images/retryw.png');
var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Card,Title,CardItem,Left,Body,Right,Row,Col,Fab,Toast} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF,Alert, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,AsyncStorage, ListView,NetInfo} = ReactNative;
var { Component } = React;
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
const background = require('../images/mobileUi_bg1.png');
import Spinner from 'react-native-loading-spinner-overlay';
module.exports = class MainMenu extends Component {

state = {
	checkvar:0,
	mainMenuArray:[],imagewidth:'', active: 'true',padding:40,activeFab:false, visible: false,retry:false,logout:false,
	isModalVisible: false
  };

async componentDidMount(){
		var empid =  await AsyncStorage.getItem("empid");
		var customerid = await AsyncStorage.getItem("customerid");
		var url =  await AsyncStorage.getItem("url");
		this.setState({ url:url });
		this.mainMenu(empid,customerid);

}

async mainMenu(empid,customerid){
	NetInfo.isConnected.fetch().then(isConnected => {
		
	if(isConnected){
	var _this=this;
	_this.setState({visible:true,retry:false});
		var url =_this.state.url;
		fetch(url+'manageappajax?type=mainMenu&customerid='+customerid+'&empid='+empid, {
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

		   		_this.setState({
					mainMenuArray:responseData,visible:false,retry:false,logout:true
				});
		
		})
		.catch((error) => {
			this.setState({retry:true,visible:false,});
		})
		
		.done();

		}else{
				this.setState({retry:true,isVisible:false,logout:false});
		
		}
		})
}
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape',
					 height : height,width : width,
					imagewidth:width/7 ,imageheight:height/4.5 ,
					menuiconwidth:width/20,menuiconheight:height/12,
					imagewidthicon:width/3.5 ,imageheighticon:height/8,
					shadowwidth:width/6,shadowheight:height/4.5,
					backgroundwidth:width/2,backgroundheight:height/0.9,padding:width/15,imagepadding:width/4,
					retrypadding:height/2,
					Listpadding:width/6,overpadding:15, modalBody:0});

					

		} else {

			await this.setState({screenType: 'Portrait', 
						height : height,width : width,
						imagewidth:width/6 ,imageheight:height/7,
						menuiconwidth:width/7.5,menuiconheight:height/12.7,
						imagewidthicon:width/1.5 ,imageheighticon:height/8.5,
						shadowwidth:width/4,shadowheight:height/7,
						backgroundwidth:width/1,backgroundheight:height/1.2,					retrypadding:height/1.9,
						imagepadding:0,Listpadding:width/5,overpadding:width/10,modalBody:width/2});

		}

	};

rowPressed(val) {
	var _this = this;
	if(_this.state.isModalVisible==true){
		_this.setState({isModalVisible: false});		
	}
    if (val != '') {
	_this.navigate(val);
    	}
		
  }

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

logoutFunction(){
var _this=this
	Alert.alert('YokuPro', 'Do you wish to logout? ',  [ 
						{ text: 'Ok',onPress: ()=>_this.rowPressed('Login') }, 
						{text: 'Cancel', onPress: ()=>_this.noPressed, style: 'cancel'},
						 ]);
}


navigate(route){

	if(route=='Resources'){
		routepage='ProgramDetails';
		}
	else if(route=='Synopsis'){
		routepage='ProgramDetails';	
	}
	else if(route=='Evaluate'){
		routepage='ProgramDetails';	
	}
	else if(route=='Amigos'){
		routepage='ProgramDetails';	
	}
	else if(route=='Events'){
		routepage='ProgramDetails';	
	}
	else{
		routepage=route;
		}
	  this.props.navigator.push({
	    name: routepage,
		passProps: {
			routName:route	
      		} 
	  })
	}

	groupItems(items, itemsPerRow) {
		var itemsGroups = [];
		var group = [];
		items.forEach(function(item) {
		  if (group.length === itemsPerRow) {
		    itemsGroups.push(group);
		    group = [item];Fab
		  } else {
		    group.push(item);
		  }
		});

		if (group.length > 0) {
		  itemsGroups.push(group);
		}

		return itemsGroups;
	}
	renderGroup(group) {
		var that = this;
		var imageurl="http://yokupro.com/MenuIcons/";
		var items = group.map(function(menuarray, index) {
		var newurl= imageurl+menuarray.filename;
		var shadowOpt = {
		    width:that.state.shadowwidth,
		    height:that.state.shadowheight,
		    color:"#000",
		    border:2,
		    radius:35,
		    opacity:0.1,
		    x:0,
		    y:3,
		    style:{marginVertical:10,}
		}
		if(that.state.screenType=='Portrait'){
			var width=that.state.width;
			var height=that.state.height;		
			
		
		}
			
		return <View key={index}>
					
			<View style={styles.avatarContainerhead}>	


		<TouchableOpacity activeOpacity={.3}   onPress={() => that.rowPressed(menuarray.menu)} >
 	                  <View style={{ width: that.state.imagewidth,height: that.state.imageheight, alignItems: 'center', justifyContent: 'center'}}  color="Black"  >
			
		
			</View>
	<View>
				
				</View>	
			</TouchableOpacity>  		
			</View>
			</View>;
		});
		return (
		<View style={styles.group}>
		  {items}
		</View>
		);
	}

  render() {

 		var groups = this.groupItems(this.state.mainMenuArray, 3);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	

	
	if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",flex:1,paddingTop:this.state.retrypadding}}>
					
					<Text style={{color:"#000000",fontWeight: 'bold',}}>You seem to be offline</Text>

					 <Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
                                             <Text style={{color:'white',fontWeight: 'bold',}}>Go Online</Text>
				     	</Button>	 
			</View>;			
		}

var logout="";
	if(this.state.logout==true){
	
	 logout=<View style={{alignSelf:'flex-start'}}>
			<Icon name='md-log-out' style={{color:'#ffffff',paddingTop:50,paddingLeft:20 }} onPress={() =>this.logoutFunction()} />
			</View>;
	}
	else{
		logout=<View></View>;
	}


	
	   return (


	<Container onLayout={(event) => this.handleLayoutChange(event)}>
		
		<Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} type={this.state.types}/>

		<LinearGradient colors={['#5BB9FF','#AFEEFF', '#23A9FF']} style={{  flex: 1,width:this.state.width,height:this.state.height,}} >

		      	<View style={styles.headercontentimagenew}>

				<Image source={require('../images/logo-3.png')} style={{width:this.state.imagewidthicon,height:this.state.imageheighticon,}}/>
			</View>
			<View style={{paddingLeft:this.state.imagepadding}}>
			<Image source={background} style={{width:this.state.backgroundwidth,height:this.state.backgroundheight,}}>
				<View style={{paddingLeft:this.state.Listpadding}}> 	
					<ListView
					  {...this.props}
					  renderRow={this.renderGroup.bind(this)}
					  dataSource={ds.cloneWithRows(groups)}
					/>	
				</View>
				{logout}
			{retry}

			</Image>	

			</View>

		</LinearGradient>


       <Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                   
 			<CardItem >
                      	<Icon active name="md-log-out" />
                     	<TouchableOpacity onPress={() =>this.rowPressed('Login')}>  
			<Text>Logout</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
			
                     </CardItem>
                    </Card>
		</View>
        </Modal>
    
	        
	</Container>


    );
	
  }
}
var styles = StyleSheet.create({

avatarContainerhead: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
shadow: {
    flex: 1,
    width: null,
    height: null,
  },
headercontentimage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,

	alignSelf: 'center',	 

    },
headercontentimagenew: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
	alignSelf: 'center',
	paddingTop:40

		 

    },
	headercontent : {
	alignSelf: 'center'

},
background:{
   backgroundColor: '#FBFAFA',
},

linearGradient: {

    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 35,


  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }


});


