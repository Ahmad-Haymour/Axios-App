
const Chat = require('../models/Messenger')
const User = require('../models/User')

require('express-async-errors')


exports.readChat = async (req, res, next)=>{
    const {chatID} = req.query
    console.log('QUERY => ',chatID);

    if(!chatID ){
        res.status(201).send(null)
    }

    const chat = await Chat.findById(chatID).populate('participants')
    //.populate('messages.user', '-token -password')

    if(!chat ){
        res.status(201).send(null)
    }

    console.log('Check Read Chat: ',chat);
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
                                    // .populate('messages.user', '-token -password')

    console.log("Chat 1 Length = 0 :: ", (chat.length === 0));
    console.log("Chat 1 Length :: ", (chat.length));

    if( chat.length === 0){
        chat = await new Chat({})
        chat.participants = [friendID, user._id.toString()]
        chat.messages.push({message:'Hello there!', user: user._id.toString()})
        
        await chat.populate('participants', '-token -password')

        console.log('look here, new CHAT result: ', chat);
        await chat.save()
    }

    if(!user.messenger.includes(chat._id)){
        user.messenger.push(chat._id)
    }
    
    if(!friend.messenger.includes(chat._id)){
        friend.messenger.push(chat._id)
    }
    
    console.log("Chat:: 2 =>  ", chat);

    // await chat.save()
    await user.save()
    await friend.save()

    res.status(200).send(chat)
}


exports.sendMessage = async(req,res,next) =>{

    const { chatID, message} = req.body

    console.log('REQ Body send Message: ', req.body);
    const user = await User.findById(req.user?._id)

    const chat = await Chat.findById(chatID).populate('participants', '-token -password')
    // .populate('messages.user', '-token -password')

    // create message = await Message ................

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
        
        chat.messages.push({user:user, message: message })
    } 
    
    console.log('Haupt USER', user._id);

    const receiver = chat.participants.filter(p => p._id !== user._id.toString())[0];
    console.log('Rreceiver', receiver);

    const friend = await User.findById(receiver._id.toString());

    // friend.notification = true
    
    // Message From =>
    // friend.chatting = user._id

    // friend.messenger.push(chat._id)
    if(!friend.messenger.includes(chat._id)){
        friend.messenger.push(chat._id)    
    }
    await friend.save()

    console.log('Friend User Receiver: ===> ', friend);
    // console.log('START CHAT Result=> ',chat);

    await chat.save()
    res.status(200).json(chat)
}