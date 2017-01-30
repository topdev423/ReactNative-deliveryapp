import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from './middlewares/promiseMiddleware';
import * as reducers from './reducers/';

export default function configureStore() {

	const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware)(createStore);
	const store = createStoreWithMiddleware(combineReducers(reducers));
  return store;
}