import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('org')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Add'}, ...err})
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
            throw ({...{err: 7001000, msg: 'CWorker GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let collection = DB.Client.collection('org')
            let arFields = {
                contract_id: fields.contract_id
            }
            return await collection.find(arFields).limit(fields.count).skip(fields.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Get'}, ...err})
        }
    }
}