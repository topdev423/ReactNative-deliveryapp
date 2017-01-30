import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {VIDEOFEATURE_REQUESTED, VIDEOFEATURE_SUCCESS, VIDEOFEATURE_FAILED} = ActionTypes;
var initialState = {videolist: null, loading: false, error: null};

export default function videoFeature(state = initialState, action) {
	switch(action.type) {
		case VIDEOFEATURE_REQUESTED:
			return {
				...state,
				loading: true,
				videolist: null,
				error: null
			};
		case VIDEOFEATURE_SUCCESS:
			return {
				...state,
				loading: false,
				[action.result.body.ResponseCode == 1 ? 'videolist' : 'error']: action.result.body
			};
		case VIDEOFEATURE_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		default: 
			return state;
	}
	return state;
}