import React,{Component} from 'react';
import {Scene, Router, ActionConst} from 'react-native-router-flux';
import AgeCheckView from './AgeCheckView'
import AddressView from './AddressView'
import ProductCategoryListView from '../components/ProductCategoryListView'
import NonServiceAreaView from '../components/NonServiceAreaView'
import ProductGalleryListView from '../components/ProductGalleryListView'
import PartyOrderFormView from '../components/PartyOrderFormView'
import FeatureVideoListView from '../components/FeatureVideoListView'
import TabView from '../components/TabView'
import TabGalleryView from '../components/TabGalleryView'
import SearchProductView from '../components/SearchProductView'
import ProductDetailView from '../components/ProductDetailView'
import SignUpView from '../containers/SignUpView'
import SignInView from '../containers/SignInView'
import ProductCartView from '../components/ProductCartView'
import ProductTypesListView from '../components/ProductTypesListView'
import OrderView from '../containers/OrderView'
import AddCardView from '../containers/AddCardView'
import EditCardView from '../containers/EditCardView'
import ScheduleDeliveryView from '../containers/ScheduleDeliveryView'
import DeliveryStoreView from './DeliveryStoreView'
import DeliveryStoreSplitView from './DeliveryStoreSplitView'
import PaymentMethodsView from './PaymentMethodsView'
import OrderConfirmationView from './OrderConfirmationView'
import FeatureVideoWebView from '../components/FeatureVideoWebView'

export default class boozeapp extends Component{
	render(){
	  return(
		<Router hideNavBar={true}>
			<Scene key="age" component={AgeCheckView} title="AgeCheckView" type={ActionConst.RESET} initial={true}/>
			<Scene key="address" component={AddressView} title="AddressView" type={ActionConst.REPLACE}/>
			<Scene key="productCategory" component={ProductCategoryListView} title="ProductCategoryListView" type={ActionConst.REPLACE}/>
			<Scene key="productGallery" component={ProductGalleryListView} title="ProductGalleryListView" type={ActionConst.REPLACE}/>
			<Scene key="partyOrders" component={PartyOrderFormView} title="PartyOrderFormView" type={ActionConst.REPLACE}/>
			<Scene key="featureVideos" component={FeatureVideoListView} title="FeatureVideoListView" type={ActionConst.REPLACE}/>
			<Scene key="featureVideoWebview" component={FeatureVideoWebView} title="FeatureVideoWebView" type={ActionConst.REPLACE}/>
			<Scene key="tab" component={TabView} title="TabView" type={ActionConst.REPLACE}/>
			<Scene key="tabGallery" component={TabGalleryView} title="TabGalleryView" type={ActionConst.REPLACE}/>
			<Scene key="searchProductView" component={SearchProductView} title="SearchProductView" type={ActionConst.REPLACE}/>
			<Scene key="productDetailView" component={ProductDetailView} title="ProductDetailView" type={ActionConst.REPLACE}/>
			<Scene key="signUpView" component={SignUpView} title="SignUpView" type={ActionConst.REPLACE}/>
			<Scene key="signInView" component={SignInView} title="SignInView" type={ActionConst.REPLACE}/>
			<Scene key="productCartView" component={ProductCartView} title="ProductCartView" type={ActionConst.REPLACE}/>
			<Scene key="productTypesListView" component={ProductTypesListView} title="ProductTypesListView" type={ActionConst.REPLACE}/>
			<Scene key="orderView" component={OrderView} title="OrderView" type={ActionConst.REPLACE}/>
			<Scene key="addCardView" component={AddCardView} title="AddCardView" type={ActionConst.REPLACE}/>
			<Scene key="editCardView" component={EditCardView} title="EditCardView" type={ActionConst.REPLACE}/>
			<Scene key="scheduleDeliveryView" component={ScheduleDeliveryView} title="ScheduleDeliveryView" type={ActionConst.REPLACE}/>
			<Scene key="deliveryStoreView" component={DeliveryStoreView} title="DeliveryStoreView" type={ActionConst.REPLACE}/>
			<Scene key="deliveryStoreSplitView" component={DeliveryStoreSplitView} title="DeliveryStoreSplitView" type={ActionConst.REPLACE}/>
			<Scene key="paymentMethodsView" component={PaymentMethodsView} title="PaymentMethodsView" type={ActionConst.REPLACE}/>
			<Scene key="orderConfirmationView" component={OrderConfirmationView} title="OrderConfirmationView" type={ActionConst.REPLACE}/>
		</Router>
	  );
	}
}