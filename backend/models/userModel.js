const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Lütfen bir ad girin']
    },
    surname: {
        type: String,
        required: [true, 'Lütfen bir soyad girin']
    },
    email: {
        type: String,
        required: [true, 'Lütfen bir geçerli bir e-posta adresi girin'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Lütfen bir şifre oluşturun']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)