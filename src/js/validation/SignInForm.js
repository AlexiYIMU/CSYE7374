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

  handleSubmit = (e) => {
    e.preventDefault();
    // if ((email.value == localStorage.getItem('name'[0])) && (password.value == localStorage.getItem('password'[0]))) {
    //   console.log('The form was submitted with the following data:');
    //   console.log(this.state);
    //   let email = this.state.email;
    //   let password = this.state.password;
    //   this.props.history.push("/vote");
    // }
    // else {
    //   alert('Please check your name and password.');
    // }
    let obj = [];
    let username = this.state.email;
    let password = this.state.password;
    let ssn = this.state.ssn;
    let ls_users = localStorage.getItem('users');

    if (ls_users) {
      //如果ls_users存在证明已有至少用户注册,
      console.log("ʕ•͡-•ʔฅ im in user existed");
      obj = JSON.parse(ls_users)
      //对本地存储数据进行便利与输入值对比

      let fs = false
      obj.some(item => {
        //ssn已存在
        if (item.ssn === ssn) {
          console.log(item.ssn)
          console.log(ssn)
          fs = true;
          return fs;
        } else {
          alert('This ssn has not registered')
          fs = false;
          return fs;
        }
      })

      if (fs) {
        let fg = false
        obj.map(item => {
          //用户名已存在
          console.log("ʕ•͡-•ʔฅ im in mapping");
          if (item.username === username) {
            fg = true;
            return fg;
          }
        })
        if (fg) {//fg为真找到用户名，接下里对密码判断
          //对存储数据遍历，比对用户名与密码
          console.log("ʕ•͡-•ʔฅ comparing name and password");
          let f = false
          obj.map(item => {
            if (item.password === password) {
              f = true;
              return f;
            }
          })
          if (f) {//查询正确可以正常登录
            alert('Login successfully')
            this.props.history.push('/vote')
          }
          else {
            alert('Please check your password')
          }
        } else {//没找到对将用户保存到本地，进行自动注册
          // obj.push({ username, password });
          // localStorage.setItem('users', JSON.stringify(obj))
          alert('Please signup first')
          this.props.history.push('/user')
        }

      } else {
        //没有用户注册，直接保存到本地存储
        // obj.push({ username, password })
        // localStorage.setItem('users', JSON.stringify(obj))
        // alert('Please signup first')
        this.props.history.push('/user')
      }
    } else {
      alert('Please signup first')
      this.props.history.push('/user')

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
            <label className="FormField__Label" htmlFor="email">SSN</label>
            <input type="ssn" id="ssn" className="FormField__Input" placeholder="Enter your SSN" name="ssn" value={this.state.ssn} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Sign In</button>
            <Link to="/user" className="FormField__Link">Create an account</Link>
            <button onClick={this.handleClick}> camera </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
