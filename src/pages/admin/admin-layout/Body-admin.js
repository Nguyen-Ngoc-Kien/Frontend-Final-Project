import React from 'react';
import {Routes, Route,} from 'react-router-dom';
import Certification from '../admin-components/Certification';
import Grade from '../admin-components/Grade';
import Configuration from '../admin-components/Configuration';
import Course from '../admin-components/Course';
import Emulator from '../admin-components/Emulator';
import Home from '../admin-components/Home';
import User from '../admin-components/User';
import Location from '../admin-components/Locate';
import AddClass from '../admin-components/AddClass';
import DuyetLop from '../admin-components/DuyetLop';
import Level from '../admin-components/Level';
import DetailClass from '../admin-components/DetailClass';
import DetailUser from '../admin-components/DetailUser.js';
import StatusClass from '../admin-components/StatusClass';
import DetailQuiz from '../../quizz/DetailQuiz';


const Body = () => {
    return (
    <div>
            <Routes>
          <Route 
          path='/Certification' element={<Certification/>}
          />
          <Route 
          path='/Grade' element={<Grade/>}
          />
          <Route 
          path='/Course' element={<Course/>}
          />
          <Route 
          path='/Location' element={<Location/>}
          />
          <Route 
          path='/Emulator' element={<Emulator/>}
          />
          <Route 
          path='/Configuration' element={<Configuration/>}
          />
          <Route 
          path='/User' element={<User/>}
          />
          <Route 
          path='/Home' element={<Home/>}
          />
          <Route 
          path='/' element={<Home/>}
          />
          <Route 
          path='/Add-class' element={<AddClass/>}
          />
          <Route 
          path='/Emulator/approve-create-class' element={<DuyetLop/>}
          />
          <Route
          path='/Level' element={<Level/>}
          ></Route>
          <Route
          path='/StatusClass' element={<StatusClass/>}
          ></Route>
          <Route
          path='/Class-detail' element={<DetailClass/>}
          ></Route>
          <Route
          path='/Detail-User' element={<DetailUser/>}
          ></Route>
        </Routes>
        <Routes>
       <Route path='/quiz/:id' element={<DetailQuiz></DetailQuiz>} ></Route>
        </Routes> 
    </div>
    );
};

export default Body;