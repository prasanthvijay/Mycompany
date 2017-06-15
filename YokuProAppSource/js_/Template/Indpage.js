const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var Spinner = require('react-native-spinkit');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Icon,Header,Button,Title,Left,Body,Right,Card,CardItem,Thumbnail,Toast} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, Navigator ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,NetInfo } = ReactNative;
var { Component } = React;
const logo = require('../images/summary-icon.png');
const img = require('../images/indicator.png');
const michelin = require('../images/services-bib.png');
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',subCompetencyArray:[],isVisible:true,types:'Circle', color: "#FFFF45", size: 50,isModalVisible: false

    };

  }
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async componentDidMount(){
	var _this = this;
	var companyid = await AsyncStorage.getItem("companyid");
	var competencyid=_this.props.competencyid;
	var url="http://54.255.203.182/yokupro/web/manage/";
	fetch(url+'manageappajax?type=IndicatorList&competencyid='+competencyid+'&companyid='+companyid, {
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
					subCompetencyArray:responseData,isVisible:false
				});
		
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

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,modalBody:0 });
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/3});
		}

	};

	
  render() {
		var details=null;
		var _this=this;
		var IndicatorList=null;	
		var indicator=null;

	var microApp = this.state.subCompetencyArray.map((subCompetencyArray, index) => {

			IndicatorList = subCompetencyArray.indicator.map((indicatorArray, index) => {
			return (
				indicator= <CardItem key={index}>
					<Text style={styles.titl}>Indicator-{indicatorArray.indicatorkey}: <Text style={styles.titleInd}>{indicatorArray.indicator}</Text></Text>	
                          	</CardItem>
	
				)
			});

		return (
			
		
			 <Card >
                        <CardItem>
                            <Left>
				  <Thumbnail source={img} />
                                <Body>
                              <Text style={styles.titl}> {subCompetencyArray.subcompetency} </Text>
                                </Body>
                            </Left> 							
                          </CardItem>
		                  {IndicatorList}
  			
				</Card>
                	 )
			});
     	



		
    return (
	<Container >
 	<Header style={{backgroundColor: '#FFFF45',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('Evaluate')}>
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
		 <View style={styles.headerTitleView}>
	<Text style={styles.titleViewText}>Indicator's List</Text>
	</View>
	        <ScrollView>
        <View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>
						{microApp}
		<View style={{alignSelf:"center",}}>
			<Spinner style={styles.spinner}  isVisible={this.state.isVisible} size={this.state.size} type={this.state.types} color={this.state.color}/>
			</View>                      
       </View>
	

	       </ScrollView>	
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
  titleInd: {
     color: "black",
  },
  titl: {
     color: "#31b0d5"
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


