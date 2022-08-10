import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('specialist')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('specialist')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist GetById'}, ...err})
        }
    }
    static async GetByIdPrice ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('specialist')
            let result = await collection.aggregate([
                { $match:
                        {
                            _id: { $in: ids}
                        }
                },
                { $lookup:
                        {
                            from: 'price',
                            localField: '_id',
                            foreignField: 'object_id',
                            as: '_price'
                        }
                },
                {
                    $sort: { '_price._id': 1 }
                },
            ]).toArray();
            return result
        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch GetByIdPrice'}, ...err})
        }
    }
    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('specialist')

            if (!fields.contract)
                return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist Get'}, ...err})
        }
    }
}