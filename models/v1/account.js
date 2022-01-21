const { Schema, model } = require('mongoose');

const AccountSchema = Schema({
    bankId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true
    },
    people: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true
    },

});


AccountSchema.method('toJSON', function (){
    const { __v, password, ...object } = this.toObject();
    return object;

});

module.exports = model('Account', AccountSchema);