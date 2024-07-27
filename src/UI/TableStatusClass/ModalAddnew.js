import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateStatusClass } from '../../services/UserServices';
import { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import Select from 'react-select';

const ModalAddnew = (props) => {
    const {show, handleClose} = props
    const [Form,setForm] = useState({})
    const [statusClass,setStatusClass] = useState("")
    const [description,setDescription] = useState("")
    const onChangeHandler = (event) => {
        setForm({
            ...Form,
            [event.target.name]:event.target.value
        })
        
    }
    const handleSaveCourse = async () => {
        if (statusClass === '') {
            toast.error("Vui lòng điền thông tin tên trạng thái lớp học!");
            return;
        }
        console.log(Form)
        let res = await PostCreateStatusClass({
            "statusClass" :statusClass,
            "description" :description,
        },localStorage.getItem("access_token"));
        console.log("check res ==> ", res)
        if(res){
            handleClose();
            toast.success("A user created succeed!")
        }
        else{
            toast.error("An ERROR...  ")
            handleClose();
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm mới trạng thái lớp học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>Tên trạng thái*</label>
                        <input
                            name='statusClass'
                            type="text"
                            className="form-control"
                            onChange={(event) => setStatusClass(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Mô tả</label>
                        <input 
                            name='description'
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
                <Button variant="primary" onClick={() => handleSaveCourse()}>
                    Lưu
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
