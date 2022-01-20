const { Router } = require('express');
const { postUser  } = require('../../controllers/v1/users');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/fields-validator');
const { validateToken } = require('../../middlewares/token-validator');


const router = Router();


router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], postUser);




module.exports = router;