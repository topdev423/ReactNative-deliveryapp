import React, {Component} from 'react';
import {Router, Scene, ActionConst} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import MainView from './containers/MainView'


// StatusBarIOS.setStyle('light-content', true);
export default class boozeapp extends Component{
	render(){
	  return(
		<Provider store={configureStore()}>
			<MainView/>
		</Provider>
	  );
	}
}