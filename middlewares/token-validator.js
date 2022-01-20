const jwt = require('jsonwebtoken');


const validateToken = (req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token no enviado'
        });
    }

    try{

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();

    }catch(err){
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        });
    }

}


module.exports = {
    validateToken
}