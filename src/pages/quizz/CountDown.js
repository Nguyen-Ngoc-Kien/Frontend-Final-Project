import React, { useState, useEffect } from "react";

const CountDown = (props) => {
    const { quiz } = props;

    // Determine initialTimeLimit based on quiz.timeLimit
    const initialTimeLimit = (parseInt(quiz.timeLimit)) ? parseInt(quiz.timeLimit) : 10; // Default to 10 if quiz.timeLimit is invalid

    const [count, setCount] = useState(initialTimeLimit * 60); // Convert minutes to seconds

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num % 3600) / 60);
        const seconds = sec_num % 60;

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .join(":");
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => {
                if (prevCount <= 0) {
                    clearInterval(timer);
                    props.onTimeUp();
                    return 0;
                } else {
                    return prevCount - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <span className="timeCount">Thời gian còn lại:</span>
            <div className="countdown-container">
                {toHHMMSS(count)}
            </div>
        </div>
    );
}

export default CountDown;