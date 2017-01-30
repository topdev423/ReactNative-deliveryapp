import React, {Component} from 'react';
import {
	StyleSheet, 
	TouchableHighlight, 
	Image, 
	View, 
	Text, 
	TouchableOpacity, 
	ScrollView, 
	ListView,
	RecyclerViewBackedScrollView, 
	InteractionManager,
} from 'react-native'

import Menu, {
	MenuContext,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from 'react-native-menu';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Dimensions from 'Dimensions';
import numeral from 'numeral';
import {savePrevPage, saveTabType, saveCurrentPage} from '../redux/actions/tabInfoAction';
import ModalDropdown from 'react-native-modal-dropdown';


const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

/** generate prouctGallerylist**/

class ProductGalleryListView extends Component{

	constructor(props) {
	  super(props);

	  this.state = {

	  	showSortList: false,
		row1_data: null,
		row2_data: null,
		typeName: props.typeName,
		galleryData: null,
		searchPage: 'false',			//identify searchproduct page when click search button
	  };
	}

	componentWillMount() {
		const {galleryData, selectCategoryName} = this.props;

		if (selectCategoryName != 'featured') {
			this.props.savePrevPage('tab');
		}
		else {
			this.props.savePrevPage('productCategory');	
		}


	  	this.props.saveCurrentPage('tab');
	  	// this.props.saveCurrentPage('productGallery');

	  	this.setState({galleryData:galleryData});
	  	this.setState({searchPage: 'true'});
	}

	setRowDatas(galleryData) {
		
		var row1_data = [], row2_data = [];
	  	row1_data = [], row2=_data = [];
	  	for (i = 0; i < galleryData.length; i ++) {
	  		if (i % 2 == 0) {
	  			row1_data.push(galleryData[i]);
	  		}
	  		else {
	  			row2_data.push(galleryData[i]);
	  		}
	  	}
	  	this.setState({row1_data: row1_data});
	  	this.setState({row2_data: row2_data});
	}

	componentWillReceiveProps(nextProps){
		
	}

	onGotoProductDetailView(rowData) {	
		Actions.productDetailView({productData: rowData, prevPage: 'tab'});
		this.props.saveTabType('gallery');
	}

	_onSelectRecommended(index, value) {
		const {galleryData} = this.props;
		if (index == 0)	//name a-z
		{
			galleryData.sort(this.sortNameAZ);
		}
		if (index == 1)	//name z-a
		{
			galleryData.sort(this.sortNameZA);
		}
		if (index == 2)	//price Low to High
		{
			galleryData.sort(this.sortPriceLowToHigh);
		}
		if (index == 3)	//price High to Low
		{
			galleryData.sort(this.sortPriceHighToLow);
		}
		this.setState({galleryData: galleryData});

	}

	sortNameAZ(a,b) {
		var A = a.name.toLowerCase();
	     var B = b.name.toLowerCase();
	     if (A < B){
	        return -1;
	     }else if (A > B){
	       return  1;
	     }else{
	       return 0;
	     }
	}
	sortNameZA(a,b) {
		var A = a.name.toLowerCase();
	     var B = b.name.toLowerCase();
	     if (B < A){
	        return -1;
	     }else if (B > A){
	       return  1;
	     }else{
	       return 0;
	     }
	}

	sortPriceLowToHigh(a,b) {
		var A = a.supplier_products[0].real_price;
	    var B = b.supplier_products[0].real_price;
	    return parseFloat(A) - parseFloat(B);
	}

	sortPriceHighToLow(a,b) {
		var A = a.supplier_products[0].real_price;
	    var B = b.supplier_products[0].real_price;
	    return parseFloat(B) - parseFloat(A);
	}

	render(){
		const instance = this;
		const galleryData_props = this.props.galleryData
		let {galleryData, searchPage} = this.state;

		if (searchPage == 'true') {
			galleryData = galleryData_props;
		}

		var row1_data = [], row2_data = [];
	 
	  	for (i = 0; i < galleryData.length; i ++) {
	  		if (i % 2 == 0) {
	  			row1_data.push(galleryData[i]);
	  		}
	  		else {
	  			row2_data.push(galleryData[i]);
	  		}
	  	}


		var recommendedList=['Name A to Z', 'Name Z to A', 'Price Low to High', 'Price High to Low'];

		return(
			<View style={styles.bg}>

				<View style={{height:35,backgroundColor:'#FFF',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
					<View style={{paddingLeft:10,flex:1}}>
						<Text style={{color:'#58595B'}}>{this.state.typeName}</Text>
					</View>
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<ModalDropdown
				  			ref='exp_month'
				  			options={recommendedList}
				  			defaultValue={'Name A to Z'}
				  			textStyle={{fontSize:15, color:"#414042", paddingRight:0}}
				  			onSelect={(index, value)=>this._onSelectRecommended(index, value)}>
				  		</ModalDropdown>
				  	</View>
				</View>

				<View style={{borderColor:'#58595B', borderWidth:1, opacity:0.1}}/>

				<View style={{backgroundColor:'#F1F2F2', flexDirection:'row'}}>
					<View style={{flexDirection:'column'}}>
					{
						row1_data
						?	row1_data.map(function(item, index) {
								return  (
									<TouchableHighlight key={index} onPress={() => instance.onGotoProductDetailView(item)}>

								        <View style={styles.item}>
											<View style={{flex:6,padding:10}}>
												<Image source={{uri:item.image_path}} resizeMode={Image.resizeMode.contain} style={{width:100,height:100}}/>
											</View>
											<View style={{flex:4,padding:10}}>
												<Text style={{fontSize:14}} numberOfLines={1} >{item.name}</Text>
												<Text style={{fontSize:14}} numberOfLines={1} >{item.supplier_products[0].unit_measurement}</Text>
												<Text style={{fontSize:14}} numberOfLines={1} >${numeral(item.supplier_products[0].real_price).format('0.00')}</Text>
												{(item.supplier_products.length == 1 )&& (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >1 size available</Text>
												)}
												{(item.supplier_products.length == 2 )&& (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >1 more size available</Text>
												)}
												{(item.supplier_products.length > 2) && (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >{item.supplier_products.length-1} more sizes available</Text>
												)}
											</View>
								        </View>
							      	</TouchableHighlight>
								)
							})
						: 	null
					}
					</View>
					<View style={{flexDirection:'column'}}>
					{
						row2_data
						?	row2_data.map(function(item, index) {
								return  (
									<TouchableHighlight key={index} onPress={() => instance.onGotoProductDetailView(item)}>

								        <View style={styles.item}>
											<View style={{flex:6,padding:10}}>
												<Image source={{uri:item.image_path}} resizeMode={Image.resizeMode.contain} style={{width:100,height:100}}/>
											</View>
											<View style={{flex:4,padding:10}}>
												<Text style={{fontSize:14}} numberOfLines={1} >{item.name}</Text>
												<Text style={{fontSize:14}} numberOfLines={1} >{item.supplier_products[0].unit_measurement}</Text>
												<Text style={{fontSize:14}} numberOfLines={1} >${numeral(item.supplier_products[0].real_price).format('0.00')}</Text>
												{(item.supplier_products.length == 1 )&& (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >1 size available</Text>
												)}
												{(item.supplier_products.length == 2 )&& (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >1 more size available</Text>
												)}
												{(item.supplier_products.length > 2) && (
													<Text style={{fontSize:14, fontStyle: 'italic'}} numberOfLines={2} >{item.supplier_products.length-1} more sizes available</Text>
												)}
											</View>
								        </View>
							      	</TouchableHighlight>
								)
							})
						: 	null
					}
					</View>
				
				</View>				

			</View>
		)
	};
}


const styles= StyleSheet.create({

	bg: {
		backgroundColor: '#F1F2F2',
		flexDirection:'column',
		flex:1,
		position: 'relative'
	},

	ToolBar:{
		marginTop:0,
		height:75,
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

	navigationBack_icon:{
		width:25,
		height:20,
		marginLeft:5
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

	list: {
		flexDirection:'row',
    	flexWrap: 'wrap',
		alignItems:'center',
		backgroundColor:'#F1F2F2',
   	},

  	item: {

    	backgroundColor: '#FFF',
		width:screen_width*0.47,
		height:screen_height*0.36,
		alignItems:'center',
		borderRadius:5,
		marginLeft:5,
		marginTop:10,
  	},

	menuTopbar: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},

	menuTrigger: {
		flexDirection: 'row',
	},

	dropdownOptions: {
		flex: 1,
	    borderColor: '#ccc',
	    borderWidth: 2,
	    width: 300,
	    height: 200,
	    position: 'absolute',
	    right: 0,
	},

	divider: {
		marginVertical: 5,
		marginHorizontal: 2,
		borderBottomWidth: 1,
		borderColor: '#ccc'
	}

})

export default connect(
  	state => ({

  	}),{savePrevPage, saveTabType, saveCurrentPage})(ProductGalleryListView);
