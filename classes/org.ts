//import {DB} from "social-framework/build/classes/db"
import {DB} from "../../social-framework/src/classes/db"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('org')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = new DB().ObjectID(fields._id)

            let collection = DB.Client.collection('org')
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = DB.Client.collection('org')

            return await collection.find().limit(fields.count+fields.offset).skip(fields.offset).toArray()

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Get'}, ...err})
        }
    }
}