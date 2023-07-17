const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({
 
    participants: [{type: SchemaTypes.ObjectId, ref: 'User'}],

    messages:[{
       type: SchemaTypes.ObjectId, 
       ref: 'Msg',
       unique: true
    }]
})

module.exports = model('Chat', chatSchema)
