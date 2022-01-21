const jwt = require('jsonwebtoken');

const generateToken = (id) => {

    return new Promise ( (resolve, reject) => {
        const payload = {
            id
        };
    
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: 60 * 40 // 15min
        }, (err, token) => {
           
            if(err){
                reject(err);
                console.log('No se puedo generar el JWT');
            }else{
                resolve(token);
            }
        
        });
    });

}


module.exports = {
    generateToken
}