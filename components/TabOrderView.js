import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, TextInput} from 'react-native'
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import {loadSubmitResult} from '../redux/actions/partyOrderActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';


class PartyOrderFormView extends Component{

	constructor(props) {
	  super(props);


	  console.log('****** initProps',props);
	  this.state = {
	  	first_name:'',
	  	last_name:'',
	  	phone_number:'',
	  	email_address:'',
	  	company_name:'',
	  	title:'',
	  	event_date:'',
	  	event_time:'',
	  	event_venue:'',
	  	experted_attendees:'',
	  	// checkMarkState:'hide',
		loadingText: 'Submiting...',
	  };
		
	}

	componentDidMount(){

	}

	componentWillReceiveProps(nextProps){

		console.log('***OK');
		console.log('***nextProps',nextProps);
		const {submitResult} = nextProps.partyOrderForm;
		console.log('***submitResult',submitResult);
		if (submitResult){
			console.log('submitResult success!')
			if(submitResult.success == true){
				console.log('submitResult is true!')
				this.onPressHandle1()
			}else{
				console.log('submitResult is false!')
				this.onPressHandle2()
			}
		} else{
			console.log('submitResult failed')
		}
	}

	_onSubmit(){

		console.log('TTT')
		const {first_name, last_name, company_name, title, email_address, phone_number, date, time, event_venue, experted_attendees, checkMarkState} = this.state;
		// this.setState({loadingText:'Submiting...'});

		// if (first_name == ''&& last_name =='' && company_name =='' && title =='' && email_address=='' && phone_number =='' && date =='' && time ==''&& event_venue == ''&& experted_attendees==''&& checkMarkState==''){
		// 	this.props.loadSubmitResult(first_name, last_name, company_name, title, email_address, phone_number, date.substring(8,10), date.substring(5,7),date.substring(0,4), time, event_venue, experted_attendees,checkMarkState)
		// }

		if (first_name == ''|| last_name ==''|| company_name ==''|| title =='' || email_address==''|| phone_number ==''|| date =='' || time ==''|| event_venue == ''|| experted_attendees== ''|| checkMarkState==''){
			this.props.loadSubmitResult(first_name, last_name, company_name, title, email_address, phone_number, date.substring(8,10), date.substring(5,7),date.substring(0,4), time, event_venue, experted_attendees,checkMarkState)
		
		 }
		// this.props.loadSubmitResult()
		
	}

	onPressHandle1(){

		this.popup.confirm({
            title: 'Alert',
            content: ['Sending Success!'],
            ok: {
                text: 'YES',
                style: {
                    color: 'red'
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

	render(){
		return(
			<View style={styles.bg}>

			  	<View style={{height:60,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
			  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
			  			<Text style={{fontSize:19,color:'#7e5d91'}}>Party Orders</Text>
			  			<Text style={{fontSize:12,color:'#58595b'}}>Please enter contact info and we will be in touch shortly.</Text>
			  		</View>
			  	</View>
			  	<View>
			  		<TextInput
			  		  	autoFocus={true}
			  		  	returnKeyType={"next"}
			  		  	onSubmitEditing={(event)=>this.refs.last_name.focus()}
		  				onChangeText={first_name=>this.setState({first_name, first_nameError:''})}
		  				value={this.state.first_name}
		  				placeholder={'First Name'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='last_name'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.phone_number.focus()}
		  				onChangeText={last_name=>this.setState({last_name, last_nameError:''})}
		  				value={this.state.last_name}
		  				placeholder={'Last Name'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='phone_number'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.email_address.focus()}
			  			keyboardType={'numeric'}
		  				onChangeText={(phone_number)=>this.setState({phone_number, phone_numberError:''})}
		  				value={this.state.phone_number}
		  				placeholder={'Phone Number'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='email_address'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.company_name.focus()}
		  				onChangeText={(email_address)=>this.setState({email_address,email_addressError:''})}
		  				value={this.state.email_address}
		  				placeholder={'Email Address'}
						keyboardType="email-address"
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='company_name'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.title.focus()}
		  				onChangeText={(company_name)=>this.setState({company_name, company_nameError:''})}
		  				value={this.state.company_name}
		  				placeholder={'Company Name'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='title'
			  			autoFocus={true}
		  				onChangeText={(title)=>this.setState({title, titleError:''})}
		  				value={this.state.title}
		  				placeholder={'Title'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:15}}></View>
			  	</View>
			  	<View >
			  		<View style={{flexDirection:'row',backgroundColor:'#F1F2F2'}}>
			  			<View style={{flex:1,marginRight:1}}>
			  				<DatePicker
							  style={{width:185,backgroundColor:'#FFF'}}
							  date={this.state.date}
							  mode="date"
							  placeholder="Event Date"
							  format="YYYY-MM-DD"
							  minDate="1900-1-1"
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
							  style={{width:185,backgroundColor:'#FFF'}}
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
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='event_venue'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.experted_attendees.focus()}
		  				onChangeText={(event_venue)=>this.setState({event_venue})}
		  				value={this.state.event_venue}
		  				placeholder={'Event Venue'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
			  	</View>
			  	<View>
			  		<TextInput
			  			ref='experted_attendees'
			  			returnKeyType={"next"}
			  			autoFocus={true}
			  			onSubmitEditing={()=>this.refs.title.focus()}
		  				onChangeText={(experted_attendees)=>this.setState({experted_attendees})}
		  				value={this.state.experted_attendees}
		  				placeholder={'Expected Attendees'}
		  				placeholderTextColor="#414042"
		  				style={{height:43, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
			  		/>
			  	</View>
			  	<View style={{backgroundColor:'#F1F2F2',height:50, flexDirection:'row',justifyContent:'flex-start', alignItems:'center'}}>
			  		<View style={{flex:1, marginLeft:20}}>
			  			<Image source={require('../assets/images/checkbox.png')}resizeMode={Image.resizeMode.contain} style={{width:27.5,height:28}}>
			  				<TouchableOpacity onPress={this.showMarkState}>
			  					<Image source={require('../assets/images/check_mark.png')}resizeMode={Image.resizeMode.contain} style={{width:25,height:26}}/>
			  				</TouchableOpacity>
			  			</Image>
			  		</View>
			  		<View style={{flex:8}}>
			  			<Text style={{fontSize:14.5}}>Need a Bartender?</Text>
			  		</View>
			  	</View>
			  	<View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
			  		<TouchableOpacity onPress={()=>this._onSubmit()} style={{backgroundColor:'#7e5d91',justifyContent:'center', alignItems:'center',flex:1}}>
			  			<Text style={{fontSize:20,color:'#FFF'}}>SUBMIT</Text>
			  		</TouchableOpacity>
			  	</View>

			  	<Popup ref={popup =>this.popup=popup}/>

			</View>
		)
	};
}

export default connect(
  state => ({partyOrderForm: state.partyOrderForm}),{loadSubmitResult})(PartyOrderFormView);

const styles= StyleSheet.create({

	bg: {
		backgroundColor: 'white',
		flexDirection:'column',
		flex:1
	},

	ToolBar:{
		marginTop:0,
		height:80,
		backgroundColor:'#FFF',
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		borderBottomWidth:2,
		borderBottomColor:'#EEE',
	},

	LogoImage:{
		width:150,
		height:75,
		marginTop:0,
	},

	SideMenuIcon:{
		width:25,
		height:20,
		marginLeft:10
	},

	SearchIcon:{
		width:25,
		height:25,
		marginRight:0
	},

	ShoppingCartIcon:{
		width:25,
		height:25,
	},

	navigationBack_icon:{
		width:25,
		height:20,
		marginLeft:5
	},

})
