import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateCurriculum } from '../../services/UserServices';
import { useState } from 'react';
import {toast } from 'react-toastify';


const ModalAddnew = (props) => {
    const {show, handleClose} = props
    const [Form,setForm] = useState({})
    
    const onChangeHandler = (event) => {
        setForm({
            ...Form,
            [event.target.name]:event.target.value
        })
    }

    const handleSaveUser = async () => {
        if (!Form.curriculumName) {
            toast.error("Vui lòng điền tên khung chương trình!");
            return;
        }
        if (!Form.duration) {
            toast.error("Vui lòng điền thời gian học!");
            return;
        }
        console.log(Form)
        let res = await PostCreateCurriculum(Form,localStorage.getItem("access_token"));
        console.log("check res ==> ", res)
        if(res){
            handleClose();
            toast.success("A user created succeed!")
        }
        else{
            toast.error("An ERROR...  ")
            handleClose();
            //error
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm mới khung chương trình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>Tên khung chương trình*</label>
                        <input
                            name='curriculumName'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Thời gian học*</label>
                        <input
                            name='duration'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Mô tả</label>
                        <input 
                            name='description'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Lưu
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
