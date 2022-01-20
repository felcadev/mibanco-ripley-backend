const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../../controllers/v1/auth');
const { validateFields } = require('../../middlewares/fields-validator');
const { validateToken } = require('../../middlewares/token-validator');



const router = Router();

router.post('/', [
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], login);


router.get( '/renew',
    validateToken,
    renewToken
)


module.exports = router;