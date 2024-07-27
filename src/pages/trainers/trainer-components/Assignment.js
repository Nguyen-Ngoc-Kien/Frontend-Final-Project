import React, { useEffect, useState } from 'react';
import { fetchAssignmentById } from '../../../services/UserServices';
import { Link } from 'react-router-dom';

const Assignment = () => {
    const [toggle, setToggle] = useState(false);
    const [assignment, setAssignment] = useState(null);

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
                            {
                                assignment && (
                                    <span className='title-span-assignment-2'>{assignment.name}</span>
                                )
                            }

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
                        <Link to='/mark' className='two-layer-detail-class-upper'>
                            <i className="fas fa-cog cdetail course-detail"></i>
                            <span className='title-detail-class-upper'>CHẤM ĐIỂM</span>
                        </Link>
                    </div>
                    <div className='content-course-detail'>
                        <div className="view-course-detail-1 w-1347" onClick={handleToggle}>
                            <i className={`fas fa-chevron-up add-assign-detail-icon-2 ${toggle ? "truotlen" : "truotxuong"}`}></i>
                            <i className={`fas fa-chevron-down course-detail-icon-3 ${toggle ? "hien" : "hide"}`}></i>
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
                                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                                                    <a href={attachment.url} className='btn btn-secondary ml-3'>Tải file</a>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;