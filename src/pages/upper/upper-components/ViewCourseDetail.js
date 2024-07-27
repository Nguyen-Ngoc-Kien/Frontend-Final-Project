import React from 'react';
import { useState } from 'react';

function HandleClick(){
    const [toggle, setToggle] = useState(true)
    const HandleToggle = () => {
        console.log("Click")
        setToggle(() => {
            return !toggle
        })
    }
    return (
        <div className='body'>
            <div className='background'>
                <div className='content'>
                    <div className='Khung-content-course-detail'>
                        <div className='two-layer-top-course-detail'>
                            <i class="fas fa-window-restore course-detail-icon-1"></i>
                            <span className='text-course-detail'>Nội Dung</span>
                        </div>
                        <div className='content-course-detail'>
                            <div className="two-layer-top" onClick={() => HandleToggle()}>
                                <i class={`fas fa-chevron-up course-detail-icon-2 ${toggle ? "truotlen" : "truotxuong"}`}></i>
                                <i class={`fas fa-chevron-down course-detail-icon-3 ${toggle ? "hien" : "hide"}`}></i>
                                <span className='title-course-detail'>Các vi khuẩn Gram âm không lên men đường</span>
                            </div>
                            <div className={`layer-bot ${toggle ? "truotlen" : "truotxuong"}`}>
                                <div className="khung-layer-bot">
                                    <span className='content-layer-bot'>Chưa có hoạt động</span>
                                </div>
                            </div>
                        </div>
                        <div className='content-course-detail'>
                            <div className='two-layer-top' onClick={() => HandleToggle()}>
                                <i class="fas fa-chevron-up course-detail-icon-2"></i>
                                <i class="fas fa-chevron-down course-detail-icon-3"></i>
                                <span className='title-course-detail'>Các vi khuẩn Gram âm không lên men đường</span>
                            </div>
                            <div className='layer-bot'>
                                <div className='khung-layer-bot'>
                                    <span className='content-layer-bot'>Chưa có hoạt động</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}

const ViewCourseDetail = () => {
    return(
        <div>
            {HandleClick()}
        </div>
    )
};

export default ViewCourseDetail;