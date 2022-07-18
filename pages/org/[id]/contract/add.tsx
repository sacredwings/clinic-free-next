import React, {useState, useEffect} from 'react'
import axios from "axios"
import TemplatesMain from "../../../../components/template/main"

export default function ({id}) {
    const formDefault = {
        name: '',
        date_from: '',
        date_to: ''
    }

    let [form, setForm] = useState(formDefault)
    let [formResult, setFormResult] = useState(null)

    //const { paramsId } = useParams()

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const Default = (err) => {
        setForm(prev => (formDefault))
    }


    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        const url = '/api/contract/add'

        //добавляем поля
        let fields = form
        fields.org_id = id

        let result = await axios.post(url, fields)
        if (result.data.code)
            setFormResult(false)
        else
            setFormResult(true)

    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">Новый договор</div>
                <div className="card-body">
                    {(formResult === false) ? AddErr() : null}
                    {/* <div className="mb-3 row">
                        <label htmlFor="code" className="col-sm-2 col-form-label">Код</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="code" value={form.code} onChange={onChangeText}/></div>
                    </div> */}

                    <div className="mb-3 row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.name} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_from" className="col-sm-2 col-form-label">C</label>
                        <div className="col-sm-10"><input type="date" className="form-control" id="date_from" value={form.date_from} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="date_to" className="col-sm-2 col-form-label">До</label>
                        <div className="col-sm-10"><input type="date" className="form-control" id="date_to" value={form.date_to} onChange={onChangeText}/></div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Цена за человека</label>
                        <div className="col-sm-10"><input type="text" className="form-control" id="price" value={form.price} onChange={onChangeText}/></div>
                    </div>

                    <button type="submit" className="btn btn-primary">Добавить</button>

                </div>
            </div>
        </form>

    }

    const AddErr = () => {
        return <div className="alert alert-danger">
            Не удалось добавить
        </div>
    }
    const AddNoErr = () => {
        return <div className="alert alert-success">
            Добавлено
        </div>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>Новый договор</h1>
        {formResult ? AddNoErr() : Form()}
    </TemplatesMain>

}
export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}