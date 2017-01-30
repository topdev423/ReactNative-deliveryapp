import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';

const {PartyOrderForm_REQUESTED, PartyOrderForm_SUCCESS, PartyOrderForm_FAILED} = ActionTypes;

export function loadSubmitResult(firstName, lastName, company, title, email, phoneNumber, day, month, year, time, venue, attendees, bartender, clientToken) {


	// return {
 //    types: [PartyOrderForm_REQUESTED, PartyOrderForm_SUCCESS, PartyOrderForm_FAILED],

 //    promise: request.get(API_Config.baseUrl + '/party-orders?first='+firstName+'&last='+lastName+'&company='+company+'&title='+title+'&email='+email+'&phone='+phoneNumber+'&day='+day+'&month='+month+'&year='+year+'&time='+time+'&venue='+venue+'&attendees='+attendees+'&bartender='+bartender)

 //      .set('Content-Type', 'application/json')
 //      .set('Accept', 'application/json')
 //      .set('Authorization', clientToken)
 //      .set('Access-Control-Allow-Origin', '*')
 //      .set('Access-Control-Allow-Credentials', '*')
 //      .promise()
	// };

  return {
        types: [PartyOrderForm_REQUESTED, PartyOrderForm_SUCCESS, PartyOrderForm_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl + '/party-orders?first='+firstName+'&last='+lastName+'&company='+company+'&title='+title+'&email='+email+'&phone='+phoneNumber+'&day='+day+'&month='+month+'&year='+year+'&time='+time+'&venue='+venue+'&attendees='+attendees+'&bartender='+bartender,
                headers: {'Accept': 'application/json', 'Authorization':clientToken},
            })
        
    };
}
