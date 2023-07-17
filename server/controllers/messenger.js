
const Chat = require('../models/Messenger')
const User = require('../models/User')
const Message = require('../models/Message')

require('express-async-errors')

exports.readChat = async (req, res, next)=>{
    const {chatID} = req.query
    console.log('QUERY => ',chatID);

    if(!chatID ){
        res.status(201).send(null)
    }

    const chat = await Chat.findById(chatID).populate('participants')
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

    console.log('friendID: ', friendID);
    console.log('UserID: ', user._id);

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
                                            path: "user", // in messages, populate users
                                            select: "-token -password" // private path
                                        }
                                     })

    console.log('Chat::==> ', chat);

    if( chat.length === 0 ){

        chat = await new Chat({})
        chat.participants = [friendID, user._id.toString()]
        
        const message = await new Message({message:'Hello there!', user: user._id.toString(), seen:false})
        chat.messages.push(message)
        friend.notification.push(message._id)

        console.log('New Chat::==> ', chat);

        await chat.save()
        await message.save()
    }

    console.log('ChatID ::==> ', chat._id);

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

    const { chatID, message} = req.body

    console.log('REQ Body send Message: ', req.body);
    const user = await User.findById(req.user?._id)

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
    }

    if(message){
        console.log('New Message ID:  ', newMessage._id);
        chat.messages.push(newMessage)
    } 

    const receiver = chat.participants.filter(p => p._id !== user._id.toString())[0];
    // friend is who recieve the message
    const friend = await User.findById(receiver._id.toString());

    friend.notification.push(newMessage._id)

    if(!friend.messenger.includes(chat._id)){
        friend.messenger.push(chat._id)    
    }
    
    console.log('Friend Receiver User: ===> ', friend);
    
    await friend.save()
    await chat.save()
    await newMessage.save()

    res.status(200).json(chat)
}