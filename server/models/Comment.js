const {Schema, model, SchemaTypes} = require('mongoose')

const commentSchema = Schema({
    user: {type: SchemaTypes.ObjectId, ref: 'User', required: true},
    event: {type: SchemaTypes.ObjectId, ref: 'Event', required: true},
    message: {type: String, required: true}
})

module.exports = model('Comment', commentSchema)