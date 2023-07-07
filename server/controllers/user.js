const User = require("../models/User")
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const fs = require('fs/promises')
const path = require('path')


exports.register = async(req, res, next)=>{
    const user = new User(req.body)
    // .select({"password": 0, "token":0}),  ("-token -password") 
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    user.token = crypto.randomBytes(64).toString('hex')

    if(req.file){
        const filename = path.join(process.cwd(), req.file.path)
        const buffer = await fs.readFile(filename);
        const image = `data:${req.file.mimetype};base64,${buffer.toString("base64")}`;
        user.avatar = image;
        await fs.unlink(filename);
    }

    await user.save()
    res.cookie('user-token', user.token, {maxAge: 999999999999, sameSite: 'strict', httpOnly: true})

    res.status(200).json(user)
}

exports.login = async(req, res, next) =>{
    const {email, password} = req.body
    const user = await User.findOne({'email':email}).populate('events').populate('eventslist')
    await Promise.all( user.events.map((e)=>e.populate('user', '-token -password -__v')) )

    if(!user){
        const error = new Error('Wrong E-Mail address !')
        error.status = 400
        return next(error)
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        const error = new Error('Wrong password!')
        error.status = 400
        return next(error)
    }

    user.token = crypto.randomBytes(64).toString('hex')
    await user.save()

    res.cookie('user-token', user.token, {maxAge:99999999999, sameSite: 'strict', httpOnly: true} )

    delete user.password

    res.status(200).send(user)
}

exports.getUsers = async(req, res, next) =>{
    const users = await User.find({}, '-token -password -__v')
    console.log(users);
    res.status(200).send(users)
}

exports.getSingleUser = async (req, res, next)=>{
    const {id} = req.params
    const user = await User.findById(id, '-token -password -__v')

    if(!user){
        const error = new Error('User not found')
        error.status = 400
        return next(error)
    }

    res.status(200).send(user)
}

exports.logout = async(req, res, next)=>{
    const token = req.cookies['user-token']

    const user = await User.findOne({token:token})

    if(!token){
        return res.status(200).send('Token not found')
    }
    if(user){
        user.token = ''
        await user.save()
    }
    res.cookie('user-token', user.token, {minAge: 1, sameSite: 'strict', httpOnly: true})

    res.status(200).send('Logout Success')
}

exports.getCurrentUser = async(req, res, next)=>{
 
    const token = req.cookies['user-token']

    if(!token){
        console.log('token failed');
        return res.status(200).json(null)
    }

    const user = await User.findOne({token:token}, '-token -password -__v').populate('events').populate('eventslist').populate('messenger')
    // const user = await User.findOne().where('token').equals(token)
    await Promise.all( user.events.map((e)=>e.populate('user', '-token -password -__v')) )

    if(!user){
        console.log('user failed');
        return res.status(200).json(null)
    }

    res.status(200).json(user)
}

exports.updateUser = async(req, res, next)=>{
    const {firstname, lastname, age, gender} = req.body
    const requestUser = req.user
    console.log('REQ USSER: ', requestUser);

    const token = req.cookies['user-token']
    const user = await User.findOne({token:token}, '-token -password').populate('events')
    await Promise.all( user.events.map((e)=>e.populate('user', '-token -password -__v')) )

    // const user = await User.findOne({_id: requestUser._id})
 
    // const user = await User.findOneAndUpdate(
    //     {email: req.user.email},
    //     {
    //         firstname: firstname? firstname:null,
    //         lastname: lastname? lastname:null,
    //         age: age? age:null,
    //         gender: gender? gender:null,
         
    //     },
    //     {new: true}
    //     )   

    console.log('USER is: ', user);
    // console.log('lastname is: ', lastname);
    // console.log('GENDER is: ', gender);  

    user.firstname = firstname ? firstname : user.firstname
    user.lastname = lastname ?lastname: user.lastname
    user.age = age ? age : user.age
    user.gender = gender ? gender : user.gender

    console.log('firstname is: ', user.firstname);
    console.log('lastname is: ', user.lastname);
    console.log('GENDER is: ', user.gender);
    console.log('GENDER is: ', user.age);


    console.log('REQ FILE: ', req.file);
    if(req.file){
        const filename = path.join(process.cwd(), req.file.path)
        const buffer = await fs.readFile(filename);
        const image = `data:${req.file.mimetype};base64,${buffer.toString("base64")}`;
        user.avatar = image;
        await fs.unlink(filename);
    }

    await user.save()

    res.status(200).send(user)
}
