import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateQuiz } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';


const ModalEditQuiz = (props) => {
    const {show, handleClose, dataQuizEdit,handleEditQuizFromModal} = props
    const [quizName,setQuizName] = useState("")


const handleEditUser = async () => {
        console.log("dataQuizEdit >>>>", dataQuizEdit)
        let res = await patchUpdateQuiz(dataQuizEdit.id,localStorage.getItem("access_token"),{
            "quizName": quizName
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditQuizFromModal({
                quizName: quizName,
                id: dataQuizEdit.id
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
        console.log("Data Quiz Edit>>>>",dataQuizEdit)
        setQuizName(dataQuizEdit.quizName)
    }
},[dataQuizEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>quizName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={quizName}
                            onChange={(event) => setQuizName(event.target.value)}
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

export default ModalEditQuiz;
