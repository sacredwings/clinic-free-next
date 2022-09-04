import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../../components/template/main"
import contract from "../../../../classes/contract";

export default function ({id}) {
    let [list, setList] = useState([])
    let [request, setRequest] = useState({
        items: [],
        step: 200,
    })
    let [org, setOrg] = useState(null)

    useEffect(() => {
        (async () => {
            await Get(true)
            //await OrgGetById()
        })()
    }, [])

    //список договоров
    const Get = async (start) => {
        const url = '/api/worker/get'
        let fields = {
            params: {
                contract_id: id,
                offset: request.items.length,
                count: request.step
            }
        }
        let result = await axios.get(url, fields)
        setList(prev => (start ? result.data.response.items : [...prev, ...result.data.response.items]))
    }

    //название организации
    const OrgGetById = async () => {
        const url = '/api/org/getById'

        let fields = {
            params: {
                ids: id
            }
        }
        let result = await axios.get(url, fields)
        setOrg(result.data.response)
    }

    const ListCode = (arList) => {
        return arList.map((list, i) => {
            return <span className="badge text-bg-primary" key={i}>{list}</span>
        })
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/contract/${id}/worker`
                return <Link href={href} key={i}><a className="list-group-item list-group-item-action">
                    {list._user_id.first_name} {list._user_id.last_name} {list._user_id.patronymic_name}
                    <br/>
                    {ListCode(list.hf_code)}
                </a></Link>
            })}
        </div>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>{(org) ? org.name : null}</h1>
        <p><Link href={`/contract/${id}/worker/add`}><a className="btn btn-success btn-sm" role="button">Добавить работника</a></Link></p>
        <p>Рабочие: </p>
        {(list.length) ? List(list) : null}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}