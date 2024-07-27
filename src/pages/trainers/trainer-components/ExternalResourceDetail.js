import React, { useEffect, useState } from 'react';
import { fetchExternalResourceById } from '../../../services/UserServices';
import { Link } from 'react-router-dom';

const ExternalResourceDetail = () => {
    const [toggle, setToggle] = useState(false);
    const [externalResource, setExternalResource] = useState(null);

    useEffect(() => {
        getAssignmentById();
    }, []);

    const getAssignmentById = async () => {
        try {
            const res = await fetchExternalResourceById(localStorage.getItem("idExternalResource"), localStorage.getItem("access_token"));
            console.log("check resEx >>>", res);

            if (res) {
                setExternalResource(res);

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
                            <i class="fas fa-link"></i>
                        </div>
                        <div className='text-assignment'>
                            <span className='title-span-assignment'>Tài liệu</span>
                            <span className='title-span-assignment-2'>Tầm Quan Trọng Của Vệ Sinh Răng Miệng</span>
                        </div>
                    </div>
                    <div className='Link-detail-class-upper w-1347'>
                        Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / Tạo bài tập lớn
                    </div>
                    <div className='layer-top-upper-detail-class'>
                        <div to='/assignment' className='two-layer-detail-class-upper bg-active'>
                            <i className="fas fa-file-alt course-detail"></i>
                            <span className='title-detail-class-upper'>NỘI DUNG</span>
                        </div>
                    </div>
                    <div className='content-course-detail'>
                        <div className="view-course-detail-1 w-1347" onClick={handleToggle}>

                            <span className='title-course-detail'>Nội dung</span>
                        </div>
                        <div>
                            <div className='content-assignment'>
                                {externalResource && (
                                    <div>
                                        <span className='description-assignment'>Mô tả:</span>
                                        <span className='description-assignment-2'>{externalResource.description}</span>
                                        <hr className='hr-assignment-content'></hr>
                                        <div className='assignment-attachments'>
                                            <span className='description-assignment mb-11'>File đính kèm:</span> 
                                            {externalResource.attachment.map((attachment, index) => (
                                                <div key={index}>
                                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.name}</a>
                                                    <a href={attachment.url} className='btn btn-secondary ml-3'>Tải file</a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalResourceDetail;