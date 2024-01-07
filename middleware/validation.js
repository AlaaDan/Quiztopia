const Joi = require('joi');

const validate = (schema) => ({
    before: async (request) =>{
        try{
            const body = JSON.parse(request.event.body)
            
            const { error } = schema.validate(body)
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

const quizSchema = Joi.object({
    quizName: Joi.string().min(3).max(30).required(),
    quizAuthor: Joi.string().min(3).max(30).required(),
})

const questionSchema = Joi.object({
    question: Joi.string().min(3).max(30).required(),
    answer: Joi.string().min(3).max(30).required(),
    quizID: Joi.string().required(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
})


export const validateQuestion = validate(questionSchema)
export const validateQuiz = validate(quizSchema)
export const validateUser = validate(userSchema)