const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers
        if(!authorization){
            return res.status(401).json({error: "Not authorized, no token"})
        }
        //Get token from request
        const token = authorization.split(" ")[1]
        
        //Verify token and decode {id} as the payload.
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        if(id){
            const user = await User.findById(id)
            if(!user) {
                return res.status(401).json({error: "User does not exists in DB"})
            }
            // Token ok && user ok => add id into req and continue
            req.user = user._id
            next()
        }
    } catch (error) {
        // console.log(error)
        res.status(401).json(error)
        
    }
}
// console.log(token)

module.exports = requireAuth