import Joi from "joi"
import { CAdmin } from "../../../classes/admin"

export default async function handler(req, res) {
    let value
    try {
        try {
            await CAdmin.DdIndex ()

        } catch (err) {
            throw ({...{code: 30100000, msg: 'Ошибка формирования результата'}, ...err})
        }

        res.status(200).json({
            code: 0,
            response: true//result
        })
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RContract Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}