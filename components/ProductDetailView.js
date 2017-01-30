import React, {Component} from 'react';
import {Modal, TouchableHighlight, StyleSheet, Image, View, Text, TouchableOpacity, TextInput, ScrollView, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RadioButton from 'react-native-radio-button';
import {connect} from 'react-redux';
import {loadSubmitResult} from '../redux/actions/partyOrderActions';
import {AsyncStorage} from 'react-native';
import Popup from 'react-native-popup';
import CheckBox from 'react-native-check-box';
import SearchBarView from './SearchBarView';
import {addCartInfo, getCartInfo} from '../redux/actions/productCartActions';
import {savePrevPage, saveCurrentPage, saveProductData, saveTabType} from '../redux/actions/tabInfoAction';
import numeral from 'numeral';

const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class ProductDetailView extends Component{

	constructor(props) {
		super(props);

		let {productData} = props;
		
			
		this.state = {
			rowData: productData, 
			arrowState: 'off',
			dropStatus: 'off',
			quantityNumber: 1,			//quantiy number
			dropIndex: 0,				//dropdown flag
			modalVisible: false,		//modal show flag
			clientTokenResult: props.clientTokenResult,
			isOpen: false,
    		selectedItem: 'Payments',
    		UUID: '',
    		cartID: '',
    		cartLoadingFlag: 'false',
    		addFlag: 'false'
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

	componentDidMount() {
		const {prevPage, tabType, productData, createcartInfo, cartLoading} = this.props;
		
		this.props.savePrevPage(prevPage);
		//this.props.saveCurrentPage('productDetailView');
		this.props.saveCurrentPage('tab');
		this.props.saveProductData(productData);
		this.props.saveTabType(tabType);

		if (createcartInfo) {
			UUID = createcartInfo.guest_id;
			cartID = createcartInfo.id;
			this.setState({UUID	: UUID});
			this.setState({cartID: cartID});
		}

	}

	componentWillReceiveProps(nextProps){
		const {addCartResult, cartLoading} = nextProps;
		const {clientTokenResult, UUID, cartID, cartLoadingFlag} = this.state;
		
		if (cartLoading == true)
			this.setState({cartLoadingFlag: 'true'});

		clientToken = 'Bearer ' + clientTokenResult.access_token;
		

		if (addCartResult && cartLoadingFlag == 'true' && cartLoading == false) {
			
			this.props.getCartInfo(cartID, UUID, clientToken);
			this.setState({addFlag: 'true'});
		}
	}

	//show dropdown menu when click arrowDown icon
	onShowDropItems() {
		const {dropStatus} = this.state;

		if (dropStatus == 'off') {
			this.setState({ dropStatus: 'on' })

		} else {
			this.setState({ dropStatus: 'off' })
		}
	}

	//click plus button
	onPlusCart() {
		let {quantityNumber} = this.state;
		quantityNumber += 1;

		this.setState({quantityNumber: quantityNumber});
	}

	//click minus button
	onMinusCart() {
		let {quantityNumber} = this.state;
		if (quantityNumber == 0)
			quantityNumber = 0;
		else
			quantityNumber -= 1;

		this.setState({quantityNumber: quantityNumber});
	}

	changeDropIndex(index) {
		this.setState({dropIndex: index});
		this.setState({ dropStatus: 'off' })
	}

	setModalVisible(visible) {
	    this.setState({modalVisible: visible});
	}


	showConfirmAlert(visible){
		let {quantityNumber} = this.state;
		if (quantityNumber != 0) {
			this.setState({modalVisible: visible});
		}
	}

	addItemToCart() {
		let {quantityNumber} = this.state;
		if (quantityNumber != 0) {
			const {createcartInfo} = this.props;
			const {UUID, cartID} = this.state;


			const {rowData, dropIndex, clientTokenResult} = this.state;
			let quantityNumber = this.state.quantityNumber

			supplier_id = rowData['supplier_products'][dropIndex]['id'];

			clientToken = 'Bearer ' + clientTokenResult.access_token;

			this.props.addCartInfo(cartID, UUID, supplier_id, quantityNumber, clientToken);
			
		}
	}

	render(){

		const {rowData, dropIndex, addFlag} = this.state;
		console.log('rowData:', rowData);
		const instance = this;
	
		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList} />;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>

				<View style={styles.bg}>
					<SearchBarView currentPage={'productDetailView'}  addFlag='true'  onPress={()=>this.toggle()}/>

					<ScrollView
						style={{flex:1, flexDirection:'column'}}
						vertical={true}>

						<View style={styles.productViewStyle} >
				  			<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
				  				<Image source={{uri:rowData.image_path}} resizeMode={Image.resizeMode.contain} style={styles.productImageStyle}/>
				  			</View>

				  			<Text style={{fontSize:21, color:'#58595b', fontWeight:'bold', marginTop:20}} numberOfLines={1} >{rowData.name}</Text>

				  			<Text style={{fontSize:16, color:'#7e5d91'}} numberOfLines={1} >{rowData.supplier_products[dropIndex].unit_measurement} - ${numeral(rowData.supplier_products[dropIndex].real_price).format('0.00')}</Text>
				  			{(rowData.supplier_products.length == 1 )&& (
				  				<Text style={{fontSize:16, color:'#58595b', fontStyle: 'italic', fontWeight:'bold'}} numberOfLines={1} >1 size available</Text>
				  			)}
				  			{(rowData.supplier_products.length == 2 )&& (
				  				<Text style={{fontSize:16, color:'#58595b', fontStyle: 'italic', fontWeight:'bold'}} numberOfLines={1} >1 more size available</Text>
				  			)}
							{(rowData.supplier_products.length > 2) && (
								<Text style={{fontSize:16, color:'#58595b', fontStyle: 'italic', fontWeight:'bold'}} numberOfLines={1} >{rowData.supplier_products.length-1} more sizes available</Text>
				  			)}

				  			<Text style={{fontSize:19, color:'#58595b', fontWeight:'bold', marginTop:20}} >Description</Text>
				  			<Text style={{fontSize:14, color:'#58595b'}} >{rowData.description}</Text>
				  			{
				  				rowData.attributes != null ?
				  				rowData.attributes.map(function(item, index){
				  					return (
				  						<View key={index} style={{flexDirection:'column'}}>
				  							<Text style={{fontSize:19, color:'#58595b', fontWeight:'bold', marginTop:20}} >{item.group_name}</Text>
				  							<Text style={{fontSize:14, color:'#58595b'}} >{item.value}</Text>
				  						</View> )
				  				})
				  				:
				  				null
				  			}
					  	</View>
					  	<View style={{height:200}} ></View>
					 </ScrollView>

				  	<View style={{backgroundColor:'#FFF', position:'absolute', bottom:60,borderTopColor:'#DDD',borderBottomWidth:1, borderBottomColor:'#F1F2F2',borderTopWidth:1, width:screen_width}}>
				  		<TouchableOpacity onPress={this.onShowDropItems.bind(this)}>
				  			<View style={styles.textViewStyle} >
				  				<Text style={styles.textStyle} >{rowData.supplier_products[this.state.dropIndex].unit_measurement} - ${numeral(rowData.supplier_products[this.state.dropIndex].real_price).format('0.00')}</Text>
					  			{rowData.supplier_products.length > 1 &&
									<Image source={require('../assets/images/filterlist_down.png')} resizeMode={Image.resizeMode.center} style={styles.arrowDownStyle} />
								}
				  			</View>
				  		</TouchableOpacity>

				  		{this.state.dropStatus == 'on' 
				  			? 	rowData.supplier_products.map(function(item, index) {
				  					if(index != dropIndex) { 
					  					return (
					  						<TouchableOpacity key={index} onPress={()=>instance.changeDropIndex(index)} >
						  						<View key={index} style={styles.textViewStyle} >
													<Text style={styles.textStyle} >{item.unit_measurement} - ${numeral(item.real_price).format('0.00')}</Text>
												</View>
											</TouchableOpacity>
										)
					  				}
					  			})
				  			: 	null
				  		}

				  	</View>

				  	<View style={styles.cartView}>
				  		<View style={{flex:1, backgroundColor:'#7e5d91',justifyContent:'center', alignItems:'center'}}>
					  		<TouchableOpacity onPress={()=>this.addItemToCart()}>
					  			<Text style={{fontSize:25,color:'#FFF',textAlign:'center', fontWeight:'bold'}}>ADD TO CART</Text>
					  		</TouchableOpacity>
					  	</View>

				  		<View style={styles.cartControlView}>
				  			<View style={{backgroundColor:'#603e70',justifyContent:'center', alignItems:'center',width: 60}}>
						  		<TouchableOpacity onPress={()=>this.onMinusCart()} >
						  			<Text style={styles.cartControlButton}>-</Text>
						  		</TouchableOpacity>
						  	</View>

						  	<View style={{backgroundColor:'#FFF',width: 60,justifyContent:'center', alignItems:'center'}}>
					  			<Text style={styles.quantityNumber}> {this.state.quantityNumber} </Text>
					  		</View>

					  		<View style={{backgroundColor:'#603e70',justifyContent:'center',alignItems:'center',width: 60}}>
						  		<TouchableOpacity onPress={()=>this.onPlusCart()} >
						  			<Text style={styles.cartControlButton}>+</Text>
						  		</TouchableOpacity>
						  	</View>

					  	</View>
				  	</View>

				  	<Modal
						animationType={"slide"}
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {alert("Modal has been closed.")}}
						>
						<View style={styles.modalViewStyle} >
							<View style={{width: screen_width*0.8, borderRadius:5, backgroundColor:'#FFF', paddingTop: 20, borderWidth:2, borderColor:'#FFF'}}>
								<View style={{justifyContent:'center', alignItems:'center'}}>	
									<Text style={{fontSize:25, color:'#58595b', fontWeight:'bold', textAlign:'center'}}>Liquor Store Closed{"\n"}For Delivery</Text>
								</View>

								<View style={{justifyContent:'center', alignItems:'center', paddingTop:20}}>	
									<Text style={{fontSize:18, color:'#58595b', textAlign:'center'}}>LiquorStore is currently closed for delivery. You will need to schedule a delivery at checkout</Text>
								</View>

								<View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', paddingTop:20}}>
									<View style={{justifyContent:'center', alignItems:'center',backgroundColor:'#F1F2F2', height:65, width:screen_width*0.4-2}}>
										<TouchableHighlight onPress={() => { instance.setModalVisible(!instance.state.modalVisible) }}>
											<Text style={{fontSize:22, color:'#58595b', fontWeight:'bold', textAlign:'center'}}>Cancel</Text>
										</TouchableHighlight>
									</View>
									<View style={{justifyContent:'center', alignItems:'center',backgroundColor:'#7e5d91', height:65, width:screen_width*0.4-2}}>
										<TouchableHighlight onPress={() => { instance.addItemToCart(), instance.setModalVisible(!instance.state.modalVisible) }}>
											<Text style={{fontSize:22, color:'#FFF', fontWeight:'bold', textAlign:'center'}}>Add To Cart</Text>
										</TouchableHighlight>
									</View>
								</View>

							</View>
						</View>
					</Modal>
				</View>
			</SideMenu>
		)
	};
}


const styles= StyleSheet.create({

	bg: {
		backgroundColor:'#F1F2F2',
		flexDirection:'column',
		height:screen_height,
		flex:1
	},

	productViewStyle: {
		backgroundColor:'#F1F2F2',
		flexDirection:'column',
		paddingLeft: 35,
		paddingRight: 35,
		paddingTop: 30,
	},

	productImageStyle: {
		justifyContent:'center', 
		width: 230, 
		height: 230
	},

	textViewStyle: {
		flex: 1,
		flexDirection:'row', 
		alignItems:'center',
		borderBottomColor:'#F1F2F2',
		justifyContent:'space-between',
		borderBottomWidth:2,
		paddingLeft: 10,
		paddingRight: 5,
		paddingTop: 5,
		paddingBottom: 5,
		height:45
	},

	textStyle: {
		color:'#58595b',
		backgroundColor:'#FFF',
		fontSize:17,
		textAlign: 'left',
		width:screen_width*0.85
	},

	arrowDownStyle: {
		width:screen_width*0.15,
		justifyContent:'flex-end'
	},

	cartView: {
		flexDirection:'row', 
		backgroundColor:'#7e5d91',
		height: 60,
		position: 'absolute',
		flex:0.1,
		bottom: 0,
		width: screen_width
	},

	cartControlView: {
		flexDirection:'row', 
		height:60,
		borderWidth: 1,
		justifyContent:'space-between',
		borderColor:'#603e70'
	},

	cartControlButton: {
		fontSize:35,
		color:'#FFF',
		fontWeight: 'bold',
		textAlign:'center'
	},

	quantityNumber: {
		fontSize:25,
		color:'#58595b',
		marginTop:5,
		textAlign:'center'
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
  		cartInfo: state.cartInfo.cartInfo,
  		tabType: state.tabInfo.tabType,
  		clientTokenResult: state.userRegister.clientTokenResult,
  		userGeoAddressList: state.geoCodeForm.selectedList,
  		createcartInfo: state.cartInfo.createcartInfo,
  		addCartResult: state.cartInfo.addcartInfo,
  		cartLoading: state.cartInfo.addloading
  	}),{getCartInfo, addCartInfo, savePrevPage, saveCurrentPage, saveProductData, saveTabType})(ProductDetailView);
