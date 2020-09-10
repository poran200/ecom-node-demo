const {check} = require('express-validator');
const userRepository = require('../../repository/users');
module.exports = {
    reqTitle: check('title').trim().isLength({min:5,max:30}),
    reqPrice:check('price').trim().isFloat().isFloat({min:1}),
    requireEmail: check('email').trim().normalizeEmail().isEmail().custom(async (email) => {
        const existingUser = await userRepository.getOneBy({email});
        if (existingUser) {
            return Promise.reject('Email is already registered');
        }
    }),
    password: check('password')
        .trim()
        .isLength({min: 4, max: 20}).withMessage('Must be at least 4 and max 20 '),

    confirmPassword: check('confirmPassword').trim().custom(async (confirmPassword, {req}) => {
        if (req.body.password !== req.body.confirmPassword) {
            console.log(confirmPassword + ' ' + req.body.password);
            return Promise.reject('Password is incorrect match');
        }
    }),
    isUserPasswordValid: check('password').trim().custom(async (password, {req}) => {
        const user = await userRepository.getOneBy({email: req.body.email});
        if (!user) {
            return Promise.reject('Password incorrect');
        }
        const isMatch = await userRepository.comparePassword(user.password, password);
        if (!isMatch) {
            return Promise.reject('Password incorrect');
        }
    }),
    userEmailIsValid: check('email').trim().normalizeEmail().isEmail()
        .custom(async (email, {req}) => {
            const user = await userRepository.getOneBy({email});
            if (!user) {
                return Promise.reject(new Error('Email not found'));
            }
        })

};
