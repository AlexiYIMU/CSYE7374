pragma solidity >=0.4.21 <0.7.0;

contract Election{

  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }
  // Store accounts that have voted
   mapping(address => bool) public voters;

  //Store candidates
  mapping(uint => Candidate) public candidates;

  // Store candidates Count
  uint public candidatesCount;

  // voted event
  event votedEvent (
      uint indexed _candidateId
  );

  event voterEvent (
    address _from,
    uint _id
    //string _name;
  );

  // Constructor
  constructor() public {
    addCandidate("Candidate 1");
    addCandidate("Candidate 2");
  }

  // Add candidate
  function addCandidate (string memory _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }

  function vote(uint _candidateId) public {
    require(!voters[msg.sender]);
    require(_candidateId > 0 && _candidateId <= candidatesCount);
    voters[msg.sender] = true;

    candidates[_candidateId].voteCount ++;

    emit votedEvent(_candidateId);
    emit voterEvent(msg.sender,_candidateId);

  }
}
