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
    let styleColLeft = {
        width: '50%',
        float: 'left'
    }
    let styleColRight = {
        width: '50%',
        float: 'right'
    }

    return <>
        <div style={styleRow}>
            <div style={styleColLeft}>
                {Left()}
            </div>
            <div style={styleColRight}>
                {Right()}
            </div>
        </div>
    </>
}

const Left = () => {
    let styleText1 = {
        paddingTop: '15px',
        fontWeight: 'bold',
        margin: 0,
        fontSize: '16px',
    }
    let styleText2 = {
        fontWeight: 'bold',
        margin: 0,
        fontSize: '16px',
    }
    let styleText3 = {
        margin: 0,
        fontSize: '16px',
    }

  return <>
      <p style={styleText2}>Осмотр гинеколога</p>
      <p style={styleText3}>Менструация с ______ лет, регулярные / нерегулярные</p>
      <p style={styleText3}>П/М _______________________________________________________</p>
      <p style={styleText3}>Б- _____, Р- _____, А- ______, В- ______</p>
      <p style={styleText3}>Оперативные вмешательства __________________________________</p>
      <p style={styleText3}>НПО _______________________________________________________</p>
      <p style={styleText3}>Шейка матки ________________________________________________</p>
      <p style={styleText3}>Тело матки __________________________________________________</p>
      <p style={styleText3}>Придатки ___________________________________________________</p>
      <p style={styleText3}>Молочные железы ___________________________________________</p>
      <p style={styleText3}>Заключение _________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>

      <p style={styleText2}>Осмотр стоматолога</p>
      <p style={styleText3}>___________________________________________________________</p>

      <p style={styleText2}>Осмотр психиатра/нарколога</p>
      <p style={styleText3}>___________________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>


      <p style={styleText1}>ЗАКЛЮЧЕНИЕ</p>
      <p style={styleText3}>Диагноз: ___________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>
      <p style={styleText3}>Абсолютный ССР:  низкий,  умеренный,  высокий,  очень высокий</p>
      <p style={styleText3}>Относительный ССР:  низкий,  умеренный,  высокий,  очень высокий</p>
      <p style={styleText3}>Группа здоровья: 	1	2	3а	3б</p>
      <p style={styleText3}>Противопоказания к работе: 	не выявлены		выявлены</p>
      <p style={styleText3}>___________________________________________________________</p>


      <p style={styleText1}>РЕКОМЕНДАЦИИ:</p>
      <p style={styleText3}>___________________________________________________________</p>
      <p style={styleText3}>___________________________________________________________</p>
      <br/>
      <p style={styleText3}>Председатель ВК</p>
      <p style={styleText3}>___________________________________________________________</p>

      {/* Другая страница */}
      <p style={styleText2}>Осмотр терапевта</p>
      <p style={styleText3}>Анамнез ____________________________________________________</p>
      <p style={styleText3}>Кожные покровы ____________________________________________</p>
      <p style={styleText3}>Легкие: дыхание _____________________________________________</p>
      <p style={styleText3}>Сердце: АД ______________________ PS ________________________</p>
      <p style={styleText3}>Тоны _______________________________________________________</p>
      <p style={styleText3}>Живот ______________________________________________________</p>
      <p style={styleText3}>Печень _____________________________________________________</p>
      <p style={styleText3}>Физиологические отправления _________________________________</p>
      <p style={styleText3}>Заключение: _________________________________________________</p>
      <p style={styleText3}>____________________________________________________________</p>
      <p style={styleText3}></p>
      <p style={styleText3}></p>

      <p style={styleText2}>Осмотр невропатолога</p>
      <p style={styleText3}>Анамнез ____________________________________________________</p>
      <p style={styleText3}>Менингеальные явления ______________________________________</p>
      <p style={styleText3}>Ч/м нервы ___________________________________________________</p>
      <p style={styleText3}>Сухожильные рефлексы _______________________________________</p>
      <p style={styleText3}>Чувствительность ____________________________________________</p>
      <p style={styleText3}>Координация ________________________________________________</p>
      <p style={styleText3}>Расстройства движений _______________________________________</p>
      <p style={styleText3}>Вегетативная н. с. ____________________________________________</p>
      <p style={styleText3}>Периферическая н. с. __________________________________________</p>
      <p style={styleText3}>____________________________________________________________</p>
      <p style={styleText3}>Заключение: _________________________________________________</p>
      <p style={styleText3}>____________________________________________________________</p>

      <p style={styleText2}>Осмотр офтальмолога</p>
      <p style={styleText3}>Анамнез ____________________________________________________</p>
      <p style={styleText3}>Визометрия: OD ____OS ______с коррекцией: OD ______OS ________</p>
      <p style={styleText3}>Офтальмоскопия _____________________________________________</p>
      <p style={styleText3}>Биомикроскопия глаза ________________________________________</p>
      <p style={styleText3}>Рефрактометрия _____________________________________________</p>
      <p style={styleText3}>Цветоощущение _____________________________________________</p>
      <p style={styleText3}>Периметрия _________________________________________________</p>
      <p style={styleText3}>Заключение: _________________________________________________</p>
      <p style={styleText3}>____________________________________________________________</p>
  </>
}

const Right = () => {
    let styleHeader = {
        fontWeight: 'bold',
        margin: 0,
        fontSize: '20px',
    }
    let styleHeaderRight = {...styleHeader,
        paddingLeft: '350px'
    }

    let styleOrg = {
        fontWeight: 'bold',
        margin: 0,
        fontSize: '20px',
        textAlign: 'center',
    }

    let styleH1 = {
        fontWeight: 'bold',
        margin: 0,
        fontSize: '28px',
        textAlign: 'center',
    }

    let styleText2 = {
        fontWeight: 'bold',
        margin: 0,
        fontSize: '16px',
    }
    let styleText3 = {
        margin: 0,
        fontSize: '16px',
    }
    return <>
        <p style={styleHeader}>Дата выдачи результата</p>
        <p style={styleHeaderRight}>Номер телефона</p>
        <p style={styleHeaderRight}>_______________</p>
        <p style={styleHeader}>ФЛГ №</p>
        <p style={styleHeader}>дата:</p>
        <p style={styleHeaderRight}>ЭКГ</p>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <p style={styleOrg}>ООО «ПУЛЬСАР»</p>
        <br/>
        <p style={styleH1}>КАРТА»</p>
        <br/>
        <br/>
        <p style={styleText3}>предварительного \ периодического медицинского осмотра»</p>
        <br/>
        <p style={styleText3}>Фамилия ______________________________________________________</p>
        <p style={styleText3}>Имя __________________________________________________________</p>
        <p style={styleText3}>Отчество ______________________________________________________</p>
        <p style={styleText3}>Дата рождения _________________________________________________</p>
        <p style={styleText3}>Место работы__________________________________________________</p>
        <p style={styleText3}>Структурное подразделение _____________________________________</p>
        <p style={styleText3}>Должность ____________________________________________________</p>
        <p style={styleText3}>Вредные производственные факторы: _____________________________</p>
        <p style={styleText3}>______________________________________________________________</p>
        <p style={styleText3}>______________________________________________________________</p>
        <p style={styleText3}>______________________________________________________________</p>

        <br/>
        <br/>
        <br/>

        {/* Другая страница */}

        <p style={styleText2}>Осмотр отоларинголога</p>
        <p style={styleText3}>Анамнез ______________________________________________________</p>
        <p style={styleText3}>Отоскопия ______________________ш. речь: прав. ________ лев. ______</p>
        <p style={styleText3}>Риноскопия ___________________________________________________</p>
        <p style={styleText3}>Ларингоскопия ________________________________________________</p>
        <p style={styleText3}>Фарингоскопия ________________________________________________</p>
        <p style={styleText3}>Вестибулярный аппарат _________________________________________</p>
        <p style={styleText3}>Заключение ____________________________________________________</p>
        <p style={styleText3}>_______________________________________________________________</p>

        <p style={styleText2}>Осмотр хирурга</p>
        <p style={styleText3}>Анамнез _______________________________________________________</p>

        <p style={styleText3}>Кожные покровы ________________________________________________</p>
        <p style={styleText3}>Лимфоузлы _____________________________________________________</p>
        <p style={styleText3}>Щитовидная железа ______________________________________________</p>
        <p style={styleText3}>Опорно-двиг. аппарат ____________________________________________</p>
        <p style={styleText3}>Периферич. сосуды ______________________________________________</p>
        <p style={styleText3}>Живот _________________________________________________________</p>
        <p style={styleText3}>Заключение ____________________________________________________</p>
        <p style={styleText3}>_______________________________________________________________</p>

        <p style={styleText2}>Осмотр дерматовенеролога</p>
        <p style={styleText3}>Анамнез _______________________________________________________</p>
        <p style={styleText3}>Видимые слизистые (розовые, гиперемированы, чистые, изменены)</p>
        <p style={styleText3}>Волосистая часть головы: кожа (сухая, чистая, нормальная, измененная)</p>
        <p style={styleText3}>_______________________________________________________________</p>
        <p style={styleText3}>Лимфатические узлы _____________________________________________</p>
        <p style={styleText3}>Кожные покровы: цвет ________________, эластичные, чистые, изменены</p>
        <p style={styleText3}>Лицо___________________________________________________________</p>
        <p style={styleText3}>Туловище ______________________________________________________</p>
        <p style={styleText3}>Верхние конечности _____________________________________________</p>
        <p style={styleText3}>Нижние конечности _____________________________________________</p>
        <p style={styleText3}>Ногти _________________________________________________________</p>
        <p style={styleText3}>Заключение _____________________________________________________</p>
        <p style={styleText3}>________________________________________________________________</p>
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