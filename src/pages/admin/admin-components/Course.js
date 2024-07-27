import React from 'react';
import TableCourse from './../../../UI/TableCourse/TableCourse'
const Course = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                <span className='title-grade t-center mt-5'>Danh Sách Khóa Học</span>
                <div className='content'>
                    <TableCourse></TableCourse>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Course;