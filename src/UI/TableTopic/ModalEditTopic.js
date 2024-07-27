import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateTopicCourse } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [Form,setForm] = useState({});
    const [courseId,setCourseId] = useState("")
    const [topicName,setTopicName] = useState("")
    const [topicNo,setTopicNo] = useState("")
    const [description,setDescription] = useState("")
    const [topicWeight,setTopicWeight] = useState("")
    const [quizWeight,setQuizWeight] = useState("")
    const [assignmentWeight,setAssignmentWeight] = useState("")

const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        // console.log("local >>>",localStorage.getItem("access_token"))
        let res = await patchUpdateTopicCourse(dataUserEdit.id,localStorage.getItem("access_token"),{
            "courseId": courseId,
            "topicName": topicName,
            "topicNo": topicNo,
            "description": description,
            "topicWeight": topicWeight,
            "quizWeight": quizWeight,
            "assignmentWeight": assignmentWeight           
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                id: dataUserEdit.id,
                courseId: courseId,
                topicName: topicName,
                topicNo: topicNo,
                description: description,
                topicWeight: topicWeight,
                quizWeight: quizWeight,
                assignmentWeight: assignmentWeight,
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
        setCourseId(dataUserEdit.courseId)
        setTopicName(dataUserEdit.topicName)
        setTopicNo(dataUserEdit.topicNo)
        setDescription(dataUserEdit.description)
        setQuizWeight(dataUserEdit.quizWeight)
        setTopicWeight(dataUserEdit.topicWeight)
        setAssignmentWeight(dataUserEdit.assignmentWeight)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>courseId</label>
                        <input
                            type="text"
                            className="form-control"
                            value={courseId}
                            onChange={(event) => setCourseId(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>topicName</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={topicName}
                            onChange={(event) => setTopicName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>topicNo</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={topicNo}
                            onChange={(event) => setTopicNo(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>description</label>
                        <input 
                            value={description}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>topicWeight</label>
                        <input 
                            value={topicWeight}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setTopicWeight(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>quizWeight</label>
                        <input 
                            value={quizWeight}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setQuizWeight(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>assignmentWeight</label>
                        <input 
                            value={assignmentWeight}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setAssignmentWeight(event.target.value)}
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
