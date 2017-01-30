import {AsyncStorage} from 'react-native';
import {ActionTypes} from '../../constants';


const {ProductGalleryListofCategory_REQUESTED, ProductGalleryListofCategory_SUCCESS, ProductGalleryListofCategory_FAILED} = ActionTypes;

var initialState = {galleryListofCategory: null, loading: false, error: null};

export default function ProductGalleryListofCategroy(state = initialState, action) {

	switch(action.type) {
		case ProductGalleryListofCategory_REQUESTED:
		//console.log('request')
			return {
				...state,
				loading: true,
				galleryListofCategroy: null,
				error: null
			};
		case ProductGalleryListofCategory_SUCCESS:
		//console.log('success')
			return {
				...state,
				loading: false,
				galleryListofCategory: action.result.body
			};
		case ProductGalleryListofCategory_FAILED:
		
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

