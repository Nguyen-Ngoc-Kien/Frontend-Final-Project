import axios from './Customize-aixos';

const fetchAllClass = (page,access_token) => {
    return axios.get(`/class`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const fetchClassById = (id,access_token) => {
    return axios.get(`class/${id}`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const PostCreateClass = (Form,access_token) => {
    return axios.post("/class/createClass",Form,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const putUpdateClass = (name,job,access_token) => {
    return axios.patch("/class/editClass",{name,job},{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const deleteClass = (id,access_token) => {
    return axios.delete(`user/deleteUser/${id}`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const fetchAllUser = (page,access_token) => {
    return axios.get(`/user`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const PostCreateUser = (data,access_token) => {
    return axios.post("user/createUser",data,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const patchUpdateUser = (id,access_token,data) => {
    return axios.patch(`user/editUser/${id}`,data,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const deleteUser = (id,access_token) => {
    return axios.delete(`user/deleteUser`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const loginApi = (email,password) => {
    return axios.post("auth/signin",{email,password});
}

const fetchUserProfile = (access_token) => {
    return axios.get(`/user/profile`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const fetchAllCourse = (page,access_token) => {
    return axios.get(`/course`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const fetchCourseById = (id,access_token) => {
    return axios.get(`/course/${id}`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const PostCreateCourse = (data,access_token) => {
    return axios.post("course/createCourse",data,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const patchUpdateCourse = (id,access_token,data) => {
    return axios.patch(`course/editCourse/${id}`,data,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const deleteCourse = (id,access_token) => {
    return axios.delete(`course/deleteCourse/${id}`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const getQuestionQuizbyId = (id,access_token) => {
    return axios.get(`question/topic/${id}`,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const postSubmitQuiz = (id,data,access_token) => {
    return axios.post(`quiz/attemptQuiz/${id}`,{...data},{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const postCreateQuiz = (Form,access_token) => {
    return axios.post('quiz/createQuiz',Form,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

const postQuestions = (topicId,questionName,levelId,answers,access_token) => {
    const data = {
        topicId: null,
        questionName:'',
        levelId: 1,
        answers: [
            {
                answerName:'',
                isCorrect: false
            }
        ]
    };
    data.topicId = topicId;
    data.questionName = questionName;
    data.levelId = levelId;
    data.answers = answers;
    return axios.post('question/createQuestion',data,{
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    })
}

    const getQuizById = (id,access_token) => {
        return axios.get(`quiz/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }


    const fetchAllDepartment = (page,access_token) => {
        return axios.get(`/department`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchDepartmentById = (id,access_token) => {
        return axios.get(`/department/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateDepartment = (Form,access_token) => {
        return axios.post("department/createDepartment",Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteDepartment = (id,access_token) => {
        return axios.delete(`department/deleteDepartment/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateDepartment = (id,access_token, data) => {
        console.log("dâta ÚS >>>",data)
        return axios.patch(`department/editDepartment/${id}`,data, {
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAllCurriculum = (page,access_token) => {
        return axios.get(`/curriculum`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateCurriculum = (Form,access_token) => {
        return axios.post("curriculum/createCurriculum",Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
        
    }

    const deleteCurriculum = (id,access_token) => {
        return axios.delete(`curriculum/deleteCurriculum/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateCurriculum = (id,access_token,data) => {
        return axios.patch(`curriculum/editCurriculum/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAllTopicCoursebyId = (id,access_token) => {
        return axios.get(`/topic/course/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateTopicCourse = (Form,access_token) => {
        return axios.post("topic/createTopic",Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteTopicFromId = (id,access_token) => {
        return axios.delete(`topic/deleteTopic/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateTopicCourse = (id,access_token,data) => {
        return axios.patch(`topic/editTopic/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchQuizTopicById = (id,access_token) => {
        return axios.get(`quiz/topic/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchQuizById = (id,access_token) => {
        return axios.get(`quiz/trainer/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteQuiz = (id,access_token) => {
        return axios.delete(`quiz/deleteQuiz/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }


    const patchUpdateQuiz = (id,access_token,data) => {
        return axios.patch(`quiz/editQuiz/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchQuestionById = (id,access_token) => {
        return axios.get(`/question/topic/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteQuestion = (id,access_token) => {
        return axios.delete(`question/deleteQuestion/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateQuestion = (id,access_token,data) => {
        return axios.patch(`question/editQuestion/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchQuestionId = (id,access_token) => {
        return axios.get(`/question/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchQuizTraineeById = (id,access_token) => {
        return axios.get(`quiz/trainee/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const shuffleQuizById = (id,access_token,data) => {
        return axios.post(`quiz/shuffleQuiz/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAllLevel = (page,access_token) => {
        return axios.get('/level',{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteLevel = (id,access_token) => {
        return axios.delete(`level/deleteLevel/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateLevel = (Form,access_token) => {
        return axios.post("level/createLevel",Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateLevel = (id,access_token, data) => {
        return axios.patch(`level/editLevel/${id}`,data, {
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAllJob = (page,access_token) => {
        return axios.get('/job',{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateJob = (Form,access_token) => {
        return axios.post("job/createJob",Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteJob = (id,access_token) => {
        return axios.delete(`job/deleteJob/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateJob = (id,access_token, data) => {
        return axios.patch(`job/editJob/${id}`,data, {
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchStatusById = (id,access_token) => {
        return axios.get(`statusClass/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const postCreateAssignment = (Form,access_token) => {
        return axios.post('assignment/createAssignment',Form,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAssignmentTopicById = (id,access_token) => {
        return axios.get(`assignment/topic/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteAssignment = (id,access_token) => {
        return axios.delete(`assignment/deleteAssignment/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAssignmentById = (id,access_token) => {
        return axios.get(`assignment/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchAllStatusClass = (page,access_token) => {
        return axios.get(`/statusClass`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const PostCreateStatusClass = (data,access_token) => {
        return axios.post("statusClass/createStatusClass",data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const deleteStatusClass = (id,access_token) => {
        return axios.delete(`statusClass/deleteStatusClass/${id}`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const patchUpdateStatusClass = (id,access_token,data) => {
        return axios.patch(`statusClass/editStatusClass/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const approveClass = (id,data,access_token) => {
        return axios.patch(`class/approveClass/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const rejectClass = (id,data,access_token) => {
        return axios.patch(`class/rejectClass/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const registerClass = (id,data,access_token) => {
        return axios.post(`class/registerClass/${id}`,data,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

    const fetchUserRegister = (classId,access_token) => {
        return axios.get(`allRegisters/`,{
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        })
    }

export {fetchAllClass, fetchClassById, PostCreateClass, putUpdateClass,deleteClass,loginApi,fetchAllUser,patchUpdateUser,deleteUser,PostCreateUser,fetchUserProfile, deleteCourse, patchUpdateCourse, PostCreateCourse ,fetchAllCourse,getQuestionQuizbyId, postSubmitQuiz,postCreateQuiz, postQuestions, getQuizById, fetchAllDepartment, PostCreateDepartment,deleteDepartment, patchUpdateDepartment, fetchAllCurriculum, PostCreateCurriculum, deleteCurriculum, patchUpdateCurriculum, fetchAllTopicCoursebyId, PostCreateTopicCourse, deleteTopicFromId, patchUpdateTopicCourse, fetchQuizTopicById, fetchQuizById,deleteQuiz, patchUpdateQuiz, fetchQuestionById, deleteQuestion, patchUpdateQuestion, fetchQuestionId, fetchQuizTraineeById, shuffleQuizById, fetchAllLevel, deleteLevel, PostCreateLevel, patchUpdateLevel, fetchAllJob, PostCreateJob, deleteJob, patchUpdateJob, fetchStatusById, postCreateAssignment, fetchAssignmentTopicById, deleteAssignment, fetchAssignmentById, fetchAllStatusClass, PostCreateStatusClass, deleteStatusClass, patchUpdateStatusClass, fetchDepartmentById, fetchCourseById, approveClass, rejectClass, registerClass}