import {DB} from "social-framework/src/classes/db"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('user')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = new DB().ObjectID(fields._id)

            let collection = DB.Client.collection('user')
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = DB.Client.collection('user')
            let arFields = {}
            return await collection.find(arFields).limit(fields.count).skip(fields.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Get'}, ...err})
        }
    }
}