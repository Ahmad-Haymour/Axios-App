const {Schema, model, SchemaTypes} = require('mongoose')

const chatSchema = Schema({
 
    participants: [{type: SchemaTypes.ObjectId, ref: 'User'}],
    seen: {type: Boolean},

    messages:[{
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String},

        seen: {type: Boolean},
        
        createdAt: {type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000)
        }
    }]
})

module.exports = model('Chat', chatSchema)
