import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {patchUpdateUser, fetchAllJob } from '../../services/UserServices';
import { useState, useEffect } from 'react';
import {toast } from 'react-toastify';
import Select from 'react-select';

const ModalEditUser = (props) => {
    const listRole = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'UPPER', label: 'Upper' },
        { value: 'TRAINER', label: 'Trainer' },
        { value: 'TRAINEE', label: 'Trainee' },
      ];
    const listGender = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];
    const {show, handleClose, dataUserEdit,handleEditUserFromModal} = props
    const [listJob,setListJob] = useState([])
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [role,setRole] = useState("")
    const [jobId,setJobId] = useState("")
    const [gender,setGender] = useState("")
    const [image,setImage] = useState("")
    const [dob,setDob] = useState("")
    const [phone,setPhone] = useState("")


const handleEditUser = async () => {
        console.log("Datauseredit >>>>", dataUserEdit)
        console.log("local >>>",localStorage.getItem("access_token"))
        let res = await patchUpdateUser(dataUserEdit.id,localStorage.getItem("access_token"),{
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "role": role,
            "jobId": jobId,
            "gender": gender,
            "image": image,
            "dob": dob,
            "phone": phone
        })
        console.log("Check res>>> ",res)
        if(res){
            handleEditUserFromModal({
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                jobId: jobId,
                gender: gender,
                image: image,
                dob: dob,
                id: dataUserEdit.id
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
    getJobs();
    if(show){
        console.log("Data User Edit>>>>",dataUserEdit)
        setFirstName(dataUserEdit.firstName)
        setLastName(dataUserEdit.lastName)
        setEmail(dataUserEdit.email)
        setRole(dataUserEdit.role)
        setJobId(dataUserEdit.jobId)
        setGender(dataUserEdit.gender)
        setImage(dataUserEdit.image)
        setPhone(dataUserEdit.phone)
        setDob(dataUserEdit.dob)
    }
},[dataUserEdit])
    const getJobs = async (page) => {
        let res = await fetchAllJob(page,localStorage.getItem("access_token"));
        console.log("res job>>>",res)
        if(res && res.length > 0){
            let newJob = res.map(item => {
                console.log("item job >>>",item)
                return{
                    value: item.id,
                    label: item.jobName
                }
            })
            setListJob(newJob)
        }

        // console.log(">>> Check listuser ", listUser)
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>FirstName</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>LastName</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input 
                            value={phone}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <Select
                        placeholder={role}
                        defaultValue={role}
                        options={listRole}
                        onChange={(event) => setRole(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Job</label>
                        <Select
                        placeholder={listJob.label}
                        defaultValue={jobId}
                        options={listJob}
                        onChange={(event) => setJobId(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <Select
                        placeholder={gender}
                        defaultValue={gender}
                        options={listGender}
                        onChange={(event) => setGender(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input 
                            value={image}
                            type="text" 
                            className="form-control"
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Date Of Birth</label>
                        <input 
                            value={dob}
                            type="Date" 
                            className="form-control"
                            onChange={(event) => setDob(event.target.value)}
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
