import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {
	ADDCARD_REQUESTED, 
	ADDCARD_SUCCESS, 
	ADDCARD_FAILED,
	GETALLCARD_REQUESTED,
  	GETALLCARD_SUCCESS,
  	GETALLCARD_FAILED,
  	DELETECARD_REQUESTED, 
  	DELETECARD_SUCCESS, 
  	DELETECARD_FAILED,
  	UPDATECARD_REQUESTED, 
  	UPDATECARD_SUCCESS, 
  	UPDATECARD_FAILED
} = ActionTypes;

var initialState = {addCardResult:null, addCardError:null, allCardResult:null, updateCardResult:null, deleteCardResult:null, deleteCardResultFaild:null, loading: false, error: null, deleteFlag: null};

export default function cardInfo(state = initialState, action) {
	switch(action.type) {
		case ADDCARD_REQUESTED:
			return {
				...state,
				loading: true,
				addCardResult: null,
				addCardError: null
			};
		case ADDCARD_SUCCESS:
			return {
				...state,
				loading: false,
				addCardResult: action.result.data
			};
		case ADDCARD_FAILED:
			return {
				...state,
				loading: false,
				addCardError: action.error.response.data
			};
		case GETALLCARD_REQUESTED:
			return {
				...state,
				loading: true,
				allCardResult: null,
				error: null
			};
		case GETALLCARD_SUCCESS:
			return {
				...state,
				loading: false,
				allCardResult: action.result.data
			};
		case GETALLCARD_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		case UPDATECARD_REQUESTED:
			return {
				...state,
				loading: true,
				updateCardResult: null,
				error: null
			};
		case UPDATECARD_SUCCESS:
			return {
				...state,
				loading: false,
				updateCardResult: action.result.data
			};
		case UPDATECARD_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		case DELETECARD_REQUESTED:
			return {
				...state,
				loading: true,
				deleteCardResult: null,
				deleteCardResultFaild: null
			};
		case DELETECARD_SUCCESS:
			return {
				...state,
				deleteFlag: 'success',
				deleteCardResult: action.result.data
			};
		case DELETECARD_FAILED:
			return {
				...state,
				deleteFlag: 'error',
				deleteCardResultFaild: action.error.response.data
			};
		default: 
			return state;
	}
	return state;
}