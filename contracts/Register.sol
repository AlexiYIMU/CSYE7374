pragma solidity >=0.4.21 <0.7.0;

contract Register{

  struct User{
    string name;
    uint id;
    string password;
    string ssn;
  }
  mapping(uint => User) public users;
  mapping(address => bool) public registedUsers;
  mapping(string => string) public uInfo;


  uint public userCount;

  function regist(string memory _name, string memory _password,string memory _ssn) public{
    require(!registedUsers[msg.sender]);
    userCount++;
    users[userCount] = User(_name, userCount, _password, _ssn);
    uInfo[_name] = _ssn;
    registedUsers[msg.sender] = true;
  }


}