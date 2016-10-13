import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderNavItems() {
    if (this.props.authenticated) {
      return <li className='nav-item'>
        <Link to='/signout' className='nav-link'>Sign out</Link>
      </li>
    } else  {
      return [
        <li className='nav-item' key={1}>
          <Link to='/login' className='nav-link'>Login In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link to='/signup' className='nav-link'>Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>Moonshot</Link>
        <ul className='nav navbar-nav'>
          { this.renderNavItems() }
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
