import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { fetchAllTopicCoursebyId, fetchQuizTopicById, fetchAssignmentTopicById, fetchExternalResourceTopicById } from '../../../services/UserServices';
import _ from 'lodash';
import {ToastContainer, toast } from 'react-toastify';

const ContentGrade = (props) => {
    const {toggle,listTopic} = props
    // console.log("toggle >>>",toggle)
    // console.log("item Topic 1>>>",item)
    const [listAssignment,setListAssignment] = useState([]);
    const [assignmentTopic,setAssignmentTopic] = useState([])
    const [listUser,setListUser] = useState([]);
    const [listQuiz,setListQuiz] = useState([]);
    const [dataQuizDelete,setDataQuizDelete] = useState({});
    const [quizTopic,setQuizTopic] = useState([])
    const [externalResource,setExternalResource] = useState([])

      const handleOnClickShowDetail = async (id,item) => {
        // localStorage.removeItem(`quizId-${id}`)
        // console.log("item >>>",item)
        const res = await fetchQuizTopicById(id,localStorage.getItem("access_token"))
        const res1 = await fetchAssignmentTopicById(id,localStorage.getItem("access_token"))
        const res2 = await fetchExternalResourceTopicById(id,localStorage.getItem("access_token"))
        // console.log("res >>>",res)
        setQuizTopic(res);
        setAssignmentTopic(res1);
        setExternalResource(res2);
        // console.log("Quiz topic >>>",quizTopic)
      }
      const handleClickQuiz = (idQuiz,topicId) => {
        localStorage.setItem("idQuiz",idQuiz)
        localStorage.setItem("TopicId",topicId)
      }
      const handleClickAssignment = (idAssignment) => {
        localStorage.setItem("idAssignment",idAssignment)
      }
      const handleClickExternalResource = (idExternalResource) => {
        localStorage.setItem("idExternalResource",idExternalResource)
      }
  return (
    <div>
    <Accordion>
    {listTopic && listTopic.length > 0 &&
        listTopic.map((item,index) => {
            if(listTopic[index].isDeleted === false){
                return(
                <div key={`topic-${index}`}>
                    <Accordion.Item eventKey={`${index}`} onClick={() => handleOnClickShowDetail(item.id,item)}>
                        <Accordion.Header>                
                                    <div className="two-layer-top view-course-detail" >
                                    <span className='title-course-detail'>{item.topicName}</span>
                                    </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <div className='content-course-detail'>
                                {quizTopic && quizTopic.length > 0 && quizTopic.map((quiztopic, index) => {
                                        if (!quiztopic.quizName.toLowerCase().includes("mã đề")) {
                                            return (
                                                <Link to="/quiz" onClick={() => handleClickQuiz(quiztopic.id, item.id)} key={`topic-${index}`}>
                                                    <div className='quiz-border'>
                                                        <div className='title-content-assignment mt-14'>
                                                            <div className='icon-background-title blue'>
                                                                <i className="fas fa-book-medical"></i>
                                                            </div>
                                                            <div className='text-assignment'>
                                                                <span className='title-span-assignment'>Bài ôn tập</span>
                                                                <span className='title-span-assignment-2'>{quiztopic.quizName}</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      