import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, ListView, Image, View, Text, RecyclerViewBackedScrollView, TouchableOpacity, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import _ from 'lodash';
import SearchBarView from './SearchBarView'
import {AsyncStorage} from 'react-native';


import {loadProductCategoriesList, setProductCategory} from '../redux/actions/productCategoriesActions';
import {getCartInfo, createCartInfo} from '../redux/actions/productCartActions';
import {savePrevPage, saveCurrentPage, saveTabType} from '../redux/actions/tabInfoAction';

const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

var ListViewHeight = screen_height*0.22*7;

class ProductCategoryListView extends Component{

	constructor(props) {
	  super(props);
		this.state = {
		  	dataSource: null,
		  	ArrowUpIconState: false,
		  	ArrowDownIconState: true,
		  	isOpen: false,
    		selectedItem: 'SelectStore',
		};
	}

	toggle() {
		console.log("abc");
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

	componentWillMount(){
		const {clientTokenResult} = this.props;

		var clientToken;

		if (clientTokenResult) {
			clientToken = 'Bearer ' + clientTokenResult.access_token;
		}

		this.props.savePrevPage('address');
		this.props.loadProductCategoriesList(clientToken);
		this.props.saveTabType('category');
		AsyncStorage.setItem('firstSignIn', JSON.stringify('true'));
	}
	componentDidMount(){
		this.props.saveCurrentPage('productCategory');
	}

	componentWillReceiveProps(nextProps) {

		const {categories} = nextProps.productCategories;
	  		
		if (categories) {
	
			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({dataSource: ds.cloneWithRows(categories)});
		}

	}

	_onClickProductCategory(rowData){
		
		this.props.savePrevPage('productCategory');
		const categoryList_name = rowData.title;

		this.props.setProductCategory(categoryList_name);

		console.log('rowData,title', rowData.title)

		Actions.tab({selectedProductCategoryName: rowData.title})
	}

	handleScroll (event: Object) {

		const currentScrollPosition = event.nativeEvent.contentOffset.y

		if (currentScrollPosition < screen_height*0.22){
			this.setState({ArrowUpIconState: false})
		}
		else{
			this.setState({ArrowUpIconState: true})
		}

		if (currentScrollPosition > screen_height*0.22*3) {
			this.setState({ArrowDownIconState:false})
		}else {
			this.setState({ArrowDownIconState: true})
		}
	}

	render(){

		const menu = <Menu onItemSelected={this.onMenuItemSelected} userGeoAddressList={this.props.userGeoAddressList} />;
		return(
			<SideMenu
		        menu={menu}
		        isOpen={this.state.isOpen}
		        onChange={(isOpen) => this.updateMenuState(isOpen)}>
				<View style={styles.bg}>
				  	<SearchBarView addFlag='true' onPress={()=>this.toggle()}/>

				  	{ this.state.dataSource && (
					  	<View style={styles.ProductCategoryListView}>
						  	<ListView
						        dataSource={this.state.dataSource}
						        renderRow={this._renderRow.bind(this)}
						        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
		            			renderSeparator={this._renderSeparator}
		            			onEndReached={() => { console.log("fired");}}
		            			onScroll ={(event)=>this.handleScroll(event)}
				      		/>
			      		</View>)
			      	}

			      	{ this.state.dataSource && (this.state.ArrowUpIconState == true)&&(

						<View style={{position:'absolute', top: 75, left:(screen_width*0.5-30)}}>
							<Image style={styles.arrow_up} source={require('../assets/images/arrow_up.png')} resizeMode={Image.resizeMode.contain}/>
						</View>)
					}

					{ this.state.dataSource && (this.state.ArrowDownIconState == true)&&(

						<View style={{position:'absolute', bottom: 1, left:(screen_width*0.5-30)}}>
							<Image style={styles.arrow_down} source={require('../assets/images/arrow_down.png')} resizeMode={Image.resizeMode.contain}/>
						</View>)
					}
				</View>
			</SideMenu>
		)
	};

	_renderRow (rowData: object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
		console.log("rowdata of categorylistview:", rowData);
	    return (
	      <TouchableHighlight onPress={()=>{highlightRow(sectionID, rowID); this._onClickProductCategory(rowData)}}>
	        <View style={{height: screen_height*0.22}}>
				{(rowData.banner != "") && (
	        		<Image source={{uri:rowData.banner}} resizeMode={Image.resizeMode.contain} style={styles.categoryList_image}>
						<View style={{flexDirection:'column',flex:1}}>
							<View style={{flex:1,justifyContent:'center',marginLeft:27}}>
							   	<Text style={styles.categoryListTitle}>{rowData.title.toUpperCase()}</Text>
							</View>
						</View>
					</Image>
	        	)} 	
				{!rowData.banner && (
	        		<Image source={require('../assets/images/liquor.png')} resizeMode={Image.resizeMode.contain} style={styles.categoryList_image}>
						<View style={{flexDirection:'column',flex:1}}>
							<View style={{flex:1,justifyContent:'center',marginLeft:27}}>
							   	<Text style={styles.categoryListTitle}>{rowData.title.toUpperCase()}</Text>
							</View>
						</View>
					</Image>
	        	)} 	
	   
			</View>
	      </TouchableHighlight>
	    )
	}

  	_renderSeparator (sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    	return (
      		<View
        		key={`${sectionID}-${rowID}`}
        		style={{ height: 2, backgroundColor: '#FFF', flex:1}}
      		/>
    	);
  	}

  	_pressRow (rowID: number) {
	    this._pressData[rowID] = !this._pressData[rowID];
	    this.setState({dataSource: this.state.dataSource.cloneWithRows(
	      this._genRows(this._pressData)
	    )});
  	}
}

const styles= StyleSheet.create({

	bg: {
		backgroundColor: 'white',
		flexDirection:'column',
		flex:1
	},


	categoryList_image:{
		flex:1,
		resizeMode:'stretch',
		width:null,
		height: null,
		backgroundColor: 'transparent'
	},

	categoryListTitle:{
		color: 'white',
		fontSize: 27.5,
	},


	ProductCategoryListView:{
		flex:1,
	},

	arrow_up:{
		width:60,
		height:30,
	},

	arrow_down:{
		width:60,
		height:30,
	},
})

export default connect(
  state => ({
  	productCategories: state.productCategories,
  	clientTokenResult: state.userRegister.clientTokenResult,
  	userGeoAddressList: state.geoCodeForm.selectedList,
  }),{getCartInfo, loadProductCategoriesList, setProductCategory, savePrevPage, saveCurrentPage, saveTabType, createCartInfo})(ProductCategoryListView);
