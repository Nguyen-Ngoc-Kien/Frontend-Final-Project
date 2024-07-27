import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';
import Login from './../layout/Login'
import imgHopital from '../data/image/Hospital-building.gif'

function HandleMenu(){
  const [on,setOn] = useState(false)
  const HandleClick = () => {
    setOn(() => {
      return !on;
    })
  }
  return (
    <div>
            <div className='header'>
            <Link to='/Login'>
              <span className='text-header'>
                Đăng nhập
                </span>
            </Link>

            </div>
            <div className='body'>
            <div className='background'>
            <div className='content'>
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
            </div>
            </div>
        </div>
      <div className={`ground-gray ${on ? '' : 'hidden-ground'}`} onClick={() => HandleClick()}></div>
      <Routes>
          <Route 
          path='/Login' element={<Login></Login>}
          />
        </Routes>
    </div>
  )
}

const Header = () => {
    return (
        <div>
          {HandleMenu()}
        </div>
    );
};

export default Header;