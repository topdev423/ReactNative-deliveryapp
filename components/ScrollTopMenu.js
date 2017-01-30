// import React, {Component} from 'react';
// import {StyleSheet, TouchableHighlight, ListView, Image, View, Text, RecyclerViewBackedScrollView, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
// import {loadProductGalleryListFromCategory} from '../redux/actions/productGalleryActions'
// import {connect} from 'react-redux'
// import {Actions} from 'react-native-router-flux';

// export default class ScrollTopMenu extends Component{

// 	constructor(props) {
// 	  super(props);

// 	  this.state = {};
// 	}


// 	_toGallery(){
// 		Actions.productGallery({productListName: 'feature'})
// 	};
// 	_toTypes(){
// 		Actions.productTypes({})
// 	};
// 	_toOrders(){
// 		Actions.partyOrders({})
// 	};

// 	render(){
// 		return(
// 			<View style={{flexDirection:'row',backgroundColor:'#D4F3',height:50}}>
// 				<View style={{flex:1}}>
// 					<TouchableOpacity onPress= {()=> this.props._toGallery()}>
// 						<Text>FEATURE</Text>
// 					</TouchableOpacity>
// 				</View>
// 				<View style={{flex:1}}>
// 					<TouchableOpacity onPress= {()=> this._toTypes()}>
// 						<Text>ORDER</Text>
// 					</TouchableOpacity>
// 				</View>
// 				<View style={{flex:1}} >
// 					<TouchableOpacity onPress= {()=> this._partyOrders()}>
// 						<Text>VIDEO</Text>
// 					</TouchableOpacity>
// 				</View>
// 			</View>
// 		)
// 	}
// }


