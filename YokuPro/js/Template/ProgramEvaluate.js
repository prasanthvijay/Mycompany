const React = require('react');
var ReactNative = require('react-native');
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal'
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Title, Button,Icon,Card,CardItem,Radio,CheckBox } from 'native-base';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage,Animated, ScrollView,ToolbarAndroid, ListView, View,NetInfo, TouchableHighlight,Navigator,Dimensions,TouchableOpacity } = ReactNative;
var { Component } = React;
var Spinner = require('react-native-spinkit');
var {height, width} = Dimensions.get('window');
import FacebookTabBar from './FacebookTabBar';
import SelectMultiple from 'react-native-select-multiple';
module.exports = class Menu extends Component {
   constructor(props){
    super(props);
    //your codes ....
	this.state = {
    checkvar:0,contentdata:[],ratingArray:[], isVisible: true,
    color: "#53FF3B",types:'Circle', size: 70,height:'', width:'', screenType : '',empid:'',QuestionArray:[],isModalVisible: false,resultData:false,showval:'',ratingWidth:0,RatingValue:'',isVisible:true, size: 50,employeeName:"",isRatingModalVisible:false,Questiontype:'',QuestionId:"",programid:'',resultPreData:false,PostQuestionArray:[],ischeckBox:false,optionArray:'', selectedFruits: [],fruits:[],tab:1,postStatus:false,retry:false
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
	var url =  await AsyncStorage.getItem("url");
	var _this=this;
	var programid=_this.props.programid;	
	_this.setState({ empid:empid,programid:programid,url:url});	
	_this.postProgramFunction(companyid,programid,empid);	
	_this.preProgramFunction(companyid,programid,empid);	
		
		
}
preProgramFunction(companyid,programid,empid)
{

	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this=this;
	var url =_this.state.url;

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

alert(JSON.stringify(responseData));
				
				if(responseData!=""){

		   		_this.setState({
					QuestionArray:responseData,isVisible:false,retry:false
				});
				}else{
					_this.setState({
						isVisible:false,resultPreData:true,retry:false
					});
				}
				if(responseData[0].Score==undefined){
				_this.setState({
					tab:0,postStatus:false
				});	
				}
				else{
				_this.setState({
					postStatus:true
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
postProgramFunction(companyid,programid,empid)
{
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

	var _this=this;
	var url =_this.state.url;

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
					PostQuestionArray:responseData,isVisible:false,retry:false
				});
				}else{
					if(this.state.postStatus==true){
					_this.setState({
						isVisible:false,resultPostData:true,retry:false
					});
					}
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
		
		var url =this.state.url;

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
		var url =this.state.url;

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
	
			var resultpreData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Pre-evaluation Questions available</Text>		
			</View>;			
		}		
		if(this.state.resultPostData==true){
	
			var resultpostData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Post-evaluation Questions available</Text>		
			</View>;			
		}		
	

	
	
	var Question = this.state.QuestionArray.map((QuestionArray, index) => {

		if(QuestionArray.Score=="" || QuestionArray.Score==undefined ){	

		    return (
				
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
				
				
	
			    )
		
	}else{


 		 return (
			
			<CardItem key={index}>
			<Body>
			<View style={{flex:1}}>
				<Text style={{color:'#F55443'}}>Congratulations. You have completed your Pre Program Evaluation. Your Score is: {QuestionArray.Score} %</Text>
				
			</View>								
			</Body>
			</CardItem>
			
            )


		}

	});
		

	var PreQuestion=<Card>
			<CardItem>
				<View><Text style={{ fontWeight: 'bold'}} >Pre Program</Text>
				</View>
			</CardItem>		
			{Question}</Card>;


	if(this.state.optionArray!=""){	
		var optionJcs=Array;
		var string=this.state.optionArray;
		optionJcs=string.split(',');
		
		var option= <SelectMultiple
          items={optionJcs}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />;
	}

	var Questionpost = this.state.PostQuestionArray.map((PostQuestionArray, index) => {

		if(PostQuestionArray.Score=="" || PostQuestionArray.Score==undefined ){	

			if(PostQuestionArray.status=="" || PostQuestionArray.status==undefined ){
			
            	return (
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

            )
		}
		
	}
	else{

	 return (
			<CardItem key={index}>
			<Body>
				<View style={{alignSelf:"center"}}>
				<Text style={{color:'#F55443'}}>Congratulations. You have completed your Post Program Evaluation. Your Score is: {PostQuestionArray.Score} %</Text>
			</View>	
			</Body>
			</CardItem>

            )
		}

	});
	if(this.state.postStatus==true){	
	var postQuestion=<Card >
				<CardItem>
				<View><Text style={{ fontWeight: 'bold'}} >Post Program</Text>
				</View>
			</CardItem>		
			{Questionpost}
			</Card>;
	}
	 
if(this.state.retry==true){
	
			var retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;
}

return ( 
	<Container onLayout={(event) => this.handleLayoutChange(event)}>
			
 		<View style={{backgroundColor:'#e3ebfc'}}>
			<Text style={styles.titleViewText}>Program Evaluation</Text>
		</View>
		

	<ScrollView>
		{PreQuestion}
{resultpreData}	

		{postQuestion}	
{resultpostData}	
			<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View> 
				
	{retry}
		
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
