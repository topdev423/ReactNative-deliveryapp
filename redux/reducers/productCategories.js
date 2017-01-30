import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {ProductCategories_REQUESTED, ProductCategories_SUCCESS, ProductCategories_FAILED, ProductCategory_SELECTED} = ActionTypes;
var initialState = {categories: null, loading: false, error: null, selectedCategory: null};

export default function ProductCategories(state = initialState, action) {

	switch(action.type) {
		case ProductCategories_REQUESTED:
			return {
				...state,
				loading: true,
				categories: null,
				error: null
			};
		case ProductCategories_SUCCESS:
			return {
				...state,
				loading: false,
				categories: action.result.body
			};
		case ProductCategories_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case ProductCategory_SELECTED:
			return {
				...state,
				selectedCategory: action.productCategory
			}
		default:
			return state;
	}
	return state;
}
