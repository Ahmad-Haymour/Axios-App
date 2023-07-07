const Comment = require('../models/Comment')
const Event = require('../models/Event')

exports.createComment = async(req, res, next)=>{

    console.log(req.body);
    const comment = await new Comment(req.body)
    comment.user = req.user
    
    await comment.populate('user', '-token -password -__v')
    
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

    const {commentID, eventID} = req.body

    console.log('REQ BODY  => ', req.body);
    console.log('Event ID => ', eventID);

    const comment = await Comment.findById(commentID).populate('user', '-token -password -__v')
    
    const event = await Event.findById(eventID).populate('user', '-token -password -__v').populate('comments').populate('team', '-token -password -__v')

    console.log(req.user?._id);
    console.log(comment._id);

    if( !(comment.user?._id.toString() === req.user?._id.toString())){  
        return res.status(201).json('Its not your comment')
    } 
    
    event.comments.filter( e => e !== commentID )
    await Promise.all( event.comments.map((e)=>e.populate('user', '-token -password -__v')) )

    // await comment.remove()
    await Comment.deleteOne().where('_id').equals(commentID)
    
    
    // event.comments.remove(req.body.id)
    // await Comment.deleteOne().where('_id').equals(commentID)
    event.comments = event.comments.filter(e => e._id !== commentID)

    await event.save()

    res.status(200).send(event)
}