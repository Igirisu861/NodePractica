const express = require('express');
const router = express.Router();
const {getTareas, updateTareas, deleteTareas} = require('../controllers/tareasController');
const {crearTareas} = require('../controllers/tareasController');

//solo se llama al doc de funcionalidad y se distribuye la responsabilidad
router.route('/').get(getTareas).post(crearTareas);
router.route('/:id').put(updateTareas).delete(deleteTareas);

//igual puede ponerse así, pero pues cada quién
//router.get('/', getTareas);
//router.post('/',crearTareas);
//router.put('/:id', updateTareas);
//router.delete('/:id', deleteTareas);

module.exports = router;