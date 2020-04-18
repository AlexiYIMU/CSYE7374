import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        let password = target.password;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
         if((email.value == localStorage.getItem('name')) && (password.value == localStorage.getItem('password')))
        {
            console.log('The form was submitted with the following data:');
            console.log(this.state);
            let email = this.state.email;
            let password = this.state.password;
            this.props.history.push("/vote");
        }
        else{
            alert('Please check your name and password.');
            //console.log('Please check your name and password.');
        }

        

    }

    render() {
        return (
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Full Name</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Sign In</button>
                  <Link to="/user" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

export default SignInForm;
