import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {
  DELIVERY_REQUESTED, DELIVERY_SUCCESS, DELIVERY_FAILED, DELIVERYDATA_SAVE
} = ActionTypes;

var initialState = {deliveryResult: null, loading:false, error: null, deliveryData:null};

export default function deliveryHours(state = initialState, action) {
	switch(action.type) {
		case DELIVERY_REQUESTED:
			return {
				...state,
				loading: true,
				deliveryResult: null,
				error: null
			};
		case DELIVERY_SUCCESS:
			return {
				...state,
				loading: false,
				deliveryResult: action.result.body
			};
		case DELIVERY_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case DELIVERYDATA_SAVE:
			return {
				...state,
				deliveryDataArr: action.deliveryDataArr
			};
		default: 
			return state;
	}
	return state;
}