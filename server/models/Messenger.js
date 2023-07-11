const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({
 
    participants: [{type: SchemaTypes.ObjectId, ref: 'User'}],

    messages:[{
        msg: {type: SchemaTypes.ObjectId, ref: 'Msg'},
    }]
})

module.exports = model('Chat', chatSchema)
