import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';

const {
  ORDER_REQUESTED, 
  ORDER_SUCCESS, 
  ORDER_FAILED, 
  PROMOCODE_REQUESTED, 
  PROMOCODE_SUCCESS, 
  PROMOCODE_FAILED} = ActionTypes;

export function placeOrder(cart_products, cart_supplier, delivery_instruction, promo_code, tip_total, deliveryDate, deliveryTime, 
            add_new_delivery_address, new_delivery_address, deliveryAddress, new_delivery_address_apt_suite, 
            add_new_billing_address, new_billing_address, userBillingGeoAddressList, new_billing_apt_suite, credit_card, device_data, cart_id, passwordToken) {

   return {
       types: [ORDER_REQUESTED, ORDER_SUCCESS, ORDER_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'post',
                url: API_Config.baseUrl + '/order',
                headers: {'Accept': 'application/json', 'Authorization':passwordToken},
                data: {
                    'product': cart_products,
                    'supplier': cart_supplier,
                    'comments': delivery_instruction,
                    'promo_code': promo_code,
                    'tip_total': tip_total,
                    'delivery_data': deliveryDate,
                    'deliveryTime': deliveryTime,
                    'add_new_delivery_address': add_new_delivery_address,
                    'new_delivery_address': new_delivery_address,
                    'geo-new_delivery_address': deliveryAddress,
                    'new_delivery_address_apt_suite': new_delivery_address_apt_suite,
                    'add_new_billing_address': add_new_billing_address,
                    'new_billing_address': new_billing_address,
                    'geo-new_billing_address': userBillingGeoAddressList,
                    'new_billing_apt_suite': new_billing_apt_suite,
                    'credit_card': credit_card, 
                    'cart_id': cart_id,
                    'device_data': null,
                }
            })
        
    };
}

export function loadPromoCode(promo_code, passwordToken) {

  return {
        types: [PROMOCODE_REQUESTED, PROMOCODE_SUCCESS, PROMOCODE_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl +'/promo/' + promo_code,
                headers: {'Accept': 'application/json', 'Authorization':passwordToken}
            })
        
    };
}
