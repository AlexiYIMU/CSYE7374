import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './validation/SignUpForm';
import SignInForm from './validation/SignInForm';
import Welcome from './Welcome';
import Vote from './Vote';
import User from './User';
import WebcamCapture from './validation/Cam';
import Voters from './Voters';
import Audit from './Audit';


class App extends React.Component {
  render() {
    return (
      <Router >
      <div className="App">
        </div>
        <Route exact path="/vote" component={Vote}>
        </Route>
        <Route path="/user" component={User}>
        </Route>
        <Route exact path="/" component={Welcome}>
        </Route>
        <Route path="/cam" component={WebcamCapture}>
        </Route>
        <Route path="/vote/audit" component={Audit}>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
