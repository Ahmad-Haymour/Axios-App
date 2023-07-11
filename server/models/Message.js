const {Schema, model, SchemaTypes} = require('mongoose')

const messageSchema = Schema({
 
        user: {type: SchemaTypes.ObjectId, ref: 'User'},
        message: { type: String},        
        seen: {type: Boolean},
        createdAt: {type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000)
        
    }
})

module.exports = model('Msg', messageSchema)
