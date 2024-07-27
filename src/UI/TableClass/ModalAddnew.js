import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateClass } from '../../services/UserServices';
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

    const handleSaveClass = async () => {
        console.log(Form)
        let res = await PostCreateClass(Form,localStorage.getItem("access_token"));
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
                <Modal.Title>Thêm mới lớp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>ID lớp học</label>
                        <input
                            name='courseId'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Tên lớp học</label>
                        <input
                            name='className'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>TrainerID</label>
                        <input
                            name='trainerId'
                            type="text"
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input 
                            name='startDate'
                            type="Date" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input 
                            name='endDate'
                            type="Date" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>                        
                    <div class="form-group">
                        <label>Min Quantity</label>
                        <input 
                            name='minQuantity'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Max Quantity</label>
                        <input 
                            name='maxQuantity'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>schedules</label>
                        <input 
                            name='schedules'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>Trainees</label>
                        <input 
                            name='trainees'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div class="form-group">
                        <label>allowedRegister</label>
                        <select 
                            name='allowedRegister'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        >
                            <option value="1">true</option>
                            <option value="0">False</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>status</label>
                        <select 
                            name='status'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        >
                            <option value="AWAITING_APPROVAL">AWAITING_APPROVAL</option>
                            <option value="OPENING_REGISTER">OPENING_REGISTER</option>
                            <option value="COMING_SOON">COMING_SOON</option>
                            <option value="ON_GOING">ON_GOING</option>
                            <option value="CLOSED">CLOSED</option>
                            <option value="REJECTED">REJECTED</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>curriculumId</label>
                        <input 
                            name='curriculumId'
                            type="text" 
                            className="form-control"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveClass()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
