import React from 'react';
import { Link } from 'react-router-dom';
const Emulator = () => {
    return (
        <div>
            <div className='body'>
                <div className='background b-emu'>
                <div className='content'>
                    <span className='title-emu'>Giả Lập</span>
                    <br></br>
                    <span className='text-script'>Chạy script</span>
                    <Link to='Create-class'>
                        <div className='layer-emu'>
                            <i class="fas fa-plus emu emu-1"></i>
                            <span className='text-emu'>TẠO LỚP</span>
                        </div>
                    </Link>
                    <Link to='Approve-Create-Class'>
                        <div className='layer-emu'>
                            <i class="fas fa-check-circle emu"></i>
                            <span className='text-emu'>DUYỆT LỚP</span>
                        </div>
                    </Link>
                    <div className='layer-emu'>
                        <i class="fas fa-times-circle emu"></i>
                        <span className='text-emu'>HỦY LỚP</span>
                    </div>
                    <hr className='hr-emu'></hr>
                    <div className='layer-emu'>
                        <i class="fas fa-comment-alt emu"></i>
                        <span className='text-emu'>TẠO CÂU HỎI</span>
                    </div>
                    <div className='layer-emu'>
                        <i class="fas fa-comment-alt emu"></i>
                        <span className='text-emu'>NỘP ASSIGNMENT</span>
                    </div>
                    <div className='layer-emu'>
                        <i class="fas fa-comment-alt emu"></i>
                        <span className='text-emu'>CHẤM ĐIỂM ASSIGNMENT</span>
                    </div>
                    <div className='layer-emu'>
                        <i class="fas fa-comment-alt emu"></i>
                        <span className='text-emu'>LÀM BÀI QUIZ</span>
                    </div>
                    <hr className='hr-emu'></hr>
                    <div className='layer-emu'>
                        <i class="fas fa-folder-open emu"></i>
                        <span className='text-emu'>TẠO HỌC LIỆU</span>
                    </div>
                    <span className='text-create-class'>TẠO LỚP</span>
                    <span className='text-import'>Import File</span>    
                    <input type='file' className='file-emu'/>
                    <span className='text-input-1-emu'>Quantity register class</span>
                    <span className='text-input-2-emu'>Quantity not register class</span>
                    <input type='text' className='text-emu' placeholder='0'/>
                    <input type='text' className='text-emu1' placeholder='0'/>
                    <div className='btn-create'>CREATE</div>
                    <div className='noti-emu'>
                        <div className='sum-emu'>Tổng: 0</div>
                        <i class="fas fa-chevron-circle-down emu-i-1"></i>
                        <div className='success-emu'>Thành công: 0</div>
                        <i class="far fa-times-circle emu-i-2"></i>
                        <div className='lose-emu'>Thất bại: 0</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Emulator;