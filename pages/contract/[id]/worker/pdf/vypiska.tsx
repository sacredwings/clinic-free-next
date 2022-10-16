import React, {useState, useEffect} from 'react'
import {componentToPDFBuffer} from '../../../../../components/pdf'
import axios from "axios"
import Config from "../../../../../config.json";

export default function () {
    return <></>
}

const Page = (worker) => {
    let styleRow = {
        overflow: 'hidden'
    }
    let style1 = {
        width: '50%',
        float: 'left'
    }
    let style2 = {
        width: '50%',
        float: 'right'
    }

    let date = new Date()
    let dateText = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    return <>
        <div style={styleRow}>
            <div style={style1}>
                {Left()}
            </div>
            <div style={style2}>
                {Right()}
            </div>
        </div>
    </>
}

const Left = () => {
    return <>
        10. Результаты функциональных исследований

    </>
}

const Right = () => {
    return <>
        Министерство здравоохранения и социального развития
        Российской Федерации

        ООО «ПУЛЬСАР»
        633208, г. Искитим, ул. Комсомольская, 44


        ВЫПИСКА ИЗ АМБУЛАТОРНОЙ КАРТЫ
        «__»____________ 20__г.
        (дата оформления)



        1. Фамилия Имя Отчество _______________________________________
        2. Пол:	М	Ж	3. Дата рождения _______________________
        4. Адрес регистрации по месту жительства _________________________
        ______________________________________________________________
        5. Наименование работодателя ___________________________________
        6. Профессия __________________________________________________

    </>
}


const GetById = async (id) => {
    const url = `${Config.server.url}/api/worker/getById`
    let fields = {
        params: {
            ids: id,
        }
    }
    let result = await axios.get(url, fields)
    return result.data.response
}

export async function getServerSideProps ({query, req, res}) {

    let worker = await GetById(query.id)
    let buffer = await componentToPDFBuffer({
        component: Page(worker.items[0]),
        orientation: 'landscape'

    })

    // with this header, your browser will prompt you to download the file
    // without this header, your browse will open the pdf directly
    //res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
    res.setHeader('Content-disposition', 'inline ; filename="article.pdf');

    // set content type
    res.setHeader('Content-Type', 'application/pdf');

    // output the pdf buffer. once res.end is triggered, it won't trigger the render method
    res.end(buffer);

    return {
        props: {
            worker: worker
        }
    }
}