import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is the Home page</h2>
        <Link to='/profile' className='btn btn-primary'>Go to Profile</Link>
        <Link to='/login' className='btn btn-primary'>Go to Login</Link>
      </div>
    );
  }
}

export default Home;
