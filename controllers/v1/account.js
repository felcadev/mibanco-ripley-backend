const Payee = require('../../models/v1/payee');
const Account = require('../../models/v1/account');
const User = require('../../models/v1/user');
const user = require('../../models/v1/user');

const ObjectId = require('mongoose').Types.ObjectId


const getMyPayeeAccounts = async (req, res) => {

    try{

        const userId = req.id; // Token midleware provider
        
        const payeeAccounts = await Payee.aggregate([
            { $match: { user: ObjectId(userId) }},
            {
                $lookup: {
                    from: 'accounts',
                    localField: '_id',
                    foreignField: 'payee',
                    as: 'accounts',
                },
            }    
        ]);


        return res.json({
            ok: true,
            payeeAccounts
        })

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador...",
            error: error.message
        })
    }

}

const postAccount = async (req, res) => {

    const userId = req.id;
    const { name , rut, email, phoneNumber, bankId, accountType, accountNumber } = req.body;
    

    const payeeData = { 
        name,
        rut,
        email,
        phoneNumber
    };

    const accountData = {
        bankId,
        type: accountType,
        number: accountNumber,
    }


    try{        

        const payeeExist = await Payee.findOne({ user: userId, rut});

        let payee = null;
        
        if( payeeExist ){ // Update people
            payee = await Payee.findByIdAndUpdate( payeeExist.id, payeeData, { new: true } ); 
        }else{
            const newPayee = new Payee({ ...payeeData, user: userId });
            payee = await newPayee.save();
        }


        const accountExist = await Account.findOne({ payee: payee.id, number: accountNumber });

        if( accountExist ) {
            return res.json({
                msg: 'Cuenta ya registrada',
                ok: false
            })
        }

        const newAccount = new Account({ ...accountData, payee: payee.id })
        const account = await newAccount.save();

        return res.json({
            ok: true,
            msg: 'Se ha registrado exitosamente',
            payee,
            account
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador...",
            error: error.message
        })
    }

}

module.exports = {
    postAccount,
    getMyPayeeAccounts
}