import React, { Component } from 'react'
import {Zone,CreateZone} from '../presentation'
import{ APIManager } from '../../utils'

 class Zones extends Component{
   constructor(){
     super()
     this.state = {
       selected: 0,
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
/*   updateZone(event){
     console.log(event.target.id +":"  + event.target.value);
     let updatedZone = Object.assign({}, this.state.zone)
     updatedZone[event.target.id] = event.target.value
     this.setState({
       zone: updatedZone
     })
   }
*/
   addZone(zone){
     console.log('addZone in Zones.js:'+JSON.stringify(zone))
     let updatedZone = Object.assign({}, zone)
//     updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
//     console.log('updatedZone :'+JSON.stringify(updatedZone))

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

   selectZone(index){
     console.log('selectZone in container, index: '+index)
     this.setState({
          selected: index
     })
   }

   render(){
     const listItems = this.state.list.map((zone, i) => {
     let selected = (i==this.state.selected)
       return(
         <li key={i}>
             <Zone index={i} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone}/>
         </li>
       )
     })
     return(
       <div>
          <ol>
            {listItems}
          </ol>
          <CreateZone onCreate={this.addZone.bind(this)}/>
      </div>
     )
   }
 }
 export default Zones
