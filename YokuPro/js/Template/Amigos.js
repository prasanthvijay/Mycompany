
const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
const retryImg = require('../images/retry.png')
import { Container, Content, List, ListItem } from 'native-base';
import { Card,CardItem,InputGroup, Input, Picker,Icon,Header,Button,Left,Body,Right,Thumbnail,Toast} from 'native-base';
var {  StyleSheet, NetInfo,Text, View,ScrollView, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
var AlphabetListView = require('react-native-alphabetlistview');
module.exports = class Amigos extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',
   contactList : [],
    width:'',amigosDetails:[],isVisible:true,types:'Circle', resultArray:[],color: "#539DFC", size: 50,isModalVisible: false,retry:false,resultData:false,
    };

  }

async componentDidMount(){
    var companyid = await AsyncStorage.getItem("companyid");
	var url =  await AsyncStorage.getItem("url");
	this.setState({url:url });
        this.amigosload(companyid);
}
showModal(){
     this.setState({ isModalVisible: true });
     }
hideModal(){
    this.setState({ isModalVisible: false });
     }

 amigosload(companyid){
    NetInfo.isConnected.fetch().then(isConnected => {

    if(isConnected){
        var _this = this;
	var url =_this.state.url;
    	_this.setState({isVisible:true,retry:false});
	fetch(url+'manageappajax?type=amigosDetails&customerid='+companyid, {
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

                        //alert(JSON.stringify(responseData));

		if(responseData!=""){
				var resultArray = {};
				for(var i=0; i<responseData.length; i++)
				{

				var jsoninnerData = responseData[i];

				var amigosname = jsoninnerData.employeename;
				var amigoscontactno = jsoninnerData.mobileno;

	
				var char = amigosname.charAt(0);
				var firstChar=char.toUpperCase();
				var existingResultFortheChar = '';
					if(resultArray[firstChar]!=null){
					existingResultFortheChar = resultArray[firstChar];
					}
					if(amigosname!=null){
					existingResultFortheChar = existingResultFortheChar+ '        ' +amigosname+'   -   '+amigoscontactno+',';
					}

				var lastResult = [];

				var lastResultArray = existingResultFortheChar.split(",");
					for(var n=0; n<lastResultArray.length; n++ ){
					lastResult.push(lastResultArray[n]);

					}
				resultArray[firstChar] = lastResult;


				}

				var localContactList = [];
				var contact=<AlphabetListView
				data={resultArray}
				cell={Cell}
				cellHeight={30}
				sectionListItem={SectionItem}
				sectionHeader={SectionHeader}
				sectionHeaderHeight={22.5}
				/>;

				localContactList.push(contact);

			_this.setState({
			amigosDetails:responseData,isVisible:false,retry:false, contactList : localContactList
			});
   		}
            else{
                _this.setState({isVisible:false,resultData:true });
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

            await this.setState({screenType: 'Landscape', height : height,width : width,modalBody:0});

        } else {

            await this.setState({screenType: 'Portrait', height : height,width : width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2,imageheight:height/4.5});
        }

    };

  render() {





var _this=this;
        if(_this.state.retry==true){

            var retry=<View style={{alignSelf:"center",flex:1,paddingTop:150}}>

	<Text style={{color:"#000000"}}>You seem to be offline</Text>

	<Button  rounded style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}} onPress={()=>this.componentDidMount()}>
	<Text style={{color:'white'}}>Go Online</Text>
	</Button>

	</View>;
        }
        if(_this.state.resultData==true){

            var resultData=<View style={{alignSelf:"center",padding:15}}>
                <Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Learners avaliable</Text>
            </View>;
        }

    return (

    <Container >
    
        <View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>Konnect Learners</Text>
	</View>
	{resultData}
	<View style={{alignSelf:"center",}}>
	<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
	</View> 
	{retry}
    {this.state.contactList.pop()}

    </Container>
    );
  }
}

class SectionHeader extends Component {
 render() {
   var textStyle = {
    textAlign:'center',
     color:'#00000',
    fontWeight:'300',
      fontSize:    15
   };

    var viewStyle = {
      backgroundColor: '#edeceb',
     color:'#f00',
     flex: 1
    };
    return (
      <View>

<ListItem icon>
                        <Left>
                           <Image
                style={{alignSelf:"center",width:20,height:20 }}
                source={require('../images/TrainingPrograms.png')}
                ></Image>
                        </Left>
                        <Body>
                          <Text>{this.props.title}</Text>
                        </Body>
                       
                    </ListItem>


			
       
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{textAlign:'center',color:'#3b5998'}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={{height:30}}>
        <Text>{this.props.item}</Text>
      </View>
    );
  }
}


var styles = StyleSheet.create({

   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
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
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
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




