const React = require('react');
var ReactNative = require('react-native');
import { Container, Content, Left, Body, Right, ListItem, Thumbnail, Header, Title, Button,Icon } from 'native-base';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage, ScrollView,ToolbarAndroid, ListView, View, TouchableHighlight,Navigator,Dimensions,TouchableOpacity } = ReactNative;
var { Component } = React;
var {height, width} = Dimensions.get('window');

import ParallaxView from 'react-native-parallax-view';
import FacebookTabBar from './FacebookTabBar';
const background = require('../images/shadow.jpg');
const logo = require('../images/person.png');	
module.exports = class Menu extends Component {

state = {
    checkvar:0,
    contentdata:[],
    isVisible: true,
    color: "#0D1F6B", 
    size: 70,
    height:'', 
    width:'',
    screenType : '',
mainMenuArray:'',
showval:'',
  };
   constructor(props){
    super(props);
    //your codes ....
	}

async componentDidMount(){
	var empid = await AsyncStorage.getItem("empid");
	var customerid = await AsyncStorage.getItem("customerid");
	var _this=this;
	var url="http://54.255.203.182/yokupro/web/manage/";
		//alert(url+'manageappajax?type=mainMenu&customerid='+customerid+'&empid='+empid);
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
					mainMenuArray:responseData,
				});
		
		})
		.done();
}
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7});
		}

	};

navigate(route){

	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}
showcontent(val) {
var _this = this;
if(val != '')
{
	_this.setState({
	showval:val,
	});
}
 
}
render() {

var showval= this.state.showval;
contentarray=[];
if(showval !="")
{
contentarray.push(<View style={[styles.divcontent,{width:320}]}><Text style={{color: 'dodgerblue'}}>Jhon</Text><Text style={{color: 'dodgerblue'}}>Assessment</Text></View>);
}


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
 			<Button transparent onPress={() => this.navigate('FeedBackForm')}>
                       	  <Icon name='md-text'  style={{color:'#000000'}}/>
                    	</Button>     
	           </Right >
            </Header>
			
			
				
	<ScrollableTabView 
	
      style={{marginTop: 20, }}
      initialPage={2}
      renderTabBar={() => <FacebookTabBar />}
    >
    <View tabLabel='Mapped Users'><View horizontal={true} ><View style={{marginTop: 5 }}><View><ScrollView style={{borderWidth:3}}><TouchableOpacity activeOpacity={.5}   onPress={() => this.rowPressed()} ><View style={styles.button}><Text style={{color: 'dodgerblue'}}>Rating</Text></View></TouchableOpacity></ScrollView></View></View></View></View>





<View tabLabel='DashBoard'><View horizontal={true} ><View style={{marginTop: 5 }}><View><ScrollView style={{borderWidth:3}}><View style={styles.button} onLayout={(event) => this.handleLayoutChange(event)}>

			<View style={styles.headerIcon}   ><Image style={styles.menuicon}  source={require('../images/person.png')} /></View>
<ParallaxView
	


    header={(

      <View style={{width:800}}>

        <Text style={[styles.title,{color: 'dodgerblue'}]}>User Name</Text>
      </View>
    )}
    scrollableViewStyle={{ backgroundColor: '#ece5dd' }}
  >
    <View style={styles.card}>
      
      
      <View style={styles.encrypt}>
        <View>
          <Text style={styles.text}>User Profile</Text>
          <Text style={styles.subText}>Jhon</Text>
        </View>
       

      </View>
    </View>
<View style={styles.card}>
      
      
      <View style={styles.encrypt}>
        <View>
          <Text style={styles.text}>Comptency</Text>
          <Text style={styles.subText}>Tyre concept MOdule View Files</Text>
        </View>
       

      </View>
    </View>
    <View style={styles.card}>
      
      <View style={styles.number}>

        <View style={{ flexDirection: 'row' }}>
          
        </View>
      </View>
    </View>
  </ParallaxView>


</View></ScrollView></View></View></View></View>

<View tabLabel='Rating'><View horizontal={true} ><View style={{marginTop: 5 }}><View><ScrollView style={{borderWidth:3}}><View style={styles.button}>
<View style={[styles.divhead,{width:500}]} >

<View style={[styles.content,{borderWidth: 1,width:350, backgroundColor: "#bbedc7"}]}> 
<View>
<TouchableOpacity activeOpacity={.5}   onPress={() => this.showcontent('test')} >
<Text style={{color: 'dodgerblue',marginTop: 5,marginLeft: 5,marginBottom: 5,marginRight: 5}}>Manager</Text>

</TouchableOpacity>
</View>

{contentarray}

</View>
</View>
</View></ScrollView></View></View></View></View>
    </ScrollableTabView>
			
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
headerIcon: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
menuicon:
{
 width: 200,
    height: 200,

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
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:8,
    borderRadius: 5,


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
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
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
    color: 'blue',
  },
  green: {
    color: '#075e54',
    fontSize: 10,
  },
});
