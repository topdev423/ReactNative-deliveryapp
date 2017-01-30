import React, {Component} from 'react';
import {Alert, StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {addNewCard} from '../redux/actions/cardViewActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import CheckBox from 'react-native-check-box';
import SearchBarView from '../components/SearchBarView'
import {savePrevPage, saveCurrentPage} from '../redux/actions/tabInfoAction';
import {getAllCard} from '../redux/actions/cardViewActions';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomPicker from 'react-native-picker';

const SideMenu = require('react-native-side-menu');
const Menu = require('../components/Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class AddCardView extends Component{

	constructor(props) {
	  super(props);

	  this.state = {
	  	payment_nickname:'',
	  	card_number:'',
	  	exp_month:'',
	  	exp_year:'',
	  	cvv:'',
	  	isOpen: false,
		selectedItem: 'SelectStore',
		first_name_req:false,
		payment_nickname_req:false,
	  	card_number_req:false,
	  	exp_month_req:false,
	  	exp_year_req:false,
	  	cvv_req:false,
	  };
		
	}
	toggle() {
	    this.setState({
	      isOpen: !this.state.isOpen,
	    });
	  }

	updateMenuState(isOpen) {
	    this.setState({ isOpen, });
	}

	onMenuItemSelected = (item) => {
	    this.setState({
	      isOpen: false,
	      selectedItem: item,
	    });
	}

	_onSelectExpMonth(){
		// dismissKeyboard();
		var monthList=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		
		CustomPicker.init({
			pickerConfirmBtnText: 'Confirm',
			pickerCancelBtnText:' Cancel',
			pickerTitleText:'Please Select Month',
	        pickerData: monthList,
	        pickerConfirmBtnColor:[126, 94, 144, 1],
	        pickerCancelBtnColor:[0, 0, 0, 1],
	        onPickerConfirm: data => {
	        	for (i = 0; i < monthList.length; i++)
	        		if (monthList[i] == data)
	        			var month = i + 1;
	        	console.log('month', month);
	        	this.setState({exp_month:month});
	        },
	        onPickerCancel: data => {
	            console.log(data);
	        },
	        onPickerSelect: data => {
	        	// this.setState({exp_month:month});
	            console.log(data);
	        }
	    });
	    CustomPicker.toggle();
	}
	_onSelectExpYear(){
		// dismissKeyboard();
		var today = new Date();
		var year = today.getUTCFullYear();
		var yearList = [(year).toString(), (year+1).toString(), (year+2).toString(), (year+3).toString(), (year+4).toString(), (year+5).toString(), (year+6).toString(), (year+7).toString(), (year+8).toString(), (year+9).toString(), (year+10).toString()];
		CustomPicker.init({
			pickerConfirmBtnText: 'Confirm',
			pickerCancelBtnText:' Cancel',
			pickerTitleText:'Please Select Year',
	        pickerData: yearList,
	        pickerConfirmBtnColor:[126, 94, 144, 1],
	        pickerCancelBtnColor:[0, 0, 0, 1],
	        onPickerConfirm: data => {
	        	this.setState({exp_year:data[0]});
	            console.log('exp_year',data[0]);
	        },
	        onPickerCancel: data => {
	            console.log(data);
	        },
	        onPickerSelect: data => {
	        	// this.setState({exp_year:data});
	            console.log(data);
	        }
	    });
	    CustomPicker.toggle();
	}

	componentWillUnmount(){
		this.onDismissKeyboard();
	}

	componentDidMount(){
		const {fromView} = this.props;
		if (fromView == 'fromPaymentMethods')
			this.props.savePrevPage('paymentMethodsView');
		else
			this.props.savePrevPage('orderView');
		this.props.saveCurrentPage('addCardView');
	}

	componentWillReceiveProps(nextProps){
		const {addCardResult, addCardError, fromView, passwordTokenResult} = nextProps;

		if (passwordTokenResult)
			passwordToken = 'Bearer ' + passwordTokenResult.access_token;

		if (addCardError) {
			//console.log("addCardError", addCardError.error);
			var errorArray = addCardError.error.split('<br />');
			var message = '';
			for (i = 0; i < errorArray.length; i++)
				message = message + errorArray[i] + ' ';

			this.onShowAlert(message);
		}
		else if (addCardResult) {
			if (addCardResult.payment_nickname) {
				this.onShowAlert('The payment nickname has already been taken.');
			}
			else {
				this.props.getAllCard(passwordToken);
				if (fromView == 'fromPaymentMethods')
					Actions.paymentMethodsView();
				else
				{
					Actions.orderView();
					console.log("addCardResult:", addCardResult.id);
					AsyncStorage.setItem('orderCardSelectID', JSON.stringify(addCardResult.id));
				}
			}
		}
	}

	onShowAlert (message){

		Alert.alert(
		  'Error',
		  message,
		  [
		    {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},
		  ]
		)
	}

	_checkForResFields(){
		const {payment_nickname, card_number, exp_month, exp_year, payment_nickname_req, cvv, card_number_req, exp_month_req, exp_year_req, cvv_req} = this.state;
		if (payment_nickname == '')
			this.setState({payment_nickname_req:true});
		else
			this.setState({payment_nickname_req:false});

		if (card_number == '')
			this.setState({card_number_req:true});
		else
			this.setState({card_number_req:false});

		if (exp_month == '')
			this.setState({exp_month_req:true});
		else
			this.setState({exp_month_req:false});

		if (exp_year == '')
			this.setState({exp_year_req:true});
		else
			this.setState({exp_year_req:false});

		if (cvv == '')
			this.setState({cvv_req:true});
		else
			this.setState({cvv_req:false});

	}

	formatCardNumber (number) {
	  	var x = number.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
	  	number = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4]? '-' + x[4] : '');
		this.setState({card_number:number});
	}

	formatExpMonth (number) {
		var reg = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
		if (reg.test(number)) {
			this.setState({exp_month:number});
		}
	}

	formatExpYear (number) {
		var reg = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
		if (reg.test(number)) {
			this.setState({exp_year:number});
		}
	}

	formatCVV (number) {
		var x = number.replace(/\D/g, '').match(/(\d{0,4})/);
		number = x[1];
		this.setState({cvv:number});
	}

	onDismissKeyboard() {
		dismissKeyboard();
		CustomPicker.hide();
	}

	_onAddNewCard(){

		this._checkForResFields();
		const {passwordTokenResult} = this.props;
		passwordToken = 'Bearer ' + passwordTokenResult.access_token;

		const {payment_nickname, card_number, exp_month, exp_year, cvv, name_oncard, address_line1, address_line2, city_txt, state_txt, zipcode_txt} = this.state;

		if (payment_nickname== ''|| card_number ==''|| exp_month ==''|| exp_year=='') {
		}
		else{
			this.props.addNewCard(payment_nickname, card_number, exp_month, exp_year, cvv, passwordToken);
		}
	}

	render(){

		var data = {};

		var monthList=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList}/>;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>

				<View style={styles.bg}>
					<SearchBarView onPress={()=>this.toggle()}  addFlag='true'/>
					<ScrollView
						keyboardShouldPersistTaps={true}
						keyboardDismissMode = {'on-drag'}>
						<TouchableOpacity onPress={()=>dismissKeyboard()}>
							<View style={{height:70,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
						  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Add Card</Text>
						  		</View>
						  	</View>
						</TouchableOpacity>
					  	<View>
					  		<TextInput
					  			ref='payment_nickname'
					  		  	returnKeyType={"next"}
					  		  	onSubmitEditing={(event)=>this.refs.payment_nickname.focus()}
				  				onChangeText={payment_nickname=>this.setState({payment_nickname})}
				  				autoCorrect={false} 
				  				value={this.state.payment_nickname}
				  				onFocus={()=>CustomPicker.hide()}
				  				placeholder={'Payment Nickname'}
				  				placeholderTextColor="#414042"
				  				style={{height:45, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
					  		/>
					  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:15}}></View>
					  		{
					  			this.state.payment_nickname_req ? 
								<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:12,color:'#58595b'}}>Payment Nickname is required.</Text>
						  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  			</View> : 
					  			null
					  		}
					  	</View>
					  	<View>
					  		<TextInput
					  			ref='card_number'
					  			returnKeyType={"next"}
					  			onSubmitEditing={()=>this.refs.card_number.focus()}
				  				onChangeText = {(card_number)=> this.formatCardNumber(card_number)}
				  				value={this.state.card_number}
				  				onFocus={()=>CustomPicker.hide()}
				  				keyboardType={'numeric'}
				  				placeholder={'Credit Card#'}
				  				placeholderTextColor="#414042"
				  				style={{height:38, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
					  		/>
					  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  		{
					  			this.state.card_number_req ? 
								<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:12,color:'#58595b'}}>Card number is required.</Text>
						  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  			</View> : 
					  			null
					  		}
					  	</View>
					  	<View>
					  	{
				  			(this.state.exp_month == '') ? 
					  		<View style={styles.modalStyle}>
						  		<TouchableOpacity onPress={()=>this._onSelectExpMonth()}>
									<Text style={{fontSize:15, fontWeight:'bold', color:"#414042"}}>Exp. Month</Text>
								</TouchableOpacity>
						  	</View>
						  	:
						  	<View style={styles.modalStyle}>
						  		<TouchableOpacity onPress={()=>this._onSelectExpMonth()}>
									<Text style={{fontSize:15, fontWeight:'bold'}}>{monthList[this.state.exp_month - 1]}</Text>
								</TouchableOpacity>
						  	</View>
					  	}
							<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  		{
					  			this.state.exp_month_req ? 
								<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:12,color:'#58595b'}}>Exp month is required.</Text>
						  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  			</View> : 
					  			null
					  		}
					  	</View>
					  	<View>
					  	{
					  		(this.state.exp_year == '') ? 
					  		<View style={styles.modalStyle}>
						  		<TouchableOpacity onPress={()=>this._onSelectExpYear()}>
									<Text style={{fontSize:15, fontWeight:'bold', color:"#414042"}}>Exp. Year</Text>
								</TouchableOpacity>
						  	</View>
						  	:
						  	<View style={styles.modalStyle}>
						  		<TouchableOpacity onPress={()=>this._onSelectExpYear()}>
									<Text style={{fontSize:15, fontWeight:'bold'}}>{this.state.exp_year}</Text>
								</TouchableOpacity>
						  	</View>
						}
					  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  		{
					  			this.state.exp_year_req ? 
								<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:12,color:'#58595b'}}>Exp year is required.</Text>
						  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  			</View> : 
					  			null
					  		}
					  	</View>
					  	<View>
					  		<TextInput
					  			ref='cvv'
					  			returnKeyType={"next"}
					  			onSubmitEditing={()=>this.refs.cvv.focus()}
				  				onChangeText={(cvv)=>this.formatCVV(cvv)}
				  				value={this.state.cvv}
				  				onFocus={()=>CustomPicker.hide()}
				  				keyboardType={'numeric'}
				  				placeholder={'CVV'}
				  				placeholderTextColor="#414042"
				  				style={{height:45, backgroundColor:'#FFF',fontSize:15,paddingLeft:15,fontWeight:'bold'}}
					  		/>
					  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  		{
					  			this.state.cvv_req ? 
								<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
						  			<Text style={{fontSize:12,color:'#58595b'}}>CVV is required.</Text>
						  			<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  			</View> : 
					  			null
					  		}
					  	</View>
					  	<TouchableOpacity onPress={()=>dismissKeyboard()}>
							<View style={{height:200,backgroundColor:'#F1F2F2',flexDirection:'column'}}/>
						</TouchableOpacity>
					</ScrollView>
				  	<View style={styles.addCardBtn}>
				  		<TouchableOpacity onPress={()=>this._onAddNewCard()} style={{backgroundColor:'#7e5d91',justifyContent:'center', alignItems:'center',flex:1}}>
				  			<Text style={{fontSize:25,color:'#FFF',fontWeight:'bold'}}>ADD NEW CARD</Text>
				  		</TouchableOpacity>
				  	</View>
				</View>
			</SideMenu>
		)
	};
}

const styles= StyleSheet.create({

	bg: {
		backgroundColor: '#F1F2F2',
		flexDirection:'column',
		flex:1
	},

	addCardBtn : {
		flex:1,
		flexDirection:'column', 
		backgroundColor:'#7e5d91',
		justifyContent:'center', 
		position:'absolute',
		bottom:0,
		width:screen_width,
		height:50,
		alignItems:'center',
	},

	modalStyle : {
		width:screen_width,
		height:45,
		backgroundColor:'#FFF',
		paddingLeft:15,
		justifyContent:'center',
	},

})

export default connect(
  state => ({
  	prevPage: state.tabInfo.prevPage,
  	addCardResult: state.cardInfo.addCardResult,
  	addCardError: state.cardInfo.addCardError,
  	passwordTokenResult: state.userRegister.passwordTokenResult,
  	userGeoAddressList: state.geoCodeForm.selectedList,
 }), {savePrevPage, addNewCard, getAllCard, saveCurrentPage})(AddCardView);