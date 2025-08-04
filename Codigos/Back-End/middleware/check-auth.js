const jwt = require("jsonwebtoken");

function checkAuth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY || "secret");
        req.userData = decodedToken;
        next();
    }catch(err){
        res.status(401).json({
            message: "Não autorizado",
            error: err
        });
    }
}

module.exports = {
    checkAuth: checkAuth
};