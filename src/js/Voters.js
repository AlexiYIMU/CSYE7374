import React from 'react'

class Voters extends React.Component {
  render() {
    return (
      <table class='container'>
        <thead>
          <tr>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody >
          {this.props.voters.map((voter) => {
            return(
              <tr>
                <td>{voter.address} has voted</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Voters
