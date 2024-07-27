import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { patchUpdateStatusClass } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';

const ModalEditCourse = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [statusClass,setStatusClass] = useState("")
    const [description,setDescription] = useState("")
const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        let res = await patchUpdateStatusClass(dataUserEdit.id,localStorage.getItem("access_token"),{
            "statusClass": statusClass,
            "description": description,
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                id: dataUserEdit.id,    
                statusClass: statusClass,
                description: description,
            })
            toast.success("Update Success")
            // success
        }
        else{
            toast.error("Error Update")
            //error
        }
    }

useEffect(() => {
    if(show){
        console.log("Data User Edit>>>>",dataUserEdit)
        setStatusClass(dataUserEdit.statusClass)
        setDescription(dataUserEdit.description)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sửa trạng thái lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>Tên trạng thái</label>
                        <input
                            type="text"
                            className="form-control"
                            value={statusClass}
                            onChange={(event) => setStatusClass(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Mô tả</label>
                        <input 
                            value={description}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalEditCourse;
