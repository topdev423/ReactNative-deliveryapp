import React, {Component} from 'react';
import {StyleSheet, Image, View, Text,  TouchableOpacity, TextInput, Button, Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import {loadNonServiceEmail} from '../redux/actions/nonServiceAreaActions';
import {connect} from 'react-redux';
import Popup from 'react-native-popup';
import EmailValidator from 'email-validator';

class NonServiceAreaView extends Component{

	 constructor(props) {

	   super(props);

		//console.log('@@@@initProps', props)

	   this.state = {

	   	email_address:''

	   };
	   
	 }
	 
 	componentWillReceiveProps(nextProps){

	  const {nonServiceArea} = nextProps;

	  if(nonServiceArea){

	  	//console.log('***result2', result)

	  	if(nonServiceArea.success == true){
	  		this.props.closeModal();
	  		// Actions.productCategory()

	  	}else{
	  		
	  		//console.log('**false', result.success)
	  		//onPress= this.onPressHandle2()
	  	}
	  }
	}

	_onSubmit(){

		const {email_address} = this.state;
		const {clientTokenResult, geoCodeForm} = this.props;

		if (clientTokenResult) {
			clientToken = 'Bearer ' + clientTokenResult.access_token;
			
		}

		//console.log('**email_address',email_address)
		

		if(email_address){			
			/**
				Submit address Infomation to nonServiceAreaAction
			**/

			var street= this.props.geoCodeForm.selectedList.street
			var city= this.props.geoCodeForm.selectedList.city
			var state= this.props.geoCodeForm.selectedList.state
			var zipCode= this.props.geoCodeForm.selectedList.zipCode
			
			if (EmailValidator.validate(email_address)){
				this.props.loadNonServiceEmail(street, city, state, zipCode, email_address, clientToken);
			}else
			{
				if (email_address != '')
				{
					Alert.alert(
						'Error',
						'Invalid email address!',
						[
							{text: 'OK', onPress: () => console.log('alert'), style: 'cancel'},
						]
					)
				}
			}
			//this.props.closeModal;
		}
	};

	render(){
	 	return(
	 		<View>
		 		<View style={{flexDirection:'column', width:316,height:317,backgroundColor:'#FFF',borderRadius:5,marginTop:20}}>
			 		<View style={{justifyContent:'flex-end', alignItems:'center',flexDirection:'row'}}>
			 			<TouchableOpacity onPress={this.props.closeModal}>
			 				<Image source={require('../assets/images/close_icon.png')} resizeMode={Image.resizeMode.contain} style={{width:13,height:13, marginRight:10,marginTop:6}}/>
			 			</TouchableOpacity>
			 		</View>
		 			<View style={{flexDirection:'column',flex:1.65}}>
		 				<View style={{flex:1,alignItems:'center',backgroundColor:'#FFF'}}>
		 					<Text style={{fontSize:22, color:'#494D4F',fontWeight:'bold'}}>Sorry, we do not</Text>
			 				<Text style={{fontSize:22, color:'#494D4F',fontWeight:'bold'}}>currently service your area.</Text>
			 				<Text style={{fontSize:15.5, marginTop:5, color:'#494D4F',fontStyle:'italic'}}>Your zip code has been entered</Text>
			 				<Text style={{fontSize:15.5,color:'#494D4F',fontStyle:'italic'}}>into our request database.</Text>
		 				</View>
		 				<View style={{flex:1,alignItems:'center',backgroundColor:'#FFF',marginTop:50}}>
		 					<Text style={{fontSize:15.5,color:'#494D4F',marginTop:-10}}>Enter your email address below.</Text>
		 					<Text style={{fontSize:15.5,marginTop:5,color:'#494D4F'}}>We will contact you when we</Text>
		 					<Text style={{fontSize:15.5,color:'#494D4F'}}>start servicing your area!</Text>
		 				</View>
		 			</View>
		 			<View style={{flex:1,flexDirection:'column'}}>
			 			<View style={{flex:1, backgroundColor:'#F1F2F2'}}>
			 				<TextInput
			 					autoFocus={true}
			 					style={{height:55,textAlign:'center'}}
			 					autoCorrect={false} 
			 					onChangeText={(email_address)=>this.setState({email_address})}
			 					value={this.state.address}
			 					placeholder={"Your Email Address"}
			 					placeholderTextColor="#494D4F"
			 					keyboardType="email-address"
			 				/>
			 			</View>
			 			<View style={{flex:1, backgroundColor:'#7e5d91',borderBottomWidth:1,borderBottomColor:'#FFF',borderLeftWidth:2,borderLeftColor:'#FFF',borderRightWidth:2,borderRightColor:'#FFF',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
			 				<TouchableOpacity onPress={()=>this._onSubmit()} style={{flex:1,justifyContent:'center', alignItems:'center'}}>
			 					<Text style={{fontSize:20.5, color:'#FFF'}}>Submit</Text>
			 				</TouchableOpacity>
			 			</View>	
		 			</View>
				</View>
				<Popup ref={popup =>this.popup=popup}/>
			</View>
	 	)
 	}
}

export default connect(
   state => ({nonServiceArea: state.nonServiceArea.result, geoCodeForm: state.geoCodeForm, clientTokenResult: state.userRegister.clientTokenResult}),{loadNonServiceEmail})(NonServiceAreaView);

