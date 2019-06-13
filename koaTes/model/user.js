const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({

        name: {type: String,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
                    },
                message: '{VALUE} is not a valid name!'
            },  
            unique: true,
            required:true
        },
        email: {type: String, 
            validate: {
                validator: function(v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                    },
                message: '{VALUE} is not a valid email format!'
                },
            unique: [true, 'emial is same with another'],
            required: [true, 'email required'],
            },
        phone:{type: String,
            validate: {
                validator: function(v) {
                    return /\d{11}/.test(v);
                    },
                message: '{VALUE} is not a valid phone number!'
                },
            // required: [true, 'User phone number required'],
            },
        gender:{
            type: String,
            enum: {
                values: ['female', 'male'],
                message: '{VALUE} is not a valid gender'
                }
            },
        passwd:{ type: String, required: true },
        createTime:Date,
        lastLogin:Date,
        graduateTime:Date,
        mainDoc:{ type: Schema.Types.ObjectId, ref: 'Doc' },
        jobUnit:String,

    contributeProject  : [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    starDocs : [{ type: Schema.Types.ObjectId, ref: 'Doc' }],
    messageBox : [{body: String, date:Date, status:{type: String, enum: ["review", "open", "close", "suspend"]}}],
    BelongGroups :{type:[{type: Schema.Types.ObjectId, ref: 'Group'}], validate: [(v)=>v.length <= 5, '{PATH} exceeds the limit of 10'] },
})

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('passwd')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
