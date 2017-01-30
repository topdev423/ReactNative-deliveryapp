import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';

const {
  GETCARTINFO_REQUESTED, 
  GETCARTINFO_SUCCESS, 
  GETCARTINFO_FAILED,
  ADDCARTINFO_REQUESTED, 
  ADDCARTINFO_SUCCESS, 
  ADDCARTINFO_FAILED,
  REMOVECARTINFO_REQUESTED, 
  REMOVECARTINFO_SUCCESS, 
  REMOVECARTINFO_FAILED,
  CREATECARTINFO_REQUESTED, 
  CREATECARTINFO_SUCCESS, 
  CREATECARTINFO_FAILED,
  UPDATECARTINFO_REQUESTED, 
  UPDATECARTINFO_SUCCESS, 
  UPDATECARTINFO_FAILED
} = ActionTypes;

export function getCartInfo(cart_id, UUID, clientToken) {

  return {
        types: [GETCARTINFO_REQUESTED, GETCARTINFO_SUCCESS, GETCARTINFO_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl + '/cart/' + cart_id,
                headers: {'Accept': 'application/json', 'Authorization':clientToken, 'UUID': UUID}
            })
        
    };
}


export function addCartInfo(cart_id, UUID, supplier_id, quantityNumber, clientToken) {
  return {
        types: [ADDCARTINFO_REQUESTED, ADDCARTINFO_SUCCESS, ADDCARTINFO_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'post',
                url: API_Config.baseUrl + '/cart/' + cart_id + '/cart_item/' + supplier_id,
                headers: {'Accept': 'application/json', 'Authorization':clientToken, 'UUID': UUID},
                data: {'quantity': quantityNumber}
            })
        
    };
}

export function removeCartInfo(cart_id, UUID, product_id, clientToken) {

  return {
        types: [REMOVECARTINFO_REQUESTED, REMOVECARTINFO_SUCCESS, REMOVECARTINFO_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'post',
                url: API_Config.baseUrl + '/cart/' + cart_id + '/remove_item',
                headers: {'Accept': 'application/json', 'Authorization':clientToken, 'UUID': UUID},
                data: {'products': product_id}
            })
        
    };
}

export function createCartInfo(clientToken) {
  return {
        types: [CREATECARTINFO_REQUESTED, CREATECARTINFO_SUCCESS, CREATECARTINFO_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'post',
                url: API_Config.baseUrl + '/cart',
                headers: {'Accept': 'application/json', 'Authorization':clientToken},
            })
        
    };
}

export function updateCartInfo(cartID, UUID, supplier_ids, clientToken) {
  return {
        types: [UPDATECARTINFO_REQUESTED, UPDATECARTINFO_SUCCESS, UPDATECARTINFO_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'patch',
                url: API_Config.baseUrl + '/cart/' + cartID + '/update-suppliers',
                headers: {'Accept': 'application/json', 'Authorization':clientToken, 'UUID': UUID},
                data: {'supplier_id': supplier_ids}
            })
        
    };
}