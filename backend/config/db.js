const mongoose = require('mongoose');


//cuando hay una función con un async, SIEMPRE va a esperar a que la que tiene await se termine de ejecutar
const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);//con mongoose se crea la conexión
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);//acá se muestra el usuario al que se conectó y adicionalmente pusimos que se imprima de un color y subrayado
    }
    catch (error){
        console.error(error);//muestra el error
        process.exit(1);//detiene el proceso
    }
}

module.exports = connectDB;