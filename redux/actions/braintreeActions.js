import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config, client_credentials} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
import axios from 'axios';
var braintree = require('braintree-web');
// import BTClient from 'react-native-braintree';

const {
  DEVICEDATA_REQUESTED, DEVICEDATA_SUCCESS, DEVICEDATA_FAILED, DEVICEDATA_RESPONSE
} = ActionTypes;
const CLIENT_AUTHORIZATION = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJkYTFiZTBmOWI2OGM0NzYzNmRlMjdiMDkxODhlNGRmYjQ4MjZiZmMzYzgzODkzMWU5NWQ2ODEwZjdjZDZmYTQ2fGNyZWF0ZWRfYXQ9MjAxNi0xMi0wNFQyMDowOToxNi4xNTQ5NTYwNDcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0';

export function getDeviceData() {
    braintree.client.create({
      authorization: CLIENT_AUTHORIZATION
    }, function (err, clientInstance) {
      // Creation of any other components...

      braintree.dataCollector.create({
        client: clientInstance,
        kount: true
      }, function (err, dataCollectorInstance) {
        if (err) {
          // Handle error in creation of data collector
          return;
        }
        // At this point, you should access the dataCollectorInstance.deviceData value and provide it
        // to your server, e.g. by injecting it into your form as a hidden input.
        var deviceData = dataCollectorInstance.deviceData;
      });
    });

    // return {
    //     type: DEVICEDATA_RESPONSE,
    //     deviceData: 
    // };
    // BTClient.setup(CLIENT_AUTHORIZATION);

  // braintree.setup(CLIENT_AUTHORIZATION, 'custom', {
  //     dataCollector: {
  //       kount: {environment: 'sandbox'}
  //     },
  //     onReady: function (braintreeInstance) {
  //       console.log("braininstance:", braininstance);
  //       // At this point, you should access the braintreeInstance.deviceData value
  //       // and provide it to your server, e.g. by injecting it into your form as a
  //       // hidden input.
  //       deviceData = braintreeInstance.deviceData;
  //     }
  //     /* ... */
  //   });


}
