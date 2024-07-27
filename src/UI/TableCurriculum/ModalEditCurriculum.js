import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateCurriculum } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [Form,setForm] = useState({});
    const [curriculumName,setCurriculumName] = useState("")
    const [description,setDescription] = useState("")
    const [duration,setDuration] = useState("")

const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        console.log("local >>>",localStorage.getItem("access_token"))
        let res = await patchUpdateCurriculum(dataUserEdit.id,localStorage.getItem("access_token"),{
            "curriculumName": curriculumName,
            "duration": duration,
            "description": description
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                id: dataUserEdit.id,
                curriculumName: curriculumName,
                description: description,
                duration: duration,
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
        setCurriculumName(dataUserEdit.curriculumName)
        setDescription(dataUserEdit.description)
        setDuration(dataUserEdit.duration)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Curriculum</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>CurriculumName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={curriculumName}
                            onChange={(event) => setCurriculumName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Duration</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={duration}
                            onChange={(event) => setDuration(event.target.value)}
                        />
                    </div>
                </form>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalEditUser;
