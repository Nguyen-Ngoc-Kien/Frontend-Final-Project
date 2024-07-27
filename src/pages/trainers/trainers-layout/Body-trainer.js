import React, { useState } from 'react';
import {Routes, Route,} from 'react-router-dom';
import MyClass from './../trainer-components/Myclass';
import Home from '../trainer-components/Home';
import Schedule from '../trainer-components/Schedule';
import CourseDetails from '../trainer-components/CourseDetails';
import AddAssignment from '../trainer-components/AddAssignment';
import Assignment from '../trainer-components/Assignment';
import Addquiz from '../trainer-components/Addquiz';
import Addresource from '../trainer-components/Addresource';
import Quiz from './../trainer-components/Quiz'
import DetailQuiz from '../../quizz/DetailQuiz';
import ManageQuiz from '../../quizz/ManageQuiz';
import Questions from '../../question/Questions';
import TotalQuestionId from '../trainer-components/TotalQuestionId'
import DetailQuestion from '../trainer-components/DetailQuestion'
import Mark from '../trainer-components/Mark';
import ExternalResource from '../trainer-components/ExternalResource';
import ExternalResourceDetail from '../trainer-components/ExternalResourceDetail';
import MarkQuiz from '../trainer-components/MarkQuiz';

const Body = (props) => {
    return (
    <div>
        <Routes>
          <Route 
          path='/My-Class' element={<MyClass/>}
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
          <Route 
          path='/My-Class/Course-Detail/:id' element={<CourseDetails/>}
          />
          <Route 
          path='/My-Class/Course-Detail/:id/add-assignment' element={<AddAssignment/>}
          />
          <Route 
          path='/assignment' element={<Assignment/>}
          />
          <Route 
          path='/My-Class/Course-Detail/add-homework' element={<Addquiz/>}
          />
          <Route 
          path='/My-Class/Course-Detail/add-link-assignment' element={<Addresource/>}
          />
          <Route 
          path='/quiz' element={<Quiz/>}
          />
          <Route 
          path='/question-quiz/:id' element={<DetailQuiz/>}
          />
          <Route 
          path='/manager-quizzes' element={<ManageQuiz/>}
          />
          <Route 
          path='/manager-questions' element={<Questions/>}
          />
          <Route 
          path='/total-questions' element={<TotalQuestionId/>}
          />
          <Route 
          path='/detail-question' element={<DetailQuestion/>}
          />
          <Route 
          path='/mark' element={<Mark/>}
          />
          <Route 
          path='/External-Resource' element={<ExternalResource/>}
          />
          <Route 
          path='/External-Resource-detail' element={<ExternalResourceDetail/>}
          />
          <Route 
          path='/quiz-mark' element={<MarkQuiz/>}
          />
        </Routes>
    </div>
    );
};

export default Body;