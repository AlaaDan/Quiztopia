import { db } from '../../services/db'
const { sendResponse, sendError } = require('../../responses/index')
import { validateToken } from '../../middleware/auth'
import { validateQuiz } from '../../middleware/validation'
const middy = require('@middy/core')
import { nanoid } from "nanoid"


export async function addQuiz(quizName, quizAuthor, userID, quizID){
    const quiz = {
        PK: quizID,
        entityType: "Quiz",
        quizName: quizName,
        quizAuthor: quizAuthor,
        userID: userID,
    }

    await db.put({
        TableName: 'quiztopia-db',
        Item: quiz
    }).promise()

    return quiz
}

exports.handler = middy () .handler(async (event, context) => {
    try{
        const body = JSON.parse(event.body)
        const { quizName, quizAuthor } = body
        const userID = event.userID
        const quizID = nanoid(10)

        if (event.error) {
            return sendError(400, {msgFromcreateHandler: event.error})
        }

        // Create the quiz
        const newQuiz = await addQuiz(quizName, quizAuthor, userID, quizID)

        return sendResponse(200, {sucess: true, Quiz: newQuiz})
    } catch (err) {
        console.error(err)
        return sendError(400, {msgFromCatch: err.message})
    }
})
.use(validateToken)
.use(validateQuiz)