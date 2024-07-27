import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TableMarkAssignment from './TableMarkAssignment'
import { fetchAssignmentById } from '../../../services/UserServices';

const Mark = () => {
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
    return (
        <div>
            <div className='body'>
                <div className='background'>
                <div className='content'>
                <div className='title-content-assignment'>
                    <div className='icon-background-title'>
                        <i class="fas fa-book"></i>
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
                    Chấm điểm
                </div>
                <div className='layer-top-upper-detail-class'>
                    <Link to='/assignment' className='two-layer-detail-class-upper'>
                        <i class="fas fa-file-alt course-detail"></i>
                        <span className='title-detail-class-upper'>NỘI DUNG</span>
             )       </Link>
                    <Link to='/mark' className='two-layer-detail-class-upper  bg-active'>
                        <i class="fas fa-cog cdetail course-detail"></i>
                        <span className='title-detail-class-upper'>CHẤM ĐIỂM</span>
                    </Link>
                </div>
                <TableMarkAssignment></TableMarkAssignment>
            </div>
            </div>
            </div>
        </div>
    );
};

export default Mark;