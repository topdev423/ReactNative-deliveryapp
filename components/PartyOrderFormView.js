import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import {loadSubmitResult} from '../redux/actions/partyOrderActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import CheckBox from 'react-native-check-box';
import EmailValidator from 'email-validator';
import {saveCurrentPage} from '../redux/actions/tabInfoAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class PartyOrderFormView extends Component{

	constructor(props) {
	  super(props);

	  this.state = {
	  	first_name:'',
	  	last_name:'',
	  	phone_number:'',
	  	email_address:'',
	  	company_name:'',
	  	title:'',
	  	date:'',
	  	time:'',
	  	event_venue:'',
	  	experted_attendees:'',
		loadingText: 'Submiting...',
		ToolBar: this.props.showToolBar ? this.props.showToolBar : false,
		bartender_state: false,

		first_name_req:false,
		last_name_req:false,
		email_address_req:false,
		phone_req:false,
		date_req:false,
		experted_attendees_req:false
	  };
		
	}

	componentDidMount(){
		this.props.saveCurrentPage('partyOrders');
	}

	componentWillReceiveProps(nextProps){

		const {submitResult} = nextProps.partyOrderForm;
		if (submitResult){
			if(submitResult.success == true){
				this.onPressHandle1()
			}else{
				this.onPressHandle2()
			}
		} else{
			console.log('submitResult failed')
		}
	}

	formatFirstName(name) {
		var x = name.replace(/[(\W\d_]/g, " ").replace(/[\s]+/g, " ");
		this.setState({first_name: x});
	}
	formatLastName(name) {
		var x = name.replace(/[(\W\d_]/g, " ").replace(/[\s]+/g, " ");
		this.setState({last_name: x});
	}

	_checkForResFields(){
		const {first_name, first_name_req, last_name, last_name_req, email_address, email_address_req, phone_number, date, date_req, time, phone_number_req, experted_attendees, experted_attendees_req} = this.state;
		if (first_name == '')
			this.setState({first_name_req:true});
		else
			this.setState({first_name_req:false});
		if (last_name == '')
			this.setState({last_name_req:true});
		else
			this.setState({last_name_req:false});
		if (email_address == '')
			this.setState({email_address_req:true});
		else
			this.setState({email_address_req:false});
		if (phone_number == '')
			this.setState({phone_number_req:true});
		else
			this.setState({phone_number_req:false});
		if (date == '')
			this.setState({date_req:true});
		else
			this.setState({date_req:false});

		if (time == '')
			this.setState({date_req:true});
		else
			this.setState({date_req:false});

		if (experted_attendees == '')
			this.setState({experted_attendees_req:true});
		else
			this.setState({experted_attendees_req:false});

	}

	_onSubmit(){
		const {clientTokenResult} = this.props;
		if (clientTokenResult) {
			clientToken = 'Bearer ' + clientTokenResult.access_token;
		}

		this._checkForResFields();
		const {first_name, last_name, company_name, title, email_address, phone_number, date, time, event_venue, experted_attendees, bartender_state} = this.state;

		if (EmailValidator.validate(email_address)){
			if (first_name== ''|| last_name ==''|| company_name ==''|| title =='' || email_address==''|| phone_number ==''|| date == undefined || time ==''|| event_venue == ''|| experted_attendees== ''){
			}else{
				this.props.loadSubmitResult(first_name, last_name, company_name, title, email_address, phone_number, date.substring(8,10), date.substring(5,7),date.substring(0,4), time, event_venue, experted_attendees, bartender_state, clientToken)
			}
		}
		else
		{
			if (email_address != '')
				this.showAlert('Error', 'Invalid email address!');
		}

		// EmailValidator.validate_async(email_address, function(err, isValidEmail) {
		// 	if (isValidEmail){
		// 		if (first_name== ''|| last_name ==''|| company_name ==''|| title =='' || email_address==''|| phone_number ==''|| date == undefined || time ==''|| event_venue == ''|| experted_attendees== ''|| bartender_state ==''){
		// 		}else{
		// 			this.props.loadSubmitResult(first_name, last_name, company_name, title, email_address, phone_number, date.substring(8,10), date.substring(5,7),date.substring(0,4), time, event_venue, experted_attendees, bartender_state, clientToken)
		// 		}
		// 	}
		// 	else
		// 	{
		// 		this.onPressHandle1();
		// 	}
		// });		
		
	}

	showAlert(title, content){
		this.popup.tip({
            title: title,
            content: [content],
            btn: {
                text: 'OK',
                style: {
				},
            },
        });
	}

	onPressHandle1(){

		this.popup.tip({
            title: 'Success',
            content: ['Your message has been sent!'],
            btn: {
                text: 'OK',
                style: {
                },
            },
        });
	}
	onPressHandle2(){

		this.popup.confirm({
            title: 'Alert',
            content: ['Sorry, Can`t Contact Admin, Please Try Later!'],
            ok: {
                text: 'YES',
                style: {
                    color: 'red'
                },
                // callback: () => {
                //     this.popup.alert('Good!');
                // },
            },
            cancel: {
                text: 'NO',
                style: {
                    color: 'blue'
                },
                // callback: () => {
                // },
            },
        });
	}

	onClick(data){
		
		this.setState({bartender_state: !this.state.bartender_state})

	}

	formatPhoneNumber (phone_number) {

	  var x = phone_number.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	  phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
	  this.setState({phone_number:phone_number})
	};

	render(){

		var data = {};
		var now = new Date();
		var tomorrow = new Date();
		tomorrow.setDate(now.getDate() + 1);
		var today = tomorrow.getFullYear() + '-' + (tomorrow.getMonth()+1) + '-' + (tomorrow.getDate());
		console.log('today', today);
	
		return(
			<View style={styles.bg}>
			  	<ScrollView 
			  		keyboardShouldPersistTaps={true}
			  		// keyboardDismissMode = {'on-drag'}
			  		style={{height:screen_height - 50}}>
			  		<View style={{height:60,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
				  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
				  			<Text style={{fontSize:19,color:'#7e5d91'}}>Party Orders</Text>
				  			<Text style={{fontSize:12,color:'#58595b'}}>Please enter contact info and we will be in touch shortly.</Text>
				  		</View>
				  	</View>
				  	<View>
				  		<TextInput
				  		  	returnKeyType={"next"}
				  		  	onSubmitEditing={(event)=>this.refs.last_name.focus()}
			  				onChangeText={first_name=>this.formatFirstName(first_name)}
			  				value={this.state.first_name}
			  				placeholder={'First Name'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.first_name_req ? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>First name is required.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='last_name'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.phone_number.focus()}
			  				onChangeText={last_name=>this.formatLastName(last_name)}
			  				value={this.state.last_name}
			  				placeholder={'Last Name'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.last_name_req ? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>Last name is required.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='phone_number'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.email_address.focus()}
				  			keyboardType={'numeric'}
			  				onChangeText = {(phone_number)=> this.formatPhoneNumber(phone_number)}
			  				value={this.state.phone_number}
			  				placeholder={'Phone Number'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.phone_number_req? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>Phone is required.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='email_address'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.company_name.focus()}
			  				onChangeText={(email_address)=>this.setState({email_address,email_addressError:''})}
			  				autoCorrect={false} 
    						autoCapitalize='none'
			  				value={this.state.email_address}
			  				placeholder={'Email Address'}
							keyboardType="email-address"
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.email_address_req ? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>The email field is required.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='company_name'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.title.focus()}
			  				onChangeText={(company_name)=>this.setState({company_name, company_nameError:''})}
			  				autoCorrect={false} 
			  				value={this.state.company_name}
			  				placeholder={'Company Name'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='title'
			  				onChangeText={(title)=>this.setState({title, titleError:''})}
			  				value={this.state.title}
			  				placeholder={'Title'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:15}}></View>
				  	</View>
				  	<View >
				  		<View style={{flexDirection:'row',backgroundColor:'#F1F2F2'}}>
				  			<View style={{flex:1,marginRight:1.5}}>
				  				<DatePicker
								  style={{width:screen_width*0.5 - 1.5,backgroundColor:'#FFF'}}
								  date={this.state.date}
								  mode="date"
								  placeholder="Event Date"
								  format="YYYY-MM-DD"
								  minDate={today}
								  maxDate="2049-12-31"
								  confirmBtnText="Confirm"
								  cancelBtnText="Cancel"
								  iconSource={require('../assets/images/calander_icon.png')}
								  customStyles={{
								    dateIcon: {
								      position: 'absolute',
								      right: 15,
								      top: 8,
								      width:24,
								      height:25,
								    },
								    dateInput: {
								      marginLeft:0,
								      borderColor:'#FFF'
								    },
								    placeholderText:{
								    	color:'#414042',
								    	left:10,
								    	position:'absolute',
								    	top:10,
								    	fontSize:15
								    }
								  }}
								  onDateChange={(date) => {this.setState({date: date, dateError:''})}}
								/>
				  			</View>
				  			<View style={{flex:1,marginLeft:1.5}}>
				  				<DatePicker
								  style={{width:screen_width*0.5 - 1.5,backgroundColor:'#FFF'}}
								  date={this.state.time}
								  mode="time"
								  placeholder="Event Time"
								  format="HH:mm"
								  confirmBtnText="Confirm"
								  cancelBtnText="Cancel"
								  iconSource={require('../assets/images/clock_icon.png')}
								  customStyles={{
								    dateIcon: {
								      position: 'absolute',
								      right: 10,
								      top: 8,
								      marginRight:15,
								      width:25,
								      height:25,
								    },
								    dateInput: {
								      marginLeft:0,
								      borderColor:'#FFF'
								    },
								    placeholderText:{
								      color:'#414042',
								      left:10,
								      position:'absolute',
								      top:10,
								      fontSize:15
								    }
								  }}
								  onDateChange={(time) => {this.setState({time: time, timeError:''})}}
								/>
				  			</View>
				  		</View>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.date_req ? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>Please select Event Date.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='event_venue'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.experted_attendees.focus()}
			  				onChangeText={(event_venue)=>this.setState({event_venue})}
			  				value={this.state.event_venue}
			  				placeholder={'Event Venue'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  	</View>
				  	<View>
				  		<TextInput
				  			ref='experted_attendees'
				  			returnKeyType={"next"}
				  			onSubmitEditing={()=>this.refs.title.focus()}
			  				onChangeText={(experted_attendees)=>this.setState({experted_attendees})}
			  				value={this.state.experted_attendees}
			  				keyboardType={'numeric'}
			  				placeholder={'Expected Attendees'}
			  				placeholderTextColor="#414042"
			  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
				  		/>
				  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  		{
				  			this.state.experted_attendees_req ? 
							<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:12,color:'#58595b'}}>The attendees field is required.</Text>
					  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
				  			</View> : 
				  			null
				  		}
				  	</View>
				  	<View style={{backgroundColor:'#F1F2F2', flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
				  		
			  			<CheckBox
						    style={{flex: 1, padding: 10, marginLeft: 15}}
						    onClick={()=>this.onClick(data)}
						    isChecked={false}
						    rightText={'Need a Bartender?'}
						   	rightTextStyle = {{fontSize:14.5}}
						/>

				  	</View>
				  	<View style={{height:300}}/>
				</ScrollView>
				<View style={styles.submitView}>
			  		<TouchableOpacity onPress={()=>this._onSubmit()} style={{backgroundColor:'#7e5d91',justifyContent:'center', alignItems:'center',flex:1}}>
			  			<Text style={{fontSize:20,color:'#FFF'}}>SUBMIT</Text>
			  		</TouchableOpacity>
			  	</View>
			  	<Popup ref={popup =>this.popup=popup}/>
			</View>
		)
	};
}

const styles= StyleSheet.create({

	bg: {
		backgroundColor: '#F1F2F2',
		flexDirection:'column',
		flex:1
	},

	submitView: {
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'#7e5d91',
		height:50,
		position:'absolute',
		bottom:77,
		width:screen_width,
	},

})


export default connect(
  state => ({
  	partyOrderForm: state.partyOrderForm,
  	clientTokenResult: state.userRegister.clientTokenResult
  }),{loadSubmitResult, saveCurrentPage})(PartyOrderFormView);