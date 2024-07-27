import React, { useEffect, useState } from 'react';
import { fetchQuestionId } from '../../../services/UserServices';
import Question from '../../quizz/Question';

const DetailQuestion = () => {
    const [question,setQuestion] = useState([])
    useEffect(() => {
        getQuestionById()
    },[])
    const getQuestionById = async () => {
        const res = await fetchQuestionId(localStorage.getItem("questionId"),localStorage.getItem("access_token"))
        console.log("checkk ress >>>",res)
        setQuestion(res)
    }
    return (
        <div className='quiz-detail-container'>
            <div className="quiz-left full">
                <div className="quiz-content">
                <div>
                <div className='quiz-question'>
                    {question.questionName}
                </div>
                <div className='quiz-answer'>
                    {question.answers && question.answers.length && 
                        question.answers.map((answer,index) => {
                        console.log("answer >>>",answer)
                        console.log("index >>>",index)
                        return(
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check mt-2">
                                <input className="form-check-input" 
                                type="checkbox" 
                                checked={answer.isSelected}
                                id="flexCheckDefault"/>
                                <label className="form-check-label-answer">
                                    {answer.answerName}
                                </label>
                            </div>
                        </div>
                        )
                    })}
                </div>
        </div>
                </div>
            </div>
        </div>
    );
};

export default DetailQuestion;