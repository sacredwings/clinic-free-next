import Joi from 'joi'
import CHf from "../../../classes/hf"

export  default async (req, res) => {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            let result = await CHf.Add ( value )

            res.status(200).json({
                err: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'RHf Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}