const jwt = require("jsonwebtoken");


const isAuthenticated = async(req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];

    // verify token
    const verifyToken = jwt.verify(token, 'howareyoudoing', (err, decoded)=> {
        console.log(decoded);

        if(err){
            return false;
        } else{
            return decoded
        }
    });

    if(verifyToken){
        req.user = verifyToken.id;
        console.log(verifyToken);
        next();
    } else{
        const err = new Error("Token expired, login again")
        next(err)
    }
}

module.exports = isAuthenticated;