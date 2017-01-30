import {AsyncStorage} from 'react-native';
import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';

const {VIDEOFEATURE_REQUESTED, VIDEOFEATURE_SUCCESS, VIDEOFEATURE_FAILED} = ActionTypes;

// export function videoFeatureList() {
//   const {deviceId} = API_Config;
// 	return {
//     types: [VIDEOFEATURE_REQUESTED, VIDEOFEATURE_SUCCESS, VIDEOFEATURE_FAILED],
//     promise: request.post(API_Config.baseUrl + 'supplier/get-all-inventory?supplierid[]=1&supplierid[]=2&orderbyfield=name&orderbydirection=ASC')
//       .set('Content-Type', 'application/json')
//       .set('Accept', 'application/json')
//       .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM1NGM3NGRkYWQ1MDMzZWQyY2Y4NzA0NWQ4NGFiOWQ4MzY2MzUzYjA4OTVlZGRmYmM2YmU1OWZlMWRlOTE5NjExZDMzYTg2OWM3ZjcxYzQ4In0.eyJhdWQiOiIyIiwianRpIjoiYzU0Yzc0ZGRhZDUwMzNlZDJjZjg3MDQ1ZDg0YWI5ZDgzNjYzNTNiMDg5NWVkZGZiYzZiZTU5ZmUxZGU5MTk2MTFkMzNhODY5YzdmNzFjNDgiLCJpYXQiOjE0Nzk3NTE2OTUsIm5iZiI6MTQ3OTc1MTY5NSwiZXhwIjoxNDgwMzU2NDk1LCJzdWIiOiIiLCJzY29wZXMiOltdfQ.WmSV_-RmiLdDZkFoAkFZfGzPaJtR2qWXSdQVpzVLLid0XOw__vRe1WKVEPkr8kWvCfmAbZFtaCrYqf4hmfoptVu2zNZbaMlzDvXbkCDrTkqzFXSd2gpxxOZnWptjAeEre9-BmDLXe5tkeRQtMn7c1L2GY2Lx__7gnaWMFNRXs6Lt5pNPD6IOkxcxyxzjJaQ7oC622um-VgfQkhLvCKZFolHURj6m_dlPbYScwQv5X5vz8Gc_JAltngOQvcVV6svrmf51o8nggwVhFMeVxBUNjT7z9gbZTQfpX6s8_9FYo8ZXWxP6Osp_GylAQlMxL4IEJonYycR0A7i81XNVUFfkZWPyYNdRXJo-HnTCZYzL7ijrWgipNLDdksFRBHUm7sqXudoc_-ixl6oKmqfiXKga0D4mtbIOy7LWzWSFAGESGr-0P_9AT9bGu-5B-CvcWXe2d6BOuv37q1xTT3bO-Cj7iyOhhC3gkUeKUXYnha6gb97Z0rMi5o5aOGhiiIycU0fyEjY1t3N31AQsStE2dn87Gx17MhMloj8ibOjhnBwARJ0P67d93M1F7NFpYZoIlCxjS2v960J9W9fDRtZpNbz0aNjZ0HSlbLduGmKj6EQbs4r2Qh7MUXBkTfeNXsmAW9qXMCEhF_GM2GmKoeKYVE30IvMoteGgSMl3qybX8F4hGZ8')
//       .set('Access-Control-Allow-Origin', '*')
//       .set('Access-Control-Allow-Credentials', '*')
//       .promise()
// 	};
// }