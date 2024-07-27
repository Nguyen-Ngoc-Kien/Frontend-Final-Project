import React, { useState } from 'react';
import {Link} from 'react-router-dom';
// import MyClass from './../trainee-components/Myclass';
// import Home from '../trainee-components/Home';
// import Schedule from '../trainee-components/Schedule';
// import Login from './../../Signout';
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
            <div className='title-menu'>
                <span>Polycell</span>
            </div>
            <div className='menu-ngang'>
            <Link to="/Home" className='object-ngang'>
              <span className='home-icon'>
                <i class="fas fa-home"></i>
              </span>
              <li>
                <span className='text-menu'>Trang Chủ</span>
              </li>
            </Link>
            <Link to="/My-Class" className='object-ngang grade'>
              <span className='home-icon'>
                <i class="fas fa-graduation-cap"></i>
              </span>
              <li>
              <span className='text-menu'>Lớp Của Tôi</span>
            </li>
            </Link>
            </div>
            <div className='user train' onClick={() => HandleClick()}>
                <div className='avatar'>
                <i class="fas fa-user"></i>
                </div>
                <span className='text'>
                TRAINER |
                </span>
            </div>
            <Link to='/login' className={`log-out ${on ? '' : 'hidden-user'}`} onClick={() => HandleClickSignout()}>Sign Out</Link>
            {/* <div className='after-click'>
      </div> */}
            </div>
      {/* <Routes>
          <Route 
          path='/My-Class' element={<MyClass/>}
          />
          <Route 
          path='/Login' element={<Login/>}
          />
          <Route 
          path='/Home' element={<Home/>}
          />
          <Route 
          path='/' element={<Home/>}
          />
          <Route 
          path='/Calendar' element={<Schedule/>}
          />
        </Routes> */}
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