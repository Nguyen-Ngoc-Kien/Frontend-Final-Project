import React from 'react';
import TableCurriculum from '../../../UI/TableCurriculum/TableCurriculum'
const Department = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Danh Sách Chương Trình Giảng Dạy</span>
                        <div className='col-grade'>
                            <TableCurriculum></TableCurriculum>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department;