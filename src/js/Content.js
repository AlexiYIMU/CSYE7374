import React from 'react'
import Table from './Table'
import Form from './Form'
import Voters from './Voters'

class Content extends React.Component {
  render() {
    return (
      <div>
        <Table candidates={this.props.candidates} />
        <hr/>
        { !this.props.hasVoted ?
          <Form candidates={this.props.candidates} castVote={this.props.castVote} voters={this.props.voters}/>
          : <p>voted</p>
        }
          <Voters voters={this.props.voters}></Voters>
        <hr/>  
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}

export default Content
