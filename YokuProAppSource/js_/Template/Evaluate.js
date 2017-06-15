const React = require('react');
var ReactNative = require('react-native');
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal'
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Title, Button,Icon,Card,CardItem } from 'native-base';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage,Animated, ScrollView,ToolbarAndroid, ListView, View, TouchableHighlight,Navigator,Dimensions,TouchableOpacity } = ReactNative;
var { Component } = React;
var Spinner = require('react-native-spinkit');
var {height, width} = Dimensions.get('window');
const logoUnder = require('../images/Under.png');
import ParallaxView from 'react-native-parallax-view';
import FacebookTabBar from './FacebookTabBar';
const background = require('../images/shadow.jpg');
const logo = require('../images/person.png');	

module.exports = class Menu extends Component {


   constructor(props){
    super(props);
    //your codes ....
	this.state = {
    checkvar:0,contentdata:[],ratingArray:[], isVisible: true,
    color: "#0D1F6B", size: 70,height:'', width:'', screenType : '',empid:'',competencyArray:[],isModalVisible: false,resultData:false,
mainMenu:[],mainMenuarr:[],UserDetailsArray:[],ratingEmployeeArray:[],showval:'',ratingWidth:0,RatingValue:'',isVisible:true,types:'Circle', color: "#53FF3B", size: 50
	};
	}
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async componentDidMount(){
	var empid = await AsyncStorage.getItem("empid");
	var companyid = await AsyncStorage.getItem("companyid");
	var _this=this;
		
	_this.setState({ empid:empid});	
	var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=MapCmptncy&companyid='+companyid+'&empid='+empid, {
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
					competencyArray:responseData,isVisible:false
				});
				}else{
					_this.setState({
						isVisible:false,resultData:true
					});
				}
		
		})

		fetch(url+'manageappajax?type=RatingDetails&companyid='+companyid+'&empid='+empid, {
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
					ratingEmployeeArray:responseData,isVisible:false
				});
			}else{
					_this.setState({
						isVisible:false,resultData:true
					});
				}
		
		})

		fetch(url+'manageappajax?type=UserDetails&&empid='+empid, {
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
					UserDetailsArray:responseData,isVisible:false
				});
			}else{
					_this.setState({
						isVisible:false,resultData:true
					});
				}
		
		})

		.done();
}
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,eventHeight:width/11,modalBody:width/2});
		}

	};


navigate(route){

	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}

 
naviga(competencyid,route){
	var _this=this;
	this.props.navigator.push({
	    name: route, 
		passProps: {
		competencyid:competencyid
      		}
	  })	
}



render() {

if(this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Data Avaliable..!</Text>		
			</View>;			
		}		
	

	var UserDetails=this.state.UserDetailsArray.map((UserDetailsArray,index)=>{
			var url="http://54.255.203.182/"+UserDetailsArray.imagepath;
		return (
		<View style={{flexDirection: 'row',alignItem:'center' }}>
			<View style={styles.headerIcon}>
			<Image style={styles.menuicon}  source={{uri:url}} />
			</View>
			<Text style={{alignSelf:'center',fontSize:25,color:"#31b0d5"}}>{UserDetailsArray.name}</Text>	
		</View>			
		)				
	});


	var competencyList = this.state.competencyArray.map((competencyArray, index) => {
            return (
			   
			      <View style={styles.encrypt}>
                              <Text style={styles.subText} onPress={() => this.naviga(competencyArray.competencyid,'Indpage')}>{competencyArray.competency} </Text>
                    	      </View>

            )
	});
	
	var RatingList = this.state.competencyArray.map((competencyArray, index) => {
            return (
			   
			      <View style={styles.encrypt}>
                              <Text style={styles.subText} onPress={() => this.naviga(competencyArray.competencyid,'Chart')}>{competencyArray.competency} </Text>
                    	      </View>

            )
	});
		
	
	var customerList=null;
	var reporteesList=null;
	var peersList=null;
	var supervisorList=null;
	var customer=[];


	var Reportees = this.state.ratingEmployeeArray.map((ratingEmployee, index) => {
	
		supervisorList = ratingEmployee.reporteesList.map((supervisorArray, index) => {
			return (
				<Text style={styles.subText} onPress={() => this.naviga(supervisorArray.userid,'Rating')}>{supervisorArray.employeename},  </Text>	
				)
			});

            return (    
			<View style={styles.encrypt}>
					<Text style={styles.text}>Reportees : {supervisorList}</Text>
			</View>
			
            )
	});
	var Supervisor = this.state.ratingEmployeeArray.map((ratingEmployee, index) => {
	
		supervisorList = ratingEmployee.supervisorList.map((supervisorArray, index) => {
			return (
				<Text style={styles.subText} onPress={() => this.naviga(supervisorArray.userid,'Rating')}>{supervisorArray.employeename},  </Text>	
				)
			});

            return (    
			<View style={styles.encrypt}>
					<Text style={styles.text}>Supervisor : {supervisorList}</Text>
			</View>
			
            )
	});
var peers = this.state.ratingEmployeeArray.map((ratingEmployee, index) => {
	
		peersList = ratingEmployee.peersList.map((peersListArray, index) => {
					return (
						<Text style={styles.subText} onPress={() => this.naviga(peersListArray.userid,'Rating')}>{peersListArray.employeename},  </Text>	
						)
					});
		
            return (    
			<View style={styles.encrypt}>
					<Text style={styles.text}>Peers : {peersList}</Text>
			</View>
			
            )
	});


	var  Customer= this.state.ratingEmployeeArray.map((ratingEmployee, index) => {
	
		customerList = ratingEmployee.customerList.map((customerListArray, index) => {
			return (
				<Text style={styles.subText} onPress={() => this.naviga(customerListArray.userid,'Rating')}>{customerListArray.employeename},  </Text>	
				)
			});
		
            return (    
			<View style={styles.encrypt}>
					<Text style={styles.text}>Customer : {customerList}</Text>
			</View>
			
            )
	});
	
	
return ( 
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#53FF3B',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                       <Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
                    </Button>
                </Left>
              <Body style={{paddingLeft:this.state.paddingBody}}>
                   <Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_b.png')}
				></Image> 

                </Body>
		 <Right>
 			
	           </Right >
            </Header>
			

				
	<ScrollableTabView  style={{marginTop: 20, }} initialPage={2} renderTabBar={() => <FacebookTabBar />}>
	<View tabLabel='Mapped Users'>
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>

	<ScrollView>
		<View style={{alignItems:"center" }}>
			<Text style={{alignSelf:'center',fontSize:25,color:"#31b0d5"}}>Employee's Rating</Text>	
			</View>	
		<ParallaxView header={(
				<View style={{width:100}}>
	      			</View>
    				)} scrollableViewStyle={{ backgroundColor: '#ece5dd' }}>
    				
	<View style={styles.card}></View>

	{resultData}
	{Customer}
	{peers}
	{Supervisor}
	{Reportees}

		<View style={styles.encrypt}>
		
			<Text style={styles.subText} onPress={() => this.naviga(this.state.empid,'Rating')}>Self Rating</Text>
			</View>
	
		<View style={styles.card}></View>
		</ParallaxView>
<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
		</ScrollView>		
	</View>
	</View>
	</View>
	</View>

		<View tabLabel='DashBoard'>
		<View horizontal={true} >
		<View style={{marginTop: 5 }}><View>

		<ScrollView>
		{UserDetails}
			<ParallaxView header={(
				<View style={{width:100}}>
	      			</View>
    				)} scrollableViewStyle={{ backgroundColor: '#ece5dd' }}>
    				
			<View style={styles.card}>
				 <View style={styles.encrypt}>
					<View>
					  <Text style={styles.text}>Competency List</Text>	
					</View>
			     	 </View>
		{resultData}
			{competencyList}
    			</View>
			<View style={styles.card}>
			</View>
 		 </ParallaxView>
		</ScrollView>
<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
		</View>
	</View>
	</View>
	</View>

	<View tabLabel='Rating'>
		<View horizontal={true} >
		<View style={{marginTop: 5 }}>
		<View>


		<ScrollView>

			<View style={{alignItems:"center" }}>
			<Text style={{alignSelf:'center',fontSize:25,color:"#31b0d5"}}>Competency Score's</Text>	
			</View>	
			   


			<ParallaxView header={(
				<View style={{width:100}}>
	      			</View>
    				)} scrollableViewStyle={{ backgroundColor: '#ece5dd' }}>
					<View style={{alignItems:"center"}}>
					</View>
			<View style={styles.card}>
							
			{resultData}
			{RatingList}

    			</View>
			<View style={styles.card}>
			</View>
			 </ParallaxView>
		</ScrollView>
<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
		</View>
		</View>
		</View>
	</View>

    </ScrollableTabView>
	



<Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                         <CardItem onPress={() => this.navigate('FeedBackForm')}>
                       <Icon active name="md-text" />
                       <Text>Feed Back</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem >
 			<CardItem onPress={() => this.navigate('AskHelp')}>
                       <Icon active name="md-help" />
                       <Text>Ask for Help</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem>
 			<CardItem onPress={() =>this.navigate('Login')}>
                       <Icon active name="md-log-out" />
                       <Text>Logout</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem>
                    </Card>
		</View>
        </Modal>
        <ActionButton buttonColor="rgba(231,76,60,1)"  onPress={()=>this.showModal()}>
       
        </ActionButton>
			
		 </Container>	
	

		)

   
  }
};

var styles = StyleSheet.create({
  container: {
    paddingRight: 3,
    paddingLeft: 0.5,
    paddingTop: 5,
    paddingBottom: 10,
    height: height,
    backgroundColor: '#ffffff',
  },
dataNumber: {
    color: '#000',
    fontSize: 18
  },
headerIcon: {
    width: 75,
    height: 75,
     alignItems: 'center',
    justifyContent: 'center',
marginBottom:5	

  },
 bar: {
    alignSelf: 'center',
    borderRadius: 6,
    height: 10,
    marginRight: 5
  },
  points: {
    backgroundColor: '#F55443'
  },
menuicon:
{
 width: 75,
 height: 75,

},
titleViewText: {
    fontSize: 25,
fontStyle:'italic',	
    color: '#000',
alignSelf:'center'	
   
  },	
containernew:{
	 flex: 1,
	borderColor : 'blue',
  },
  page: {
    flex: 1,


  },
button: {
    backgroundColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
    marginTop:8,
  },
divhead:{
 backgroundColor: "#efefef",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:8,
    borderRadius: 5,


},
content:{
 backgroundColor: "#efefef",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:8,
    borderRadius: 5,


},
divcontent:{
 backgroundColor: "#dddcd2",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:8,
    borderRadius: 5,


},


  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  touchable: {
    marginTop: 20,
    fontSize: 30,
  },
  registration: {
    fontSize: 30,
    color: '#48BBEC',
    paddingBottom: 20,
    paddingTop: 20,
    alignSelf: 'center'
  },
  usernamestyle: {
    fontSize: 15,
    color: '#48BBEC',
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: 'center'
  },
  borderlayout: {
    marginLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(12,150,241)',
    borderColor: '#48BBEC',
    borderWidth: 2,
  },
  text: {
    marginLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#48BBEC',
    fontSize: 16,
  },
red: {
    color: 'red',
  },
 header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginTop: 270,
    padding: 20,
  },
  card: {
    marginTop: 10,
  },
  row: {
    height: 50,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  encrypt: {
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: '#fff',
  },
  number: {
    height: 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },
  subText: {
    fontSize: 12,
    color: '#31b0d5',
  },
  green: {
    color: '#075e54',
    fontSize: 10,
  },
});
