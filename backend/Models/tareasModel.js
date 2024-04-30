const mongoose = require('mongoose');

const tareaSchema = mongoose.Schema({
    //aquí se definen los campos de nuestra colección
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    descripcion: {
        type: String,
        required: [true,'Por favor ingrese una descripción']
    }
},

{
    timestamps: true
}
);
//arriba lo que se hace es que cada que se ingresa un documento, pide a fuerzas una descripción 
//(y además las timestamps con respecto a la hora de Greenwich) 

module.exports = mongoose.model('Tarea', tareaSchema);
//un modelo se debe crear por convención con mayúscula y en singular (mongoose lo vuelve lo opuesto)
