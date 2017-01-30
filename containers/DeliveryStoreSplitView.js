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

import {updateCartInfo, getCartInfo} from '../redux/actions/productCartActions';

	
const SideMenu = require('react-native-side-menu');
const Menu = require('../components/Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class DeliveryStoreSplitView extends Component{

	constructor(props) {
		super(props);

		this.state = {
			storeCheck_type2 : [],
			checkedStoreID_type2: [],
			storeCheck_type3 : [],
			checkedStoreID_type3: [],
			isOpen: false,
			selectedItem: 'SelectStore',
		};
		instance = this;
	}

	componentWillMount() {
		const {suppliers, default_suppliers} = this.props;
		var storeCheck_type2 = [], checkedStoreID_type2 = [];
		var storeCheck_type3 = [], checkedStoreID_type3 = [];

		if (suppliers && default_suppliers) {
			for (i = 0; i < suppliers.length; i ++) {
				for (j = 0; j < default_suppliers.length; j ++) {
					if (suppliers[i].id == default_suppliers[j].id) {
						if (suppliers[i].type == 2) {
							storeCheck_type2[suppliers[i].id] = 'check';
						}
						else if (suppliers[i].type == 3) {
							storeCheck_type3[suppliers[i].id] = 'check';
						}
					}
				}
			}
			this.setState({storeCheck_type3: storeCheck_type3});
			this.setState({storeCheck_type2: storeCheck_type2});
		}

		for (i = 0; i < default_suppliers.length; i ++) {
			for (j = 0; j < suppliers.length; j ++) {
				if ((suppliers[j].id == default_suppliers[i].id) && suppliers[j].type == 2) {
					checkedStoreID_type2.push(default_suppliers[i].id);
					break;
				}
				else if ((suppliers[j].id == default_suppliers[i].id) && suppliers[j].type == 3) {
					checkedStoreID_type3.push(default_suppliers[i].id);
					break;
				}
			}
		}
		this.setState({checkedStoreID_type2: checkedStoreID_type2});
		this.setState({checkedStoreID_type3: checkedStoreID_type3});
	}

	componentDidMount(){
		this.props.saveCurrentPage('deliveryStoreSplitView');
	}

	componentWillReceiveProps(nextProps) {
		const {createcartInfo, clientTokenResult} = this.props;
		const {updatecartInfo} = nextProps;

		clientToken = 'Bearer ' + clientTokenResult.access_token;
		UUID = createcartInfo.guest_id;
		cartID = createcartInfo.id;

		if (updatecartInfo) {
			this.props.getCartInfo(cartID, UUID, clientToken);
			Actions.productCategory();
		}
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
		const {cartInfo, createcartInfo, clientTokenResult} = this.props;

		clientToken = 'Bearer ' + clientTokenResult.access_token;
		

		let {storeCheck_type3,storeCheck_type2, checkedStoreID_type3, checkedStoreID_type2} = this.state;
		
		
		if (store.type == 3) {
			if (storeCheck_type3[store.id] != 'check') {
				storeCheck_type3 = []; checkedStoreID_type3 = [];
				storeCheck_type3[store.id] = 'check';
				checkedStoreID_type3.push(store.id);

				instance.setState({storeCheck_type3: storeCheck_type3});
				instance.setState({checkedStoreID_type3: checkedStoreID_type3});
			}
		}

		if (store.type == 2) {
			if (storeCheck_type2[store.id] != 'check') {
				storeCheck_type2 = []; checkedStoreID_type2 = [];
				storeCheck_type2[store.id] = 'check';
				checkedStoreID_type2.push(store.id);

				instance.setState({storeCheck_type2: storeCheck_type2});
				instance.setState({checkedStoreID_type2: checkedStoreID_type2});
			}
		}

	}

	_onContinue() {
		let {checkedStoreID, checkedStoreID_type2, checkedStoreID_type3, clientTokenResult} = this.state;
		let {createcartInfo} = this.props;

		supplier_ids = [];
		if (checkedStoreID_type2.length > 0) {
			supplier_ids.push(checkedStoreID_type2[0]);
		}
		if (checkedStoreID_type3.length > 0) {
			supplier_ids.push(checkedStoreID_type3[0]);
		}

		if (createcartInfo) {
			UUID = createcartInfo.guest_id;
			cartID = createcartInfo.id;
		}

		this.props.updateCartInfo(cartID, UUID, supplier_ids, clientToken);


		var suppliers = [], default_suppliers=[];

		for (i = 0; i < checkedStoreID_type2.length; i ++) {
			default_suppliers.push({'id': checkedStoreID_type2[i]});
		}
		for (i = 0; i < checkedStoreID_type3.length; i ++) {
			default_suppliers.push({'id': checkedStoreID_type3[i]});
		}

		this.props.setSuppliersID(default_suppliers);
		
	}

	_onDeliveryAddress() {
		Actions.address({menuDeliveryFlag: 'select', isSplit: true});
	}

	render(){
		const {userGeoAddressList, suppliers, default_suppliers} = this.props;
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
					  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Delivering Wine & Liquor From</Text>
					  		</View>
					  	</View>

				  	{ suppliers.map(function(item, index) {
				  		if (item.type == 3) {
						  	return (
						  		<View key={index} style={{marginBottom: 3}}>
								  	<TouchableOpacity onPress={()=>instance._onPaymentMethod(item)} style={styles.paymentStyle}>
								  		<View style={{flexDirection:'column'}} >
							  				<Text style={styles.arrowTextStyle}>{item.name}</Text>
							  			</View>
							  			{
								  			instance.state.storeCheck_type3[item.id] == 'check'
								  			?	<Image source={require('../assets/images/circle_check.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />
								  			: 	<Image source={require('../assets/images/circle_uncheck.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />	
								  		}
							  		</TouchableOpacity>
							  	</View>
							)
						}
				  	}) }

				  		<View style={{height:70,backgroundColor:'#F1F2F2',flexDirection:'column'}}>
					  		<View style={{flex:1, justifyContent:'center', marginLeft:10}}>
					  			<Text style={{fontSize:25,color:'#7e5d91',fontWeight:'bold'}}>Delivering Beer From</Text>
					  		</View>
					  	</View>

				  	{ suppliers.map(function(item, index) {
				  		if (item.type == 2) {
						  	return (
						  		<View key={index} style={{marginBottom: 3}}>
								  	<TouchableOpacity onPress={()=>instance._onPaymentMethod(item)} style={styles.paymentStyle}>
							  			<View style={{flexDirection:'column'}} >
							  				<Text style={styles.arrowTextStyle}>{item.name}</Text>
							  			</View>
							  			{
								  			instance.state.storeCheck_type2[item.id] == 'check'
								  			?	<Image source={require('../assets/images/circle_check.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />
								  			: 	<Image source={require('../assets/images/circle_uncheck.png')} resizeMode={Image.resizeMode.center} style={styles.arrowImgStyle} />	
								  		}
							  		</TouchableOpacity>
							  	</View>
							)
						}
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
		cartInfo: state.cartInfo.cartInfo,
		createcartInfo: state.cartInfo.createcartInfo,
		updatecartInfo: state.cartInfo.updatecartInfo,
		clientTokenResult: state.userRegister.clientTokenResult
	}),{setSuppliersID, saveSuppliers, saveCurrentPage, getCartInfo, updateCartInfo})(DeliveryStoreSplitView);