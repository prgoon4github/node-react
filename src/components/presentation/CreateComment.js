import React, { Component } from 'react'

class CreateComment extends Component{
  constructor(){
    super()
    this.state={
      comment: {
      }
    }
  }

  updateComment(event){
    console.log('updateComment: '+event.target.id + '==' + event.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment[event.target.id] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }


  submitComment(){
    console.log('submitAction '+JSON.stringify(this.state.comment))
    this.props.onCreate(this.state.comment)
/*  //This is wrong way of doing it as container's job is to
    //handle the data.
    let updatedComment = Object.assign({}, this.state.comment)

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
    })*/
  }


  render(){
    return(
      <div>
        <h3>Create Comment</h3>
        <input  onChange={this.updateComment.bind(this)} id="username" className="form-control" type="text" placeholder="Username"/>
        <input  onChange={this.updateComment.bind(this)} id="body" className="form-control" type="text" placeholder="Comments"/>
        <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
      </div>
    )
  }
}
 export default CreateComment
