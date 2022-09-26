import React, {useState, useEffect} from 'react'
import {componentToPDFBuffer} from '../../components/pdf'
import './sass.module.sass'

export default function () {
    return <></>
}



const Page = () => {
    let styleH1 = {
        margin: 0,
        fontSize: '32px',
        textAlign: 'center',
        width: '100%'
    }

    let style = {
        margin: 0,
        fontSize: '22px',
        textAlign: 'center',
        width: '500px'
    }
    return <>
        <p style={style}>Министерство здравоохранения и</p>
        <p style={style}>социального развития Российской Федерации</p>
        <p style={style}>ООО "Пульсар"</p>
        <p style={style}>_________________________________________</p>
        <p style={style}>(наименование медицинской организации)</p>
        <p style={style}>НСО  обл. г. Искитим ул. Комсомольская д.44 оф.1</p>
        <p style={style}>_________________________________________</p>
        <p style={style}>(адрес)</p>
        <p style={style}>Код ОГРН: 1    1	0	5	4	7	2	0	0	0	7	8	7</p>

        <br/>
        <br/>

        <h1 style={styleH1}>ЗАКЛЮЧЕНИЕ ПЕРИОДИЧЕСКОГО</h1>
        <h1 style={styleH1}>МЕДИЦИНСКОГО ОСМОТРА (ОБСЛЕДОВАНИЯ)</h1>

        <br/>
        <br/>

        <p>1. Даты выдачи заключения _______________________________</p>
        <p>2. Фамилия, имя, отчество (при наличии) _______________________________</p>
        <p>3. Дата рождения ________________ 4. Пол _______________</p>
        <p>5. Наименование работодателя</p>
        <p>6. Наименование структурного подразделения работодателя (при наличии)</p>
        <p>7. Должность (профессия) или вид работ</p>
        <p>8. Наименование вредного производственного фактора ( -ов) и (или) вида работ:</p>
        <p>9. Результаты периодического осмотра:</p>

        <p>Медицинские противопоказания к работе не выявлены:</p>

        <p>Группа здоровья: ____________________________________________________________</p>
        <p>Председатель врачебной комиссии	/</p>
        <p>(подпись)	(Ф.И.О.)</p>
        <p>М.П. ЛПУ</p>

  </>
}


export async function getServerSideProps ({query, req, res}) {

    let buffer = await componentToPDFBuffer(Page())

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
        }
    }
}