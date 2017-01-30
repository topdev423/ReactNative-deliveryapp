import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {
	GETCARTINFO_REQUESTED, 
	GETCARTINFO_SUCCESS, 
	GETCARTINFO_FAILED,
	ADDCARTINFO_REQUESTED, 
	ADDCARTINFO_SUCCESS, 
	ADDCARTINFO_FAILED,
  	REMOVECARTINFO_REQUESTED, 
  	REMOVECARTINFO_SUCCESS, 
  	REMOVECARTINFO_FAILED,
  	CREATECARTINFO_REQUESTED, 
  	CREATECARTINFO_SUCCESS, 
  	CREATECARTINFO_FAILED,
  	UPDATECARTINFO_REQUESTED, 
  	UPDATECARTINFO_SUCCESS, 
  	UPDATECARTINFO_FAILED
} = ActionTypes;

var initialState = {cartInfo: null, createcartInfo:null, addcartInfo:null, updatecartInfo:null, removecartInfo:null, addloading: false, loading: false, error: null};

export default function cartInfo(state = initialState, action) {
	switch(action.type) {
		case CREATECARTINFO_REQUESTED:
			return {
				...state,
				loading: true,
				createcartInfo: null,
				error: null
			};
		case CREATECARTINFO_SUCCESS:
			return {
				...state,
				loading: false,
				//[action.result.body.ResponseCode == 1 ? 'cartInfo' : 'error']: action.result.body
				createcartInfo: action.result.data
			};
		case CREATECARTINFO_FAILED:
			return {
				...state,
				loading: false,
				error: 'cart creat failed',
			};
		case GETCARTINFO_REQUESTED:
			return {
				...state,
				loading: true,
				error: null
			};
		case GETCARTINFO_SUCCESS:
			return {
				...state,
				loading: false,
				//[action.result.body.ResponseCode == 1 ? 'cartInfo' : 'error']: action.result.body
				cartInfo: action.result.data
			};
		case GETCARTINFO_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		case ADDCARTINFO_REQUESTED:
			return {
				...state,
				addloading: true,
				addcartInfo: null,
				error: null
			};
		case ADDCARTINFO_SUCCESS:
			return {
				...state,
				addloading: false,
				addcartInfo: action.result.data
			};
		case ADDCARTINFO_FAILED:
			return {
				...state,
				addloading: false,
				error: action.error.response.data
			};
		case REMOVECARTINFO_REQUESTED:
			return {
				...state,
				loading: true,
				removecartInfo: null,
				error: null
			};
		case REMOVECARTINFO_SUCCESS:
		//console.log("cartInfo", action.result.body);
			return {
				...state,
				loading: false,
				removecartInfo: action.result.data
			};
		case REMOVECARTINFO_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		case UPDATECARTINFO_REQUESTED:
			return {
				...state,
				loading: true,
				updatecartInfo: null,
				error: null
			};
		case UPDATECARTINFO_SUCCESS:
		//console.log("cartInfo", action.result.body);
			return {
				...state,
				loading: false,
				updatecartInfo: action.result.data
			};
		case UPDATECARTINFO_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		default: 
			return state;
	}
	return state;
}