
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {

    marginTop: deviceHeight / 2.1,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
	borderColor: '#4253f4',
	shadowColor: 'blue',
	backgroundColor: '#FBFAFA',
  },
		
  btn: {
    marginTop: 20,
    alignSelf: 'center',
	width: 100,	
  },
});
