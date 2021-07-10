// Obtener eventos
// Tienen que estar validadas
const { Router } = require('express')
const router = Router()
const { validateJWT } = require('../middlewares/validateJWT')
const {
    getEvents,
    updateEvents,
    addEvents,
    deleteEvents
} = require('../controllers/events')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields')
const { isDate } = require('../helpers/isDate')

router.use(validateJWT)

router.get('/', getEvents)

// Crear Evento

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validateFields
    ],
    addEvents
)

// Actualizar Evento

router.put('/:id', updateEvents)

// Borrar Evento

router.delete('/:id', deleteEvents)

module.exports = router
