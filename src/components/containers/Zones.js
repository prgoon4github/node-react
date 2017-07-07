import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import{ APIManager } from '../../utils'

 class Zones extends Component{
   constructor(){
     super()
     this.state = {
       zone:{
         name: '',
         zipCode: ''
       },
       list:[]
     }
   }
   componentDidMount(){
     console.log('componentDidMount')
     APIManager.get('api/zone', null, (err,response) =>{
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
   updateZone(event){
     console.log(event.target.id +":"  + event.target.value);
     let updatedZone = Object.assign({}, this.state.zone)
     updatedZone[event.target.id] = event.target.value
     this.setState({
       zone: updatedZone
     })
   }
   addZone(){
     console.log('addZone :'+JSON.stringify(this.state.zone))
     let updatedZone = Object.assign({}, this.state.zone)
     updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
     console.log('updatedZone :'+JSON.stringify(updatedZone))

     APIManager.post('/api/zone',updatedZone,(err,response) =>{
       if(err){
         alert('ERROR: '+err.message)
         return
       }
       console.log(JSON.stringify(updatedZone))
       console.log('ZONE CREATED: '+JSON.stringify(response))
       let updatedList = Object.assign([], this.state.list)
       updatedList.push(response.result);
       this.setState({
         list: updatedList
       })
    })
   }


   render(){
     const listItems = this.state.list.map((zone, i) => {
       return(
         <li key={i}>
             <Zone currentZone={zone}/>
         </li>
       )
     })
     return(
       <div>
          <ol>
            {listItems}
          </ol>
          <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zone"/>
          <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip"/>
          <button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>

      </div>
     )
   }
 }
 export default Zones
