import React, {useState, useEffect} from 'react'
import axios from "axios"
import Add from "./Add"

function Get ({selectHf, module}) {

    let [list, setList] = useState([])
    let [edit, setEdit] = useState(null)
    let [listCheck, setListCheck] = useState([])
    let [selectHfId, setSelectHfId] = useState([])

    useEffect( () => {
        (async () => {
            await Get()
        })()
    }, [])

    useEffect(() => {
        (async () => {
            console.log(listCheck)
        })()
    }, [listCheck])

    useEffect(() => {
        (async () => {
            if (!selectHf) return false
            if (!list) return false
            setSelectHfId(selectHf._id)

            await ListCheck(list, selectHf.specialist_id)
        })()
    }, [selectHf, list])

    const ListCheck = async (list, hfList) => {
        if (!hfList) hfList=[]
        let newList = list.map((elementList, i) => {
            for (let hf of hfList) {
                if (elementList._id === hf)
                    return {
                        checked: true,
                        _id: elementList._id,
                        name: elementList.name,
                        _price: elementList._price
                    }
            }

            return {
                checked: false,
                _id: elementList._id,
                name: elementList.name,
                _price: elementList._price
            }

        })

        setListCheck(newList)
    }

    //список договоров
    const Get = async () => {
        const url = '/api/specialist/get'

        let result = await axios.get(url)

        result = result.data

        setList(result.response.items)
    }

    //список договоров
    const Update = (id) => {
        const url = '/api/specialist/update-hf'

        let arFields = {
            hf_id: selectHfId,
            id: id,
            module: module
        }
        let result = axios.post(url, arFields)
    }

    const OnChange = (id) => {
        let newListCheck = listCheck.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            return element
        })

        setListCheck(newListCheck)

        Update(id)
    }

    //список договоров
    const UpdatePrice = () => {
        const url = '/api/price/add'

        let arFields = {
            id: edit.id,
            price: edit.price
        }
        setEdit(null)
        let result = axios.post(url, arFields)
    }

    const OnChangePrice = (e) => {
        let id = e.target.id
        let value = e.target.value

        setEdit({
            id: id,
            price: value
        })
/*
        let newList = list.map((item, i)=>{
            if (item._id === name) {
                console.log(item._price)
                if (item._price)
                    item._price.unshift({
                        price: value
                    })
                else
                    item._price[0] = {
                        price: value
                    }
            }

            return item
        })
        setList(newList)*/
    }

    const form = (arCheck) => {

        return <form>
            <div className="mb-3">
                {arCheck.map((list, i) => {
                    let priceEdit = ''
                    if ((edit) && (edit.price)) priceEdit = edit.price

                    let price = ''
                    if ((list._price) && (list._price)) price = list._price.price

                    console.log(list)
                        /*
                        return <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" value="" checked={list.checked} onChange={()=>{OnChange(list._id)}}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {list.name}
                            </label>
                        </div>

                         */
                    return <div className={'row'} key={i}>
                            <div className={'col-6'}>
                                <div className="input-group mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" checked={list.checked} onChange={()=>{OnChange(list._id)}}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {list.name} {price ? price : ''}
                                    </label>
                                </div>
                                </div>
                            </div>


                        {(edit && edit.id === list._id) ? <div className={'col-6'}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" aria-label="" value={priceEdit} id={list._id} onChange={OnChangePrice}/>
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={UpdatePrice}>Сохранить</button>
                                </div>
                            </div> :
                            <div className={'col-6'}>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={()=>{setEdit({id: list._id, price: price})}}>Изменить</button>
                                </div>
                            </div>

                        }



                    </div>
                })}

            </div>
        </form>
    }

    return (
        <>
            <Add />
            {(list.length) ? form(listCheck) : null}
        </>

    )
}

export default Get

