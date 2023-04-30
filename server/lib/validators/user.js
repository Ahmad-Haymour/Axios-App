const {body} = require('express-validator')
const validator = require('../middelwares/validator')

exports.register = [
    body('email').isEmail().withMessage('We need a valid email address!'),
    body('password').isLength({min: 6}).withMessage('The password must have at least 6 characters.'),
    body('firstname').isAlpha().withMessage('We need your first name'),
    body('lastname').isAlpha().withMessage('We need your last name'),
    body('gender').notEmpty().isIn(["Male", "Female"]).withMessage('What is your gender!'),
    body('age').isNumeric().withMessage('Your Age!'),
    validator
]

exports.login = [
    body('email').isEmail().withMessage('We need a valid email address!'),
    body('password').isLength({min: 6}).withMessage("Incorrect password!"),

    validator
]
