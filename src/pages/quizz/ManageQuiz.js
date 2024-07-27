import React, { useEffect, useState } from 'react';
import { fetchAllLevel, postCreateQuiz } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ManageQuiz = (props) => {
    const [topicId, setTopicId] = useState(localStorage.getItem("idTopic"));
    const [name, setName] = useState('');
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [totalTime, setTotalTime] = useState(null);
    const [weight, setWeight] = useState(null);
    const [seeAnswer, setSeeAnswer] = useState(false);
    const [listLevel, setListLevel] = useState([]);
    const [option, setOption] = useState([]);
    const [Form, setForm] = useState({
        topicId: topicId,
        quizName: name,
        timeLimit: totalTime,
        seeAnswer: seeAnswer,
        weight: weight,
        startAt: timeStart,
        endAt: timeEnd,
        option: [],
    });

    // Lấy danh sách các mức độ khó
    const getLevel = async () => {
        try {
            const res = await fetchAllLevel(1, localStorage.getItem("access_token"));
            setListLevel(res);
            // Khởi tạo option ban đầu từ danh sách mức độ khó
            const initialOption = res.map(level => ({
                levelId: level.id,
                numberOfLevelQuestion: 0,
            }));
            setOption(initialOption);
        } catch (error) {
            console.error("Error fetching levels:", error);
            toast.error("Failed to fetch levels");
        }
    };

    // Xử lý khi thay đổi số lượng câu hỏi theo mức độ khó
    const handleOnChangeNumberLevelQuestion = (event, id) => {
        const { value } = event.target;
        const updatedOption = option.map(opt => {
            if (opt.levelId === id) {
                return {
                    ...opt,
                    numberOfLevelQuestion: parseInt(value, 10),
                };
            }
            return opt;
        });
        setOption(updatedOption);
        setForm({
            ...Form,
            option: updatedOption,
        });
    };

    // Xử lý khi submit form
    const handleSubmitQuiz = async () => {
        if (!topicId || !name || !timeStart || !timeEnd || !totalTime || !weight || option.some(opt => opt.numberOfLevelQuestion <= 0)) {
            toast.error("Please fill in all required fields and ensure each level has at least one question.");
            return;
        }

        if (weight < 0 || weight > 1) {
            toast.error("Weight must be between 0.0 and 1.0");
            return;
        }

        try {
            const res = await postCreateQuiz(Form, localStorage.getItem("access_token"));
            console.log("res quiz >>>",res)
            if (res) {
                toast.success("Quiz created successfully");
                resetForm();
            } else {
                toast.error("Failed to create quiz");
            }
        } catch (error) {
            console.error("Error creating quiz:", error);
            toast.error("Failed to create quiz");
        }
    };

    // Reset form sau khi tạo quiz thành công
    const resetForm = () => {
        setName('');
        setTopicId('');
        setTimeStart(null);
        setTimeEnd(null);
        setSeeAnswer(false);
        setTotalTime(null);
        setWeight(null);
        const resetOption = option.map(opt => ({
            ...opt,
            numberOfLevelQuestion: 0,
        }));
        setOption(resetOption);
        setForm({
            topicId: '',
            quizName: '',
            timeLimit: null,
            seeAnswer: false,
            weight: null,
            startAt: null,
            endAt: null,
            option: [],
        });
    };

    useEffect(() => {
        getLevel();
    }, []);

    useEffect(() => {
        // Cập nhật Form khi các trường state thay đổi
        setForm({
            topicId: topicId,
            quizName: name,
            timeLimit: totalTime,
            seeAnswer: seeAnswer,
            weight: weight,
            startAt: timeStart,
            endAt: timeEnd,
            option: option,
        });
    }, [topicId, name, timeStart, timeEnd, totalTime, weight, seeAnswer, option]);

    return (
        <div className='container'>
            <div className="quiz-container-manager">
                <div className="title-quiz-manager">
                    Quản lý bài trắc nghiệm
                </div>
                <hr />
                <div className="add-new">
                    <fieldset className="border rounded-3 p-3" >
                        <legend className="float-none w-auto px-3">Thêm mới bài trắc nghiệm</legend>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tên bài trắc nghiệm*"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>Tên bài trắc nghiệm*</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Trọng số điểm*"
                                value={weight}
                                onChange={(event) => setWeight(event.target.value)}
                            />
                            <label>Trọng số điểm(From 0.0 to 1.0)*</label>
                        </div>
                        <div className="form-floating mb-3 three-layer">
                            <div className='time'>
                                <label>Thời gian bắt đầu*</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Thời gian bắt đầu*"
                                    value={timeStart}
                                    onChange={(event) => setTimeStart(event.target.value)}
                                />
                            </div>
                            <div className='time'>
                                <label>Thời gian kết thúc*</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    placeholder="Thời gian kết thúc*"
                                    value={timeEnd}
                                    onChange={(event) => setTimeEnd(event.target.value)}
                                />
                            </div>
                            <div className='time'>
                                <label>Time(minute)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Thời lượng làm bài*"
                                    value={totalTime}
                                    onChange={(event) => setTotalTime(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group-2">
                            <label>Cho phép xem phương án trả lời đúng*</label>
                            <input
                                className="form-check"
                                type="checkbox"
                                checked={seeAnswer}
                                onChange={() => setSeeAnswer(!seeAnswer)}
                            />
                        </div>
                        <div className="form-floating mb-3 three-layer">
                            {listLevel.map((item, index) => (
                                <div className='time' key={index}>
                                    <label>Number {item.level} Question*</label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        placeholder="Number of questions"
                                        value={option.find(opt => opt.levelId === item.id)?.numberOfLevelQuestion || ''}
                                        onChange={(event) => handleOnChangeNumberLevelQuestion(event, item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className='my-3'></div>
                        <div className='mt-3'>
                            <button
                                className='btn btn-warning'
                                onClick={() => handleSubmitQuiz()}
                            >Lưu</button>
                        </div>
                    </fieldset>
                </div>
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
        </div>
    );
};

export default ManageQuiz;