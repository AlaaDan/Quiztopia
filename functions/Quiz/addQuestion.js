import { db } from '../../services/db'
const { sendResponse, sendError } = require('../../responses/index')
import { validateToken } from '../../middleware/auth'
import { validateQuestion } from '../../middleware/validation'
const middy = require('@middy/core')

// check if the quiz exists
export async function checkQuiz(quizID){
    const quiz = await db.query({
        TableName: 'quiztopiaDB',
        KeyConditionExpression: 'quizID = :quizID',
        ExpressionAttributeValues: {
            ':quizID': quizID
        }
    }).promise()

    if(quiz.Items.length === 0){
        throw new Error('No quiz found')
    }
}

// Add question to the quiz if the user is the owner of the quiz, the question should have an answer and coordinates, longitude and latitude
export async function addQuestion(quizID, question, answer, longitude, latitude){
    const newQuestion = await db.update({
        TableName: 'quiztopiaDB',
        Key: {
            quizID: quizID
        },
        UpdateExpression: 'SET questions = list_append(if_not_exists(questions, :empty_list), :question)',
        ExpressionAttributeValues: {
            ':question': [{
                question: question,
                answer: answer,
                coordinate:
                {longitude: longitude,
                latitude: latitude}
            }],
            ':empty_list': []
        },
        ReturnValues: 'UPDATED_NEW'
    }).promise()

    return newQuestion
}

exports.handler = middy () .handler(async (event) => {
    try{
        
        const body = JSON.parse(event.body)
        const { quizID, question, answer, longitude, latitude } = body

        if (event.error) {
            return sendError(400, {msg: event.error})
        }

        // Check if the quiz exists
        await checkQuiz(quizID)

        // Add question to the quiz if the user is the owner of the quiz, the question should have an answer and coordinates, longitude and latitude
        const newQuestion = await addQuestion(quizID, question, answer, longitude, latitude)

        return sendResponse(200, {sucess: true, msg: "Question added successfully", newQuestion: newQuestion})
    } catch (err) {
        console.error(err)
        return sendError(400, {msg: err.message})
    }
}
).use(validateToken)
.use(validateQuestion)

