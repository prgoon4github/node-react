import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
import superagent from 'superagent'


class Comments extends Component{
  constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list:[]
    }
  }
  componentDidMount(){
    console.log('componentDidMount')
    superagent
    .get('/api/comment')
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) =>{
     if(err){
       alert('Error: '+err)
       retrun
     }
     console.log(JSON.stringify(response.body))
     let results = response.body.results
     let updatedList = Object.assign([], this.state.list)
     this.setState({
       list: results
     })
    })
  }


  submitComment(){
//    console.log('submitAction '+JSON.stringify(this.state.comment))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment);
    this.setState({
      list: updatedList
    })
  }
  updateUsername(event){
//    console.log('updateUsernameAction '+event.target.value)
    //WRONG WAY BELOW - As it fails to comply the rule "NEVER MUTATE A STATE"
    //this.state.comment['username'] = event.target.value
    //RIGHT WAY - create a copy, update the copy and then reset the state
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['username'] = event.target.value
    this.setState({
      comment:updatedComment
    })
  }
  updateBody(event){
//    console.log('updateBody '+event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['body'] = event.target.value
    this.setState({
      comment:updatedComment
    })
  }

  updateTimestamp(event){
//    console.log('updateTimestamp '+event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timestamp'] = event.target.value
    this.setState({
      comment:updatedComment
    })
  }


  render(){
    const commentStyle = styles.comment

    const commentList = this.state.list.map((comment, i) => {
          return(
            <li key={i}>
                <Comment currentComment={comment}/>
            </li>
          )
    })

      return(
          <div  style={commentStyle.commnetBox}>
            <h2>Comments: Zone 1</h2>
            <div>
              <ul style={commentStyle.commentsList}>
                { commentList }
              </ul>

              <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username"/>
              <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comments"/>
              <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Timestamp (e.g. 10:30)"/><br />
              <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
              </div>
            </div>
          )
        }
}

export default Comments
