const Payee = require('../../models/v1/payee');
const Account = require('../../models/v1/account');
const Transfer = require('../../models/v1/transfer');
const User = require('../../models/v1/user');


const { request } = require('express');
const { sendEmailHelper } = require('../../helpers/email');


const getMyTransfers =  async (req = request , res) => {

    const userId = req.id;
    let { limit, page } = req.query;

    limit = limit < 20 ? limit : 20;
    page  = page > 0 ? page : 0;

    const query = { user: userId }

    const [ transfers, totalDocuments] = await Promise.all([
        Transfer.find(query)
                .limit(limit)
                .skip(limit * page)
                .sort('-date'),

        Transfer.countDocuments(query)
    ])

    return res.json({
        ok: true,
        page,
        limit,
        total: totalDocuments,
        transfers,

    });

}

const postTransfer = async (req, res) => {
    
    const userId = req.id;
    
    const { 
        payeeId,
        accountId,
        bankName,
        amount
    } = req.body;


    try{
        const payeeExist = await Payee.findOne({ _id: payeeId, user: userId });
        if(!payeeExist){
            return res.status(400).json({
                ok: false,
                msg: "Destinatario no encontrado"
            });
        }
    
        const accountExist = await Account.findOne({ _id: accountId, payee: payeeExist.id });
        if(!accountExist){
            return res.status(400).json({
                ok: false,
                msg: "Cuenta no encontrada"
            });
        }
    
        const transferData = {
            user: userId,
            account: accountExist.id,
            accountType: accountExist.type,
            accountNumber: accountExist.number,
            bankId: accountExist.bankId,
            bankName,
            name: payeeExist.name,
            rut: payeeExist.rut,
            email: payeeExist.email,
            phoneNumber: payeeExist.phoneNumber,
            amount
        }
    
        const newTransfer = new Transfer({ ...transferData });
        const transfer = await newTransfer.save();
    
        const user = await User.findById( userId );

        sendEmail(payeeExist, user, transfer);


        return res.json({
            ok: true,
            msg: 'Se ha registrado exitosamente',
            transfer
        });
    
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador...",
            error: error.message
        })
    }

}

const  sendEmail = (payee, user, transfer) => {

    let to = payee.email;
    let subject = `Recibiste una transferencia de: ${user.name}`;
    let html = `
        <h1>¡Genial! Has recibido una transferencia ;)</h1>
        <h3>Nuestro cliente ${user.name} te ha realizado una transferencia hoy.</h3>
        <table>
            <tr>
                <th>Banco</th>
                <th>Tipo cuenta</th>
                <th>Numero</th>
                <th>Monto</th>
            </tr>
            <tr>
                <td>${transfer.bankName}</td>
                <td>${transfer.accountType}</td>
                <td>${transfer.accountNumber}</td>
                <td>$${transfer.amount.toLocaleString('cl')}</td>
            </tr>
        </table>
        <br/>
        <p>Prefiere siempre los canales digitales. <p/>

    `;

    sendEmailHelper(to, subject, html);
}

module.exports = {
    getMyTransfers,
    postTransfer,
}