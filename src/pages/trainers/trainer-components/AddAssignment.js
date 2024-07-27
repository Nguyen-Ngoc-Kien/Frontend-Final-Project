import { useEffect, useState } from 'react';
import { fetchAllLevel, postCreateAssignment } from '../../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const AddAssignment = (props) => {
    const [topicId,setTopicId] = useState(localStorage.getItem("idTopic"))
    const [name,setName] = useState('');
    const [timeStart,setTimeStart] = useState(null);
    const [timeEnd,setTimeEnd] = useState(null);
    const [dueAt,setDueAt] = useState(null);
    const [weight,setWeight] = useState(null);
    const [description,setDescription] = useState('');
    const [instruction,setInstruction] = useState('');
    const [assignmentFile,setAssignmentFile] = useState(null);
    // const [type,setType] = useState('EASY');
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; 
        console.log("file >>>",selectedFile)
        setAssignmentFile(selectedFile);
      };
    const handleSubmitQuiz =  async() => {
        if(!name || !timeStart || !timeEnd || !dueAt || !weight || !assignmentFile){
            toast.error("Required Fill On Full Information")
            return;
        }
        if(weight < 0 || weight > 1){
            toast.error("Required Weight from 0.0 to 1.0")
            return;
        }
        const file = new FormData();
        file.append('assignmentFile', assignmentFile);
        file.append('topicId', topicId);
        file.append('name', name);
        file.append('startAt', timeStart);
        file.append('endAt', timeEnd);
        file.append('dueAt', dueAt);
        file.append('weight', weight);
        file.append('description', description);
        file.append('instruction', instruction);
        console.log("file >>>",file)
        let res = await postCreateAssignment(file,localStorage.getItem("access_token"))
        console.log("check res ass >>>", res)
        if(res){
            toast.success("Create Success")
            setName('')
            setTopicId(0)
            setTimeStart(null)
            setTimeEnd(null)
            setDueAt(null)
            setWeight(0)
            setDescription('')
            setInstruction('')
            setAssignmentFile(null)
        }
        console.log("check res >>>",res)
    }
    return(
        <div className='container'>
            <div className="quiz-container-manager">
                <div className="title-quiz-manager">
                    Quản lý bài tập lớn
                </div>
                <hr/>
                <div className="add-new">

                <fieldset className="border rounded-3 p-3" >
                    <legend className="float-none w-auto px-3">Thêm mới bài tập lớn</legend>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your Assignment Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}                  
                    />
                    <label>Tên bài tập lớn*</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Weight"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}    
                    />
                    <label >Trọng số điểm(trong khoảng 0.0 đến 1.0)*</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}    
                    />
                    <label >Mô tả</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="instruction"
                    value={instruction}
                    onChange={(event) => setInstruction(event.target.value)}    
                    />
                    <label >Hướng dẫn</label>
                </div>
                <div className="form-floating mb-3 three-layer">
                    <div className='time'>
                    <label >Thời gian bắt đầu*</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="StartAt"
                        value={timeStart}
                        onChange={(event) => setTimeStart(event.target.value)}    
                        />
                    </div>
                    <div className='time'>
                    <label >Thời gian kết thúc*</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="EndAt"
                        value={timeEnd}
                        onChange={(event) => setTimeEnd(event.target.value)}    
                        />
                    </div>
                    <div className='time'>
                    <label >Thời gian gia hạn thêm*</label>
                        <input 
                        type="datetime-local" 
                        className="form-control" 
                        placeholder="dueAt"
                        value={dueAt}
                        onChange={(event) => setDueAt(event.target.value)}    
                        />
                    </div>
                </div>
                <div className='mt-4'>
                <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange}
                />
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className="form-floating mb-3">
                </div>
                <div className='my-3'>
                </div>
                <div className='mt-3'>
                    <button 
                    className='btn btn-warning' 
                    onClick={() => handleSubmitQuiz()}
                    >Lưu</button>
                </div>
                </fieldset>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>

    )
}

export default AddAssignment;