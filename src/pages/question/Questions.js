import { useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { fetchAllLevel, postQuestions } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ];

const Questions = (props) => {
    const[type,setType] = useState('EASY')
    const[listLevel,setListLevel] = useState([])
    const[levelId,setLevelId] = useState(1)
    const initquestion = [
        {
            id : uuidv4(),
            topicId: localStorage.getItem("TopicId"),
            questionName:'',
            levelId: levelId,
            answers: [
                {
                    id: uuidv4(),
                    answerName:'',
                    isCorrect: false
                }
            ]
        }        
    ]

    const [questions,setQuestions] = useState(initquestion)
    const getLevel = async (page) => {
        const res = await fetchAllLevel(page,localStorage.getItem("access_token"))
        console.log("res level >>>",res)
        if(res && res.length > 0){
            let newLevel = res.map(item => {
                console.log("item job >>>",item)
                return{
                    value: item.id,
                    label: item.level
                }
            })
            setListLevel(newLevel)
        }
    }
    useEffect(() => {
        getLevel()
    },[])


    // console.log("answer >>>",questions)

    const handleAddRemoveQuestion = (type,id) => {
        console.log("CHECK TYPE, ID >>>",type,id)
        if(type === "ADD"){
            const NewQuestion = {
                id : uuidv4(),
                topicId: null,
                questionName:'',
                levelId:levelId,
                answers: [
                    {
                        id: uuidv4(),
                        answerName:'',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions,NewQuestion])
        }
        if(type === "REMOVE"){
            console.log("Auto REMOVE")
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type,questionId,answerId) => {
        let questionClone = _.cloneDeep(questions)
        console.log("CHECK TYPE, ID >>>",type,questionId,answerId)
        if(type === "ADD"){
            const NewAnswer = {
                id: uuidv4(),
                answerName:'',
                isCorrect: false       
            }
            let index = questionClone.findIndex(item => item.id === questionId)
            questionClone[index].answers.push(
                NewAnswer
            )
            setQuestions(questionClone)
        }
        if(type === "REMOVE"){
            let index = questionClone.findIndex(item => item.id === questionId)
            if(index > -1)
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleOnChange = (type,questionId,value) => {
        if(type === 'QUESTION'){
            let questionClone = _.cloneDeep(questions)
            let index = questionClone.findIndex(item => item.id === questionId)
            if(index > -1){
                questionClone[index].questionName = value
                setQuestions(questionClone)

            }
        }
    }

    const handleAnswerQuestion = (type,answerId,questionId,value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if(index > -1){
            questionClone[index].answers =
            questionClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    if(type === "CHECKBOX"){
                        answer.isCorrect = value
                    }
                    if(type === "INPUT"){
                        answer.answerName = value
                    }
                    
                }
                return answer;
            })
            setQuestions(questionClone)
        }
    }
    
    const handleSelectQuestion = (questionId,event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        console.log("event >>>",event)
        if(index > -1){
            questionClone[index].levelId = event.value
        }
        setQuestions(questionClone)
    }


    const handleSaveQuestions = async () => {

        //validate question
        let indexQ1 = 0;
        let isValidQ = true;
        for(let i = 0; i < questions.length; i++){
            if(!questions[i].topicId){
                isValidQ = false;
                indexQ1 = i;
                break;                
            }
            if(!questions[i].questionName){
                isValidQ = false;
                indexQ1 = i;
                break;
            }
        }
        if(isValidQ === false){
            toast.error(`not empty Topic Id for question ${indexQ1 + 1}`)
        }
        if(isValidQ === false){
            toast.error(`not empty questionName for question ${indexQ1 + 1}`)
        }

        //validate answer
        let indexQ = 0, indexA = 0;
        let isValidAnswer = true;
        for(let i = 0; i < questions.length; i++){
            if(questions[i].answers.length < 3){
                toast.error("Required atleast 3 answer in question");
                return;
            }
            for(let j = 0; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j].answerName){
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if(isValidAnswer === false) break
        }
        if(isValidAnswer === false){
            toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
        }
        //submit question
        const createdQuestion = questions.map(async (question,index) => {
            console.log("question >>>>>",question)
            const q = await postQuestions(
                question.topicId,
                question.questionName,
                question.levelId,
                question.answers,
                localStorage.getItem("access_token")
            )
            return q;
        })
        let a = await Promise.all(createdQuestion)
        toast.success("Create question and answer success!")
        // console.log("all >>", a)
        setQuestions(initquestion)
    }
    return(
        <div className="question-container">
            <div className="title-question-manager">
                manager-question
            </div>
            {questions && questions.length > 0 
            && questions.map((question,index) => {
                return(
                    <div key={question.id} className="add-new-question mb-5">
                <span>Add Questions</span>
                <div className='mt-3 flex-box'>
                    <div className='form-floating mb-3 col-6'>
                        <input 
                        type='text' 
                        className='form-control' 
                        placeholder='Id'
                        value={question.id}

                        />
                        <label className='q-name'>Id Question {index + 1}</label>
                        
                    </div>
                    <div className='col-3'>
                        <i class="fas fa-plus-square red" onClick={() => handleAddRemoveQuestion('ADD',question.id)}></i>
                        {
                            questions.length > 1 &&   <i class="fas fa-minus-square green" onClick={() => handleAddRemoveQuestion('REMOVE',question.id)}></i>
                        }

                    </div>
                </div>
                <div className='mt-3 flex-box'>

                <div className='form-floating mb-3 col-6'>
                    <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Question Name'
                    value={question.questionName}
                    onChange={(event) => handleOnChange('QUESTION',question.id, event.target.value)}
                    />
                    <label className='q-name'>Question {index + 1} Name</label>
                </div>
                </div>
                <div className='col-6 form-group'>
                    <label>Level:</label>
                    <Select
                        defaultValue={1}
                        onChange={(event) => handleSelectQuestion(question.id,event)}
                        options={listLevel}
                    />
                </div>
                {questions[index].answers && questions[index].answers.length
                && questions[index].answers.map((answer,index) => {
                    return(
                        <div key={answer.id} className='answers ml-5'>
                            <div className='flex-box'>
                            <input  
                            className="form-check-input m-center" 
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) => handleAnswerQuestion('CHECKBOX',answer.id,question.id, event.target.checked)}
                            /> 
                            <div className='form-floating mb-3 col-7'>
                                <input 
                                type='text' 
                                className='form-control w-h' 
                                placeholder='Answer 1'
                                value={answer.answerName}
                                onChange={(event) => handleAnswerQuestion('INPUT',answer.id,question.id, event.target.value)}
                                />
                                <label className='answer'>Answer {index + 1}</label>
                            </div>
                                <i class="fas fa-plus-circle q-m" onClick={() => handleAddRemoveAnswer("ADD", question.id)}></i>
                                {question.answers.length > 1 && 
                                    <i class="fas fa-minus-circle q-m"onClick={() => handleAddRemoveAnswer("REMOVE",question.id,answer.id)}></i>                                
                                }
                            </div>
                        </div>
                    )
                })}
                
            </div>
                )
            })}
            {
                questions && questions.length > 0 &&
                <div>
                    <button 
                    className='btn btn-primary'
                    onClick={() => handleSaveQuestions()}
                    >Save Questions</button>
                </div>
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Questions