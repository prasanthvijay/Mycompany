const React = require('react');
var ReactNative = require('react-native');
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal'
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Title, Button,Icon,Card,CardItem,Radio,CheckBox } from 'native-base';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage,Animated, ScrollView,ToolbarAndroid, ListView, View, TouchableHighlight,Navigator,Dimensions,TouchableOpacity } = ReactNative;
var { Component } = React;
var Spinner = require('react-native-spinkit');
var {height, width} = Dimensions.get('window');
const logoUnder = require('../images/Under.png');
import FacebookTabBar from './FacebookTabBar';
const background = require('../images/shadow.jpg');
const logo = require('../images/person.png');	
import SelectMultiple from 'react-native-select-multiple';
const img = require('../images/TrainingPrograms.png');
module.exports = class Menu extends Component {
   constructor(props){
    super(props);
    //your codes ....
	this.state = {
    checkvar:0,contentdata:[],ratingArray:[], isVisible: true,
    color: "#53FF3B",types:'Circle', size: 70,height:'', width:'', screenType : '',empid:'',QuestionArray:[],isModalVisible: false,resultData:false,showval:'',ratingWidth:0,RatingValue:'',isVisible:true, size: 50,employeeName:"",isRatingModalVisible:false,Questiontype:'',QuestionId:"",programid:'',resultPreData:false,PostQuestionArray:[],ischeckBox:false,optionArray:'', selectedFruits: [],fruits:[],tab:1
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
	var programid=_this.props.programid;	
	_this.setState({ empid:empid,programid:programid});	
	var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=PreProgEval&companyid='+companyid+'&programid='+programid+'&empid='+empid, {
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

				if(responseData[0].Score!=""){
				_this.setState({
					tab:0
				});	
				}
				if(responseData!=""){

		   		_this.setState({
					QuestionArray:responseData,isVisible:false,
				});
				}else{
					_this.setState({
						isVisible:false,resultPreData:true
					});
				}

				
		
		})

		fetch(url+'manageappajax?type=PostProgEval&companyid='+companyid+'&programid='+programid+'&empid='+empid, {
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
					PostQuestionArray:responseData,isVisible:false
				});
				}else{
					_this.setState({
						isVisible:false,resultPreData:true
					});
				}
		
		})
		
		
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
showAnsModal(){

		 this.setState({ isRatingModalVisible: true });
	}
checkModal(){

		 this.setState({ ischeckBox: true });
	}


onSelectionsChange = (selectedFruits) => {

	   this.setState({ selectedFruits })
	
  }
	hideModal(){ 
		this.setState({ ischeckBox: false, isRatingModalVisible: false,rating1:false,rating2:false});
		 }

answerFunction(QuestionId,Questiontype,typeofquestion){

		this.setState({QuestionId:QuestionId,Questiontype:Questiontype});
		if(typeofquestion=='radio'){	
		this.showAnsModal();
		}
		else{
		
		var url="http://54.255.203.182/yokupro/web/manage/";

		fetch(url+'manageappajax?type=checkBoxValue&QuestionId='+QuestionId, {
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
				this.setState({optionArray:responseData[0].options});
			}
		})
		.done();
		this.checkModal();
		
		}
			
	}

async submitRating(type){
		
		var answer=null;
		var QuestionId=this.state.QuestionId;
		var empid = await AsyncStorage.getItem("empid");
		var companyid = await AsyncStorage.getItem("companyid");
		var Questiontype=this.state.Questiontype;
		var programid=this.state.programid;

		if(type=='radio'){
		if(this.state.rating1==true){
			answer='Yes';
		}else if(this.state.rating2==true){
			answer='No';
		}
		}
		else{
			answer="";
			ans=this.state.selectedFruits	
			for (var i in ans) {
  			  answer += ans[i].value+',';
			}
			answer = answer.replace(/,\s*$/, "");
		}
		var url="http://54.255.203.182/yokupro/web/manage/";
		fetch(url+'manageappajax?type=submitPreAndPostAnswer&QuestionId='+QuestionId+'&answer='+answer+'&empid='+empid+'&companyid='+companyid+'&Questiontype='+Questiontype+'&programid='+programid, {
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
	this.navigate('ProgramEvaluate');	
	}

navigate(route){

	 var routeNma='Evaluate';
	this.props.navigator.push({
	    name: route, 
		passProps: {
		programid:this.state.programid,
		routName:routeNma
      		}
	  })
	}

 
naviga(competencyid,route){
	var _this=this;
	this.props.navigator.push({
	    name: route, 
		passProps: {
		competencyid:competencyid,
		programid:_this.state.programid	
      		}
	  })	
}


render() {

		if(this.state.resultPreData==true){
	
			var resultData=<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Question Avaliable..!</Text>		
			</View>;			
		}		
	

	
	
	var Question = this.state.QuestionArray.map((QuestionArray, index) => {

		if(QuestionArray.Score=="" || QuestionArray.Score==undefined ){	

		    return (
				<Card >
				<CardItem key={index}>
				<Body>
				<View style={{flex:1}}>
					<Text style={styles.titleInd}>{QuestionArray.questions}</Text>
				
				</View>
					<TouchableOpacity onPress={() =>this.answerFunction(QuestionArray.questionid,'pre',QuestionArray.typeofquestion)} >
					<Text style={{color:'#F55443'}}>Click to Answer</Text>
					</TouchableOpacity>	
				</Body>
				</CardItem>
				</Card>
	
			    )
		
	}else{


 		 return (
			<Card>
			<CardItem key={index}>
			<Body>
			<View style={{flex:1}}>
				<Text style={{color:'#F55443'}}>Your Pre Program Evaluation Score: {QuestionArray.Score} %</Text>
				
			</View>								
			</Body>
			</CardItem>
			</Card>
	
            )


		}

	});

	if(this.state.optionArray!=""){	
		var optionJcs=Array;
		var string=this.state.optionArray;
		optionJcs=string.split(',');
		
		var option= <SelectMultiple
          items={optionJcs}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />;
		//this.setState({ fruits: optionJcs});
	}

	var postQuestion = this.state.PostQuestionArray.map((PostQuestionArray, index) => {

		if(PostQuestionArray.Score=="" || PostQuestionArray.Score==undefined ){	

			if(PostQuestionArray.status=="" || PostQuestionArray.status==undefined ){
			
            	return (
			<Card >
			<CardItem key={index}>
			<Body>
			<View style={{flex:1}}>
				<Text style={styles.titleInd}>{PostQuestionArray.questions}</Text>
				
			</View>
				<TouchableOpacity onPress={() =>this.answerFunction(PostQuestionArray.questionid,'post',PostQuestionArray.typeofquestion)} >
				<Text style={{color:'#F55443'}}>Click to Answer</Text>
				</TouchableOpacity>	
			</Body>
			</CardItem>
			</Card>

            )
		}
		else{
			 return (
			<Card >
			<CardItem key={index}>
			<Body>
				<View style={{alignSelf:"center"}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>{PostQuestionArray.status}</Text>		
			</View>	
			</Body>
			</CardItem>
			</Card>

            )
		}
	}
	else{

	 return (
			<Card >
			<CardItem key={index}>
			<Body>
				<View style={{alignSelf:"center"}}>
				<Text style={{color:'#F55443'}}>Your Post Program Evaluation Score: {PostQuestionArray.Score} %</Text>
			</View>	
			</Body>
			</CardItem>
			</Card>

            )
		}

	});
		
	
	 
return ( 
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
	 <Header style={{backgroundColor: '#86FF76',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('ProgramDetails')}>
                       <Icon name='md-arrow-round-back' style={{color:'#000000'}}/>
                    </Button>
                </Left>
              <Body style={{paddingLeft:this.state.paddingBody}}>
                  <TouchableOpacity onPress={() => this.navigate('MainMenu')} > 
				<Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_b.png')}

				></Image> 
		</TouchableOpacity>

                </Body>
		 <Right>
 			
	           </Right >
            </Header>
			
 		<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Program Evaluation</Text>
		</View>
		<ScrollView>

		<ScrollableTabView  style={{marginTop: 20, }} initialPage={1} renderTabBar={() => <FacebookTabBar />}>
		<View tabLabel="Pre-Prog. Eval">
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>

	<ScrollView>
	{Question}
		{resultData}
	</ScrollView>		
	</View>
	</View>
	</View>
	</View>
		<View tabLabel="Post-Prog. Eval">
	<View horizontal={true} >
	<View style={{marginTop: 5 }}><View>

	<ScrollView>
		{postQuestion}	
	</ScrollView>		
	</View>
	</View>
	</View>
	</View>
		</ScrollableTabView>

<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
			<View style={{alignSelf:"center",marginTop: 20, }}>
	
			
	</View>	
		

		</ScrollView>

		<Modal isVisible={this.state.isRatingModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	

			<CardItem>
				<Text style={styles.titl}>Answer</Text>
			</CardItem>
		<CardItem >				
                       	<Radio  style={{paddingLeft:50}} selected={this.state.rating1} onPress={()=>this.setState({rating1:true,rating2:false })}/>
			<Text>Yes</Text>

			<Radio style={{paddingLeft:10}} selected={this.state.rating2} onPress={()=>this.setState({rating1:false,rating2:true })}/>
			<Text> No</Text>
		</CardItem>
		<CardItem>
			<Button outline info style={{height:30}} onPress={() =>this.submitRating('radio')}>
			<Text style={{color:"#ffffff"}}>Submit</Text>
			</Button>	
                 </CardItem>
		</View>
        </Modal>
		<Modal isVisible={this.state.ischeckBox} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:50}}>
					<ScrollView>
			<View style={{flex:1}}>	
		      <CardItem>
				<View style={{flex:1}}>	
				{option}
				</View>
	                 </CardItem>	
		      <CardItem>
			<Button outline info style={{height:30}} onPress={() =>this.submitRating('checkbox')}>
			<Text style={{color:"#ffffff"}}>Submit</Text>
			</Button>	
                 </CardItem>
		</View>
						</ScrollView>
        </Modal>

			
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
    fontSize: 20,
    color: '#3b5998',
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
    fontSize: 15,
    color: '#31b0d5',
  },
  green: {
    color: '#075e54',
    fontSize: 10,
  },
});
