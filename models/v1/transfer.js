const { Schema, model } = require('mongoose');

const AccountSchema = Schema({
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
    accountNumber: {
        type: Number,
        required: true
    },


});


AccountSchema.method('toJSON', function (){
    const { __v, password, ...object } = this.toObject();
    return object;

});

module.exports = model('Account', AccountSchema);