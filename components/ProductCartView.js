import React, {Component} from 'react';
import {Alert, Modal, StyleSheet, ListView, Image, View, Text, TouchableOpacity, TouchableHighlight, TextInput, ScrollView, Dimensions, RecyclerViewBackedScrollView} from 'react-native'
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import {loadSubmitResult} from '../redux/actions/partyOrderActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import CheckBox from 'react-native-check-box';
import SearchBarView from './SearchBarView'
import {savePrevPage, saveCurrentPage} from '../redux/actions/tabInfoAction';
import {removeCartInfo, getCartInfo, addCartInfo} from '../redux/actions/productCartActions';
import numeral from 'numeral';
import {API_Config} from '../constants';

const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class ProductCartView extends Component{

	constructor(props) {
		super(props);
		this.state = {
			cartInfo: props.cartInfo,
			modalVisible: false,
			removeProductName: null,
			removeProductID: 0,
			clientToken: 'Bearer ' + props.clientTokenResult.access_token,
			store_address: null,
			isOpen: false,
			selectedItem: 'SelectStore',
			isEmpty: true,
			cartLoadingFlag: 'false',
			addFlag: 'false'
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

	componentDidMount(){
		const {currentPage, cartInfo} = this.props;
		
		this.setState({cartInfo: cartInfo});

		if (currentPage == 'ProductCartView')
			currentPage == 'productTypesListView';
		if (Array.isArray(cartInfo)) {
			this.props.savePrevPage(currentPage);
		}

		this.props.saveCurrentPage('productCartView');

	}

	componentWillReceiveProps(nextProps){
		const {cartInfo, suppliers, addCartResult, createcartInfo, cartLoading} = nextProps;
		const {clientToken, cartLoadingFlag} = this.state;

		if (createcartInfo) {
			UUID = createcartInfo.guest_id;
			cartID = createcartInfo.id;
		}

		if (cartLoading == true)
			this.setState({cartLoadingFlag: 'true'});

		if (addCartResult && cartLoadingFlag == 'true' && cartLoading == false) {
			this.props.getCartInfo(cartID, UUID, clientToken);
			this.setState({addFlag: 'true'});
		}
	}

	_onCheckOut(){
		const {signUpResult, passwordTokenResult} = this.props;
		const {cartInfo} = this.props;

		var delivery_minimum_arry = [];
		var delivery_minimum_array_cost = [];


		if (cartInfo != null) {
			for (i = 0; i < cartInfo.length; i ++) {
				var storPrice = 0;
				for (j = 0; j < cartInfo[i]['products'].length; j ++) {
					storPrice += cartInfo[i]['products'][j]['real_price'] * cartInfo[i]['products'][j]['quantity'];
				}
				if (cartInfo[i]['delivery_minimum'] > storPrice) {
					delivery_minimum_arry.push(cartInfo[i]['name']);
					delivery_minimum_array_cost.push(cartInfo[i]['delivery_minimum']);
				}
			}

			str = '';
			for (i = 0; i < delivery_minimum_arry.length; i++) {	
				str += delivery_minimum_arry[i] + ' does not meet the minimum amount of $' + delivery_minimum_array_cost[i] + ' for delivery. ';
			}

			if (str != '') {
				Alert.alert(
					'Warning',
					str,
					[
						{text: 'OK', onPress: () => console.log('alert'), style: 'cancel'},
					]
				)
				return;
			}
			else {
				if (cartInfo != null) {
					if (passwordTokenResult)
						Actions.orderView();
					else
						Actions.signUpView()
				}
			}
		}
	}

	handleScroll (event: Object) {

		const currentScrollPosition = event.nativeEvent.contentOffset.y
	}

	onReduceQuantity(rowData) {
		rowID = rowData.id;
		rowQuantity = rowData.quantity - 1;

		if (rowQuantity < 1) {
			this.setState({modalVisible: true});
			this.setState({removeProductName: rowData.name});
			this.setState({removeProductID: rowData.id});
		}
		else {
			this.onChangeProduct(rowID, rowQuantity, 2);
		}
	}

	onIncreaseQuantity(rowData) {
		rowID = rowData.id;
		rowQuantity = rowData.quantity + 1;
		this.onChangeProduct(rowID, rowQuantity, 1);
	}

	onChangeProduct(rowID, rowQuantity, flag) {
		let data = null;
		let {cartInfo, clientToken} = this.state;
		const {createcartInfo, removeCartInfo} = this.props;

		if (createcartInfo) {
			UUID = createcartInfo.guest_id;
			cartID = createcartInfo.id;
		}

		for (i = 0; i < cartInfo.length; i ++) {
			for (j = 0; j < cartInfo[i]['products'].length; j ++) {
				if (cartInfo[i]['products'][j]['id'] == rowID) {
					cartInfo[i]['products'][j]['quantity'] = rowQuantity;
					break;
				}
			}
		}
		
		if (flag == 1) {

			this.props.addCartInfo(cartID, UUID, rowID, 1, clientToken);
		}
		else if (flag == 2) {
			this.props.addCartInfo(cartID, UUID, rowID, -1, clientToken);
		}

		this.setState({cartInfo: [...cartInfo]});
	}

	RemoveItemFromCart() {
		const {createcartInfo} = this.props;
		var UUID = '';
		var cartID = null;

		if (createcartInfo) {
			UUID = createcartInfo.guest_id;
			cartID = createcartInfo.id;
		}

		const {removeProductID, cartInfo, clientToken} = this.state;
		
		this.props.removeCartInfo(cartID, UUID, removeProductID, clientToken);

		for (i = 0; i < cartInfo.length; i ++) {
			for (j = 0; j < cartInfo[i]['products'].length; j ++) {
				if (cartInfo[i]['products'][j]['id'] == removeProductID) {
					cartInfo[i]['products'].splice(j, 1);
					break;
				}
			}
			if (cartInfo[i]['products'].length == 0) {
				cartInfo.splice(i, 1);
			}
		}
		this.setState({cartInfo: [...cartInfo]});
		
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}

	render() {
		var renderData;

		let totalPrice = 0;
		const instance = this;
		let {cartInfo, addFlag} = this.state;
		const {suppliers, cartInfo_back} = this.props;

		if (cartInfo == null) {
			cartInfo = cartInfo_back;
		}
		else {

			for (i = 0; i < cartInfo.length; i ++) {
				for (j = 0; j < cartInfo[i]['products'].length; j++) {
					totalPrice += cartInfo[i]['products'][j]['real_price'] * cartInfo[i]['products'][j]['quantity'];
				}
			}
		}
		totalPrice = numeral(totalPrice).format('0.00');

		if (cartInfo != null && cartInfo.length > 0) {
			renderData = cartInfo.map(function(item, index) {
				let store_address = null;
				/*get the store address for several products*/
				for (i = 0; i < suppliers.length; i ++) {
					if (item.id == suppliers[i].id) {
						store_address = suppliers[i].street_number + ', ' + suppliers[i].street + ', ' + suppliers[i].city + ', ' + suppliers[i].state;
						break;
					}
				}

				var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

				return (
					<View key={index}>
						<View style={{flexDirection:'column'}}>
							<Text style={{fontSize:20, color:'#7e5d91', fontWeight:'bold', marginTop:10, marginLeft:10}} numberOfLines={1} >{item.name}</Text>
							<Text style={{color:'rgb(166,167,169)', marginLeft:10}}>{store_address}</Text>

							<ListView contentContainerStyle={styles.list}
								dataSource={ds.cloneWithRows(item.products)}
								renderRow={this._renderRow.bind(this)}
								renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
								renderSeparator={this._renderSeparator}
								enableEmptySections={true}
								onScroll ={(event)=>instance.handleScroll(event)}
							/>

						</View>
					</View>
				)
			}.bind(this))
			this.state.isEmpty = false;
		}
		else {
			renderData = <Text style={{marginTop: 10, justifyContent: 'center', fontSize: 14, textAlign:'center', fontWeight:'bold'}}>
			There are no items currently in the cart.  Please add something to continue.
			</Text>;
			this.state.isEmpty = true;
		}

		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList} />;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<View style={styles.bg}>

					<SearchBarView onPress={()=>this.toggle()} addFlag={addFlag} removeFlag="true" removedCartInfo={cartInfo}/>
					<ScrollView>
		      			<View style={{flex:1}}>
		  				{
		  					renderData
		  				}
		      			</View>

			      		<View style={{height:130}} />
		      		</ScrollView>
		      		{
				  		this.state.isEmpty ?
				  		null:
				  		<View style={styles.subTotalView}>
					  		<Text style={{fontSize:25,color:'#414143',textAlign:'center', fontWeight:'bold'}}>SUBTOTAL</Text>
					  		<Text style={{fontSize:25,color:'#414143',textAlign:'center', fontWeight:'bold'}}>${totalPrice}</Text>
					  	</View>
				  	}
				  	{
				  		this.state.isEmpty ?
				  		null:
				  		<View style={styles.checkOutButton}>
				  			<TouchableOpacity onPress={()=>this._onCheckOut()}>
					  			<Text style={{fontSize:25,color:'#FFF',textAlign:'center', fontWeight:'bold'}}>CHECK OUT</Text>
					  		</TouchableOpacity>
					  	</View>
				  	}
				  	<Modal
						animationType={"slide"}
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {alert("Modal has been closed.")}}
						>
						<View style={styles.modalViewStyle} >
							<View style={{width: screen_width*0.8, borderRadius:5, backgroundColor:'#FFF', paddingTop: 20, borderWidth:2, borderColor:'#FFF'}}>
								<View style={{justifyContent:'center', alignItems:'center'}}>	
									<Text style={{fontSize:25, color:'#58595b', fontWeight:'bold', textAlign:'center'}}>Are you Sure?</Text>
								</View>

								<View style={{justifyContent:'center', alignItems:'center', paddingTop:20}}>	
									<Text style={{fontSize:18, color:'#58595b', textAlign:'center'}}>Do you want to remove {this.state.removeProductName} from your cart?</Text>
								</View>

								<View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', paddingTop:20}}>
									<TouchableHighlight style={{justifyContent:'center', alignItems:'center',backgroundColor:'#F1F2F2', height:65, width:screen_width*0.4-2}} onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
										<Text style={{fontSize:22, color:'#58595b', fontWeight:'bold', textAlign:'center'}}>No</Text>
									</TouchableHighlight>
									<TouchableHighlight style={{justifyContent:'center', alignItems:'center',backgroundColor:'#7e5d91', height:65, width:screen_width*0.4-2}} onPress={() => { this.RemoveItemFromCart(), this.setModalVisible(!this.state.modalVisible) }}>
										<Text style={{fontSize:22, color:'#FFF', fontWeight:'bold', textAlign:'center'}}>Yes</Text>
									</TouchableHighlight>
								</View>

							</View>
						</View>
					</Modal>
				</View>
			</SideMenu>
		)
	};

	_renderRow (rowData: object, sectionID: number, rowID: number, quantity: number, highlightRow: (sectionID: number, rowID: number) => void) {
	    return (
			<View  style={styles.item}>
				<Image source={{uri:(API_Config.baseUrl_token +rowData.featured_image)}} resizeMode={Image.resizeMode.contain} style={{width: screen_width*0.26, 
   						height: screen_width*0.26, marginLeft:5 }}/>
				<View style={{flexDirection:'column', marginLeft:10}}>
					<Text style={{color:'#414143', fontSize: 18, width:screen_width*0.5}} numberOfLines={1}>{rowData.name}</Text>
					<Text style={{color:'rgb(166,167,169)', fontSize: 12}}>{rowData.unit_measurement}</Text>
					<Text style={{color:'rgb(166,167,169)', fontSize: 12}}>${numeral(rowData.real_price).format('0.00')}</Text>
				</View>
				<View style={{flexDirection:'column', position:'absolute', right: 0}}>
					<TouchableHighlight onPress={() => {this.onIncreaseQuantity(rowData)}}>
						<View style={styles.quantityButton}>
							<Text style={{fontSize:25, color: '#FFF'}}> + </Text>
						</View>
					</TouchableHighlight>
					<View style={styles.quantityNumber}>
						<Text style={{fontSize:17, color: '#414143'}}> {rowData.quantity} </Text>
					</View>
					<TouchableHighlight onPress={() => {this.onReduceQuantity(rowData)}}>
						<View style={styles.quantityButton}>
							<Text style={{fontSize:25, color: '#FFF'}}> - </Text>
						</View>
					</TouchableHighlight>
				</View>
			</View>	      	
	    );
	}

	_renderSeparator (sectionID: number, rowID: number, adjacentRowHighlighted: bool) {

  		return (
	  		<View
	    		key={`${sectionID}-${rowID}`}
	    		style={{ height: 1, backgroundColor:'#F1F2F2', flex:1,opacity:0.8}}
	  		/>
  		);
	}
}


const styles= StyleSheet.create({

	bg: {
		backgroundColor:'#F1F2F2',
		flexDirection:'column',
		flex:1
	},

	checkOutButton: {
		backgroundColor:'#7e5d91',
		height: 60,
		position: 'absolute',
		flex:0.1,
		bottom: 0,
		width: screen_width,
		justifyContent:'center',
		alignItems:'center'
	},

	subTotalView: {
		backgroundColor:'#FFF',
		flexDirection: 'row', 
		alignItems:'center', 
		justifyContent:'space-between', 
		width: screen_width,
		height: 50,
		position:'absolute', 
		bottom:60,
		paddingLeft: 10,
		paddingRight: 10
	},

	list: {
		flexDirection:'row',
    	flexWrap: 'wrap',
		alignItems:'center',
		backgroundColor:'#F1F2F2',
   	},

   	item: {
   		width:screen_width,
   		height: screen_width*0.3,
   		backgroundColor:'#FFF', 
   		flexDirection:'row', 
   		alignItems:'center',
   		marginTop: 10,
		marginBottom: 10
   	},

   	quantityButton: {
   		width: screen_width*0.3*0.33, 
   		height: screen_width*0.3*0.33,  
   		backgroundColor: 'rgb(166,167,169)', 
   		justifyContent:'center', 
   		alignItems:'center',
   		borderWidth: 1,
   		borderColor: 'rgb(166,167,169)'
   	},

   	quantityNumber: {
   		backgroundColor: '#FFF',
   		width: screen_width*0.3*0.33, 
   		height: screen_width*0.3*0.34, 
   		justifyContent:'center', 
   		alignItems:'center',
   		borderWidth: 1,
   		borderColor: 'rgb(166,167,169)'
   	},

   	modalViewStyle: {
		justifyContent:'center', 
		alignItems:'center', 
		backgroundColor:'rgba(0,0,0,0.5)', 
		height:screen_height, 
		width:screen_width
	}

})

export default connect(
  state => ({
  	currentPage: state.tabInfo.currentPage,
  	signUpResult: state.userRegister.signUpResult,
  	suppliers: state.geoCodeForm.suppliers,
  	clientTokenResult: state.userRegister.clientTokenResult,
  	passwordTokenResult: state.userRegister.passwordTokenResult,
  	userGeoAddressList: state.geoCodeForm.selectedList,
  	createcartInfo: state.cartInfo.createcartInfo,
  	addCartResult: state.cartInfo.addcartInfo,
  	removeCartInfo: state.cartInfo.removeCartInfo,
  	cartLoading: state.cartInfo.addloading,
  	cartInfo: state.cartInfo.cartInfo,
  }),{savePrevPage, removeCartInfo, getCartInfo, addCartInfo, saveCurrentPage})(ProductCartView);