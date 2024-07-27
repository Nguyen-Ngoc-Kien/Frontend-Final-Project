import React, { useEffect } from 'react';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ContentGrade from './AccordingTopic';
import { fetchAllTopicCoursebyId , fetchQuizTopicById } from '../../../services/UserServices';
import _ from "lodash"
import { toast, ToastContainer } from 'react-toastify';

const CourseDetails = (props) => {
    const params = useParams();
    const courseId = params.id;
    const [toggle, setToggle] = useState(true)
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [listTopic,setListTopic] = useState([]);

    const HandleToggle = () => {
        console.log("Click")
        setToggle(() => {
            return !toggle
        })
    }
    const handleclosed = () => {
        setIsShowModalAddNew(false);
    }

    const handleUpdateTable = (topic) => {
        setListTopic([topic, ...listTopic]);
    }

    useEffect(() => {
        getTopicCourseById()
    },[listTopic])
    const getTopicCourseById = async () => {
        const res = await fetchAllTopicCoursebyId(courseId,localStorage.getItem("access_token"))
        // console.log("res >>>",res)
        if(res && res.length > 0){
            setListTopic(res)
        }
    }

    // const getQuizTopicById = async () => {
    //     const res = await fetchQuizTopicById()
    // }

    return (
        <div>
        <div>
        <div className="background-image">
            <div className="nen-mo-1"></div>
            <div className="nen-mo-2 vcd-2"></div>
            <img src={imgForest} alt="" className="img-forest"></img>
        </div>
        <div className="background-content bgc-vcd">
            <span className="class mr-auto">Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng</span>
            <div className='Link-detail-class-upper'>
                Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng
            </div>
            <div className='layer-top-upper-detail-class'>
                <div className='two-layer-detail-class-upper  bg-active'>
                    <i class="fas fa-file-alt course-detail"></i>
                    <span className='title-detail-class-upper'>NỘI DUNG</span>
                </div>
                <Link to='/mark-quiz' className='two-layer-detail-class-upper'>
                    <i class="fas fa-star course-detail"></i>
                    <span className='title-detail-class-upper'>ĐIỂM</span>
                </Link>
                <Link to='/classList' className='two-layer-detail-class-upper'>
                    <i class="fas fa-users course-detail"></i>
                    <span className='title-detail-class-upper'>DANH SÁCH LỚP</span>
                </Link>
            </div>
            <ContentGrade
            toggle = {toggle }
            listTopic={listTopic}
             ></ContentGrade>
        </div>
        </div>
        </div>
    );
};

export default CourseDetails;