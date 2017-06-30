var express = require('express')
var router = express.Router()
//var zoneController = require('../controllers/zoneController')
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){

  var resource = req.params.resource
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Requested: '+resource
    })
  }

  // As both Zone and Comment controller have the same
  // methods exposed the following generalization is possible
  // This controler can support any resource very nice decoupling

  controller.find(req.query, function(err, results){
    if(err){
      res.json({
        confrimation: 'fail',
        message: err
      })
      return
    }

    res.json({
      confirmation:'success',
      results: results
    })
  })

/*  if (resource == 'zone'){
    zoneController.find(req.query, function(err, results){
      if(err){
        res.json({
          confrimation: 'fail',
          message: err
        })
        return
      }

      res.json({
        confirmation:'success',
        results: results
      })
    })
  }*/
})

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var id = req.params.id
  var controller = controllers[resource]
//  if (resource == 'zone'){
    controller.findById(id, function(err, result){
      if(err){
        res.json({
          confrimation: 'fail',
          message: 'Not Found id:'+id
        })
        return
      }

      res.json({
        confirmation:'success',
        result: result
      })
    })

//  }

})

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
//  if(resource == 'zone'){
    controller.create(req.body, function(err,result){
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    }
    res.json({
      confirmation: 'success',
      result: result
      })
    })
//  }
})

module.exports = router
