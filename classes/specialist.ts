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

            //return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.find({}).toArray()

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist Get'}, ...err})
        }
    }

    static async Update ( id, fields ) {
        try {
            let collection = DB.Client.collection('specialist');
            id = new DB().ObjectID(id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist Update'}, ...err})
        }
    }

    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('specialist');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist Delete'}, ...err})
        }
    }

    static async UpdateHf ( fields ) {
        try {
            fields.hf_id = new DB().ObjectID(fields.hf_id)
            fields.id = new DB().ObjectID(fields.id)

            if (fields.module === 'ct')
                fields.module = 'contract-type'
            let collection = DB.Client.collection(fields.module)

            //поиск
            let arFields = {
                _id: fields.hf_id,
                specialist_id: fields.id
            }
            let result = await collection.findOne(arFields)

            if (result)
                //удаление
                await collection.update(
                    { _id: fields.hf_id },
                    { $pull: { 'specialist_id': fields.id} }
                )
            else
                //добавление
                await collection.update(
                    { _id: fields.hf_id },
                    { $push: { 'specialist_id': fields.id} }
                )

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CSpecialist UpdateHf'}, ...err})
        }
    }
}