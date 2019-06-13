var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var projectSchema = Schema({
    title     : String,
    status    : {type: String, enum: ["review", "open", "close", "suspend"]},
    startDate : Date,
    endDate   : Date,
    leader        : { type: Schema.Types.ObjectId, ref: 'User' },
    mainDoc       : { type: Schema.Types.ObjectId, ref: 'Doc' },
    parentProject : { type: Schema.Types.ObjectId, ref: 'Project' },
    childProjects : [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    contributors  : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    eventProcess  : [{ type: Schema.Types.ObjectId, ref: 'Event'}]
});





module.exports = mongoose.model('Project', projectSchema);