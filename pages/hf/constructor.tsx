import React, {useState, useEffect} from 'react'
import Hf from '../../components/hf/Get'
import SpecialistGet from '../../components/specialist/Get'
import ResearchGet from '../../components/research/Get'
import TemplatesMain from "../../components/template/main"

export default function () {
    let [selectHf, setSelectHf] = useState(null)

    //выбран вредный фактор
    const SelectHf = (hf) => {
        setSelectHf(hf)
    }

    return <TemplatesMain title={'Конструктор вредных факторов'}>
        <div className="row">
            <div className="col-6">
                <Hf SelectHf={SelectHf}/>
            </div>
            <div className="col-6">
                <SpecialistGet selectHf={selectHf}/>
                <hr/>
                <ResearchGet selectHf={selectHf}/>
            </div>
        </div>
    </TemplatesMain>
}

/*



 */