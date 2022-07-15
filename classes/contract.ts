import {DB} from "../../social-framework/src/classes/db"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('contract')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Add'}, ...err})
        }
    }

    static async GetById ( fields ) {
        try {
            fields._id = new DB().ObjectID(fields._id)

            let collection = DB.Client.collection('contract')
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)

            let collection = DB.Client.collection('contract')
            return await collection.find(fields).limit(fields.count).skip(fields.offset).toArray()
        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Get'}, ...err})
        }
    }
}