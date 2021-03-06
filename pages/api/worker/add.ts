import Joi from "joi"
import CWorker from "../../../classes/worker"

export  default async (req, res) => {
    let value
    try {
        try {

            //схема
            const schema = Joi.object({
                contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                contract_type_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty('').default(null),

                first_name: Joi.string().min(1).max(255).required(),
                last_name: Joi.string().min(1).max(255).required(),
                patronymic_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                man: Joi.number().integer().min(0).max(1).required(),

                date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                oms_policy_number: Joi.number().integer().min(999999999999999).max(9999999999999999).allow(null).empty('').default(null),
                snils: Joi.number().integer().min(9999999999).max(99999999999).allow(null).empty('').default(null),
                dogovor_type: Joi.number().integer().min(0).max(1).allow(null).empty('').default(0),

                region: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                city: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                street: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                house: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                housing: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                apt: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                building: Joi.string().min(0).max(255).allow(null).empty('').default(null),

                passport_serial: Joi.number().integer().min(1).max(9999).allow(null).empty('').default(null),
                passport_number: Joi.number().integer().min(1).max(999999).allow(null).empty('').default(null),
                passport_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                passport_issued_by: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                phone: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),
                phone_additional: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),

                subdivision: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                profession: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                employment_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                work_place: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                work_experience: Joi.number().integer().min(0).max(100).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            let price = null
            let arResearch = []
            let arSpecialist = []

            //загрузка договора
            let hfContract = await CHfContract.GetById ([value.contract_id])
            if (!hfContract.length) throw ({code: 30100000, msg: 'Договор не найден'})
            hfContract = hfContract[0]

            //достаем цену
            if (hfContract.type === 'one') price = hfContract.price

            let arHf = await CHf.GetByCode (value.hf)

            for (let hf of arHf) {
                arResearch = [...arResearch, ...hf.research_id]
                arSpecialist = [...arSpecialist, ...hf.specialist_id]
            }

            //объединение с базовыми из контракта
            arResearch = [...arResearch, ...hfContract.research_id]

            arResearch = await CHfResearch.GetById (arResearch)
            arSpecialist = await CHfSpecialist.GetById (arSpecialist)

            let fields = {
                first_name: value.first_name,
                last_name: value.last_name,
                patronymic_name: value.patronymic_name,

                man: value.man,

                date_birth: value.date_birth,

                oms_policy_number: value.oms_policy_number,
                snils: value.snils,

                region: value.region,
                city: value.city,
                street: value.street,
                house: value.house,
                housing: value.housing,
                apt: value.apt,
                building: value.building,

                passport_serial: value.passport_serial,
                passport_number: value.passport_number,
                passport_date: value.passport_date,

                passport_issued_by: value.passport_issued_by,
                phone: value.phone,
                phone_additional: value.phone_additional,
            }
            let user = await CUser.Add ( fields )

            fields = {
                user_id: fields._id,

                contract_id: value.contract_id,
                hf: value.hf,

                price: price,
                research: arResearch,
                specialist: arSpecialist,

                subdivision: value.subdivision,
                profession: value.profession,
                employment_date: value.employment_date,

                work_place: value.work_place,
                work_experience: value.work_experience,
            }
            let result = await CWorker.Add ( value )

            res.status(200).json({
                code: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RWorker Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}