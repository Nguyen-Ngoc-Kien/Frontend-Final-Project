import React from 'react';
import TableDepartment from '../../../UI/TableDepartment/TableDepartment'
const Department = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Danh Sách Khoa</span>
                        <div className='col-grade'>
                            <TableDepartment></TableDepartment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Department;