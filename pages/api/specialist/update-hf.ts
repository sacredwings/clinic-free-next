import Joi from 'joi'
import CSpecialist from "../../../classes/specialist"
import DbConnect from "../../../util/DbConnect"

export default async (req, res) => {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                hf_id: Joi.string().max(24).max(24).required(),
                id: Joi.string().max(24).max(24).required(),
            });

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await DbConnect()

            let result = await CSpecialist.UpdateHf ( value )

            res.status(200).json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'CSpecialist UpdateHf'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}