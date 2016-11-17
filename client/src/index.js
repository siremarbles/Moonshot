import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import Home from './components/home';
import ProfileFeed from './components/profile/profile_feed';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import About from './components/about';
import Contact from './components/contact';

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
        <IndexRoute component={ Home } />
        <Route path='profile-feed' component={ RequireAuth(ProfileFeed) } />
        <Route path='login' component={ Login } />
        <Route path='signup' component={ Signup } />
        <Route path='signout' component={ Signout } />
        <Route path='about' component={ About } />
        <Route path='contact' component={ Contact } />
        <Route path='groups' component={ Groups } />
        <Route path='group/:id' component={ Group } />
        <Route path='create-group' component={ CreateGroup } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
