import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TableClass from './../../../UI/TableClass/TableClass'

const Grade = () => {
    const [filterStatus, setFilterStatus] = useState(0);

    const handleFilterByStatus = (status) => {
      setFilterStatus(status);
    };
    return (
        <div className='body'>
            <div className='background w-m'>
            <div className='content'>
            <div className='grade-body'>
            <span className='title-grade'>Danh Sách Lớp Học</span>
            <div className='layer-top'>
            <span className='name-col' onClick={() => handleFilterByStatus(0)}>TẤT CẢ</span>
                <span className='name-col' onClick={() => handleFilterByStatus(1)}>ĐANG CHỜ DUYỆT(KHÔNG CHO PHÉP ĐĂNG KÝ)</span>
                <span className='name-col' onClick={() => handleFilterByStatus(2)}>ĐANG CHỜ DUYỆT(CHO PHÉP ĐĂNG KÝ)</span>
                <span className='name-col' onClick={() => handleFilterByStatus(3)}>ĐANG MỞ ĐĂNG KÝ</span>
                <span className='name-col' onClick={() => handleFilterByStatus(4)}>SẮP MỞ</span>
                <span className='name-col' onClick={() => handleFilterByStatus(5)}>ĐANG DIỄN RA</span>
                <span className='name-col' onClick={() => handleFilterByStatus(6)}>ĐÃ ĐÓNG</span>
                <span className='name-col'onClick={() => handleFilterByStatus(7)}>BỊ TỪ CHỐI</span>
            </div>
            <div className='table-grade'>
                <div className='upper-table'>
                </div>
                <div className='col-grade'>
                    <TableClass filterStatus={filterStatus}></TableClass> 
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>

    );
};

export default Grade;