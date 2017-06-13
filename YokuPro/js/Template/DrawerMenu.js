import React, { Component, PropTypes } from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,AsyncStorage
} from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state={route: 0,customername:''}
    this.navigateTo = this.navigateTo.bind(this);

  }   
	async componentDidMount(){
	var customername = await AsyncStorage.getItem("employeename");
	var imagepath = await AsyncStorage.getItem("imagepath");
	this.setState({customername : customername,imagepath:imagepath})
    	}

  navigateTo(index,type) {
    this.props.navigate(index,type);
  }

  render() {

    return(
      <ScrollView style={styles.drawer}>
        <View style={styles.header} key={0}>
          <View style={styles.headerIcon} key={0}>
		<Image style={{width:50,height:50}} source={{uri:this.state.imagepath}}
		/>
	
          </View>
          <View style={styles.headerInfo} key={1}>
  <Text style={styles.headerEmail} key={1}>
		{this.state.customername}
            </Text>
           <Image
			style={{alignSelf:"center",width:110,height:30 }}
			source={require('../images/logo_w.png')}

			></Image> 
          
          </View>
        </View>
        <View style={styles.content} key={1}>

          <View>         
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'MainMenu')}
		>
		<Text style={styles.listItemTitle}>Menu</Text>

		</TouchableOpacity>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'YokuPro')}
		>
		<Text style={styles.listItemTitle}>YokuPro</Text>

		</TouchableOpacity>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'Konnect')}
		>
		<Text style={styles.listItemTitle}>Konnect</Text>

		</TouchableOpacity>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'ProgramDetails','Resources')}
		>
		<Text style={styles.listItemTitle}>Resources</Text>

		</TouchableOpacity>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'ProgramDetails','Evaluate')}
		>
		<Text style={styles.listItemTitle}>Evaluate</Text>

		</TouchableOpacity>
<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'ProgramDetails','Events')}
		>
		<Text style={styles.listItemTitle}>Events</Text>

		</TouchableOpacity>
<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'ProgramDetails','Amigos')}
		>
		<Text style={styles.listItemTitle}>Amigos</Text>

		</TouchableOpacity>
<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'ProgramDetails','Synopsis')}
		>
		<Text style={styles.listItemTitle}>Synopsis</Text>

		</TouchableOpacity>
<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this, 'Quotes')}
		>
		<Text style={styles.listItemTitle}>Nuggets</Text>

		</TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    );
  }
}

DrawerMenu.propTypes = {
  navigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    height: 150,
    flex: 1,
    padding: 16,
    backgroundColor: '#1E88E5'
  },
  content: {
    flex: 3,
    padding: 16,
    backgroundColor: '#64BFFF'
  },
  headerInfo: {
    height: 40
  },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 55,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20
  },
  headerEmail: {
    color: '#fff',
    fontSize: 18
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 30,
    marginBottom: 10,
  },
  listItemTitle: {
    fontSize: 15,
    flexShrink: 1,
    color: '#fff'
  },
  listItemImage: {
    width: 80,
    height: 80,
    borderRadius: 7,
    marginRight: 10,
  }
});

export default DrawerMenu;
