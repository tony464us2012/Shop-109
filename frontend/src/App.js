import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import MenuScreen from './screens/MenuScreen'
import BeerScreen from './screens/BeerScreen'
import BeerListScreen from './screens/BeerListScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import UserListScreen from './screens/UserListScreen'
import OrderScreen from './screens/OrderScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import AccessibilityScreen from './screens/AccessibilityScreen'
import TermsScreen from './screens/TermsScreen'

const stripePromise = loadStripe('pk_test_51IQjuZL3CskvbasWBMNfrSLPF2xBP9mietcH9gbwH7SkVgGMAWIC8dM2V0XnN0U9e9BhVH48Uvu59RCBkImcOAdi00PyTPUtjp')

const App = () => {
  return (
    <Router>
      <Header />
      <main className="app" >
        <Elements stripe={stripePromise}>
            <Route path='/confirmation/:id' component={ConfirmationScreen}  />
            <Route path='/order/:id' component={OrderScreen}  />
            <Route path='/login' component={LoginScreen}  />
            <Route path='/placeorder' component={PlaceOrderScreen}  />
            <Route path='/register' component={RegisterScreen}  />
            <Route path='/profile' component={ProfileScreen}  />
            <Route path='/product/:id' component={ProductScreen}  />
            <Route path='/cart' component={CartScreen}  />
            <Route path='/admin/beerlist' component={BeerListScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/productlist' component={ProductListScreen} exact />
            <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route path='/terms' component={TermsScreen} exact />
            <Route path='/accessibility' component={AccessibilityScreen} exact />
            <Route path='/beers' component={BeerScreen} exact />
            <Route path='/about' component={AboutScreen} exact />
            <Route path='/menu' component={MenuScreen} exact />
            <Route path='/' component={HomeScreen} exact />
        </Elements>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
