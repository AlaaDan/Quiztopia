const { db } = require('../../services/db')
const { sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core')
const { validateToken } = require('../../middleware/auth')

// Check if the user is the owner of the quiz
export async function checkOwner(userID, quizID){
    const quiz = await db.query({
        TableName: 'quiztopiaDB',
        KeyConditionExpression: 'quizID = :quizID',
        ExpressionAttributeValues: {
            ':quizID': quizID
        }
    }).promise()

    if(quiz.Items.length === 0){
        throw new Error('No quiz found')
    } else {
        const quizOwner = quiz.Items[0].userID
        if(quizOwner !== userID){
            throw new Error('You are not the owner of this quiz')
        }
    }
}

// Delete the quiz
export async function deleteQuiz(quizID){
    await db.delete({
        TableName: 'quiztopiaDB',
        Key: {
            quizID: quizID
        }
    }).promise()
}

exports.handler = middy () .handler(async (event) => {
    try{
        const userID = event.userID
        const quizID = event.pathParameters.quizId

        if (event.error) {
            return sendError(400, {msg: event.error})
        }

        // Check if the user is the owner of the quiz
        await checkOwner(userID, quizID)

        // Delete the quiz
        await deleteQuiz(quizID)

        return sendResponse(200, {sucess: true, msg: "Quiz deleted successfully"})
    } catch (err) {
        console.error(err)
        return sendError(400, {msg: err.message})
    }
}
).use(validateToken)