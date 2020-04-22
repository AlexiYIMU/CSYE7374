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
      hasAgreed: false,
      //imageSrc: localStorage.getItem('usersimg'),
    };
    //const user = [];
    //let { location } = this.props.history;
    //console.log(location.query.imageSrc)


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
    // const userList = localStorage.getItem('signup')
    // const users = [...this.state.users]
    // if(userList) {
    //   let obj = JSON.parse(userList)
    //   console.log(obj)
    //   obj.map((user)=>{
    //     console.log("im in map")
    //     console.log(user)
    //     users.push({
    //       names:user.name,
    //       ssn:user.ssn

    //     });
    //   })
    // }

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
    let ssn = target.ssn;


    this.setState({
      [name]: value,
      [ssn]: value,
      [password]: value
    });
  }

  // handleSubmit(e) {
  //
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('The form was submitted with the following data:');
    console.log(this.state);
    let obj = [];
    let username = this.state.name;
    let password = this.state.password;
    let ssn = this.state.ssn;
    //let imageSrc = this.state.imageSrc;
    let ls_users = localStorage.getItem('users');

    if (this.registerInstance.registedUsers[this.state.account]) {
      console.log('User already exists');
      alert('User already exists')
    } else {
      if (ls_users) {
        //如果ls_users存在证明已有用户注册,判断密码，用户名是否正确
        console.log("ʕ•͡-•ʔฅ im in user existed");
        obj = JSON.parse(ls_users)

        //对本地存储数据进行便利与输入值对比
        let fg = true
        obj.some(item => {
          //ssn已存在
          if (item.ssn === ssn) {
            console.log(item.ssn)
            console.log(ssn)
            fg = false;
            return fg;
          }
          //alert('This ssn has already registered')
          //this.props.history.push('/user')
        })

        // let ca = true
        // obj.some(item => {
        //   //ssn已存在
        //   if (item.imageSrc === imageSrc) {
        //     console.log(item.imageSrc)
        //     console.log(imageSrc)
        //     ca = false;
        //     return ca;
        //   } else if (imageSrc == null) {
        //     alert('Please verify yourself through camera.')
        //   }
        //   //alert('This ssn has already registered')
        //   //this.props.history.push('/user')
        // })

        console.log(fg)
        //console.log(ca)


        if (fg) {//fg为ssn没有被注册过，下面判断用户名
          //对存储数据遍历，比对用户名与ssn

          let f = false
          obj.map(item => {
            if (item.username === username) {
              f = true;
              return f;
            }
          })

          if (f) {
            alert('This username has already been taken')
          } else {
            console.log('username has not been taken')
            //没找到对将用户保存到本地，进行自动注册

            this.registerInstance.regist(username, password, ssn,{ from: this.state.account }).then(() => {
              if (this.registerInstance.registedUsers[this.state.account]) {
                console.log('User already exists');
                alert('User already exists')
              } else {
                obj.push({ username, password, ssn});
                localStorage.setItem('users', JSON.stringify(obj));//JSON.stringify(obj));
                alert('SignUp Successfully');
              }

            });
          }

        }
        else {
          alert('This ssn has already registered')

          //let obj = JSON.parse(ls_users)
          //console.log(obj)
          // obj.map((user) => {
          //   console.log("im in map")
          //   console.log(user)
          //   users.push({
          //     name: user.name,
          //     password: user.password,
          //     ssn: user.ssn
          //     //localStorage.setItem('users', JSON.stringify({ name, ssn }))
          //     //this.props.history.push('/home')
          //   })
          // })
          //obj.push({ username, password, ssn })

          // this.registerInstance.regist(username, password, ssn, { from: this.state.account }).then(() => {
          //   if (this.registerInstance.registedUsers[this.state.account]) {
          //     console.log('User already exists');
          //     alert('User already exists')
          //   } else {
          //     obj.push({ username, password, ssn });
          //     localStorage.setItem('users', JSON.stringify(obj));
          //     alert('SignUp Successfully');
          //   }
          // });
        }
      }
      else {
        //alert('This ssn has already registered2')
        this.registerInstance.regist(username, password, ssn,{ from: this.state.account }).then(() => {
          if (this.registerInstance.registedUsers[this.state.account]) {
            console.log('User already exists');
            alert('User already exists')
          } else {
            obj.push({ username, password, ssn});
            localStorage.setItem('users', JSON.stringify(obj));//JSON.stringify(obj));
            alert('SignUp Successfully');
          }

        });
      }
    }


  }



  handleClick() {
    window.open("/#/cam");
  }


  render() {
    return (
      <div className="FormCenter" >
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
