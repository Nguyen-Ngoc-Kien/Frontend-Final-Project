import React, { useEffect, useState } from 'react';
import Question from './Question';
import { useParams } from 'react-router-dom';
import {fetchQuizTraineeById, shuffleQuizById, postSubmitQuiz } from '../../services/UserServices';
import _ from 'lodash'
import ModalResult from './ModalResult';
import RightContent from './RightContent';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id
    const [quiz,setQuiz] = useState({})
    const [dataQuiz,setDataQuiz] = useState([]);
    const [index,setIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const [grade,setGrade] = useState(null)
    const [idQuizDoing,setIdQuizDoing] = useState(null)
    const [showTime,setShowTime] = useState(true)
    const [showAnswer,setShowAnswer] = useState(false)

    // console.log("check param", params) 
    const getQuestion = async () => {
        const res1 = await shuffleQuizById(quizId,localStorage.getItem("access_token"),{})
        const res = res1.allQuestionsOfQuiz;
        console.log("res ques 1>>>",res1);
        console.log("res ques>>>",res);
        // console.log("res detail >>>", res[0])
        if(res1){
            setIdQuizDoing(res1.id)
        }
        if(res && res.length > 0){
           let raw = res;
           let data = _.chain(raw)
           .groupBy("id")
            .map((value,key) => {
                let answers = [];
                let questionDescription, image = null;

                value.forEach((item,index) => {
                    // console.log("item >>>",item)
                    if(index === 0){
                        questionDescription = item.questionName;
                        image = item.image;
                    }
                    item.answers.map((answer,index) => {
                        // console.log("answer >>>",answer)
                        answer.isSelected = false;
                        
                    })
                    // console.log("item.answers[index] >>>",item.answers[index])
                    answers.push(item.answers)
                    // console.log("item.answer >>>", item.answers)
                })
                // {questionId: key, data:value}
                // console.log("value: ", value, ' key ', key)
                return{questionId: key, answers, questionDescription, image}
            })
            .value();

            // console.log("data if >>>", data)
        }
        setDataQuiz(res)
        setQuiz(res1)
    }
    useEffect(() => {
        getQuestion()
    }, [])

    const HandlePrev = () => {
        if(index - 1 < 0) return;
        setIndex(index - 1)
    }

    const HandleNext = () => {
        // console.log("length >>>",dataQuiz.length)
        if(dataQuiz && dataQuiz.length > index + 1){
            setIndex(index + 1)
        }
    }

    const HandleFinish = async () => {
        console.log("Check data before submit >>>", dataQuiz)
        let payload = {
            // quizId: +quizId,
            attemptQuestion: []
        };
        let attemptQuestion = [];
        if(dataQuiz && dataQuiz.length > 0){
            dataQuiz.forEach(question => {
                let questionId = question.id;
                let chosenAnswerId = []

                question.answers.forEach(a => {
                    if(a.isSelected === true){
                        chosenAnswerId.push(a.id)
                    }
                })
                attemptQuestion.push({
                    questionId: +questionId,
                    chosenAnswerId: chosenAnswerId
                }) 

            })

            payload.attemptQuestion = attemptQuestion;
            console.log("Final payload >>>", payload)
            // submit api
            let res = await postSubmitQuiz(idQuizDoing,payload,localStorage.getItem("access_token"))
            console.log("Check res Finish  >>>",res)
            setGrade(res.grade)
            if(res){
                setDataModalResult({
                    grade: res.grade,
                    countTotal: payload.attemptQuestion.length,
                    countCorrect: ((res.grade/10)*payload.attemptQuestion.length).toFixed()
                })
                setIsShowModalResult(true);
            }
            else{
                alert("some thing wrongs...")
            }
        }
        setShowTime(false)
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.id === +questionId)
        if(question && question.answers){
            // console.log("q >>",question)
            question.answers = question.answers.map(item => {
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.id === +questionId)
        if(index > -1){
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
        // console.log("Check dataQuiz >>>",dataQuiz)
    }
    const handleRadioChange = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.id === +questionId);
      
        if (question && question.answers) {
          question.answers = question.answers.map(item => {
            if (+item.id === +answerId) {
              item.isSelected = true; // Đặt isSelected của câu trả lời này thành true
            } else {
              item.isSelected = false; // Đặt isSelected của các câu trả lời khác thành false
            }
            return item;
          });
        }
      
        let index = dataQuizClone.findIndex(item => +item.id === +questionId);
        if (index > -1) {
          dataQuizClone[index] = question;
          setDataQuiz(dataQuizClone);
        }
        // console.log("Updated dataQuiz >>>", dataQuizClone);
      };
    return (
        <div className='quiz-detail-container'>
            <div className="quiz-left">

                <div className="quiz-content">
                    <Question
                    showAnswer={showAnswer}
                    index={index}
                    handleCheckbox={handleCheckbox}
                    handleRadioChange = {handleRadioChange}
                    data={
                        dataQuiz && dataQuiz.length > 0
                            ?
                            dataQuiz[index] : []
                        
                        }></Question>
                </div>
                <div className='quiz-footer'>
                    <button className='btn btn-primary ml-3' onClick={() => HandlePrev()}>Prev</button>
                    <button className='btn btn-secondary' onClick={() => HandleNext()}>Next</button>
                    {!showAnswer && (
                        <button className='btn btn-warning' onClick={() => HandleFinish()}>Finish</button>
                    )}
                </div>
            </div>
            <div className="quiz-right">
                <RightContent
                HandleFinish={HandleFinish}
                dataQuiz = {dataQuiz}
                setIndex={setIndex}
                HandlePrev={HandlePrev}
                quiz={quiz}
                showTime={showTime}
                ></RightContent>
            </div>
            <ModalResult
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                show={isShowModalResult}
                setshow={setIsShowModalResult}
                dataModalResult={dataModalResult}
                grade={grade}
            ></ModalResult>
        </div>
    );
};

export default DetailQuiz;