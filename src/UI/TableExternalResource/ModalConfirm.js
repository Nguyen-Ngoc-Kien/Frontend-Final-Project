import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {toast } from 'react-toastify';
import { deleteExternalResource } from '../../services/UserServices';

const ModalConfirm = (props) => {
    const {show, handleClose, dataAssignmentDelete, handleDeleteExternalResourceFromModal} = props
    
const confirmDelete = async () => {
    let res = await deleteExternalResource(dataAssignmentDelete.id,localStorage.getItem("access_token"));
    console.log("Check res delete >>>",res)
    console.log("dataAssignmentDelete >>>",dataAssignmentDelete)
    if (res === true){
        toast.success("Delete Quiz Success")
        handleClose()
        handleDeleteExternalResourceFromModal(dataAssignmentDelete)
    }
    else{
        toast.error("Error Delete Quiz")
        handleClose()
    }
    console.log("check res = ",res); 
}
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Xóa tài liệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    Hành động không thể hoàn tác
                    <br></br>
                    Xác nhận xóa tài liệu,<br></br>  <b> tên: {" " + dataAssignmentDelete.name}</b>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalConfirm;
