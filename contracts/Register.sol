pragma solidity >=0.4.21 <0.7.0;


contract Register {
    struct User {
        string name;
        string password;
        uint256 id;
        string ssn;
    }
    mapping(uint256 => User) public users;
    mapping(address => bool) public registedUsers;
    mapping(string => string) public uInfo;

    uint256 public userCount;

    function regist(string memory _name, string memory _password, string memory _ssn) public {
        require(!registedUsers[msg.sender]);
        userCount++;
        users[userCount] = User(_name, _password, userCount, _ssn);
        uInfo[_name] = _ssn;
        registedUsers[msg.sender] = true;
    }
}
