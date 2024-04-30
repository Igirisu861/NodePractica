const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Favor de ingresar unn nombre"]
    },
    email:{
        type: String,
        required:[true, 'Ingrese un email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'Ingrese una contraseña']
    },
    esAdmin:{
        type: Boolean,
        default: false
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema);