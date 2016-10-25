import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

class Header extends Component {

  render() {

    const active = { borderBottomColor: '#3f51b5' };

    const rightNavItems = this.props.authenticated ? (
      <ul className='nav navbar-nav navbar-right'>
        <li className='dropdown'>
          <a>
            USERNAME |PH|
            <i className='caret' />
          </a>
          <ul className='dropdown-menu'>
            <li><Link to='/account'>My Account</Link></li>
            <li className='divider' />
            <li><Link to='/signout'>Logout</Link></li>
          </ul>
        </li>
      </ul>
    ) : (
      <ul className='nav navbar-nav navbar-right'>
        <li><Link to='/login' activeStyle={ active }>Log in</Link></li>
        <li><Link to='/signup' activeStyle={ active }>Sign up</Link></li>
      </ul>
    );

    return (
      <nav className='navbar-default navbar-static-top'>

        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type="button" data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <IndexLink to="/" className="navbar-brand">Moonshot</IndexLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={ active }>Home</IndexLink></li>
              <li><Link to="/contact" activeStyle={ active }>Contact</Link></li>
              <li><Link to="/pull" activeStyle={ active }>Pull</Link></li>
              <li><Link to="/groups" activeStyle={ active }>Group</Link></li>
              <li><Link to="/fund/" activeStyle={ active }>Fund</Link></li>
            </ul>
            { rightNavItems }
          </div>
        </div>
      </nav>


    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
