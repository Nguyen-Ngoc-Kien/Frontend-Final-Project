import { useEffect, useState } from "react"
import { getQuizbyId } from "../../services/UserServices";
const ListQuiz = (props) => {
    const [arrQuiz,setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        const res = await getQuizbyId();
        console.log("res Quiz >>>",res);
        if(res === 0){
            setArrQuiz(res)
        }
    }
    return(
        <div className="list-quiz-container">
            {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz,index) =>{
              return(
                <div key={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" src="..." alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Quiz {index + 1}</h5>
                    <p className="card-text">{quiz.description}</p>
                    <button href="#" className="btn btn-primary">Start Now</button>
                </div>
            </div>
              )  
            })}
        </div>
    )
}

export default ListQuiz