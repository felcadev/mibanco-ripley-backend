const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/fields-validator');
const { validateToken } = require('../../middlewares/token-validator');

const { postAccount, getMyPeopleAccounts } = require('../../controllers/v1/accounts');


const router = Router();

router.post('/', [
    validateToken,
    check('name', 'La contraseña es requerida').not().isEmpty(),
    check('rut', 'La contraseña es requerida').not().isEmpty(),
    check('phoneNumber', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validateFields
], postAccount);

router.get('/getmypeopleaccounts', [
    validateToken
], getMyPeopleAccounts);


module.exports = router;