import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

class Header extends Component {

  renderRightItems() {
    const active = { borderBottomColor: '#3f51b5' };
    if (this.props.authenticated) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          {/* <li role='presentation' className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false' aria-haspopup='true'>
              USERNAME |PH|
            </a>
            <ul className='dropdown-menu'>
              <li><Link to='/account'>My Account</Link></li>
              <li className='divider' />
              <li><Link to='/signout'>Logout</Link></li>
            </ul>
          </li> */}
          <li><Link to='/profile-feed'>My Account</Link></li>
          <li><Link to='/signout'>Logout</Link></li>
        </ul>
      );
    } else {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/login' activeStyle={ active }>Log in</Link></li>
          <li><Link to='/signup' activeStyle={ active }>Sign up</Link></li>
        </ul>
      );
    }
  }

  renderLeftItems() {
    const active = { borderBottomColor: '#3f51b5' };

    if (this.props.authenticated) {
      return(
        <ul className="nav navbar-nav">
          <li><IndexLink to="/" activeStyle={ active }>Home</IndexLink></li>
          <li><Link to="/contact" activeStyle={ active }>Contact</Link></li>
          <li><Link to="/about" activeStyle={ active }>About</Link></li>
          <li><Link to="/groups" activeStyle={ active }>Groups</Link></li>
        </ul>
      );
    } else {
      return(
        <ul className="nav navbar-nav">
          <li><IndexLink to="/" activeStyle={ active }>Home</IndexLink></li>
          <li><Link to="/contact" activeStyle={ active }>Contact</Link></li>
          <li><Link to="/about" activeStyle={ active }>About</Link></li>
          <li><Link to="/groups" activeStyle={ active }>Groups</Link></li>
        </ul>
      );
    }
  }

  render() {
    const active = { borderBottomColor: '#3f51b5' };

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
            {/* <ul className="nav navbar-nav">
              <li><IndexLink to="/" activeStyle={ active }>Home</IndexLink></li>
              <li><Link to="/contact" activeStyle={ active }>Contact</Link></li>
              <li><Link to="/about" activeStyle={ active }>About</Link></li>
            </ul> */}
            { this.renderLeftItems() }
            { this.renderRightItems() }
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

export default connect(mapStateToProps, null, null, { pure: false })(Header);
