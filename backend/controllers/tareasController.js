const asyncHandler = require('express-async-handler');
const Tarea = require('../Models/tareasModel');
//se importa el modelo y el manejador de errores

//async: vuelve la función asíncrona
//asyncHandler: wrapper manejador de errores

const getTareas= asyncHandler(async(req,res)=>{
    const tareas = await Tarea.find()
    res.status(200).json(tareas);
})

const crearTareas = asyncHandler(async (req,res) => {
    if(!req.body.descripcion){
        res.status(400);
        throw new Error('Por favor ingrese una descripción');
    }
    //esa es la función para crear un objeto
    const tarea = await Tarea.create({
        descripcion : req.body.descripcion
    })
    //201 = creado
    res.status(201).json(tarea);
})

const updateTareas =asyncHandler(async (req,res) => {
    //buscar la tarea a modificar
    const tarea = await Tarea.findById(req.params.id);

    if(!tarea){
        res.status(404);
        throw new Error('La tarea no existe');
    }

    //estos métodos están en documentación de mongoose. Se le pasa de parámetros que el
    //id lo obtiene del link (params), las cosas por cambiar del body y el true es para 
    //regresar el documento actualizado (si pusiéramos false, devuelve el anterior)
    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({tareaUpdated});
})

const deleteTareas =asyncHandler( async (req,res) => {

    const tarea = await Tarea.findById(req.params.id);

    if(!tarea){
        res.status(404);
        throw new Error('La tarea no existe');
    }
    await Tarea.deleteOne(tarea)
    res.status(200).json({id:req.params.id});
})

module.exports={
    getTareas,
    crearTareas,
    updateTareas,
    deleteTareas
}