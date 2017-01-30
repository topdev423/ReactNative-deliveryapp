import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';


const { ServiceEmail_REQUESTED, ServiceEmail_SUCCESS, ServiceEmail_FAILED} = ActionTypes;

export function loadNonServiceEmail(street, city, state, zipCode, user_email, clientToken) {
 
   //console.log('nonServiceAreaAction_URL',API_Config.baseUrl + '/waiting-list?street='+street+'&city='+city+'&state='+state+'&zip='+zipCode+'&email='+user_email)

  // return {
  //   types: [ ServiceEmail_REQUESTED, ServiceEmail_SUCCESS, ServiceEmail_FAILED],
  //   promise: request.get(API_Config.baseUrl + '/waiting-list?street='+street+'&city='+city+'&state='+state+'&zip='+zipCode+'&email='+user_email)

  //   .set('Content-Type', 'application/json')
	 //  .set('Accept', 'application/json')
	 //  .set('Access-Control-Allow-Origin', '*')
	 //  .set('Access-Control-Allow-Credentials', '*')
	 //  .promise()
  // };

  return {
        types: [ServiceEmail_REQUESTED, ServiceEmail_SUCCESS, ServiceEmail_FAILED],
        hasPost: 'true',
        promise:
            axios({
                method: 'get',
                url: API_Config.baseUrl + '/waiting-list?street='+street+'&city='+city+'&state='+state+'&zip='+zipCode+'&email='+user_email,
                headers: {'Accept': 'application/json', 'Authorization':clientToken},
            })
        
    };
}

