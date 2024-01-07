const bcrypt = require('bcryptjs');
import { db } from "../../services/db"
import { nanoid } from "nanoid"
const { sendResponse, sendError } = require('../../responses/index')
import { validateUser } from "../../middleware/validation"
const middy = require('@middy/core')

export async function encryptPass(pass, userName){
    const userInDB = await db.scan({
        TableName: 'user-db',
        FilterExpression: 'userName = :userName',
        ExpressionAttributeValues: {
            ':userName': userName
        }
    }).promise()

    // If the user dosen't exost, encrypt the password
    if(userInDB.Items.length === 0){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(pass, salt);
        return hash
    } else {
        throw new Error('User already exists, please try again with a different username.')
    }
}

export async function addUser(userID, userName, encryptedPass){
    const newUser = {
        PK: userID,
        userName: userName,
        password: encryptedPass
    }
    await db.put({
        TableName: 'user-db',
        Item: newUser
    }).promise()

    return newUser
}

exports.handler = middy () .handler(async (event, context) => {
    try{
        const body = JSON.parse(event.body)
        const { userName, password } = body
        const userID = nanoid(10)

        if (event.error) {
            return sendError(400, {msg: event.error})
        }
        console.log('User name: ', userName)

        // Encrypt the password
        const encryptedPass = await encryptPass(password, userName)

        // Add the user to the database
        const newUser = await addUser(userID, userName, encryptedPass)

        return sendResponse(200, {sucess: true, UserInfo: newUser})
    } catch (err) {
        console.error(err)
        return sendError(500, {msg: err.message})
    }
}
).use(validateUser)


