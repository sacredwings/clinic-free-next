import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../components/template/main"

export default function () {
    let [list, setList] = useState([])
    let [request, setRequest] = useState([])

    useEffect(() => {
        (async () => {
            await Get(true)
        })()
    }, [])

    const Get = async (start) => {
        const url = '/api/org/get'

        let result = await axios.get(url, {})
        setList(prev => (start ? result.data.response.items : [...prev, ...result.data.response.items]))
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/org-${list._id}/contract`
                return <Link href={href} key={i}>
                    <a className="list-group-item list-group-item-action">{list.name}</a>
                </Link>
            })}
        </div>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>Организации <Link href={`/org/add`}><a className="btn btn-success btn-sm"  role="button">+</a></Link></h1>
        {(list.length) ? List(list) : null}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {}
    }
}