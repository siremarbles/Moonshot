import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
     <div>

      <div className='container-fluid'>
        <div styleName="background:white !important"  className="jumbotron">
          <div className="container">
           <div className="row">
             <div className="col-md-7 col-lg-7 col-sm-7 col-xs-7">
               <h1> Find Your Greatness </h1>
               <p>  Moonshot helps you lift your projects off the ground.
               Turn your dreams into our reality. Believe in yourself.</p>
             </div>
             <div className="col-md-5 col-lg-5 col-sm-5 col-xs-5 pull-right">

              </div>
           </div>


          </div>

        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>test test test</p>
                <a href="/" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>test test test</p>
                <a href="/" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>Heading</h3>
                <p>test test test</p>
                <a href="/" role="button" className="btn btn-default">View details</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
 )
  }
}

export default Home;
