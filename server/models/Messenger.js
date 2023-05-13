const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({
 
    participants: [{type: SchemaTypes.ObjectId, ref: 'User'}],
    /*me: {type: SchemaTypes.ObjectId, ref: 'User'},
    friend: {type: SchemaTypes.ObjectId, ref: 'User'},*/
    messages:[{
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String},
        createdAt: {type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000)
        }
    }]
})

module.exports = model('Chat', chatSchema)
