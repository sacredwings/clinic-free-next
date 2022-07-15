import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import COrg from "../../../classes/org"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                ids: Joi.string().min(24).max(24).required(),
            })

            value = await schema.validateAsync(req.query)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let fields = {
                _id: value.ids
            }
            //let result = await COrg.GetById (fields)

            res.status(200).json({
                code: 0,
                //response: result[0]
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}