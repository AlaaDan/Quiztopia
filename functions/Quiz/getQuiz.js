const { db } = require('../../services/db')
const { sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core')
const { validateToken } = require('../../middleware/auth')


// Get quiz by quiz id passed as a parameter
const getQuiz = async (quizid) => {
    if (!quizid) {
        throw new Error('Quiz ID is required');
    }

    const quiz = await db.query({
        TableName: 'quiztopiaDB',
        KeyConditionExpression: 'quizID = :quizID',
        ExpressionAttributeValues: {
            ':quizID': quizid
        }
    }).promise()
    console.log(quiz)

    if(quiz.Items.length === 0){
        throw new Error('No quiz found')
    }else{
        return quiz
    }
}

exports.handler = middy () .handler(async (event) => {
    try{
        const quizid = event.pathParameters.quizId
        console.log('quizID: ', quizid)
        const quiz = await getQuiz(quizid)

        return sendResponse(200, {sucess: true, Quiz: quiz.Items})
    } catch (err) {
        console.error(err)
        return sendError(400, {msg: err.message})
    }
}
).use(validateToken)