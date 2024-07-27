import React, { useState, useEffect } from 'react';
import { fetchUserById } from '../../../services/UserServices';

const DetaiUser = () => {
    const [fieldDisabled, setFieldDisable] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [jobId, setJobId] = useState('');
    const [birthDay, setBirthDay] = useState('');
    const [inputsDisabled, setInputsDisabled] = useState(true); // State mới để quản lý trạng thái disable/enable inputs

    const getUser = async () => {
        try {
            const res = await fetchUserById(localStorage.getItem("idUser"), localStorage.getItem("access_token"));
            console.log("res user >>>", res);
            if (res) {
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setEmail(res.email);
                setPhone(res.phone);
                setRole(res.role);
                setJobId(res.jobId);
                // Định dạng ngày sinh sang DD/MM/YYYY
                const formattedBirthday = formatDate(res.dob);
                setBirthDay(formattedBirthday);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        getUser();
    }, []);

    // Sử dụng useEffect để theo dõi thay đổi của fieldDisabled và điều chỉnh trạng thái của inputs
    useEffect(() => {
        setInputsDisabled(fieldDisabled);
    }, [fieldDisabled]);

    return (
        <div>
            <div className='body b-greyy'>
                <div className='background b-emu'>
                    <form>
                        <fieldset disabled={inputsDisabled}>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput1" className="form-label">Họ và tên đệm</label>
                                <input type="text" id="disabledTextInput1" className="form-control" value={firstName} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput2" className="form-label">Tên</label>
                                <input type="text" id="disabledTextInput2" className="form-control" value={lastName} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput3" className="form-label">Số điện thoại</label>
                                <input type="text" id="disabledTextInput3" className="form-control" value={phone} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput4" className="form-label">Email</label>
                                <input type="text" id="disabledTextInput4" className="form-control" value={email} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput5" className="form-label">Vai trò</label>
                                <input type="text" id="disabledTextInput5" className="form-control" value={role} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput6" className="form-label">Công việc</label>
                                <input type="text" id="disabledTextInput6" className="form-control" value={jobId} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput7" className="form-label">Ngày sinh</label>
                                <input type="text" id="disabledTextInput7" className="form-control" value={birthDay} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetaiUser;