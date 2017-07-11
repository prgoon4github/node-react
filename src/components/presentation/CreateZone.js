import React, { Component } from 'react'

class CreateZone extends Component{
  constructor(){
    super()
    this.state={
      zone: {
      }
    }
  }
  updateZone(event){
    console.log(event.target.id +":"  + event.target.value);
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    this.setState({
      zone: updatedZone
    })
  }
/*
  addZone(){
    console.log('addZone in CreateZone:'+JSON.stringify(this.state.zone))
    this.props.onCreate(this.state.zone)
  }
*/
  submitZone(event){
    console.log('submitZone in CreateZone.js: '+JSON.stringify(this.state.zone))
    let updatedZone = Object.assign({},this.state.zone)
    updatedZone['zipCodes']=updatedZone.zipCode.split(',')
    this.props.onCreate(updatedZone)
  }



  render(){
    return(
      <div>
          <h3>Create Zone</h3>
          <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zone"/>
          <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip"/>
          <button onClick={this.submitZone.bind(this)} className="btn btn-danger">Add Zone</button>
      </div>
    )
  }
}

export default CreateZone
