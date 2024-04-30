const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');//para tokens (?)
const bcrypt = require('bcryptjs');//para encriptación
const User = require('../Models/usersModel');

const login= asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generarToken(user.id)
        })
    }
    else{
        res.status(401);
        throw new Error("Credenciales incorrectas");
    }
})

const generarToken = (idusuario) =>{
    return jwt.sign({idusuario},process.env.JWT_SECRET,{
        expiresIn:'30d' 
    });
}

const register = asyncHandler(async (req,res) => {
    //desestructurar un objeto 
    const {name, email, password} = req.body;
    //verificar que se pasen los datos
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Ingrese sus datos completos');
    }
    //verificar que el usuario sea único
    const userExiste = await User.findOne({email});
    if (userExiste){
        res.status(400);
        throw new Error('El usuario ya existe');
    }
    //crear el hash. Salt es una cadena de texto aleatoria que añade dificultad y hace única cada contraseña aunque sea igual a otra
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //crear usuario ahora sí
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })
    res.status(201).json(user);
})

const showdata =asyncHandler(async (req,res) => {
    res.status(200).json(req.user);
})

module.exports={
    login,
    register,
    showdata
}