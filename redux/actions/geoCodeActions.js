import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';


const {GEOCODE_REQUESTED, GEOCODE_SUCCESS, GEOCODE_FAILED, SubmitItemList_SELECTED, SubmitBillingItemList_SELECTED, SetSuppliersID_SELECTED, SetSuppliers_SELECTED, SetSuppliersType_SELECTED, GoogleAddress_REQUESTED, GoogleAddress_SUCCESS, GoogleAddress_FAILED} = ActionTypes;

/**
  Getting suppliers from geoCode
**/

export function loadUserGeoCodeResult(lat, lng, state, clientToken) {

  return {
        types: [GEOCODE_REQUESTED, GEOCODE_SUCCESS, GEOCODE_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl + '/supplier?lat='+lat+'&lng='+lng+'&state='+state,
                headers: {'Accept': 'application/json', 'Authorization':clientToken},
            })
        
    };
}

/**
  Set geoCode to submit infos from AddressView to NonServiceAreaView
**/

export function setGeoCodeInfo(street, city, state, zipCode, userGeoAddress) {

  return {

    type: SubmitItemList_SELECTED,
    submitItemList: {street, city, state, zipCode, userGeoAddress}
  };
}

export function setGeoCodeBillingInfo(billingAddress) {

  return {

    type: SubmitBillingItemList_SELECTED,
    submitBillingItemList: billingAddress
  };
}

/**
  Submiting ID Array
**/

export function setSuppliersID(ID) {
  
  return {
    type: SetSuppliersID_SELECTED,
    setSuppliersID: ID
  };
}

/*Save suppliers*/
export function saveSuppliers(suppliers) {
  
  return {
    type: SetSuppliers_SELECTED,
    saveSuppliers: suppliers
  };
}

export function saveSuppliersType(suppliersType) {
  
  return {
    type: SetSuppliersType_SELECTED,
    saveSuppliersType: suppliersType
  };
}


/**
  Getting geoCode from Address
**/

export function getUserGeoCodeInfo(Address) {

  return {
        types: [GoogleAddress_REQUESTED, GoogleAddress_SUCCESS, GoogleAddress_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.Google_API_Url + '&address='+Address,
                headers: {'Accept': 'application/json'},
            })
        
    };
}
