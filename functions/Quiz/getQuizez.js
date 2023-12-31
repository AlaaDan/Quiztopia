const { db } = require('../../services/db')
const { sendResponse, sendError } = require('../../responses/index')
const middy = require('@middy/core')

const getQuizzes = async () => {
    const quizzes = await db.scan({
        TableName: 'quiztopia-db',
        FilterExpression: 'quiz = :quiz',
        ExpressionAttributeValues: {
            ':quiz': 'quiz'
        }
    }).promise()

    if(quizzes.Items.length === 0){
        throw new Error('No quizzes found')
    } else {
        return quizzes
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