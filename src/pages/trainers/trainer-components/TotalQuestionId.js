import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { fetchQuizById } from '../../../services/UserServices';
import TableQuestion from '../../../UI/TableQuestion/TableQuestion'

const ToTalQuestionId = () => {
    const [quiz,setQuiz] = useState([])

    useEffect(() => {
        getQuizById()
    },[])
    const getQuizById = async () => {
        const res = await fetchQuizById(localStorage.getItem("idQuiz"),localStorage.getItem("access_token"))
        // console.log("check res >>>",res)
        setQuiz(res)
    }
    return(
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
            {quiz.quizName}
        </div>
        <div className='layer-top-upper-detail-class'>
            <Link to='/quiz' className='two-layer-detail-class-upper'>
                <i class="fas fa-file-alt course-detail"></i>
                <span className='title-detail-class-upper'>NỘI DUNG</span>
            </Link>
            <Link to='/quiz-mark' className='two-layer-detail-class-upper'>
                <i class="fas fa-star course-detail"></i>
                <span className='title-detail-class-upper'>Điểm</span>
            </Link>
            <Link to='/total-questions' className='two-layer-detail-class-upper bg-active'>
                <i class="fas fa-cog cdetail course-detail"></i>
                <span className='title-detail-class-upper'>Ngân hàng câu hỏi</span>
            </Link>
        </div>
        <div className="table-question-total">
            <TableQuestion></TableQuestion>
        </div>
        </div>
    </div>
 </div>
    )
}

export default ToTalQuestionId