import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {toast } from 'react-toastify';
import { deleteAssignment } from '../../services/UserServices';

const ModalConfirm = (props) => {
    const {show, handleClose, dataAssignmentDelete, handleDeleteAssignmentFromModal} = props
    
const confirmDelete = async () => {
    let res = await deleteAssignment(dataAssignmentDelete.id,localStorage.getItem("access_token"));
    console.log("Check res delete >>>",res)
    console.log("dataAssignmentDelete >>>",dataAssignmentDelete)
    if (res === true){
        toast.success("Delete Quiz Success")
        handleClose()
        handleDeleteAssignmentFromModal(dataAssignmentDelete)
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
                <Modal.Title>Xóa bài tập lớn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    Hành động này không thể hoàn tác
                    <br></br>
                    Xác nhận xóa bài tập lớn,<br></br>  <b> Tên: {" " + dataAssignmentDelete.name}</b>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalConfirm;
