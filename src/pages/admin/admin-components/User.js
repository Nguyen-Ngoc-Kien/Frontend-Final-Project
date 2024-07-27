import React from 'react';
import TableUser from '../../../UI/TableUser/TableUser'
const User = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Danh Sách Nguời dùng</span>
                        <div className='col-grade'>
                            <TableUser></TableUser>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;