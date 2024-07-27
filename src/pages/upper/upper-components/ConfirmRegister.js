import React from 'react';
import TableRegister from '../../../UI/TableRegister/TableRegister'
const User = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Xác nhận đăng ký lớp học</span>
                        <div className='col-grade'>
                            <TableRegister></TableRegister>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;