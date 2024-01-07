const { db } = require('../../services/db')
const { sendResponse, sendError } = require('../../responses/index')

const getQuizzes = async () => {
    const quizzes = await db.scan({
        TableName: 'quiztopia-db',
        FilterExpression: "#entityType = :Quiz",
        ExpressionAttributeValues: {
            ":Quiz" :"Quiz"
        }, 
        ExpressionAttributeNames: {
            "#entityType": "entityType"
        }
    }).promise()

    if(quizzes.Items){
        return quizzes
    } else {
        throw new Error('No quizzes found')
    }
}

exports.handler = async (eve) => {
    try{
        const quizzes = await getQuizzes()

        return sendResponse(200, {sucess: true, Quizzes: quizzes.Items})
    } catch (err) {
        console.error(err)
        return sendError(400, {msg: err.message})
    }
}