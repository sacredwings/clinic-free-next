import {DB} from "social-framework/build/classes/db"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('org')
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

            let collection = DB.Client.collection('org')
            let result = await collection.find(fields).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('org')

            if (!fields.contract)
                return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Get'}, ...err})
        }
    }
}