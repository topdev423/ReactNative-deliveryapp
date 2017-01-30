import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';

const {PartyOrderForm_REQUESTED, PartyOrderForm_SUCCESS, PartyOrderForm_FAILED} = ActionTypes;
var initialState = {submitResult: null, loading: false, error: null};

export default function partyOrderForm(state = initialState, action) {
	
	switch(action.type) {
		case PartyOrderForm_REQUESTED:
			
			return {
				...state,
				loading: true,
				submitResult: null,
				error: null
			};
		case PartyOrderForm_SUCCESS:
			
			return {
				...state,
				loading: false,
				submitResult: action.result.data
			};
		case PartyOrderForm_FAILED:
			
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
