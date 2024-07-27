import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {toast } from 'react-toastify';
import { deleteUser } from '../../services/UserServices';

const ModalConfirm = (props) => {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props
    
const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id,localStorage.getItem("access_token"));
    console.log("Check res delete >>>",res)
    if (res === true){
        toast.success("Delete User Success")
        handleClose()
        handleDeleteUserFromModal(dataUserDelete)
    }
    else{
        toast.error("Error Delete User")
        handleClose()
    }
    console.log("check res = ",res); 
}
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Xóa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    Hành động không thể hoàn tác
                    <br></br>
                    Xác nhận xóa người dùng,<br></br>  <b> Tên người dùng :{" " + dataUserDelete.firstName + " " + dataUserDelete.lastName}</b>
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
