import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
// import AppList from 'react-native-installed-apps';
// var SplashScreen = require('@remobile/react-native-splashscreen');

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export default class AgeCheckView extends Component{

	componentWillMount() {
		AsyncStorage.setItem('signin_type', JSON.stringify('false'));
	}

	componentDidMount() {
        // SplashScreen.hide();
        AsyncStorage.setItem('firstSignIn', JSON.stringify('false'));
		// AppList.getAll((apps) => {
		  // console.log('installed apps:',apps); // array of objects [{ app: 'AppName.app', appPath: '/path/of/the/app', info: plistInfoObject }] 
		// });
	}

	_onBtnNo() {
		Alert.alert(
			'Warning',
			'We’re sorry! You must be 21 years of age or older to use boozeapp',
			[
				{text: 'OK', onPress: () => console.log('alert'), style: 'cancel'},
			]
		);
	}

	render(){
		return(
			<View style={styles.bg}>
			{ (screen_height > 568 ) ?
			  	<View style={{height:193, backgroundColor:'#FFF'}}>
			  		<Image source={require('../assets/images/logo.png')}resizeMode={Image.resizeMode.contain} style={styles.LogoImage}/>
			  	</View>
			  	:
			  	<View style={{height:150, backgroundColor:'#FFF'}}>
			  		<Image source={require('../assets/images/logo.png')}resizeMode={Image.resizeMode.contain} style={styles.LogoImage}/>
			  	</View>
			}

			  	<View style={{height:35, backgroundColor:'#FFF'}}>
			  		<Text style={styles.PageTitle}>We Deliver To</Text>
			  	</View>

			  	<View style={{flex:1, backgroundColor:'#FFF'}}>
			  		<Image source={require('../assets/images/sp_screen.png')} resizeMode={Image.resizeMode.contain} style={styles.Sp_ScreenImage}/>
			  	</View>
			  	<View style={{height:50}}>
			  		<Text style={{fontSize:30,color:'#58595b'}}> ARE YOU OVER 21? </Text>
			  	</View>
			  	<View style={{flexDirection:'row'}}>

		  			<TouchableOpacity onPress={()=>this._onBtnNo()} style={{flex:1,backgroundColor:'#DC754C',height:50, justifyContent:'center',alignItems:'center',marginTop:5}}>
		  				<Text style={{fontSize:20, color:'#FFF'}} >NO</Text>
		  			</TouchableOpacity>

		  			<TouchableOpacity onPress={Actions.address} style={{flex:1,backgroundColor:'#7E5D91',height:50, justifyContent:'center',alignItems:'center',marginTop:5}} >
		  				<Text style={{fontSize:20, color:'#FFF'}} >YES</Text>
		  			</TouchableOpacity>

			  	</View>
			</View>
		)
	}
}

const styles= StyleSheet.create({

	bg: {
		backgroundColor: 'white',
		flexDirection:'column',
		justifyContent:'center',
		alignItems: 'center',
		flex:1
	},

	LogoImage:{
		width:261.5,
		height:71.5,
		marginTop:50
	},

	PageTitle:{
		fontSize:20,
		color:'#58595b'
	},

	Sp_ScreenImage:{
		width:271.5,
		height:271.5,

	}

})
