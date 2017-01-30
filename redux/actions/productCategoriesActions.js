import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';


const {ProductCategories_REQUESTED, ProductCategories_SUCCESS, ProductCategories_FAILED, ProductCategory_SELECTED} = ActionTypes;

export function loadProductCategoriesList(clientToken) {
	return {
    types: [ProductCategories_REQUESTED, ProductCategories_SUCCESS, ProductCategories_FAILED],
    promise: request.get(API_Config.baseUrl + '/menus/mobile-main-menu')

      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', clientToken)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .promise()
	};
}

export function setProductCategory(category) {

	return {
		type: ProductCategory_SELECTED,
		productCategory: category
	};
}
