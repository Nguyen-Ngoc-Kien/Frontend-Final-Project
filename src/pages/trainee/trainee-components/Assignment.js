import React, { useEffect, useState } from 'react';
import { fetchAssignmentById, submitAssignment } from '../../../services/UserServices';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Assignment = () => {
    const [toggle, setToggle] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [assignmentFile,setAssignmentFile] = useState(null);
    useEffect(() => {
        getAssignmentById();
    }, []);

    const getAssignmentById = async () => {
        try {
            const res = await fetchAssignmentById(localStorage.getItem("idAssignment"), localStorage.getItem("access_token"));
            console.log("check res123 >>>", res);

            if (res && res.assignmentAttachments) {
                setAssignment(res);

            } else {
                console.error('Empty response or missing assignmentAttachments:', res);
            }
        } catch (error) {
            console.error('Error fetching assignment:', error);
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; 
        console.log("file >>>",selectedFile)
        setAssignmentFile(selectedFile);
        console.log("assignmentFile >>>",assignmentFile)
      };

    const handleSubmitAssignment = async () => {
        const file = new FormData();
        file.append('submissionFile', assignmentFile);
        const res = await submitAssignment(localStorage.getItem("idAssignment"),file,localStorage.getItem("access_token"))
        console.log("res >>>",res)
        if(res && res.assignmentId > 0){
            toast.success("Nộp bài thành công")
        }
        else{
            toast.error("Nộp bài thất bại")
        }
    }
    return (
        <div className='body'>
            <div className='background'>
                <div className='content'>
                    <div className='title-content-assignment'>
                        <div className='icon-background-title'>
                            <i className="fas fa-book"></i>
                        </div>
                        <div className='text-assignment'>
                            <span className='title-span-assignment'>Bài tập lớn</span>
                            <span className='title-span-assignment-2'>Tầm Quan Trọng Của Vệ Sinh Răng Miệng</span>
                        </div>
                    </div>
                    <div className='Link-detail-class-upper w-1347'>
                        Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / Tạo bài tập lớn
                    </div>
                    <div className='layer-top-upper-detail-class'>
                        <Link to='/assignment' className='two-layer-detail-class-upper bg-active'>
                            <i className="fas fa-file-alt course-detail"></i>
                            <span className='title-detail-class-upper'>NỘI DUNG</span>
                        </Link>
                    </div>
                    <div className='content-course-detail'>
                        <div className="view-course-detail-1 w-1347">
                            <span className='title-course-detail'>Nội dung</span>
                        </div>
                        <div className={`${toggle ? "truotlen-4" : "truotxuong"}`}>
                            <div className='content-assignment'>
                                {/* Hiển thị nội dung từ state assignment */}
                                {assignment && (
                                    <>
                                        <span className='description-assignment'>Mô tả:</span>
                                        <span className='description-assignment-2'>{assignment.description}</span>
                                        <span className='description-assignment-3'>Hướng dẫn:</span>
                                        <span className='description-assignment-2'>{assignment.instruction}</span>
                                        <hr className='hr-assignment-content'></hr>
                                        <span className='description-assignment-5'>Thời gian mở:</span>
                                        <span className='description-assignment-6'>{assignment.startAt}</span>
                                        <span className='description-assignment-7'>Thời gian kết thúc:</span>
                                        <span className='description-assignment-8'>{assignment.endAt}</span>
                                        <hr className='hr-assignment-content'></hr>
                                        <span className='description-assignment-9'>Dạng bài tập:</span>
                                        <div className='description-assignment-status'>Bài tập lớn</div>
                                        <hr className='hr-assignment-content'></hr>
                                        <div className='assignment-attachments'>
                                                <span className='description-assignment'>File đính kèm:</span>
                                                {assignment.assignmentAttachments.map((attachment, index) => (
                                                    <div key={index}>
                                                        {/* Hiển thị tên file và tạo một liên kết để tải xuống */}
                                                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                                                        {/* Đoạn mã để đọc file từ assignmentAttachment */}
                                                        <a className='btn btn-secondary ml-3' href={attachment.url}>Đọc file</a>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='Confirm-assignment'>
                            <div className='nop-bai'>Nộp bài</div>
                            <div className='mt-4 f-f'>
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className='ml-4.5 btn btn-success' onClick={() => handleSubmitAssignment()}>Nộp bài</div>
                        </div>
                    </div>
                </div>
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
    );
};

export default Assignment;