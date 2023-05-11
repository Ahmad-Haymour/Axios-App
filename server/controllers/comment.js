const Comment = require('../models/Comment')
const Event = require('../models/Event')

exports.createComment = async(req, res, next)=>{

    const comment = await new Comment(req.body).populate('user', '-token -password -__v')
    comment.user = req.user
    
    if(!comment.user){
        const error = new Error('user not found!')
        error.status = 400
        return next(error)
    }
    
    const event = await Event.findById(comment.event).populate('comments').populate('user', '-token -password -__v')

    if(!event){
        const error = new Error('Event is not avaiable anymore!')
        error.status = 400
        return next(error)
    }
    
    event.comments.push(comment.id)

    await comment.save()
    await event.save()

    res.status(200).send(comment)
}


exports.deleteComment = async(req, res, next)=>{

    const comment = await Comment.findById(req.body.id).populate('user', '-token -password -__v')
    
    const event = await Event.findById(req.body.event).populate('user', '-token -password -__v').populate('comments').populate('team', '-token -password -__v')

    if( !(comment.user._id.toString() === req.user._id.toString())){  
        return res.status(201).json('Its not your comment')
    } 
    
    event.comments.filter( e => e !== req.body.id )
    await Promise.all( event.comments.map((e)=>e.populate('user', '-token -password -__v')) )

    await comment.remove()

    event.comments.remove(req.body.id)
    await event.save()

    res.status(200).send(event)
}