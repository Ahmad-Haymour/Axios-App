const {Schema, model, SchemaTypes} = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    gender: {
        type: String, 
        enum: ['Male', 'Female'],
        required: false
    },
    age: {type: String, required: true},
    avatar: {type: String},
    // Created events
    events: [{
        type: SchemaTypes.ObjectId,
        ref: 'Event'
    }],
    // Joined events in list
    eventslist:[{
        type: SchemaTypes.ObjectId,
        ref: 'Event'
    }],
    // Created comments
    comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'Comment'
    }],
    token: {type: String},

    messenger: [{
        type: SchemaTypes.ObjectId,
        ref: 'Chat'
    }],

    notification:[{
        type: SchemaTypes.ObjectId,
        ref: 'Msg'
    }]
})

// userSchema.methods.toJSON = function(){
//     const result = {firstname: this.firstname, lastname: this.lastname, email: this.email, avatar: this.avatar, age: this.age, _id: this._id}
//     return result
// }

module.exports = model('User', userSchema)