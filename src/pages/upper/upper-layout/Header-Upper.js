import React, { useState } from 'react';
import { Link} from 'react-router-dom';


function HandleMenu(){
  const [on,setOn] = useState(false)
  const HandleClick = () => {
    setOn(() => {
      return !on;
    })
  }
  
  const HandleClickSignout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }

  return (
    <div>
            <div className='header'>
            <div className='menu' onClick={() => HandleClick()}>
                <i class="fas fa-bars"></i>
            </div>
            <div className='user'>
                <div className='avatar'>
                <i class="fas fa-user"></i>
                </div>
                <span className='text'>
                UPPER |
                </span>
            </div>
            {/* <div className='after-click'>
      </div> */}
            </div>
            <div className='side-bar'>
        <nav className={`side-bar ${on ? '' : 'hidden-sidebar'}`}>
          <ul>
            <div className='logo'>
              <span className='name-hopital text-polycell'>Polycell</span>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-home"></i>
              </span>
              <li>
                <Link to="/Home" className='text-menu' onClick={() => HandleClick()}>Trang Chủ</Link>
              </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-graduation-cap"></i>
              </span>
              <li>
              <Link to="/Grade" className='text-menu' onClick={() => HandleClick()}>Lớp</Link>
            </li>
            </div>
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/Department" className='text-menu' onClick={() => HandleClick()}>Khoa</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/Curriculum" className='text-menu' onClick={() => HandleClick()}>Giảng dạy</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/Job" className='text-menu' onClick={() => HandleClick()}>Công việc</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-house-user"></i>
              </span>
              <li>
              <Link to="/ConfirmRegister" className='text-menu' onClick={() => HandleClick()}>Duyệt lớp</Link>
            </li>
            </div> 
            <div className='object-sidebar'>
              <span className='home-icon'>
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <li>
              <Link to="/Login" className='text-menu' onClick={() => HandleClickSignout()}>Đăng xuất</Link>
            </li>
            </div>
          </ul>
        </nav>
      </div>
      <div className={`ground-gray ${on ? '' : 'hidden-ground'}`} onClick={() => HandleClick()}></div>
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