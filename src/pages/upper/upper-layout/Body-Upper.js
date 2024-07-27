import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import HomeUpper from '../upper-components/HomeUpper';
import GradeUpper from '../upper-components/GradeUpper';
import ScheduleUpper from '../upper-components/ScheduleUpper';
import ListClass from '../upper-components/ListClass';
import ViewCourseDetail from '../upper-components/ViewCourseDetail';
import Department from '../upper-components/Department';
import Curriculum from '../upper-components/Curriculum';
import Job from '../upper-components/Job';
import ConfirmRegister from '../upper-components/ConfirmRegister';

const Body = () => {
    return (
    <div>
      <Routes>
            <Route 
            path='/Department' element={<Department/>}
            />
            <Route 
            path='/Curriculum' element={<Curriculum/>}
            />
            <Route 
            path='/Home' element={<HomeUpper/>}
            />
              <Route 
            path='/' element={<HomeUpper/>}
            />
              <Route 
            path='/Grade' element={<GradeUpper/>}
            />
              <Route 
            path='/Schedule' element={<ScheduleUpper/>}
            />
            <Route
            path='Class-detail' element={<ListClass/>}
            ></Route>
            <Route
            path='Class-detail/View-Course-Detail' element={<ViewCourseDetail/>}
            ></Route>
            <Route
            path='/ConfirmRegister' element={<ConfirmRegister/>}
            ></Route>
            <Route
            path='/Job' element={<Job/>}
            ></Route>
          </Routes>
    </div>
    );
};

export default Body;