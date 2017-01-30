import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';

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

export function addNewCard(payment_nickname, payment_card_number,payment_month,payment_year,payment_ccv, passwordToken) {

    return {
        types: [ADDCARD_REQUESTED, ADDCARD_SUCCESS, ADDCARD_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'post',
                url: API_Config.baseUrl + '/card',
                headers: {'Accept': 'application/json', 'Authorization':passwordToken},
                data: {
                    payment_nickname: payment_nickname,
                    payment_card_number: payment_card_number,
                    payment_month: payment_month,
                    payment_year: payment_year,
                    payment_ccv: payment_ccv
                }
            })
        
    };
}

export function getAllCard(passwordToken) {

  return {
        types: [GETALLCARD_REQUESTED, GETALLCARD_SUCCESS, GETALLCARD_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl +'/card',
                headers: {'Accept': 'application/json', 'Authorization':passwordToken},
            })
    };

}

export function deleteCard(cardID, passwordToken) {

  return {
        types: [DELETECARD_REQUESTED, DELETECARD_SUCCESS, DELETECARD_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'delete',
                url: API_Config.baseUrl +'/card/'+cardID,
                headers: {'Accept': 'application/json', 'Authorization':passwordToken},
            })
    };
}

export function updateCard(cardID, payment_nickname, payment_card_number, payment_month, payment_year, payment_ccv, passwordToken) {
 
  return {
        types: [UPDATECARD_REQUESTED, UPDATECARD_SUCCESS, UPDATECARD_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'put',
                url: API_Config.baseUrl + '/card/'+cardID,
                headers: {'Accept': 'application/json', 'Authorization':passwordToken},
                data: {
                    payment_nickname: payment_nickname,
                    payment_card_number: payment_card_number,
                    payment_month: payment_month,
                    payment_year: payment_year,
                    payment_ccv: payment_ccv
                }
            })
        
    };
}
