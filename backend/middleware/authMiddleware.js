const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Models/usersModel');

const protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try{
        //obtener token
        token = req.headers.authorization.split(' ')[1]

        //verificar la firma del token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //obtener datos del usuario del payload del token y ponerlos en un objeto
        req.user = await User.findById(decoded.idusuario).select('-password');
        //se descarta la password porque va a estar en hash de todas formas
        next();
       }
       catch(error){
            console.log(error);
            res.status(401);
            throw new Error('accesso no autorizado');
       }
        
    }
    if(!token){
        console.log(error);
        res.status(401);
        throw new Error('Acceso no autorizado, no se ingresó token')
    }
})

module.exports = {
    protect
}