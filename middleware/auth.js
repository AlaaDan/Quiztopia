const jwt = require('jsonwebtoken');

export const validateToken = {
    before: async (request) => {
        try {
            const token = request.event.headers.Authorization.replace('Bearer ', '')

            if (!token) {
                throw new Error('No token provided')
            }
            const data = jwt.verify(token, 'a1b1c1')
            request.event.id = data.id
            request.event.userName = data.userName

            return request.response

        }
        catch (err) {
            request.event.error = "401"
            return request.response
        }
    },
    onError: async (request) => {
        request.event.error = "401"
            return request.response
    }
}