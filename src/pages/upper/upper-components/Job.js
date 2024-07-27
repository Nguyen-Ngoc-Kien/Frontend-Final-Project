import React from 'react';
import TableJob from '../../../UI/TableJob/TableJob'
const User = () => {
    return (
        <div>
            <div className='body'>
                <div className='background'>
                    <div className='content'>
                        <span className='title-grade t-center mt-5'>Các công việc trong bệnh viện</span>
                        <div className='col-grade'>
                            <TableJob></TableJob>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;