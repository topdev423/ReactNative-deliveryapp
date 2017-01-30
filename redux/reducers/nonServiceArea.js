import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';

const {ServiceEmail_REQUESTED, ServiceEmail_SUCCESS, ServiceEmail_FAILED} = ActionTypes;
var initialState = {result: null, loading: false, error: null};

export default function nonServiceArea(state = initialState, action) {

	switch(action.type) {
		case ServiceEmail_REQUESTED:
		
			return {
				...state,
				loading: true,
				result: null,
				error: null
			};
		case ServiceEmail_SUCCESS:
		
			return {
				...state,
				loading: false,
				result: action.result.data,
			};
		case ServiceEmail_FAILED:

			return {
				...state,
				loading: false,
				error: 'error'
			};
		default: 
			return state;
	}
	return state;
}
