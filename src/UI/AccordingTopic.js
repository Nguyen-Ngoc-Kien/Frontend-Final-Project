import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ContentGrade = (props) => {
    const {toggle} = props
    console.log("toggle >>>",toggle)

    const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
    // const [click, setClick] = useState(true)
    // const HandleClick = () => {
    //   console.log("Click")
    //   setClick(() => {
    //       return !click
    //   })
    // }
    const handleclosed = () => {
        setIsShowModalAddNew(false);
    }
  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>                
                    <div className="two-layer-top view-course-detail">
                    <span className='title-course-detail'>Các vi khuẩn Gram âm không lên men đường</span>
                    <i className={`fas fa-pencil-alt icon-pencil-vcd ${toggle ? 'hide' : 'hien'}`}></i>
                    <i className={`fas fa-trash-alt icon-trash-vcd ${toggle ? 'hide' : 'hien'}`}></i>
                    </div>
        </Accordion.Header>
        <Accordion.Body>
        <div className='content-course-detail'>
                    <div className={'layer-bot view-course-detail-2'}>
                    <div className="khung-layer-bot view-course-detail-3">
                    <span className='content-layer-bot '>Chưa có hoạt động</span>
                    </div>
                </div>
                <div className={`layer-bot view-course-detail-2 hover-background ${toggle ? 'hide' : 'hien'}`} onClick={() => setIsShowModalAddNew(true)}>
                    <div className={`view-course-detail-3 flex`}>
                        <div className='khung-icon'>
                            <i className="fas fa-plus icon-plus"></i>
                        </div>
                        <span className='content-layer-bot span-add-acti'>Thêm hoạt động</span>
                    </div>
                </div>
            </div>

            <Modal show={isShowModalAddNew} onHide={handleclosed}>
            <div className='border-cover-content'>
                <div className='Header-add-active-content' >
                    <span className='Header-text'>Thêm hoạt động</span>
                </div>
                <hr className='hr-add-active'></hr>
                <div className='Body-add-active-content'>
                <Link to='add-link-assignment'>
                    <div className='Khung-add-active'>
                        <div className='Khung-icon-add-active'>
                            <i class="fas fa-link icon-add-active"></i>
                        </div>
                        <span className='name-add-active'>Nguồn ngoài</span>
                    </div>
                </Link>
                <Link to='add-homework'>
                    <div className='Khung-add-active'>
                        <div className='Khung-icon-add-active-2'>
                            <i class="fas fa-book-medical icon-add-active"></i>
                        </div>
                        <span className='name-add-active-1'>Bài ôn tập</span>
                    </div>
                </Link>
                    <Link to='add-assignment'>
                        <div className='Khung-add-active'>
                            <div className='Khung-icon-add-active-3'>
                                <i class="fas fa-file-alt icon-add-active"></i>
                            </div>
                            <span className='name-add-active-1'>Bài tập lớn</span>
                        </div>
                    </Link>
                </div>
                <hr className='hr-add-active'></hr>
                <div className='Footer-add-active-content'>
                    <span className='text-foot-add-active' onClick={() => handleclosed()}>ĐÓNG</span>
                </div>
            </div>
            </Modal>            

        </Accordion.Body>
      </Accordion.Item>
      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item> */}
    </Accordion>
  );
}

export default ContentGrade;