const jwt = require("jsonwebtoken");
const JWT_PASS = process.env.JWT_PASS;



const authMiddleware = async (req,res,next)=>{


    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_PASS);

        if(decoded){
            req.userId = decoded.userId;

        next();
        }else{
            res.json({
                message: "Invalid Token",
                status: 500
            })
        }
    } catch (err) {
        return res.status(403).json({
            message: "Invalid Token",
            status: 500
        });
    }
}

module.exports = {authMiddleware};