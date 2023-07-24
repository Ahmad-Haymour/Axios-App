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
    address: {type: String},
    bio: {type: String},
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

    notifications:[{
        type: SchemaTypes.ObjectId,
        ref: 'Msg' 
    }]
})

module.exports = model('User', userSchema)