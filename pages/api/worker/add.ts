import Joi from "joi"
import CWorker from "../../../classes/worker"
import CContract from "../../../classes/contract"
import CContractType from "../../../classes/contract-type"
import CHf from "../../../classes/hf"
import CResearch from "../../../classes/research"
import CSpecialist from "../../../classes/specialist"
import CUser from "../../../classes/user"

export default async (req, res) => {
    let value
    try {
        try {
            req.body.hf_code = req.body.hf_code.replace(/ /gi, '') //удаление пробелов
            req.body.hf_code = req.body.hf_code.split(',') //в массив
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
            let price = 0
            let arResearch = []
            let arSpecialist = []

            //загрузка договора
            let hfContract = await CContract.GetById ([value.contract_id])
            if (!hfContract.length) throw ({code: 30100000, msg: 'Договор не найден'})
            hfContract = hfContract[0]

            //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ОБЩИХ
            //если типы добавлены в контракт
            if (hfContract.type) {
                let arType = await CContractType.GetById(hfContract.type) //загрузка типов

                //добавляем в общему массиву
                for (let hf of arType) {
                    arResearch = [...arResearch, ...hf.research_id]
                    arSpecialist = [...arSpecialist, ...hf.specialist_id]
                }
            }

            //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ВРЕДНЫХ ФАКТОРОВ
            //загрузка кодов
            let arHf = await CHf.GetByCode (value.hf_code)

            //сохраняем каждый из массива вредных факторов
            for (let hf of arHf) {
                arResearch = [...arResearch, ...hf.research_id]
                arSpecialist = [...arSpecialist, ...hf.specialist_id]
            }

            //Оставляем уникальные с прайсами
            arResearch = await CResearch.GetByIdPrice (arResearch)
            arSpecialist = await CSpecialist.GetByIdPrice (arSpecialist)

            //console.log(arResearch)
            //console.log(arSpecialist)

            for (let item of arResearch) {
                if ((item._price) && (item._price[0]))
                    price += item._price[0].price
            }
            for (let item of arSpecialist) {
                if ((item._price) && (item._price[0]))
                    price += item._price[0].price
            }

            //поиск пользователя среди существующих
            let arFields = {
                first_name: value.first_name,
                last_name: value.last_name,
                patronymic_name: value.patronymic_name,
                date_birth: value.date_birth
            }
            let searchUser = await CUser.GetByFields(arFields)

            if (!searchUser) {
                arFields = {
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
                await CUser.Add ( arFields )
            }

            arFields = {
                user_id: searchUser ? searchUser._id : fields._id,

                contract_id: value.contract_id,
                contract_type_id: value.contract_type_id,
                hf_code: value.hf_code,

                price: price,
                research: arResearch,
                specialist: arSpecialist,

                subdivision: value.subdivision,
                profession: value.profession,
                employment_date: value.employment_date,

                work_place: value.work_place,
                work_experience: value.work_experience,
            }
            let result = await CWorker.Add ( arFields )

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