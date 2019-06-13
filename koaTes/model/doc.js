var mongoose = require('mongoose'),
    Schema = mongoose.Schema

  var docSchema = new Schema({
    title:  {type:'String',   required:true},
    body:   {type:'String',   required:true},
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    stars: { type: Number, default: 0 },
    favs:  { type: Number, default: 0 },
    status        : {type: String, enum: ["draft", "open", "close"]},
    version       : { type: Number, default: 0 },
    openEditable  : { type: Boolean, default: false },
    accessorGroup : [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    accessorUser  : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    parentDoc     : { type: Schema.Types.ObjectId, ref: 'Doc' },
    childDocs     : [{ type: Schema.Types.ObjectId, ref: 'Doc' }],
    contributors  : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tags: [{type: String, validate:{
                    validator: function(value){
                            return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
                },
                message: '{VALUE} is not a valid tag. It must begin with a letter.'
                }
            }] 
  });

  module.exports = mongoose.model('Doc', docSchema);