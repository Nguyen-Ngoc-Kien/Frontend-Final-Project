import { getQuizById } from '../../../../services/UserServices';
import { useEffect, useRef } from "react";

const RightContent = (props) => {
    const RefDiv = useRef([]);
    const {quiz,dataQuiz,HandlePrev,showTime} = props;
    // console.log("Data quiz >>>",dataQuiz)
    const onTimeUp = () => {
        props.HandleFinish();
    }

    const getClassQuestion = (index,question) => {
        // console.log(index,question)
        if(question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true)
            // console.log('index',index,isAnswered)
            if(isAnswered){
                return "circle-question selected"
            }
        }
        return 'circle-question';
    }
    
    const handleClickQuestion = (question,index) => {
        props.setIndex(index)
        // if(RefDiv.current){
        //     RefDiv.current.forEach(item => {
        //         if(item && item.className === 'circle-question clicked'){
        //             item.className = 'circle-question'
        //         }
        //     })
        // }
        // let isAnswered = question.answers.find(a => a.isSelected === true)
        // if(isAnswered){
        //     return "circle-question selected"            
        // }
        // RefDiv.current[index].className= "circle-question clicked"
    }
    return(
        <div className="container">
            <div className="main-question">
            {dataQuiz && dataQuiz.length > 0
                && dataQuiz.map((item,index) => {
                    return(
                        <div 
                        key={`question-abc-${index+1}`} 
                        className={getClassQuestion(index,item)}
                        onClick={() => handleClickQuestion(item,index)}
                        ref={element => RefDiv.current[index] = element}
                        >{index + 1}</div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default RightContent;