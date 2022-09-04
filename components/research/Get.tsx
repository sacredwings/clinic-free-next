import React, {useState, useEffect} from 'react'
import axios from "axios"
import Add from "./Add"

function Get ({selectHf, module}) {

    let [list, setList] = useState([])
    let [listCheck, setListCheck] = useState([])
    let [selectHfId, setSelectHfId] = useState(null)

    useEffect(() => {
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

            await ListCheck(list, selectHf.research_id)
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
                        name: elementList.name
                    }
            }

            return {
                checked: false,
                _id: elementList._id,
                name: elementList.name
            }

        })

        setListCheck(newList)
    }

    //список договоров
    const Get = async () => {
        const url = '/api/research/get';

        let result = await axios.get(url);

        result = result.data;

        setList(result.response.items)
    }

    //список договоров
    const Update = (id) => {
        const url = '/api/research/update-hf'

        let arFields = {
            hf_id: selectHfId,
            id: id,
            module: module
        }

        let result = axios.post(url, arFields);
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

    const form = (arCheck) => {
        return <form>
            <div className="mb-3">
                {arCheck.map((list, i) => {
                    return <div className="form-check" key={i}>
                        <input className="form-check-input" type="checkbox" value="" checked={list.checked} onChange={()=>{OnChange(list._id)}}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {list.name}
                        </label>
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

