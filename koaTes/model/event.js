var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var eventSchema = Schema({
    title     : String,
    body      : String,
    startDate : {type:Date,
            validate: {
                validator: function(v) {
                    return v > Date.now;
                    },
        message: '{VALUE} must be biger than Now!'
        },
    },
    endDate : {type:Date,
            validate: {
                validator: function(v) {
                    return this.startDate < v;
                    },
        message: '{VALUE} must be biger than startDate!'
        },
    },
    interval : {type:Number,
            validate: {
                validator: function(v) {
                    return (v===0) || (v > 1000 * 60 * 10);
                    },
        message: '{VALUE} must be biger than 10 min, zero min no repeat!'
        },
    },

    status    : {type: String, enum: ["trigger", "close", "suspend", "delay"]},
    assigner  : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    creator   : { type: Schema.Types.ObjectId, ref: 'User'},

    priority : {type: String, enum: ["HIGH","MEDIEM","LOW"]},
    tag      : String,
});

eventSchema.pre('close',function(next){
    if(this.interval > 0)
    {
        
    }
    next();
});


eventSchema.pre('assign',function(next){
    if(this.isRepeat)
    {

    }
    next();
});


module.exports = mongoose.model('Event', eventSchema);