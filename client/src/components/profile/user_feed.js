import React, { Component } from 'react';

class UserFeed extends Component {

// //const groupname = '5852fcab87775277c6f03df4';
//  componentWillMount() {
//   this.props.fetchActivityData(groupname);
//
//
// }


  //this.props.activity
  render() {
    return (
      <div>
      <div className='container'>
        <h3>Activity Feed</h3>
        <p>This is where the activity feed will go</p>
        <p>Hey guess what so and so just got $200 from the Cool Group </p>
      </div>

      <div className='container'>
       <ul>
         <li>this.props.activity</li>
       </ul>
      </div>
    </div>
    )
  }
}

export default UserFeed;


/*
  This is the Activity Feed Component that will be displayed on the Profile-feed page
    Only the logged in user will see these items

  This component will need to be duplicated using the map function to iterate over all the activity feeds for the user

*/
