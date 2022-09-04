import React, {useEffect, useRef, useState} from 'react'
import axios from "axios"
import Modal from '../modal'

export default function Add () {
    const [modalShow, setModalShow] = useState(false) //модальное окно

    const handleModalClose = () => {
        setModalShow(false)
    }

    const OnClick = (file) => {
        setModalShow(true)
    }

    function ModalWindow() {
        let modalContent = <>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">+ Вредный фактор</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">

            </div>
        </>
        return Modal({
            show: modalShow,
            content: modalContent
        })
    }

    return <div className={'Add'}>
        <div className="d-grid gap-2">
            <button className="btn btn-success" type="button" onClick={OnClick}> + Добавить</button>
        </div>
        {ModalWindow()}
    </div>
}