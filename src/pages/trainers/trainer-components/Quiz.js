import React, { useEffect, useState } from 'react';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { Link } from 'react-router-dom';
import { fetchQuizById } from '../../../services/UserServices';

function HandleClick(){
    const [toggle, setToggle] = useState(false)
    const [click, setClick] = useState(true)
    const [quiz,setQuiz] = useState([])
    const HandleClick = () => {
        setClick(() => {
            return !click
        })
    }
    const HandleToggle = () => {
        console.log("Click")
        setToggle(() => {
            return !toggle
        })
    }
    useEffect(() => {
        getQuizById()
    },[])
    const getQuizById = async () => {
        const res = await fetchQuizById(localStorage.getItem("idQuiz"),localStorage.getItem("access_token"))
        console.log("check res >>>",res)
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
                <div className='two-layer-detail-class-upper bg-active'>
                    <i class="fas fa-file-alt course-detail"></i>
                    <span className='title-detail-class-upper'>NỘI DUNG</span>
                </div>
                <Link to='/quiz-mark' className='two-layer-detail-class-upper'>
                    <i class="fas fa-star course-detail"></i>
                    <span className='title-detail-class-upper'>Điểm</span>
                </Link>
                <Link to='/total-questions' className='two-layer-detail-class-upper'>
                    <i class="fas fa-cog cdetail course-detail"></i>
                    <span className='title-detail-class-upper'>Ngân hàng câu hỏi</span>
                </Link>
            </div>
            <div className='content-course-detail'>
                <div className="view-course-detail-1 w-1347" onClick={() => HandleToggle()}>
                    <i class={`fas fa-chevron-up add-assign-detail-icon-2 ${toggle ? "truotlen" : "truotxuong"}`}></i>
                    <i class={`fas fa-chevron-down course-detail-icon-3 ${toggle ? "hien" : "hide"}`}></i>
                    <span className='title-course-detail'>Nội dung</span>
                    </div>
                    <div className={`${toggle ? "truotlen-4" : "truotxuong"}`}>
                        <div className='content-assignment'>
                            <div className='header-title-quiz'>
                                <span className='description-assignment'>{quiz.quizName}</span>
                                <div className='status-quiz'>Đang diễn ra</div>
                            </div>
                            <hr className='hr-assignment-content'></hr>
                            <span className='description-assignment-6'>Thời gian mở 07:00:47 25/12/2023</span>
                            <hr className='hr-assignment-content'></hr>
                            <div className='description-assignment-9'>Thời gian làm bài: {quiz.timeLimit} phút</div>
                            <div className='description-assignment-9'>Điểm vượt qua: 5/10</div>
                        </div>
                </div>
            </div>
            <div className='two-button-layer'>
            <div className='Go-back'>
                <i className="fas fa-angle-double-left"></i>
                <span className='quay-lai'>Quay Lại</span>
            </div>
                <Link to='/quiz' className='w-tiny'>
                    <div className='create-and-back bn'>Thêm câu hỏi</div>
                </Link>
            </div>
            </div>
        </div>
     </div>
    )
}
const Quiz = () => {
    return (
        <div>
            {HandleClick()}
        </div>

    );
};

export default Quiz;