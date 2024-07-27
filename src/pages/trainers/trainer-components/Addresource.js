import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { Link } from 'react-router-dom';

const Addresource = () => {
    return (
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
                <div className='two-layer-detail-class-upper'>
                    <i class="fas fa-star course-detail"></i>
                    <span className='title-detail-class-upper'>ĐIỂM</span>
                </div>
                <div className='two-layer-detail-class-upper'>
                    <i class="fas fa-users course-detail"></i>
                    <span className='title-detail-class-upper'>DANH SÁCH LỚP</span>
                </div>
                <div className='two-layer-detail-class-upper'>
                    <i class="fas fa-comment-alt course-detail"></i>
                    <span className='title-detail-class-upper'>NGÂN HÀNG CÂU HỎI</span>
                </div>
                <div className='icon-setting-detail-class-upper'>
                    <i class="fas fa-cog cdetail"></i>
                </div>
                <div className='Thanh-truot-ngang-upper'>
                    <div className='thanh-truot'>                   
                    <Form>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Chỉnh sửa"
                        />
                    </Form>
                     </div>
                </div>
            </div>
            <div className='container'>
            <form action="" className='form-add-assignment'>
                            <span className='title-input-assignment'>Tên*</span>
                            <input type="text" name="fullname" className='input-add-assignment'/>
                            <br></br>
                            <span className='title-input-assignment'>Nội dung</span>
                            <input type="text" name="description" className='input-add-assignment-2'/>
                            <br></br>
                            <span className='title-input-assignment-3'>Mô tả</span>
                            <input type="text" name="guide" className='input-add-assignment-3'/>
                            <br></br>
                            <div className='layer-input-two-add-asgn'>
                                <div className='layer-1-add-asgn'>
                                <span className='title-input-assignment'>Định dạng bài</span>
                                </div>
                                <div className='layer-2-add-asgn'>
                                <span className='dinh-dang'>Định dạng bài</span> <br></br>
                                <input type="radio" name="gender" value="male" checked/> Mặc định <br></br>
                                <input type="radio" name="gender" value="female"/> Đánh giá lý thuyết <br></br>
                                <input type="radio" name="gender" value="other"/> Đánh giá kỹ năng <br></br>
                                </div>
                            </div>
                            Lớp có thể xem
                            <select className='select-add-asgn'>
                                <option value="0">Select class:</option>
                                <option value="1">Vệ sinh răng miệng</option>
                                <option value="2">Huyết học</option>
                            </select>
                            <br></br>
                            <span className='Link-add-assg'>
                                Đính kèm
                            </span>
                            <input type='file' className='input-file-assgm'/>
                        </form>
            </div>
            <hr className='view-course-detail-hr'></hr>
            <div className='two-button-layer'>
                <div className='create-and-back'>Tạo và quay về</div>
                <Link to='/assignment' className='w-tiny'>
                    <div className='create-and-back'>Tạo và hiển thị</div>
                </Link>
            </div>
        </div>
        </div>
    );
};

export default Addresource;