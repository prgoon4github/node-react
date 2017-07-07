import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import{ APIManager } from '../../utils'


class Comments extends Component{
  constructor(){
    super()
    this.state = {
  /*    comment: {
        username: '',
        body: ''
      },
  */    list:[]
    }
  }
  componentDidMount(){
    console.log('componentDidMount')
    APIManager.get('/api/comment', null, (err,response) => {
      if(err){
        alert('ERROR : '+err.message)
        return
      }
      console.log('RESULTS: '+ JSON.stringify(response.results))
      this.setState({
        list: response.results
      })
    })
  }


  submitComment(comment){
    console.log('submitAction in Comments.js: '+JSON.stringify(comment))

//    let updatedComment = Object.assign({}, this.state.comment)
    let updatedComment = Object.assign({}, comment)

    APIManager.post('/api/comment', updatedComment, (err, response) =>{
      if(err){
        alert('ERROR : '+err.message)
        return
      }
      console.log('COMMENT CREATED: '+JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      })
    })
  }
/*
  updateUsername(event){
    console.log('updateUsernameAction '+event.target.value)
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
*/
/*
  updateTimestamp(event){
    console.log('updateTimestamp '+event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timestamp'] = event.target.value
    this.setState({
      comment:updatedComment
    })
  }
*/

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
                <CreateComment onCreate={this.submitComment.bind(this)}/>
              </div>
            </div>
          )
        }
}

export default Comments
