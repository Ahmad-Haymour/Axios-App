const Event = require("../models/Event")
const User = require("../models/User")
require('express-async-errors')

exports.getEvents = async(req, res, next) =>{
    const events = await Event.find().populate('user', '-token -password -__v').populate('team')
    await Promise.all( events.map((e)=>e.populate('user.eventslist')) )
    res.status(200).send(events)
}

exports.addEvent = async (req, res, next) => {
    const userID = req.user._id
    const user = await User.findById(userID).populate('events')

    if (!userID || !user) {
        const error = new Error('Authorization failed!!!');
        error.status = 401;
        return next(error);
    }

    await Promise.all( user.events.map((e)=>e.populate('user', '-token -password -__v')) )
    
    try {
        const event = new Event(req.body);
        event.user = user;
        
        event.img = req.file ? req.file.path : null, // Save the image file path in the "img" field

        user.events.push(event._id);
        event.team.push(user._id)

        console.log('TEAM : ', event.team);
        console.log('REQ File : ', req.file);
  
        await event.save();
        await user.save();
        res.status(200).send(event);

    } catch (error) {
        console.error("Image Upload Error:", error);
        // Pass the error to the next middleware or error handler
        return next(error);
    }
  };

exports.getSingleEvent = async(req, res, next)=>{
    const {id} = req.params
    const event = await Event.findById(id).populate('user', '-token -password -__v').populate('team', '-token -password -__v').populate('comments')

    if(!event){
        const error = new Error('Event are not available anymore!!')
        error.status = 400
        return next(error)
    }
 
    await Promise.all(event.comments.map(comment=> comment.populate('user', '-token -password -__v')))

    await event.save()

    res.status(200).send(event)
}

exports.joinEvent = async(req,res,next)=>{
    const userID = req.user._id
  
    const user = await User.findById(userID)

    if(!user){
        const error = new Error('Authorization USER failed!!!')
        error.status = 401
        return next(error)
    }

    const eventID = req.body.id

    const event = await Event.findById(eventID).populate('team', '-token -password -__v').populate('user', '-token -password -__v')

    if(!event){
        const error = new Error('Event ID failed')
        error.status = 400
        return next(error)
    }

    const isInTeam = Boolean(event.team.find(member=> member._id.toString() === userID.toString()))
    
    if(!isInTeam){
        event.team.push(user)
        user.eventslist.push(eventID)
    } else if(isInTeam) {
        event.team = event.team.filter((member )=> member._id.toString() !== userID.toString())
        user.eventslist = user.eventslist.filter(joinedEvent => joinedEvent._id.toString() !== eventID)
    }

    await user.save()
    await event.save()

    res.status(200).send(event)
}

exports.deleteEvent = async (req,res,next)=>{
    const {id} = req.params

    const user = await User.findById(req.user._id).populate('events')

    if(!user){
        const error = new Error('Authorization failed!')
        error.status = 401
        return next(error)
    }

    user.events = user.events.filter(e => e !== id)
    user.eventslist = user.eventslist.filter(e => e !== id)

    await Event.deleteOne().where('_id').equals(id)

    await user.save()

    res.status(200).send(user)
}

exports.updateEvent = async(req,res,next)=>{
    const {id} = req.params
    const {title, date, address, category, description} = req.body

    const event = await Event.findById(id).populate('user', '-token -password -__v')

    event.title = title ? title : event.title
    event.date = date ? date : event.date
    event.address = address ? address : event.address
    event.category = category ? category : event.category
    event.description = description ? description : event.description

    // Save the image file path in the "img" field if exist : else do nothing
    event.img = req.file ? req.file.path : null 

    await event.save()

    res.status(200).send(event)
}