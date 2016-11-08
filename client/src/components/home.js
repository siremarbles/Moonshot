import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>This is the Home page</h2>
        <Link to='/profile' className='btn btn-primary'>Go to Profile</Link>
        <Link to='/login' className='btn btn-primary'>Go to Login</Link>

        <div className='container-fluid'>
          <div styleName="background:white !important"  className="jumbotron">
            <div className="container">
             <div className="row">
               <div className="col-md-7 col-lg-7 col-sm-7 col-xs-7">
                 <h1> Find Your Greatness </h1>
                 <p>  Moonshot helps you lift your projects off the ground.
                 Turn your dreams into our reality. Believe in yourself.</p>
               </div>
               <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 pull-right"  >
                 <img src="img/astrogirl_iso_small.png" className="pull-right" alt="Moonshot" width="300px" />
                </div>
             </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
