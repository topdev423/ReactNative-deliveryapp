import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, ListView, Image, View, Text, TouchableOpacity, ScrollView, RecyclerViewBackedScrollView, Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

import {saveListTypesID, saveCurrentPage} from '../redux/actions/tabInfoAction';


class ProductTypesListView extends Component{

	constructor(props) {
	  super(props);

		this.state = {
		  dataSource: null,
		  categoryData: null
		};
	}

	componentDidMount(){

		const {data} = this.props
		
		if(data){

			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({dataSource: ds.cloneWithRows(data.product_types)})
		}
		this.props.saveCurrentPage('tab');
	}

	componentWillReceiveProps(nextProps){

		const {data} = nextProps

		if(data){
			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			this.setState({dataSource: ds.cloneWithRows(data.product_types)})
		}

	}

	_onSubmitTypesID(typesID, name){
		this.props.saveListTypesID(typesID);
		this.props.onLoadProductGalleryListFromTypes(typesID, 'false', name);
	}

	_onShowAllProduct(cateID) {
		//Show all products
		this.props.onLoadProductGalleryListFromTypes(cateID, 'true', 'Shop All');
	}

	render(){
		
		const {cateTitle, data} = this.props;

		return(
			<View style={styles.bg}>
				<View style= {{flex:1}}>
					<TouchableHighlight onPress={() => {this._onShowAllProduct(data.id);}}>
						<View style={{height:75, flexDirection:'row', alignItems:'center'}}>
						{data.mobile_icon_image != null
						?	<Image source={{uri:data.mobile_icon_image}} resizeMode={Image.resizeMode.contain} style={styles.typesListImage}/>
						: 	<Image source={{uri:'test.png'}} resizeMode={Image.resizeMode.contain} style={styles.typesListImage}/>
						}
							<Text style={{marginLeft:20 }}>Shop All {cateTitle}</Text>
						</View>
					</TouchableHighlight>
					<View style={{borderBottomColor:'#F1F2F2',borderBottomWidth:1}}></View>
					<View style={styles.ProductTypesListView}>
					{ this.state.dataSource &&
				  		<ListView
					        dataSource={this.state.dataSource}
					        renderRow={this._renderRow.bind(this)}
					        renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
	            			renderSeparator={this._renderSeparator}
	      				/>
	      			}
	      			</View>
			  	</View>
			</View>
		)
	};

	_renderRow (rowData: object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
		
	    return (

	      	<TouchableHighlight onPress={() => {highlightRow(sectionID, rowID); this._onSubmitTypesID(rowData.id, rowData.name);}}>

		        <View style={{height:75,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

			        {rowData.mobile_icon_image && (
			        	<View style={{flex:1}}>
			        		<Image source={{uri:rowData.mobile_icon_image}} resizeMode={Image.resizeMode.contain} style={styles.typesListImage}/>
			        	</View>
			        )}

			        {!rowData.mobile_icon_image && (
			        	<View style={{flex:1}}>
			        		<View style={styles.typesListImage}/>
			        	</View>
			        )}

					<View style={{flex:5}}>
						<Text style={styles.typesNameTitle}>{rowData.name}</Text>
					</View>
					
				</View>
	      	</TouchableHighlight>
	    );
	}

  	_renderSeparator (sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    	return (
      		<View
        		key={`${sectionID}-${rowID}`}
        		style={{ height: 1, backgroundColor:'#AAA', flex:1,opacity:0.2}}
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

	ProductTypesListView:{
		flex:1,
	},
	
	typesListImage:{
		width: screen_width*0.148,
		height: screen_height*0.0828,
		marginLeft: screen_width*0.028,
		backgroundColor:'white'
	},

	typesNameTitle:{
		marginLeft:20
	}

})

export default connect(
	state => ({

	}),{saveListTypesID, saveCurrentPage})(ProductTypesListView);

