import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import CheckBox from 'react-native-check-box';
import SearchBarView from '../components/SearchBarView'
import {getAllCard} from '../redux/actions/cardViewActions';
import {savePrevPage, saveCurrentPage} from '../redux/actions/tabInfoAction';

import {saveSuppliers, setSuppliersID} from '../redux/actions/geoCodeActions';


const SideMenu = require('react-native-side-menu');
const Menu = require('../components/Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class DeliveryStoreView extends Component{

	constructor(props) {
		super(props);

		this.state = {
			storeCheck : [],
			checkedStoreID: [],
			isOpen: false,
			selectedItem: 'SelectStore',
		};
		instance = this;
	}

	componentWillMount() {
		console.log('PPPPPPPPPQQQQQRRRRRRSSSSTTTT');
		const {suppliers, default_suppliers} = this.props;
		var storeCheck = [], checkedStoreID = [];

		if (suppliers && default_suppliers) {
			for (i = 0; i < suppliers.length; i ++) {
				for (j = 0; j < default_suppliers.length; j ++) {
					if (suppliers[i].id == default_suppliers[j].id) {
						storeCheck[suppliers[i].id] = 'check';
					}
				}
			}
			this.setState({storeCheck: storeCheck});
		}

		for (i = 0; i < default_suppliers.length; i ++) {
			checkedStoreID.push(default_suppliers[i].id);
		}
		this.setState({checkedStoreID: checkedStoreID});
	}

	componentDidMount(){
		this.props.saveCurrentPage('deliveryStoreView');
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

	_onPaymentMethod(store) {
		let {storeCheck, checkedStoreID} = this.state;
		//storeCheck = []; checkedStoreID = [];
		
		if (storeCheck[store.id] != 'check') {
			storeCheck = []; checkedStoreID = [];
			storeCheck[store.id] = 'check';
			checkedStoreID.push(store.id);

			instance.setState({storeCheck: storeCheck});
			instance.setState({checkedStoreID: checkedStoreID});
		}

	}

	_onContinue() {
		let {checkedStoreID} = this.state;

		var suppliers = [], default_suppliers=[];

		for (i = 0; i < checkedStoreID.length; i ++) {
			default_suppliers.push({'id': checkedStoreID[i]});
		}

		this.props.setSuppliersID(default_suppliers);
		
		Actions.productCategory();
	}

	_onDeliveryAddress() {
		Actions.address({menuDeliveryFlag: 'select',  isSplit: false});
	}

	render(){
		const {userGeoAddressList, suppliers} = this.props;
		console.log('suppliers', suppliers);
		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={userGeoAddressList} />;

		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>

				<View style={styles.bg}>

					<SearchBarView onPress={()=>this.toggle()} addFlag='true'/>
					<ScrollView>
						<View style={{height:70,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
					  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Delivering To</Text>
					  		</View>
					  	</View>
					  	<View>
						  	<TouchableOpacity onPress={()=>this._onDeliveryAddress()} style={styles.paymentStyle}>
					  			<Text style={styles.arrowTextStyle}>{userGeoAddressList.userGeoAddress.formatted_address}</Text>
					  			<Image source={require('../assets/images/right_arrow.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle}/>
					  		</TouchableOpacity>
					  		<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:4}}></View>
					  	</View>
					  	<View style={{height:70,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
					  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Delivering From</Text>
					  		</View>
					  	</View>

				  	{ suppliers.map(function(item, index) {
					  	return (
					  		<View key={index} style={{marginBottom: 3}}>
							  	<TouchableOpacity onPress={()=>instance._onPaymentMethod(item)} style={styles.paymentStyle}>
						  			<View style={{flexDirection:'column'}} >
						  				<Text style={styles.arrowTextStyle}>{item.name}</Text>
						  			</View>
						  			{
							  			instance.state.storeCheck[item.id] == 'check'
							  			?	<Image source={require('../assets/images/circle_check.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />
							  			: 	<Image source={require('../assets/images/circle_uncheck.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />	
							  		}
						  		</TouchableOpacity>
						  	</View>
						)
				  	}) }
				
					  	<View style={{height:50}}/>
					</ScrollView>
				  	<View style={styles.checkoutBtn}>
				  		<TouchableOpacity onPress={()=>this._onContinue()} style={{backgroundColor:'#7e5d91',justifyContent:'center', alignItems:'center',flex:1}}>
				  			<Text style={{fontSize:25,color:'#FFF', fontWeight:'bold'}}>CONTINUE</Text>
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

	checkoutBtn : {
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

	paymentStyle : {
		height:45, 
		backgroundColor:'#FFF',
		alignItems:'center',
		flex:1, 
		flexDirection:'row'
	},

	arrowImgStyle : {
		height:45, 
		backgroundColor:'#FFF',
		width:50
	},

	arrowTextStyle : {
		fontSize:15, 
		marginLeft:15, 
		width:screen_width-65,
	},

	
})

export default connect(
	state => ({
		userGeoAddressList: state.geoCodeForm.selectedList,
		suppliers: state.geoCodeForm.suppliers,
		default_suppliers: state.geoCodeForm.selectedID,
	}),{setSuppliersID, saveSuppliers, saveCurrentPage})(DeliveryStoreView);