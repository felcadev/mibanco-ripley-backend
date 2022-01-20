const User = require('../../models/v1/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../helpers/jwt');


const postUser = async (req, res) => {

    const { email, password } = req.body;

    try{

        const emailExists = await User.findOne({email});

        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: "Email ya registrado"
            });
        }

        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateToken(user.id);

        return res.json({
            ok: true,
            user,
            token
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: "Lo sentimos contactar al administrador..."
        })
    }

}

module.exports = {
    postUser,
}