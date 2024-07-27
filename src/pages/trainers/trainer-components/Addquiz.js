import React from 'react';
import imgForest from './../../../data/image/Forestry-College-in-Tehri-Garhwal.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

function HandleClick(){
    const [toggle, setToggle] = useState(true)
    const [click, setClick] = useState(true)
    const HandleClick = () => {
        setClick(() => {
            return !click
        })
    }
    const HandleToggle = () => {
        console.log("Click")
        setToggle(() => {
            return !toggle
        })
    }
    return(
        <div>
        <div className="background-image">
            <div className="nen-mo-1"></div>
            <div className="nen-mo-2 vcd-2"></div>
            <img src={imgForest} alt="" className="img-forest"></img>
        <div className="background-content bgc-vcd">
        <span className="class mr-auto">Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng</span>
            <div className='Link-detail-class-upper'>
                Lớp học của tôi / Kỹ Thuật Xét Nghiệm Vi Sinh Lâm Sàng / Tạo bài tập lớn
            </div>
            <div className='layer-top-upper-detail-class'>
                <div className='two-layer-detail-class-upper'>
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
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Chung</Accordion.Header>
                        <Accordion.Body>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Tên*</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Mô tả</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Thời Gian</Accordion.Header>
                        <Accordion.Body>
                        <form>
                            <label for="birthdaytime">Thời gian mở</label>
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
                            <label for="birthdaytime">Thời gian đóng</label>
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
                            <label for="birthdaytime">Thời gian làm bài</label>
                            <input type="datetime-local" id="birthdaytime" name="birthdaytime"/>
                        </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Điểm</Accordion.Header>
                        <Accordion.Body>
                        <form>
                            <div class="form-row">
                                <div class="col">
                                <span>Điểm để vượt qua</span>
                                <input type="text" class="form-control" placeholder="First name"/>
                                </div>
                                <div class="col">
                                <span>Số lần làm bài</span>
                                <input type="text" class="form-control" placeholder="Last name"/>
                                </div>
                                <div class="col">
                                <span>Điểm để vượt qua</span>
                                <input type="text" class="form-control" placeholder="Last name"/>
                                </div>
                            </div>
                        </form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            <hr className='hr-add-assignment'></hr>
            <div className='two-button-layer'>
                <div className='create-and-back'>Tạo và quay về</div>
                <Link to='/quiz' className='w-tiny'>
                    <div className='create-and-back'>Tạo và hiển thị</div>
                </Link>
            </div>

        </div>
        </div>
        </div>
    )
}
const Addquiz = () => {
    return (
        <div>
            {HandleClick()}
        </div>
    );
};

export default Addquiz;