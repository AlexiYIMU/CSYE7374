import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Register from '../../../build/contracts/Register.json';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
import FileSaver from 'file-saver';
import WebcamCapture from './Cam';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: '0x0',
            ssn: '',
            password: '',
            name: '',
            hasAgreed: false
        };

        if (typeof web3 != 'undefined') {
          this.web3Provider = web3.currentProvider
        } else {
          this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
        }

        this.web3 = new Web3(this.web3Provider)

        this.register = TruffleContract(Register)
        this.register.setProvider(this.web3Provider)

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.web3.eth.getCoinbase((err, account) => {
        this.setState({ account })
        this.register.deployed().then((registerInstance) => {
            this.registerInstance = registerInstance
          })
        })
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
        let name = this.state.name;
        let ssn = this.state.password;
        this.registerInstance.regist(name,ssn,{from: this.state.account}).then((result)=>{
          if(this.registerInstance.registedUsers[this.state.account]){
            console.log('User already exists');
            alert('User already exists')
          }else{
            console.log('Registration success');
            alert('Registration success')
          }
        });
          // let data = this.state;
          // let content = JSON.stringify(data);
          // let blob = new Blob([content],{type: "text/plain;charset=utf-8"});
          // FileSaver.saveAs(blob,"user.txt");
    }

    handleClick(){
      window.open("/#/cam");
    }


    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">SSN</label>
                <input type="ssn" id="ssn" className="FormField__Input" placeholder="Enter your SSN" name="ssn" value={this.state.ssn} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/user/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </form>

            <div className="FormField">
              <label className="FormField__CheckboxLabel">

                  <button onClick={this.handleClick}> camera </button>
              </label>
            </div>
          </div>
        );
    }
}

export default SignUpForm;
