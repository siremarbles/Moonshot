import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import HomePage from './components/home_page';
import ProfileFeedPage from './components/profile/profile_feed_page';
import LoginPage from './components/auth/login_page';
import SignupPage from './components/auth/signup_page';
import SignoutPage from './components/auth/signout_page';
import AboutPage from './components/about_page';
import ContactPage from './components/contact_page';
import ProfilePage from './components/profile/profile_page';

//Groups
import Groups from './components/group/groups';
import CreateGroup from './components/group/create_group';
import Group from './components/group/group';

import RequireAuth from './components/auth/require_auth';
import { AUTH_USER } from './actions/types';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory } >
      <Route path='/' component={ App }>
        <IndexRoute component={ HomePage } />
        <Route path='profile-feed' component={ RequireAuth(ProfileFeedPage) } />
        <Route path='profile/:id' component={ ProfilePage } />
        <Route path='login' component={ LoginPage } />
        <Route path='signup' component={ SignupPage } />
        <Route path='signout' component={ SignoutPage } />
        <Route path='about' component={ AboutPage } />
        <Route path='contact' component={ ContactPage } />
        <Route path='groups' component={ Groups } />
        <Route path='group/:id' component={ Group } />
        <Route path='create-group' component={ CreateGroup } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
