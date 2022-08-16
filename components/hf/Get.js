import React, {useState, useEffect} from 'react'
import axios from "axios"

function Get (props) {

    let [list, setList] = useState([])

    useEffect(() => {
        (async () => {
            await Get()
        })()
    }, [])

    //список договоров
    const Get = async () => {
        const url = '/api/hf/get';

        let result = await axios.get(url);

        result = result.data;

        setList(result.response.items)
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                return <button type="button" className="list-group-item list-group-item-action" key={i} onClick={()=>{props.SelectHf(list)}}>{list.name}</button>
            })}
        </div>
    }

    return (
        <>
            {(list.length) ? List(list) : null}
        </>

    )
}

export default Get

