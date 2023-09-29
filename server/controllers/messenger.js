
const Chat = require('../models/Messenger')
const User = require('../models/User')
const Message = require('../models/Message')

require('express-async-errors')

exports.readChat = async (req, res, next)=>{
    const {chatID} = req.query

    if(!chatID ){
        res.status(201).send(null)
    }

    const chat = await Chat.findById(chatID)
                    .populate('participants')
                    .populate({
                        path: "messages", // populate messages
                        populate: {
                            path: "user", // in messages, populate users
                            select: "-token -password" // private path
                        }
                    })
    if(!chat ){
        res.status(201).send(null)
    }

    res.status(200).send(chat)
}

exports.setChat = async (req, res, next)=>{
    const {friendID} = req.body

    const user = await User.findById(req.user?._id.toString())
    const friend = await User.findById(friendID)

    let chat = await Chat.find({$or:[
                                { participants : [
                                    {_id: user._id.toString()},
                                    {_id: friend._id}
                                ] },
                                { participants : [
                                    {_id: friend._id},
                                    {_id: user._id.toString()}
                                ] }
                            ]})
                            .populate('participants', '-token -password')
                            .populate({
                                path: "messages", // populate messages
                                populate: {
                                    path: "user", // in messages, populate user
                                    select: "-token -password" // private path
                                }
                            })
                            
    if( chat.length === 0 ){
        chat = await new Chat({})
        chat.participants = [friendID, user._id.toString()]
        
        const message = await new Message({message:'Hello there!', user: user._id.toString(), seen:false})
        chat.messages.push(message)
        friend.notifications.push(message._id)

        await chat.save()
        await message.save()
    }

    if(!user.messenger.includes(chat._id)){
        user.messenger.push(chat._id)
    }
    
    if(!friend.messenger.includes(chat._id)){
        friend.messenger.push(chat._id)
    }
    
    await user.save()
    await friend.save()

    res.status(200).send(chat)
}


exports.sendMessage = async(req,res,next) =>{

    const { friend, chatID, message} = req.body

    const user = await User.findById(req.user._id)

    const chat = await Chat.findById(chatID).populate('participants', '-token -password')
                            .populate({
                                path: "messages", // populate messages
                                populate: {
                                    path: "user", // in messages, populate user
                                    select: "-token -password"
                                }
                            })

    const newMessage = await new Message({message: message, user: user._id.toString(), seen:false})

    if(!chat){
        const error = new Error('Chat went wrong!')
        error.status = 400
        return next(error)
    }
    if(!user){
        const error = new Error('User not found!')
        error.status = 400
        return next(error)
    }
    if(!message){
        const error = new Error('Type something..')
        error.status = 400
        return next(error)
    } else if(message){
        chat.messages.push(newMessage)
    } 

    const friendUser = await User.findById(friend);

    if(!friendUser.messenger.includes(chat._id)){
        friendUser.messenger.push(chat._id)    
    }
    
    friendUser.notifications.push(newMessage._id)
    
    await friendUser.save()
    await chat.save()
    await newMessage.save()

    res.status(200).json(chat)
}

exports.deleteMessageNotification = async(req, res, next)=>{

    const {messageID}  = req.body

    const message = await Message.findById(messageID)

    console.log('MESSAGE is :::: ', message);

    if(!message){
        const error = new Error('Message not found!')
        error.status = 400
        return next(error)
     }

    await User.updateOne( { _id: req.user?._id } ,
            { $pull: { notifications: { $in: messageID } } }, { new: true }
        )

     res.send(message)
}