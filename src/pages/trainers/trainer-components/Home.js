import React from 'react';
import imgHopital from './../../../data/image/Hospital-building.gif'

const Home = () => {
    return (
        <div className='home-content'>
        <div className='home-content-text'>
            <h4 className='name-hopital'>
                Polycell
            </h4>
            <h1 className='title-hopital'>
                Bệnh viện chăm sóc sức khỏe
            </h1>
            <span className='title-mini'>
                hiện nay các Bệnh viện có đội ngũ bác sĩ, bác sĩ phẫu thuật, y tá và đồng minh chuyên nghiệp
            </span>
            <br></br>
            <span className='content-text'>
                Hệ thống quản lý y tế toàn diện được thiết kế để hợp lý hóa các hoạt động chăm sóc sức khỏe. Hệ thống này cung cấp khả năng quản lý hồ sơ bệnh nhân, lên lịch hẹn, kiểm soát hàng tồn kho và quy trình thanh toán hiệu quả. Nó tăng cường chăm sóc bệnh nhân bằng cách cung cấp quyền truy cập theo thời gian thực vào hồ sơ y tế và đơn giản hóa các nhiệm vụ hành chính cho các nhà cung cấp dịch vụ chăm sóc sức khỏe.
            </span>
            <br></br>
            <button className='primary'>Tìm hiểu thêm -></button>
        </div>
        <div className='home-content-image'>
            <img src={imgHopital} alt='' className='hopital'/>
        </div>
    </div>
    );
};

export default Home;