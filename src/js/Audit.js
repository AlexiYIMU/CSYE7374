import React from 'react'
import emitter from './Events';
var storage=window.localStorage;
class Audit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        voters:[],
    };
  }

componentDidMount() {
  console.log(storage)

  const auditList = storage.getItem('audit')
  const voters = [...this.state.voters]
  if(auditList) {
    let obj = JSON.parse(auditList)
    console.log(obj)
    obj.map((voter)=>{
      console.log("im in map")
      console.log(voter)
      voters.push({
        address:voter.address,
        voteId:voter.voteId,
        tiemRecord:voter.timeRecord
      });
    })
  }
  this.setState({voters:voters});
  console.log("show voters")
  console.log(voters)
}


  render() {
    return (
      <table class='container'>
        <thead>
          <tr>
            <th>Address</th>
            <th>VoteTo</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody >
          {this.state.voters.map((voter) => {
            return(
              <tr>
                <td>{voter.address}</td>
                <td>Candidate {voter.voteId} </td>
                <td>{voter.tiemRecord} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Audit
