var mongoose = require('mongoose')
  , Schema = mongoose.Schema

  var groupSchema = new Schema({
    title:  {type:'String',   required:true},
    startDate : Date,
    endDate   : Date,
    mainDoc   : {  type: Schema.Types.ObjectId, ref: 'Doc' },

    leader        : {  type: Schema.Types.ObjectId, ref: 'User' },
    members       : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    rootProject   : {  type: Schema.Types.ObjectId, ref: 'Project' },
    researchRegion: [{type: String, validate:{
                    validator: function(value){
                            return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
                },
                message: '{VALUE} is not a valid researchRegion form.'
                }
            }] 
  });



  module.exports = mongoose.model('Group', groupSchema);