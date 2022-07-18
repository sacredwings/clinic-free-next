import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)

            let collection = DB.Client.collection('contract')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Add'}, ...err})
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
            throw ({...{err: 7001000, msg: 'CContract GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)

            let collection = DB.Client.collection('contract')

            let arFields = {
                org_id: fields.org_id
            }
            return await collection.find(arFields).limit(fields.count).skip(fields.offset).toArray()
        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Get'}, ...err})
        }
    }
}