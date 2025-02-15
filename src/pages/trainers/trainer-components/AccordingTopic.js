                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                handleclosed();
        toast.success("Update completely!")    
      }

      const handleDeleteAssignment = (event,item) => {
        event.preventDefault();
        setIsShowModalDeletedAssignment(true)
        setDataAssignmentDelete(item)
        console.log("data Assignment delete >>>",dataAssignmentDelete)
    }

    const handleDeleteAssignmentFromModal = (user) => {
        let cloneListAssignments = _.cloneDeep(listAssignment);
        cloneListAssignments = cloneListAssignments.filter(item => item.id !== user.id)
        console.log("clonelistAssignment >>>",cloneListAssignments)
        setListAssignment(cloneListAssignments);
        handleclosed();
        toast.success("Update completely!")    
      }

      const handleDeleteExternalResource = (event,item) => {
        event.preventDefault();
        setIsShowModalDeletedExternalResource(true)
        setDataExternalResourceDelete(item)
        console.log("data externalresource delete >>>",dataExternalResourceDelete)
    }

    const handleDeleteExternalResourceFromModal = (user) => {
        let cloneListExternalResources = _.cloneDeep(listExternalResource);
        cloneListExternalResources = cloneListExternalResources.filter(item => item.id !== user.id)
        console.log("cloneListExternalResources >>>",cloneListExternalResources)
        setListExternalResource(cloneListExternalResources);
        handleclosed();
        toast.success("Update completely!")    
      }

      const handleEditUserFromModal = (user) => {
        console.log("user123 >>>",user)
        console.log("listTopic >>>",listUser)
        let cloneListUsers = _.cloneDeep(listTopic);
        let index = listTopic.findIndex(item => item.id === user.id)
        cloneListUsers[index].topicName = user.topicName;
        setListUser(cloneListUsers);
        handleclosed();
        toast.success("Update completely!")
      }
      const handleEditUser = (user) => {
        // console.log("list user >>>>",listUser)
        // console.log("User >>>", user)
        setDataUserEdit(user)
        setIsShowModalEdit(true)
      }

      const handleEditQuizFromModal = (user) => {
        // console.log("user123 >>>",user)
        // console.log("listTopic >>>",listUser)
        let cloneQuizUsers = _.cloneDeep(listQuiz);
        let index = listQuiz.findIndex(item => item.id === user.id)
        setListQuiz(cloneQuizUsers);
        handleclosed();
        toast.success("Update completely!")
      }

      const handleEditQuiz = (event,user) => {
        event.preventDefault();
        // console.log("list user >>>>",listUser)
        // console.log("User >>>", user)
        setDataQuizEdit(user)
        setIsShowModalEdited(true)
      }

      const handleOnClickShowDetail = async (id,item) => {
        // localStorage.removeItem(`quizId-${id}`)
        // console.log("item >>>",item)
        const res = await fetchQuizTopicById(id,localStorage.getItem("access_token"))
        const res1 = await fetchAssignmentTopicById(id,localStorage.getItem("access_token"))
        const res2 = await fetchExternalResourceTopicById(id,localStorage.getItem("access_token"))
        console.log("res1 >>>",res1)
        console.log("res2 >>>",res2)
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
                                    <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={() => handleEditUser(item)}></i>
                                    <i className={`fas fa-trash-alt icon-trash-vcd ${toggle ? 'hide' : 'hien'}`}  onClick={(event) => handleDeleteUser(event,item)}></i>
                                    </div>
                        </Accordion.Header>
                        <Accordion.Body>
                        <div className='content-course-detail'>
                        {quizTopic.length === 0 && (
                            <div className={'layer-bot view-course-detail-2'}>
                                    <div className="khung-layer-bot view-course-detail-3">
                                    <span className='content-layer-bot '>Chưa có hoạt động</span>
                                    </div>
                                </div>
                        )}
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
                                                            </div>
                                                            <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleEditQuiz(event, quiztopic)}></i>
                                                            <i className={`fas fa-trash-alt ml-100 ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleDeleteQuiz(event, quiztopic)}></i>
                                                        </div>
                                                        <div className='content-assignment w-1109'>
                                                            <div className='header-title-quiz'>
                                                                <span className='description-assignment'>{quiztopic.quizName}</span>
                                                                <div className='status-quiz'>Đang diễn ra</div>
                                                            </div>
                                                            <hr className='hr-assignment-content w-1059'></hr>
                                                            <span className='description-assignment-6'>Thời gian mở 07:00:47 25/12/2023</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        } else {
                                            return null; // Không render gì nếu có chứa chuỗi "mã đề" trong quizName
                                        }
                                    })}
                                    {assignmentTopic && assignmentTopic.length > 0 && assignmentTopic.map((assignmenttopic, index) => {
                                        return(
                                            <Link to="/assignment" onClick={() => handleClickAssignment(assignmenttopic.id)} key={`topic-${index}`}>
                                                    <div className='quiz-border'>
                                                        <div className='title-content-assignment mt-14'>
                                                            <div className='icon-background-title'>
                                                                <i class="fas fa-paste"></i>
                                                            </div>
                                                            <div className='text-assignment'>
                                                                <span className='title-span-assignment'>Bài Tập Lớn</span>
                                                                <span className='title-span-assignment-2'>{assignmenttopic.name}</span>
                                                            </div>
                                                            <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleEditQuiz(event, assignmenttopic)}></i>
                                                            <i className={`fas fa-trash-alt ml-100 ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleDeleteAssignment(event, assignmenttopic)}></i>
                                                        </div>
                                                        <div className='content-assignment w-1109'>
                                                            <div className='header-title-quiz'>
                                                                <span className='description-assignment'>{assignmenttopic.name}</span>
                                                                <div className='status-quiz'>Đang diễn ra</div>
                                                            </div>
                                                            <hr className='hr-assignment-content w-1059'></hr>
                                                            <span className='description-assignment-6'>Thời gian mở {assignmenttopic.startAt}</span>
                                                            <div className='description-assignment-6'>Thời gian đóng {assignmenttopic.endAt}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                        )

                                    })
                                    }
                                    {externalResource && externalResource.length > 0 && externalResource.map((externalResource, index) => {
                                        return(
                                            <Link to="/external-resource-detail" onClick={() => handleClickExternalResource(externalResource.id)} key={`topic-${index}`}>
                                                    <div className='quiz-border'>
                                                        <div className='title-content-assignment mt-14'>
                                                            <div className='icon-background-title'>
                                                                <i class="fas fa-link"></i>
                                                            </div>
                                                            <div className='text-assignment'>
                                                                <span className='title-span-assignment'>Tài liệu</span>
                                                                <span className='title-span-assignment-2'>{externalResource.name}</span>
                                                            </div>
                                                            <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleEditQuiz(event, externalResource)}></i>
                                                            <i className={`fas fa-trash-alt ml-100 ${toggle ? 'hide' : 'hien'}`} onClick={(event) => handleDeleteExternalResource(event, externalResource)}></i>
                                                        </div>
                                                        <div className='content-assignment w-1109'>
                                                            <div className='header-title-quiz'>
                                                                <span className='description-assignment'>{externalResource.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                        )

                                    })
                                    }
                                <div className={`layer-bot view-course-detail-2 hover-background ${toggle ? 'hide' : 'hien'}`} onClick = {() => setIsShowModalAddNewAct(true)} >
                                    <div className={`view-course-detail-3 flex`} onClick={() => localStorage.setItem("idTopic",item.id)}>
                                        <div className='khung-icon'>
                                            <i className="fas fa-plus icon-plus"></i>
                                        </div>
                                        <span className='content-layer-bot span-add-acti'>Thêm hoạt động</span>
                                    </div>
                                </div>

                            </div>

                            <Modal show={isShowModalAddNewAct} onHide={handleclosed}>
                            <div className='border-cover-content'>
                                <div className='Header-add-active-content'>
                                    <span className='Header-text'>Thêm hoạt động</span>
                                </div>
                                <hr className='hr-add-active'></hr>
                                <div className='Body-add-active-content'>
                                <Link to='/External-Resource'>
                                    <div className='Khung-add-active'>
                                        <div className='Khung-icon-add-active'>
                                            <i class="fas fa-link icon-add-active"></i>
                                        </div>
                                        <span className='name-add-active'>Nguồn ngoài</span>
                                    </div>
                                </Link>
                                <Link to={`/manager-quizzes`}>
                                    <div className='Khung-add-active'>
                                        <div className='Khung-icon-add-active-2'>
                                            <i class="fas fa-book-medical icon-add-active"></i>
                                        </div>
                                        <span className='name-add-active-1'>Bài ôn tập</span>
                                    </div>
                                </Link>
                                    <Link to='add-assignment'>
                                        <div className='Khung-add-active'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              