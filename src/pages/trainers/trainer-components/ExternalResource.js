import { useEffect, useState } from 'react';
import { postCreateExternalResource } from '../../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const AddAssignment = (props) => {
    const [topicId,setTopicId] = useState(localStorage.getItem("idTopic"))
    const [name,setName] = useState('');
    const [weight,setWeight] = useState(null);
    const [description,setDescription] = useState('');
    const [link,setLink] = useState('');
    const [assignmentFile,setAssignmentFile] = useState(null);
    // const [type,setType] = useState('EASY');
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; 
        console.log("file >>>",selectedFile)
        setAssignmentFile(selectedFile);
      };
    const handleSubmitQuiz =  async() => {
        if(!topicId || !name || !description || !assignmentFile){
            toast.error("Required Fill On Full Information")
            return;
        }
        if(weight < 0 || weight > 1){
            toast.error("Required Weight from 0.0 to 1.0")
            return;
        }
        const file = new FormData();
        file.append('file', assignmentFile);
        file.append('topicId', topicId);
        file.append('name', name);
        file.append('description', description);
        file.append('externalUrl', link);
        console.log("file >>>",file)
        let res = await postCreateExternalResource(file,localStorage.getItem("access_token"))
        console.log("check res ass >>>", res)
        if(res){
            toast.success("Create Success")
            setName('')
            setDescription('')
            setLink('')
            setAssignmentFile(null)
        }
        console.log("check res >>>",res)
    }
    return(
        <div className='container'>
            <div className="quiz-container-manager">
                <div className="title-quiz-manager">
                    Quản lý tài liệu
                </div>
                <hr/>
                <div className="add-new">

                <fieldset className="border rounded-3 p-3" >
                    <legend className="float-none w-auto px-3">Thêm mới tài liệu</legend>
                <div className="form-floating mb-6">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Your External Resource Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}                  
                    />
                    <label>Tên tài liệu*</label>
                </div>
                <div className="form-floating mb-6">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}    
                    />
                    <label>Mô tả</label>
                </div>
                <div className="form-floating mb-6">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="instruction"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}    
                    />
                    <label >Đường dẫn liên kết</label>
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
                    >Save</button>
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