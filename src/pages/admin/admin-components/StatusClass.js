import React from 'react';
import TableStatusClass from '../../../UI/TableStatusClass/TableStatusClass';
const Course = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                <div className='content'>
                <span className='title-grade t-center mt-5'>Danh Sách Trạng Thái Lớp Học</span>
                    <TableStatusClass></TableStatusClass>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Course;