import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Election from '../../build/contracts/Election.json'
import Content from './Content'
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Audit from './Audit'
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment';


var storage = window.localStorage;

class Vote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      addVoters: false,
      voters: [],
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.election = TruffleContract(Election)
    this.election.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
    this.watchVote = this.watchVote.bind(this)
  }
  componentDidMount() {
    const auditList = storage.getItem('audit')
    const voters = [...this.state.voters]
    if (auditList) {
      let obj = JSON.parse(auditList)
      console.log(obj)
      obj.map((voter) => {
        console.log("im in map")
        console.log(voter)
        voters.push({
          address: voter.address,
          voteId: voter.voteId,
          timeRecord: voter.timeRecord
        });
      })
    }
    this.setState({ voters: voters });
    console.log("show auditList")
    console.log(auditList)
    console.log("show done")
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })

  }

  watchVote() {
    this.electionInstance.voterEvent().watch((error, result) => {
      if (!error) {
        let timeNow = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log("getting event -----------" + result);
        // for(let key in result){
        // console.log(key + " : " + result[key]);
        // }
        console.log("voter address is " + result.args._from);
        console.log("vote to candidate" + result.args._id);
        let voter_address = result.args._from;
        let voter_id = result.args._id;

        const voters = [];

        voters.push({
          address: voter_address,
          voteId: voter_id,
          timeRecord: timeNow
        });

        let auditList = storage.getItem('audit')
        // if (auditList) {
        //   auditList.map((voter) => {
        //     voters.push({
        //       address:voter.address,
        //       voteId:voter.voteId
        //     });
        //   })
        // }
        if (auditList) {
          let obj = JSON.parse(auditList)
          console.log(obj)
          obj.map((voter) => {
            console.log("im in map")
            console.log(voter)
            voters.push({
              address: voter.address,
              voteId: voter.voteId,
              timeRecord: voter.timeRecord
            });
          })
        }
        console.log("voter is ")
        console.log(voters)
        this.setState({ voters: voters });
        this.setState({ addVoters: true });
        console.log("show audit list in event")
        console.log(auditList)
        console.log("show audit done in event")
        storage.setItem('audit', JSON.stringify(voters))
        console.log(storage)
        // for(key in this.state.voters[key]){
        //   console.log(key + ":" +this.state.voters[key])
        // }

      } else {
        console.log(error);
      }
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  castVote(candidateId) {
    this.setState({ voting: true })
    this.electionInstance.vote(candidateId, { from: this.state.account }).then((result) => {
      this.setState({ hasVoted: true }
      );
      console.log("add voters is :" + this.state.addVoters);
      this.watchVote();
    }
    )
  }

  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <div class='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column'>
            <h1>Vote</h1>
            <br />
            {this.state.loading || this.state.voting
              ? <p class='text-center'>Loading...</p>
              : <Content
                account={this.state.account}
                candidates={this.state.candidates}
                hasVoted={this.state.hasVoted}
                castVote={this.castVote}
                voters={this.state.voters}
                addVoters={this.state.addVoters} />
            }
          </div>
        </div>
      </div>
    )
  }
}
export default Vote
