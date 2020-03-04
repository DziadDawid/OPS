const application = require("../models/application");
const bcrypt = require('bcrypt');
const {
    check,
    validationResult
} = require("express-validator");

const saltRounds = 12;

exports.store = async (req, res, next) => {
    await application.create({
        'email': req.body.email,
        'password': req.body.password
    });

    req.flash('ddupa', "applied to db");
    res.redirect("/");
}

exports.validate = [
    check("email").trim().isEmail().withMessage("Email is required."),
    check("password").trim().isLength({
        min: 8
    }).withMessage("Password requires min 8 characters.")
];

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('index', {
            validated: req.body,
            errors: errors.mapped(),
            showLightbox: 'true'
        })
    }

    next();
}

exports.hashPass = (req, res, next) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            req.body.password = hash;
            next();
        })
    })
}