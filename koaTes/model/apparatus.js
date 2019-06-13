var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var apparatusSchema = Schema({
    title     : String,
    status    : {type: String, enum: ["using", "discard", "malfunction"]},
    startDate : Date,
    endDate   : Date,
    mainDoc       : { type: Schema.Types.ObjectId,  ref: 'Doc' },
    maintainer    : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    eventProcess  : [{ type: Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('Apparatus', apparatusSchema);