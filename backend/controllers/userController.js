const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {

    const { name, surname, email, password } = req.body

    if(!name || !surname || !email || !password){
        res.status(400)
        throw new Error('Lütfen tüm alanları doldurun')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Kullanıcı zaten kayıtlı')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name, surname, email, password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Geçersiz input')
    }

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Geçersiz input')
    }

}) 

const getMe = asyncHandler(async (req, res) => {
    const {_id, name, surname, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        surname,
        email,
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d',})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
} 