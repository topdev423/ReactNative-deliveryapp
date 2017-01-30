import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {
  ORDER_REQUESTED, 
  ORDER_SUCCESS, 
  ORDER_FAILED, 
  PROMOCODE_REQUESTED, 
  PROMOCODE_SUCCESS, 
  PROMOCODE_FAILED} = ActionTypes;

var initialState = {orderResult: null, orderFailed:null, promocodeResult: null, promocodeFailed:null, loading:false, error:null};

export default function oderView(state = initialState, action) {
	switch(action.type) {
		case ORDER_REQUESTED:
			return {
				...state,
				loading: true,
				orderResult: null,
				error: null
			};
		case ORDER_SUCCESS:
			return {
				...state,
				loading: false,
				orderResult: action.result.data
				//[action.result.body.ResponseCode == 1 ? 'signUpResult' : 'error']: action.result.body
			};
		case ORDER_FAILED:
			return {
				...state,
				loading: false,
				orderFailed: action.error.response.data
			};
		case PROMOCODE_REQUESTED:
			return {
				...state,
				loading: true,
				promocodeResult: null,
				promocodeFailed: null
			};
		case PROMOCODE_SUCCESS:
			return {
				...state,
				loading: false,
				//promocodeResult: action.result.data
				promocodeResult: action.result.data
				//[action.result.body.ResponseCode == 1 ? 'signUpResult' : 'error']: action.result.body
			};
		case PROMOCODE_FAILED:
			return {
				...state,
				loading: false,
				promocodeFailed: action.error.response.data
			};
		default: 
			return state;
	}
	return state;
}