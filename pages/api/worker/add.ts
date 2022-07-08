import Joi from "joi"
import CWorker from "../../../classes/worker"

export  default async (req, res) => {
    let value
    try {
        try {

            //схема
            const schema = Joi.object({
                user_id: Joi.string().min(24).max(24).required(),
                contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                contract_type_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            let result = await CWorker.Add ( value )

            res.status(200).json({
                err: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'RWorker Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}