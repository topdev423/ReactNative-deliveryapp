import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loadSignInResult} from '../redux/actions/userRegisterActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import SearchBarView from '../components/SearchBarView'
import OrderView from '../containers/OrderView'
import {savePrevPage, saveCurrentPage} from '../redux/actions/tabInfoAction';
import {deleteCard, updateCard, getAllCard} from '../redux/actions/cardViewActions';

const SideMenu = require('react-native-side-menu');
const Menu = require('../components/Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class EditCardView extends Component{

	constructor(props) {
		super(props);

		this.state = {
			payment_nickname:props.cardData.nickname,
		  	last_4:props.cardData.last_4,
		  	exp_month:props.cardData.exp_month,
		  	exp_year:props.cardData.exp_year,
		  	cvv:'',
		  	isOpen: false,
			selectedItem: 'SelectStore',
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

	componentDidMount(){
		this.props.savePrevPage('paymentMethodsView');
		this.props.saveCurrentPage('editCardView');
	}

	componentWillReceiveProps(nextProps){
		const {deleteCardResult, updateCardResult, passwordTokenResult, deleteCardResultFaild, deleteFlag} = nextProps;
		if (passwordTokenResult)
			passwordToken = 'Bearer ' + passwordTokenResult.access_token;
		console.log('deleteCardResultFaild',deleteCardResultFaild);
		console.log('deleteCardResult',deleteCardResult);
		if (deleteCardResultFaild && deleteFlag == 'error') {
			Alert.alert(
			  	'Warning',
			  	'There should be at least one credit card in Your Wallet',
			  	[
			    	{text: 'OK', onPress: () => Actions.paymentMethodsView(), style: 'cancel'},
			  	]
			);
		}

		if ((deleteCardResult == true && deleteFlag == 'success' )|| updateCardResult) {
			this.props.getAllCard(passwordToken);
			Alert.alert(
			  	'Credit Card Deleted',
			  	'The credit card is no longer in your wallet',
			  	[
			    	{text: 'OK', onPress: () => Actions.paymentMethodsView(), style: 'cancel'},
			  	]
			);
		}
		
	}

	formatCardNumber (number) {
	  	var reg = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
		if (reg.test(number)) {
			this.setState({card_number:number});
		}
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
		var reg = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
		if (reg.test(number)) {
			this.setState({cvv:number});
		}
	}

	_onDeleteCard(cardID) {
		const {passwordTokenResult} = this.props;
		passwordToken = 'Bearer ' + passwordTokenResult.access_token;
		this.props.deleteCard(cardID, passwordToken);
	}

	render(){
		const {cardData} = this.props;
		console.log('cardData', cardData);
	
		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList} />;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<View style={styles.bg}>

					<SearchBarView onPress={()=>this.toggle()} addFlag="true" />
					<ScrollView style={{flexDirection: 'column'}}>
						<View style={{height:70,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
					  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Card Information</Text>
					  		</View>
					  	</View>
					  	<View style={styles.viewStyle}>
				  			<Text style={styles.textStyle}>Payment Nickname : {this.state.payment_nickname}</Text>
				  		</View>
				  		<View style={styles.viewStyle}>
				  			<Text style={styles.textStyle}>Credit Card# : {this.state.last_4}</Text>
				  		</View>
			  			<View style={styles.viewStyle}>
				  			<Text style={styles.textStyle}>Exp Month : {this.state.exp_month}</Text>
			  			</View>
				  		<View style={styles.viewStyle}>
				  			<Text style={styles.textStyle}>Exp Year : {this.state.exp_year}</Text>
				  		</View>
					</ScrollView>
					<View style={styles.toUpdateCard}>
					  	<Text>To update card, add new card and delete the old card.</Text>
			  		</View>

			  		<TouchableOpacity onPress={()=>this._onDeleteCard(cardData.id)} style={styles.deleteCardBtn}>
			  			<Text style={{fontSize:25,color:'#FFF', fontWeight:'bold'}}>DELETE THIS CARD</Text>
			  		</TouchableOpacity>
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

	textStyle: {
		backgroundColor:'#FFF',
		fontSize:15,
		paddingLeft:15,
		fontWeight:'bold'
	},

	viewStyle: {
		backgroundColor:'#FFF',
		width:screen_width, 
		height:45, 
		alignItems:'center', 
		marginTop:2, 
		marginBottom: 15, 
		flexDirection:'row', 
	},

	toUpdateCard : {
		flex:1,
		justifyContent:'center', 
		position:'absolute',
		bottom:50,
		width:screen_width * 0.9,
		height:50,
		alignItems:'center',
	},

	deleteCardBtn : {
		flex:1,
		flexDirection:'column', 
		backgroundColor:'#414143',
		justifyContent:'center', 
		position:'absolute',
		bottom:0,
		width:screen_width,
		height:50,
		alignItems:'center',
	},
})

export default connect(
  state => ({
  	passwordTokenResult: state.userRegister.passwordTokenResult,
  	deleteCardResult: state.cardInfo.deleteCardResult,
  	deleteCardResultFaild: state.cardInfo.deleteCardResultFaild,
  	deleteFlag: state.cardInfo.deleteFlag,
  	updateCardResult: state.cardInfo.updateCardResult,
  	userGeoAddressList: state.geoCodeForm.selectedList,
  }),{savePrevPage, deleteCard, updateCard, getAllCard, saveCurrentPage})(EditCardView);