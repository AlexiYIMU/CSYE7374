import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './validation/SignUpForm';
import SignInForm from './validation/SignInForm';

import '../cover.css';

class User extends Component {
  render() {
    return (
      <Router >
        <div className="User">
          <div className="User__Aside"></div>
          <div className="User__Form">
            <div className="PageSwitcher">
                <NavLink to="/user/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                <NavLink exact to="/user" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/user/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/user" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/user" component={SignUpForm}>
              </Route>
              <Route path="/user/sign-in" component={SignInForm}>
              </Route>
          </div>

        </div>
      </Router>
    );
  }
}

export default User;
