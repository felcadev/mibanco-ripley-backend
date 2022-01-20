const User = require('../../models/v1/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../helpers/jwt');


const login = async (req, res) => {

    const { email, password } = req.body;

    try{

        const dbUser = await User.findOne({email});

        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: "Email o Contraseña incorrecta"
            });
        }


        const validatePassword = bcrypt.compareSync(password, dbUser.password);
        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: "Email o Contraseña incorrecta"
            })
        }

        const token = await generateToken(dbUser.id);

        return res.json({
            ok: true,
            token
        })

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador...",
        })
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generateToken( uid );

    res.json({
        ok: true,
        token
    });

}


module.exports = {
    login,
    renewToken
}