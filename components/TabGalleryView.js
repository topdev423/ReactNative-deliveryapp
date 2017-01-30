import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, Image, View, Text, TouchableOpacity, ScrollView, ListView,RecyclerViewBackedScrollView, InteractionManager} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import _ from 'lodash';
import Dimensions from 'Dimensions';
import {loadProductGalleryListFromCategory, loadProductGalleryListFromTypes} from '../redux/actions/productGalleryActions';
import SearchBarView from './SearchBarView'

const SideMenu = require('react-native-side-menu');
const Menu = require('./Menu');
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

/** generate prouctGallerylist**/

class TabGalleryListView extends Component{

	constructor(props) {
	  super(props);

	  const {galleryData} = props;
	
	  this.state = {

	  	showSortList: false,
		dataSource: null,
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

		const selectedID = this.props.geoCodeForm.selectedID
		const typeID = this.props.selectedTypes
		const {galleryData} = this.props;
	  
	  	if(galleryData){
	  		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({dataSource: ds.cloneWithRows(galleryData)});
	  	}

		if(typeID){

			this.props.loadProductGalleryListFromTypes(selectedID, typeID);
		}
	}

	componentWillReceiveProps(nextProps){


		const{galleryListofTypes} = nextProps.productGalleryOfTypes;

		if(galleryListofTypes && galleryListofTypes.length > 0){
			
			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({dataSource: ds.cloneWithRows(galleryListofTypes)});
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

					<SearchBarView onPress={()=>this.toggle()}/>
			  		
					<View style={{height:35,backgroundColor:'#FFF',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
						<View style={{paddingLeft:10,flex:1}}>
							<Text style={{color:'#58595B'}}>Domestic</Text>
						</View>
						<View style={{paddingRight:10,flexDirection:'row'}}>
							<Text style={{color:'#58595B',marginRight:10}}>Recommended</Text>
							<TouchableOpacity>
								<Image source={require('../assets/images/filterlist_down.png')} resizeMode={Image.resizeMode.contain} style={{width:12, marginTop:3}}/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{borderColor:'#58595B', borderWidth:1, opacity:0.1}}/>
					<View style={{backgroundColor:'#F1F2F2', flex:1}}>
						{this.state.dataSource &&(
							<ListView contentContainerStyle={styles.list}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow.bind(this)}
								renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
								renderSeparator={this._renderSeparator}
							/>
						)}
					</View>
				</View>
			</SideMenu>
		)
	};

	_renderRow (rowData: object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {

	    return (

	      	<TouchableHighlight onPress={() => {highlightRow(sectionID, rowID);}}>

		        <View style={styles.item}>
					<View style={{flex:6,padding:10}}>
						<Image source={{uri:rowData.image_path}} resizeMode={Image.resizeMode.contain} style={{width:100,height:100}}/>
					</View>
					<View style={{flex:4,padding:10}}>
						<Text style={{fontSize:14}} numberOfLines={1} >{rowData.name}</Text>
						<Text style={{fontSize:14}} numberOfLines={1} >{rowData.supplier_products[0].unit_measurement} - ${rowData.supplier_products[0].real_price}</Text>
						{rowData.variations.length == 1 && (
							<Text style={{fontSize:14}} numberOfLines={1} >{rowData.variations.length} more size available</Text>
						)}
						{rowData.variations.length > 1&& (
							<Text style={{fontSize:14}} numberOfLines={1} >{rowData.variations.length} more sizes available</Text>
						)}
					</View>
		        </View>
	      	</TouchableHighlight>
	      	
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

	_pressRow (rowID: number) {
    	this._pressData[rowID] = !this._pressData[rowID];
    	this.setState({dataSource: this.state.dataSource.cloneWithRows(
    	this._genRows(this._pressData)
    )});
	}
}

export default connect(
  state => ({
  	productGallery: state.productGallery,
  	productGalleryOfTypes: state.productGalleryOfTypes, 
  	productCategories: state.productCategories, 
  	geoCodeForm: state.geoCodeForm,
  	userGeoAddressList: state.geoCodeForm.selectedList,
	}),
  {loadProductGalleryListFromCategory, loadProductGalleryListFromTypes})(TabGalleryListView);

const styles= StyleSheet.create({

	bg: {
		backgroundColor: 'white',
		flexDirection:'column',
		flex:1
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
		backgroundColor:'#F1F2F2'
   	},

  	item: {

    	backgroundColor: '#FFF',
		width:screen_width*0.47,
		height:screen_height*0.285,
		alignItems:'center',
		borderRadius:5,
		marginLeft:5,
		marginTop:10
  }

})
