import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('contract-type')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContractType Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('contract-type')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContractType GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('contract-type')

            if (!fields.contract)
                return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContractType Get'}, ...err})
        }
    }
}