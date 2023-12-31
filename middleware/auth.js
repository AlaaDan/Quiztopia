const jwt = require('jsonwebtoken');

export async function createToken (userName, userID){
    const token = jwt.sign({userName, userID}, "1a1b1c", {expiresIn: '1h'})
    return token
};

export const validateToken = {
    before: async (request) => {
        try{
            const token = request.event.headers.authorization.replace('Bearer ', '')
            if (!token) {
                return('No token provided')
            } else {
                const decoded = jwt.verify(token, "1a1b1c")
                request.event.decoded = decoded
                request.event.userName = decoded.userName
                request.event.userID = decoded.userID
                return request.response
            }
        } catch (err) {
            request.event.error = "401"
            return request.response
        }
    }
}