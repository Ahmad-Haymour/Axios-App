const {Schema, model, SchemaTypes} = require('mongoose')

const eventSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String, 
        enum: [ 'Kids', 'Adults', 'Public' ],
        required: true
    },
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    date: {type: String, required: true},
    img: {type: String},
   
    team:[{
        type: SchemaTypes.ObjectId,
        ref: 'User',
    }],

    comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
    }],
})

module.exports = model('Event', eventSchema)