const Joi = require('joi');

const validate = (schema) => ({
    before: async (request) =>{
        try{
            const body = JSON.parse(request.event.body)
            
            const { error } = userSchema.validate(body)
            if(error){
                return{
                    statusCode: 400,
                    body: JSON.stringify({msg: error.details[0].message}),
                    msg: "Something went wrong"
                }
            }
            return request.response


        } catch (err) {
            request.event.error = "401"
            return request.response
        }
    }
})

const userSchema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required()
})

export const validateUser = validate(userSchema)