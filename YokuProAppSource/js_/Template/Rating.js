const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var Spinner = require('react-native-spinkit');

var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,Thumbnail,ListItem,Picker,Icon,Header,Left,Right,Radio,Button,Body,Title,CardItem,Card} from 'native-base';
const img = require('../images/indicator.png');
const rating = require('../images/rating.png');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

module.exports = class Rating extends Component {
 constructor(props) {
    super(props);
    this.state = {
	height : Dimensions.get('window').height,
	width : Dimensions.get('window').width,isModalVisible: false,isVisible:false,types:'Circle', color: "#FFFF45", size: 50,
	isRatingModalVisible:false,rating1:false,rating2:false,rating3:false,rating4:false,rating5:false,IndId:null,IndKey:null,userid:'',
	indicatorArray:[],ratingvaluearray:[],ratingvalue:''
    };

  }	
	
	navigate(route){
	if(this.state.isModalVisible==true){
			this.setState({isModalVisible: false});		
		}
		  this.props.navigator.push({
		    name: route, // Matches route.name
		  })
		}	
	showModal(){
			
		 this.setState({ isModalVisible: true });
		 }
	showRatingModal(){

		 this.setState({ isRatingModalVisible: true });
	}

	hideModal(){ 
		this.setState({ isModalVisible: false, isRatingModalVisible: false});
		 }
	
	async getRatingValue(){
		var IndId=this.state.IndId;
		var empid = await AsyncStorage.getItem("empid");
		var companyid = await AsyncStorage.getItem("companyid");
		var userid=this.state.userid;
		var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=getRatingValue&ratingEmployee='+userid+'&IndId='+IndId+'&ratingByempid='+empid+'&companyid='+companyid, {
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
				
				
				if(responseData[0].ratingvalue==1){ this.setState({rating1:true}); }
				else if(responseData[0].ratingvalue==2){ this.setState({rating2:true}); }
				else if(responseData[0].ratingvalue==3){ this.setState({rating3:true}); }
				else if(responseData[0].ratingvalue==4){ this.setState({rating4:true}); }
				else if(responseData[0].ratingvalue==5){ this.setState({rating5:true}); }
  				else { this.setState({ rating1:false,rating2:false,rating3:false,rating4:false,rating5:false }); }
		
		})
		this.showRatingModal();

		}
	indicatorRating(IndKey,IndId){

		this.setState({IndKey:IndKey,IndId:IndId});
		this.getRatingValue();
	
	}
	async submitRating(){
		
		var ratingValue=null;
		var IndId=this.state.IndId;
		var empid = await AsyncStorage.getItem("empid");
		var companyid = await AsyncStorage.getItem("companyid");
		var ratingBy="0";
		var userid=this.state.userid;
		if(this.state.rating1==true){
			ratingValue=1;
		}else if(this.state.rating2==true){
			ratingValue=2;
		}else if(this.state.rating3==true){
			ratingValue=3;
		}else if(this.state.rating4==true){
			ratingValue=4;
		}else if(this.state.rating5==true){
			ratingValue=5;
		}

		var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=submitRating&ratingEmployee='+userid+'&ratingValue='+ratingValue+'&IndId='+IndId+'&ratingByempid='+empid+'&ratingBy='+ratingBy+'&companyid='+companyid, {
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
	this.hideModal();
		


	}

async componentDidMount(){
	var _this = this;
	var companyid = await AsyncStorage.getItem("companyid");
	var userid=_this.props.competencyid;
		_this.setState({userid: userid})	
	var url="http://54.255.203.182/yokupro/web/manage/";
	fetch(url+'manageappajax?type=RatingList&userid='+userid+'&companyid='+companyid, {
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
					indicatorArray:responseData,isVisible:false
				});
		
		})
}

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height/6,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 ,imagewidthicon:width/1.5 ,imageheighticon:height/2,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height/3.5,
			width : width,imagewidth:width/1.1 ,
			imageheight:height/2.4,headerimagewidth:width/3 ,
			headerimageheight:height/18,paddingBody:width/7,
			imagewidthicon:width/1.5 ,imageheighticon:height/3.5,modalBody:width/2});
		}

	};



  render() {

	var details=null;
		var _this=this;
		var IndicatorList=null;	
		var indicator=null;
		var microApp = _this.state.indicatorArray.map((indicatorarray, index) => {
	
		return (
			 <Card >
                        <CardItem >
                            <Left>
				  <Thumbnail source={img} style={{width:30,height:30}}/>
                                <Body>
                              <Text style={styles.titl}>Indicator- {indicatorarray.indicatorkey} </Text>
                                </Body>
                            </Left> 
				
			</CardItem>
				<CardItem content>
					<Text style={styles.titleInd}>{indicatorarray.indicator}</Text>
                          	</CardItem>
				<CardItem >

				<Button transparent onPress={() =>this.indicatorRating(indicatorarray.indicatorkey,indicatorarray.indicaid)}>
				<Image source={rating} style={{width:20,height:20}}/>	
                                  <Text style={{color:"#000000"}}>  Rate</Text>
                              </Button>	

				</CardItem>
			</Card>
                	 )
			});
     	
	

    return (

<Container >
	 <Header style={{backgroundColor: '#6BCAE2',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Evaluate')}>
                        <Icon name='md-arrow-round-back' />
                    </Button>
                </Left>
            <Body style={{paddingLeft:this.state.paddingBody}}>
                   <Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo-2.png')}
				></Image> 

                </Body>
                <Right>
 			
	           </Right >
            </Header>
                      		<ScrollView>
        <View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>
                     
						{microApp}
		<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View>                      
       </View>
	

	       </ScrollView>
	
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
	<Modal isVisible={this.state.isRatingModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	

			<CardItem>
				<Text style={styles.titl}>Indicator- {this.state.IndKey} </Text>
			</CardItem>
		<CardItem >
					
                       	<Radio  style={{paddingLeft:50}} selected={this.state.rating1} onPress={()=>this.setState({rating1:true,rating2:false,rating3:false,rating4:false,rating5:false })}/>
			<Text> 1</Text>

			<Radio style={{paddingLeft:10}} selected={this.state.rating2} onPress={()=>this.setState({rating1:false,rating2:true,rating3:false,rating4:false,rating5:false })}/>
			<Text> 2</Text>

			<Radio style={{paddingLeft:10}} selected={this.state.rating3} onPress={()=>this.setState({rating1:false,rating2:false,rating3:true,rating4:false,rating5:false })} />
			<Text> 3</Text>

                        
			<Radio style={{paddingLeft:10}} selected={this.state.rating4} onPress={()=>this.setState({rating1:false,rating2:false,rating3:false,rating4:true,rating5:false })}/>
			<Text> 4</Text>

			<Radio style={{paddingLeft:10}} selected={this.state.rating5} onPress={()=>this.setState({rating1:false,rating2:false,rating3:false,rating4:false,rating5:true })}/>
			<Text> 5</Text>

		</CardItem>
		<CardItem>
			<Button outline info style={{height:30}} onPress={() =>this.submitRating()}>
			<Text style={{color:"#ffffff"}}>Submit</Text>
			</Button>	
                 </CardItem>
		</View>
        </Modal>


        <ActionButton buttonColor="rgba(231,76,60,1)"  onPress={()=>this.showModal()}>
       
        </ActionButton>
	
</Container >
    );
  }
}
var styles = StyleSheet.create({

	
  grad1: {
    height: 530,

  },
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
	paddingLeft: 30,
    textAlign: 'left',
    margin: 10,
    color: '#4c1cea',
  },
  welcomeNew: {
	paddingLeft: 30,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,

  },
  titl: {
     color: "#31b0d5"
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
fontStyle:'italic',	
    color: '#000',
alignSelf:'center'	
   
  },	
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },

 headerIcon: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#30dbdb'
  },
 headerIconnew: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});


