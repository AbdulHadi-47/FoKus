const jwt = require("jsonwebtoken") 


const authenticateJWT = (req, res, next) => {
        try {
        const token = req.cookies?.token; 
        if (!token) return res.sendStatus(401)
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {id: payload.id}
        next()
        } catch (error) {
            return res.sendStatus(403)
        }
        
    } 

module.exports = authenticateJWT