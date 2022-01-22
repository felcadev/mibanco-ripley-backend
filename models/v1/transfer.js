const { Schema, model } = require('mongoose');

const TransferSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    bankId: {
        type: String,
        required: true
    },
    bankName:{
        type: String,
        required: true
    }, 
    accountType: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});


TransferSchema.method('toJSON', function (){
    const { __v, password, ...object } = this.toObject();
    return object;

});

module.exports = model('Transfer', TransferSchema);