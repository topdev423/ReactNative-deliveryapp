import React, {Component} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native'
import {Actions, Router, Scene, ActionConst} from 'react-native-router-flux';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import FeatureVideoListView from './FeatureVideoListView'
import ProductGalleryListView from './ProductGalleryListView'
import ProductTypesListView from './ProductTypesListView'
import PartyOrderFormView from './PartyOrderFormView'
import SearchBarView from './SearchBarView'
import {connect} from 'react-redux';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/**  **/

import {loadProductTypesList} from '../redux/actions/productTypesActions'
import {loadProductGalleryListFromCategory, loadProductGalleryListFromTypes} from '../redux/actions/productGalleryActions';
import {addCartBadge} from '../redux/actions/productCartActions';

import {saveTabID, saveTabType, saveCurrentPage, savePrevPage} from '../redux/actions/tabInfoAction';

const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const tabs = ['Featured', 'Beer', 'Wine', 'Liquor', 'Mixers', 'Party Orders', 'Videos'];
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

class TabView extends Component{

	constructor(props) {
		super(props);

		index = tabs.indexOf(props.selectedProductCategoryName);
		if (index == -1) {
			this.state = {
				data: null,
				selectPage: props.TabID,
				typesData: null,
				isOpen: false,
    			selectedItem: 'SelectStore',
    			categoryListName: '',
    			typeName: ''
			};
		}
		else {
			this.state = {
				data: null,
				selectPage: index,
				typesData: null,
				isOpen: false,
    			selectedItem: 'SelectStore',
    			categoryListName: '',
    			typeName: ''
			};
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

		dismissKeyboard();

		const categoryListName = this.props.selectedProductCategoryName;
		this.setState({categoryListName: categoryListName});

		const {selectPage} = this.state;
		const {listTypeID, tabType} = this.props;
		this.props.saveCurrentPage('tab');

		this.props.savePrevPage("productCategory");

		this.props.saveTabID(selectPage);

		const {clientTokenResult} = this.props;

		clientToken = 'Bearer ' + clientTokenResult.access_token;		

		this.props.savePrevPage('productCategory');
		if (selectPage == 0){
			this.props.loadProductGalleryListFromCategory('featured', this.props.geoCodeForm.selectedID, clientToken);
			this.props.saveTabType('gallery');
		}

		if (selectPage == 1){
			this.props.loadProductTypesList('beer', this.props.geoCodeForm.selectedID, clientToken);
		}	
		if (selectPage == 2){
			this.props.loadProductTypesList('wine', this.props.geoCodeForm.selectedID, clientToken);
		}
		if (selectPage == 3){
			this.props.loadProductTypesList('liquor', this.props.geoCodeForm.selectedID, clientToken);
		}	
		if (selectPage == 4){
			this.props.loadProductTypesList('mixers', this.props.geoCodeForm.selectedID, clientToken);
		}
		if (selectPage == 5){
		}
		if (selectPage == 6){
			this.props.saveTabType('video');
		}
	}

	componentWillReceiveProps(nextProps) {

		const {selectedID} = nextProps.geoCodeForm
		

		this.setState({selectedID: selectedID})
		

		const productGallery = nextProps.productGallery.galleryListofCategory
		
		if(productGallery){
	
			this.setState({galleryData: productGallery})
		}

		const {categoryTypes, loading} = nextProps.productTypes;
		
		this.setState({loading});
		
		if (categoryTypes && categoryTypes.length > 0) {
			this.setState({data: categoryTypes[0], typesData: null});
		}
	}

	async onLoadProductGalleryListFromTypes(typesID, flag='false', name) {
		// const {selectedID} = this.state
		const {selectedID} = this.props.geoCodeForm;
		const {clientTokenResult} = this.props;

		clientToken = 'Bearer ' + clientTokenResult.access_token;

		const result = await this.props.loadProductGalleryListFromTypes(selectedID, typesID, clientToken, flag);
		
		const {body} = result.result

		this.setState({typesData: body, typeName: name});
	}

	onChangeTab(index, ref) {
		dismissKeyboard();
		// const {selectedID} = this.state;
		const {selectedID} = this.props.geoCodeForm;
		const {clientTokenResult} = this.props;

		clientToken = 'Bearer ' + clientTokenResult.access_token;
		
		this.setState({ selectPage: index.i }, () => {
			this.props.savePrevPage('productCategory');	

			if (index.i == 0) {
				this.props.loadProductGalleryListFromCategory('featured', selectedID, clientToken);
				this.props.saveTabType('gallery');
			}

			if (index.i == 1) {
				this.setState({data: null, typesData: null});
				this.props.loadProductTypesList('beer', selectedID, clientToken);
				this.props.saveTabType('category');
				this.setState({categoryListName: 'Beer'});
			}

			if (index.i == 2){
				this.setState({data: null, typesData: null});				
				this.props.loadProductTypesList('wine', selectedID, clientToken);
				this.props.saveTabType('category');
				this.setState({categoryListName: 'Wine'});
			}

			if (index.i == 3){
				this.setState({data: null, typesData: null});
				this.props.loadProductTypesList('liquor', selectedID, clientToken);
				this.props.saveTabType('category');
				this.setState({categoryListName: 'Liquor'});
			}

			if (index.i == 4){
				this.setState({data: null, typesData: null});
				this.props.loadProductTypesList('mixers', selectedID, clientToken);
				this.props.saveTabType('category');
			}

			if (index.i == 5) {
			}

			if (index.i == 6) {
				this.props.saveTabType('video');
			}

			this.props.saveTabID(index.i);
		});

	}

	render(){

		const {data, galleryData, typesData, selectPage, loading, typeName} = this.state;
		let {badgeNumber, tabType} = this.props;
		if (tabType == null)
			tabType = 'gallery';
		console.log("galleryData:", galleryData);
		var featuredFlag = true;
		if (galleryData == undefined || galleryData.length == 0){
			featuredFlag = false;
		}

		const {categoryListName} = this.state;

		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList} />;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<View style={styles.bg}>
			  		<SearchBarView badgeNumber={badgeNumber} currentPage={'tab'} addFlag='true' onPress={()=>this.toggle()}/>
					<View style={{borderColor:'#58595B', borderWidth:1, opacity:0.1}}></View>
					<View style={{flex:1,backgroundColor:'#F1F2'}}>
					  	<ScrollableTabView
					      style={{backgroundColor:'#FFF'}}
					      tabBarBackgroundColor='#7E5D91'
					      tabBarTextStyle={{color:'#FFF'}}
					      tabBarUnderlineStyle={{backgroundColor:'#DC754C'}}
					      page={this.state.selectPage}
					      onChangeTab = {(index)=>this.onChangeTab(index)}
					      renderTabBar={() => <ScrollableTabBar/>}
					    >
					    	<ScrollView tabLabel='FEATURED' style={styles.ScrollView}>
					    		{ featuredFlag == false && loading == false &&
						    		<Text style={{width:screen_width ,textAlign:'center'}}>There are no products currently.</Text>
						    	}
					    		{ featuredFlag == true && galleryData && (
					    			<ProductGalleryListView galleryData = {galleryData} selectCategoryName = {'Featured'} typeName = 'Featured' />
					    		)}
					    	</ScrollView>

						    <ScrollView tabLabel='BEER' style={styles.ScrollView}>
						    	{ !typesData && data == null && loading == false &&
						    		<Text style={{width:screen_width ,textAlign:'center'}}>There are no products currently.</Text>
						    	}
							    {!typesData && data != null && tabType  == 'category' && 
							    	<ProductTypesListView  data ={data} cateTitle={categoryListName} onLoadProductGalleryListFromTypes={this.onLoadProductGalleryListFromTypes.bind(this)}/>
							    }

							    { typesData && (
					    			<ProductGalleryListView galleryData = {typesData} selectCategoryName = {'beer'} typeName = {typeName} />
					    		)}
						    </ScrollView>

						    <ScrollView tabLabel='WINE' style={styles.ScrollView}>
						    	{ !typesData && data == null && loading == false &&
						    		<Text style={{width:screen_width ,textAlign:'center'}}>There are no products currently.</Text>
						    	}
						    	{!typesData && data && tabType == 'category' && 
							    	<ProductTypesListView  data ={data} cateTitle={categoryListName}  onLoadProductGalleryListFromTypes={this.onLoadProductGalleryListFromTypes.bind(this)}/>
							    }

							    { typesData && (
					    			<ProductGalleryListView galleryData = {typesData} selectCategoryName = {'wine'} typeName = {typeName} />
					    		)}

						    </ScrollView>

						    <ScrollView tabLabel='LIQUOR' style={styles.ScrollView}>
						    	{ !typesData && data == null && loading == false &&
						    		<Text style={{width:screen_width ,textAlign:'center'}}>There are no products currently.</Text>
						    	}
						    	{!typesData && data && tabType == 'category' && 
							    	<ProductTypesListView  data ={data} cateTitle={categoryListName}  onLoadProductGalleryListFromTypes={this.onLoadProductGalleryListFromTypes.bind(this)}/>
							    }

							    { typesData && (
					    			<ProductGalleryListView galleryData = {typesData} selectCategoryName = {'liquor'} typeName = {typeName} />
					    		)}

						    </ScrollView>

						    <ScrollView tabLabel='MIXERS' style={styles.ScrollView}>
						    	{ !typesData && data == null && loading == false &&
						    		<Text style={{width:screen_width ,textAlign:'center'}}>There are no products currently.</Text>
						    	}
						    	{!typesData && data && tabType == 'category' && 
							    	<ProductTypesListView  data ={data}  onLoadProductGalleryListFromTypes={this.onLoadProductGalleryListFromTypes.bind(this)}/>
							    }

							    { typesData &&(
					    			<ProductGalleryListView galleryData = {typesData} selectCategoryName = {'mixers'} typeName = {typeName} />
					    		)}
						    
						    </ScrollView>

						    <View 
						    	tabLabel='PARTY ORDERS' 
						    	style={styles.ScrollView}>
						    	<PartyOrderFormView showToolBar = {true}/>
						    </View>

						    <ScrollView tabLabel='VIDEOS' style={styles.ScrollView}>
						    	{tabType == 'video' && (
						    		<FeatureVideoListView />
						    	)}
						    </ScrollView>
					    </ScrollableTabView>
					</View>
				</View>
			</SideMenu>
		)
	};
}

const styles= StyleSheet.create({

	bg: {
		backgroundColor: '#FFF',
		flexDirection:'column',
		flex:1
	},

	ScrollView: {
		backgroundColor: '#FFF'
	}

})

export default connect(
  state => ({
  	productTypes: state.productTypes, 
  	productCategories: state.productCategories, 
  	geoCodeForm: state.geoCodeForm, 
  	productGallery: state.productGallery,
  	TabID: state.tabInfo.saveTabID,
  	tabType: state.tabInfo.tabType,
  	listTypeID: state.tabInfo.listTypeID,
  	clientTokenResult: state.userRegister.clientTokenResult,
  	userGeoAddressList: state.geoCodeForm.selectedList,
  }),{loadProductTypesList, loadProductGalleryListFromCategory, loadProductGalleryListFromTypes, saveTabID, saveCurrentPage, savePrevPage, saveTabType})(TabView);
