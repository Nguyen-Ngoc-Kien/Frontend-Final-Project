import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {toast } from 'react-toastify';
import { deleteClass } from '../../services/UserServices';

const ModalConfirm = (props) => {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props
    
const confirmDelete = async () => {
    let res = await deleteClass(dataUserDelete.id,localStorage.getItem("access_token"));
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
                <Modal.Title>Delete A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    this action can't be undone!
                    <br></br>
                    Are you sure to delete this user,<br></br>  <b> Name ={" " + dataUserDelete.firstName + " " + dataUserDelete.lastName}</b>
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
