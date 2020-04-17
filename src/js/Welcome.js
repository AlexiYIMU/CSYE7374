import React from 'react';
import {Link} from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div >
        <Link to="/user">
        <h1>Welcome</h1>
        </Link>
      </div>
    )
  }
}

export default Welcome
