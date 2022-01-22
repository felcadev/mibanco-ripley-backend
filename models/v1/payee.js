const { Schema, model } = require('mongoose');

const PayeeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
});


PayeeSchema.method('toJSON', function (){
    const { __v, password, ...object } = this.toObject();
    return object;

});

module.exports = model('Payee', PayeeSchema);