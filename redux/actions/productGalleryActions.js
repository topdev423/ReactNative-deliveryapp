import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';

const {ProductGalleryListofCategory_REQUESTED, 
    ProductGalleryListofCategory_SUCCESS, 
    ProductGalleryListofCategory_FAILED, 
    ProductGalleryListOfTypes_REQUESTED, 
    ProductGalleryListOfTypes_SUCCESS, 
    ProductGalleryListOfTypes_FAILED,
    TABSELECT_SUCCESS} = ActionTypes;


export function loadProductGalleryListFromCategory(selectedCategoryName, selectedID, clientToken) {

	var sub_url='';
    var id = '';

    for(var i=0; i<selectedID.length; i++){

        sub_url += 'supplierid[]=' + selectedID[i].id +'&';
      }

	//console.log('$&$&$',(API_Config.baseUrl + '/supplier/get-all-inventory?'+ sub_url +'orderbyfield=name&orderbydirection=DESC&tags[]='+selectedCategoryName));

  console.log('url', API_Config.baseUrl + '/supplier/get-all-inventory?'+ sub_url +'orderbyfield=name&orderbydirection=ASC&tags[]='+selectedCategoryName);
  
	return {

    types: [ProductGalleryListofCategory_REQUESTED, ProductGalleryListofCategory_SUCCESS, ProductGalleryListofCategory_FAILED],
    promise: request.get(API_Config.baseUrl + '/supplier/get-all-inventory?'+ sub_url +'orderbyfield=name&orderbydirection=ASC&tags[]='+selectedCategoryName)

      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', clientToken)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .promise()
	};
}


export function loadProductGalleryListFromTypes(selectedID, typeID, clientToken, flag) {

	var sub_url='';
  var id = '';
  var url = '';


  for(var i=0; i<selectedID.length; i++){
    sub_url += 'supplierid[]=' + selectedID[i].id +'&';
  }

  if (flag =='true') 
  {
    url = API_Config.baseUrl + '/supplier/get-all-inventory?'+ sub_url +'orderbyfield=name&orderbydirection=ASC&categoryid='+typeID
  }
  else
  {
    url = API_Config.baseUrl + '/supplier/get-all-inventory?'+ sub_url +'orderbyfield=name&orderbydirection=ASC&typeid[]='+typeID
  }
	console.log('$&$&$',(url));
  console.log('token', clientToken);
	return {
    types: [ProductGalleryListOfTypes_REQUESTED, ProductGalleryListOfTypes_SUCCESS, ProductGalleryListOfTypes_FAILED],
    promise: request.get(url)

      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', clientToken)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', '*')
      .promise()
	};
}
