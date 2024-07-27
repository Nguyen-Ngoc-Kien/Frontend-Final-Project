import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PostCreateUser, fetchAllDepartment, fetchAllJob } from '../../services/UserServices';
import { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
import Select from 'react-select';

const ModalAddnew = (props) => {     
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
    const {show, handleClose} = props
    const [listDepartment,setListDepartment] = useState([]);
    const [listJob,setListJob] = useState([]);
    // const [listRole,setListRole] = useState([]);
    // const [listGender,setListGender] = useState([]);
    const [departmentId,setDepartmentId] = useState(null);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("");
    const [jobId,setJobId] = useState("");
    const [gender,setGender] = useState("");
    const [image,setImage] = useState("");
    const [dob,setDob] = useState("");
    
    useEffect(() => {
        getJobs()
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
    // const onChangeHandler = (event,targetName) => {
    //     setForm({
    //         ...Form,
    //         [event.target.name]:event.target.value
    //     })
    // }


    const handleSaveUser = async () => {
        let res = await PostCreateUser({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "password": password,
            "role": role,
            "jobId": jobId,
            "gender": gender,
            "image": image,
            "dob": dob,
            "departmentId": departmentId
        },localStorage.getItem("access_token"),departmentId);
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
    const handleSelectDepartment = (event) => {
        setDepartmentId(event.value);
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                <form>
                    <div class="form-group">
                        <label>First Name</label>
                        <input
                            name='firstName'
                            type="text"
                            className="form-control"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input
                            name='lastName'
                            type="text"
                            className="form-control"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input 
                            name='email'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Department</label>
                        <Select
                        options={listDepartment}
                        onChange={(event) => setDepartmentId(event.value)}
                        />
                    </div>                        
                    <div class="form-group">
                        <label>Phone</label>
                        <input 
                            name='phone'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input 
                            name='password'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <Select
                        options={listRole}
                        onChange={(event) => setRole(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Job</label>
                        <Select
                        options={listJob}
                        onChange={(event) => setJobId(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <Select
                        options={listGender}
                        onChange={(event) => setGender(event.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Image</label>
                        <input 
                            name='image'
                            type="text" 
                            className="form-control"
                            onChange={(event) => setImage(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label>Date Of Birth</label>
                        <input 
                            name='dob'
                            type="date" 
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
                <Button variant="primary" onClick={() => handleSaveUser()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default ModalAddnew;
