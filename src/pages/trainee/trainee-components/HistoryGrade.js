import React, { useEffect, useState } from 'react';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { Link } from 'react-router-dom';
import { fetchQuizTraineeById } from '../../../services/UserServices';
import TableMarkQuiz from './TableMarkQuiz'
const HistoryGrade = () => {
    const [quiz,setQuiz] = useState([])
    useEffect(() => {
        getQuizById()
    },[])
    const getQuizById = async () => {
        const res = await fetchQuizTraineeById(localStorage.getItem("idQuiz"),localStorage.getItem("access_token"))
        console.log("check res >>>",res)
        setQuiz(res)
    }
    return (
        <div className='body'>
        <div className='background'>
        <div className='content'>
        <div className='title-content-assignment'>
            <div className='icon-background-title blue'>
                <i class="fas fa-book-medical"></i>
            </div>
            <div className='text-assignment'>
                <span className='title-span-assignment'>Bài ôn tập</span>
                <span className='title-span-assignment-2'>{quiz.quizName}</span>
            </div>
        </div>
        <div className='Link-detail-class-upper w-1347'>
            Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / {quiz.quizName}
        </div>
        <div className='layer-top-upper-detail-class'>
            <Link to='/quiz' className='two-layer-detail-class-upper'>
                <i class="fas fa-file-alt course-detail"></i>
                <span className='title-detail-class-upper'>NỘI DUNG</span>
            </Link>
            <Link to='/mark' className='two-layer-detail-class-upper bg-active'>
            <i class="fas fa-history course-detail"></i>
                <span className='title-detail-class-upper'>Lịch sử làm bài</span>
            </Link>
        </div>
            <TableMarkQuiz></TableMarkQuiz>
        </div>
        </div>
        </div>
    );
};

export default HistoryGrade;