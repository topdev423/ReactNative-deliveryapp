import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';

const {GEOCODE_REQUESTED, GEOCODE_SUCCESS, GEOCODE_FAILED, SubmitItemList_SELECTED, SubmitBillingItemList_SELECTED, SetSuppliersID_SELECTED, SetSuppliersType_SELECTED, SetSuppliers_SELECTED} = ActionTypes;
var initialState = {result: null, loading: false, error: null, selectedList: null, selectedBillingList: null, selectedID: null, suppliers: null};

export default function geoCodeForm(state = initialState, action) {
//	console.log("this is state:", state);
	switch(action.type) {
		case GEOCODE_REQUESTED:
			return {
				...state,
				loading: true,
				result: null,
				error: null
			};
		case GEOCODE_SUCCESS:
			return {
				...state,
				loading: false,
				result: action.result.data
			};
		case GEOCODE_FAILED:
			return {
				...state,
				loading: false,
				error: action.error.response.data
			};
		case SubmitItemList_SELECTED:
			return {
				...state,
				selectedList: action.submitItemList
			};
		case SubmitBillingItemList_SELECTED:
			return {
				...state,
				selectedBillingList: action.submitBillingItemList
			};
		case SetSuppliersID_SELECTED:
			//console.log('@@selectedID',selectedID)
			return {
				...state,
				selectedID: action.setSuppliersID
			};
		case SetSuppliers_SELECTED:
			//console.log('@@selectedID',selectedID)
			return {
				...state,
				suppliers: action.saveSuppliers
			};
		case SetSuppliersType_SELECTED:
			return {
				...state,
				suppliersType: action.saveSuppliersType
			};
		default: 
			return state;
	}
	return state;
}