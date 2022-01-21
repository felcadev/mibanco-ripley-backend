const People = require('../../models/v1/people');
const Account = require('../../models/v1/account');
const User = require('../../models/v1/user');
const user = require('../../models/v1/user');

const ObjectId = require('mongoose').Types.ObjectId


const getMyPeopleAccounts = async (req, res) => {

    try{

        const userId = req.id; // Token midleware provider
        console.log(userId);
        

        const peopleAccounts = await People.aggregate([
            { $match: { user: ObjectId(userId) }},
            {
                $lookup: {
                    from: 'accounts',
                    localField: '_id',
                    foreignField: 'people',
                    as: 'accounts',
                },
            }    
        ]);


        return res.json({
            ok: true,
            peopleAccounts
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

    const peopleData = { 
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

        const peopleExist = await People.findOne({ user: userId, rut});

        let people = null;
        
        if( peopleExist ){ // Update people
            people = await People.findByIdAndUpdate( peopleExist.id, peopleData, { new: true } ); 
        }else{
            const newPeople = new People({ ...peopleData, user: userId });
            people = await newPeople.save();
        }


        const accountExist = await Account.findOne({ people: people.id, number: accountNumber });

        if( accountExist ) {
            return res.json({
                msg: 'Cuenta ya registrada',
                ok: false
            })
        }

        const newAccount = new Account({ ...accountData, people: people.id })
        const account = await newAccount.save();

        return res.json({
            ok: true,
            msg: 'Se ha registrado exitosamente',
            people,
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
    getMyPeopleAccounts
}