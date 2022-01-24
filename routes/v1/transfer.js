const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middlewares/fields-validator');
const { validateToken } = require('../../middlewares/token-validator');

const { getMyTransfers, postTransfer } = require('../../controllers/v1/transfer');


const router = Router();

router.get('/allmytransfers', [
    validateToken,
], getMyTransfers);


router.post('/', [
    validateToken,
    check('payeeId', 'El id del destinatario es requerido').not().isEmpty(),
    check('accountId', 'El id de la cuenta es requerida').not().isEmpty(),
    check('bankName', 'El nombre del banco es requerido').not().isEmpty(),
    check('amount', 'El monto de la transferencia es requerida').not().isEmpty(),
    validateFields
], postTransfer);


module.exports = router;