import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {fetchAllDepartment, patchUpdateCourse } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';
import Select from 'react-select';

const ModalEditCourse = (props) => {
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [courseName,setCourseName] = useState("")
    const [departmentId,setDepartmentId] = useState(null)
    const [credit,setCredit] = useState(null)
    const [description,setDescription] = useState("")
    const [totalSession,setTotalSession] = useState(null)
    const [listDepartment,setListDepartment] = useState([]);
    useEffect(() => {
        getAllDepartment()
    },[])
    const getAllDepartment = async (page) => {
        const res = await fetchAllDepartment(page,localStorage.getItem("access_token"))
        // console.log("check res >>>",res)
        if(res && res.length > 0){
            let newDepartment = res.map(item => {
                // console.log("item >>>",item)
                return{
                    value: item.id,
                    label: item.name
                }
            })
            setListDepartment(newDepartment)
        }
        // console.log("listDepartment",listDepartment)
    }
const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        let res = await patchUpdateCourse(dataUserEdit.id,localStorage.getItem("access_token"),{
            "courseName": courseName,
            "departmentId": departmentId,
            "credit": credit,
            "description": description,
            "totalSession": totalSession
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                id: dataUserEdit.id,    
                courseName: courseName,
                departmentId: departmentId,
                credit: credit,
                description: description,
                totalSession: totalSession,
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
        setCourseName(dataUserEdit.courseName)
        setDepartmentId(dataUserEdit.departmentId)
        setCredit(dataUserEdit.credit)
        setDescription(dataUserEdit.description)
        setTotalSession(dataUserEdit.totalSession)
    }
},[dataUserEdit])

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sửa khóa học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>Tên khóa học</label>
                        <input
                            type="text"
                            className="form-control"
                            value={courseName}
                            onChange={(event) => setCourseName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Khoa</label>
                        <Select
                        defaultValue={departmentId}
                        options={listDepartment}
                        onChange={(event) => setDepartmentId(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>credit</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={credit}
                            onChange={(event) => setCredit(event.target.value)}
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
                    <div class="form-group">
                        <label>Tổng số buổi</label>
                        <input 
                            value={totalSession}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setTotalSession(event.target.value)}
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
                    Lưu
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalEditCourse;
