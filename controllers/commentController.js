var Comment = require('../models/comment')

module.exports = {

   find: function(params, callback){
     console.log("I am in comments")
     Comment.find(params, function(err, comments){
       if(err){
         callback(err, null)
         return
       }

       callback(null, comments)
     })
   },

   findById: function(id, callback) {
      Comment.findById(id, function(err, comment){
       if(err){
         callback(err, null)
         return
       }
       callback(null, comment)
     })

   },

   create: function(params, callback){
     Comment.create(params, function(err,comment){
       if(err){
         callback(err, null)
         return
       }
       callback(null, comment)
     })
   },

   update: function(id,params,callback){
     Comment.findByIdAndUpdate(id, params, {new:true}, function(err,comment){
       if(err){
         callback(err,null)
         err
       }
       callback(null, comment)
     })
   },

   delete: function(id, callback){
     Comment.findByIdAndRemove(id, params, function(err,comment){
       if(err){
         callback(err,null)
         err
       }
       callback(null, null)
     })
   }
}
