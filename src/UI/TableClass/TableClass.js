import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import ModalAddnew from './ModalAddnew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import { fetchAllClass, fetchStatusById, fetchCourseById } from './../../services/UserServices';

const TableUsers = ({ filterStatus }) => {
  const [listUser, setListUser] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    getUsers(1);
  }, [filterStatus]);

  const handlePageClick = (event) => {
    getUsers(event.selected + 1);
  };

  const handleClosed = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUser(cloneListUsers);
    handleClosed();
    toast.success("Cập nhật thành công!");
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUser(cloneListUsers);
    handleClosed();
    toast.success("Xóa thành công!");
  };

  const getStatusById = async (statusClassId) => {
    try {
      const res = await fetchStatusById(statusClassId, localStorage.getItem("access_token"));
      return res.statusClass; // Return the status class from the API call
    } catch (error) {
      console.error("Error fetching status:", error);
      return ""; // Handle error gracefully, return empty string or default value
    }
  };

  const getCourseById = async (courseId) => {
    try {
      const res = await fetchCourseById(courseId, localStorage.getItem("access_token"));
      return res.courseName; // Return the course name from the API call
    } catch (error) {
      console.error("Error fetching course:", error);
      return ""; // Handle error gracefully, return empty string or default value
    }
  };

  const getUsers = async (page) => {
    try {
      const res = await fetchAllClass(page, localStorage.getItem("access_token"));
      if (res && res.length > 0) {
        let filteredList = res;
        if (filterStatus !== 0) {
          filteredList = res.filter(user => user.statusClassId === filterStatus);
        }
        setListUser(filteredList);
        setTotalPages(Math.ceil(filteredList.length / 6));

        // Fetch courseName and statusClass for each user
        const promises = filteredList.map(async (user) => {
          const courseName = await getCourseById(user.courseId);
          const statusClass = await getStatusById(user.statusClassId);
          return {
            ...user,
            courseName: courseName,
            statusClass: statusClass
          };
        });
        Promise.all(promises).then((updatedUsers) => {
          setListUser(updatedUsers);
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUser(cloneListUsers);
  };

  const handleSearch = _.debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUser);
      cloneListUsers = cloneListUsers.filter((item) => item.className.includes(term));
      setListUser(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 300);

  const getUsersExport = () => {
    let result = [["ID", "Lớp", "Khóa Học", "Ngày Tạo", "Trạng Thái"]];
    if (listUser && listUser.length > 0) {
      listUser.forEach((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.className;
        arr[2] = item.courseName; // Use courseName instead of courseId
        arr[3] = item.createdAt;
        arr[4] = item.statusClass;
        result.push(arr);
      });
      setDataExport(result);
    }
  };

  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Chỉ tải lên tệp CSV...");
      } else {
        Papa.parse(file, {
          complete: function (results) {
            let dataRawCSV = results.data;
            if (dataRawCSV.length > 0 && dataRawCSV[0].length === 5) {
              if (dataRawCSV[0][0] !== "ID" || dataRawCSV[0][1] !== "Lớp" || dataRawCSV[0][2] !== "Khóa Học" || dataRawCSV[0][3] !== "Ngày Tạo" || dataRawCSV[0][4] !== "Trạng Thái") {
                toast.error("Định dạng Header của tệp CSV không đúng!");
              } else {
                let result = [];
                dataRawCSV.forEach((item, index) => {
                  if (index > 0 && item.length === 5) {
                    let obj = {
                      id: item[0],
                      className: item[1],
                      courseName: item[2],
                      createdAt: item[3],
                      statusClass: item[4]
                    };
                    result.push(obj);
                  }
                });
                setListUser(result);
              }
            } else {
              toast.error("Định dạng tệp CSV không đúng!");
            }
          }
        });
      }
    }
  };

  return (
    <Container>
      <Link to="/Add-Class" className='add-class'>
        <button className='btn btn-success d-flex justify-spacebetween btn-addnewuser'>Thêm lớp</button>
      </Link>

      <div>
        <input
          type='text'
          className='form-control mt-3'
          placeholder='Tìm kiếm bằng tên lớp... '
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className='sort-header'>
                <span>ID</span>
                <span>
                  <i className="fas fa-long-arrow-alt-up arr-table" onClick={() => handleSort("asc", "id")}></i>
                  <i className="fas fa-long-arrow-alt-down arr-table" onClick={() => handleSort("desc", "id")}></i>
                </span>
              </div>
            </th>
            <th>Lớp</th>
            <th>
              <div className='sort-header'>
                <span>Khóa Học</span>
                <span>
                  <i className="fas fa-long-arrow-alt-up arr-table" onClick={() => handleSort("asc", "courseName")}></i>
                  <i className="fas fa-long-arrow-alt-down arr-table" onClick={() => handleSort("desc", "courseName")}></i>
                </span>
              </div>
            </th>
            <th>
              <div className='sort-header'>
                <span>Ngày Tạo</span>
              </div>
            </th>
            <th>Trạng Thái</th>
            <th>Chi Tiết</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => (
              <tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.className}</td>
                <td>{item.courseName}</td> {/* Use courseName instead of courseId */}
                <td>{item.createdAt}</td>
                <td>{item.statusClass}</td>
                <td>
                  <Link to='/Class-detail'>
                    <i className="far fa-eye icon-td-5" onClick={() => localStorage.setItem("classId", item.id)}></i>
                  </Link>
                </td>
                <td>
                  <button className='btn btn-warning' onClick={() => handleEditUser(item)}>Sửa</button>
                  <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Xóa</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <ModalAddnew
        handleUpdateTable={handleUpdateTable}
        show={isShowModalAddNew}
        handleClose={handleClosed}
      />

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

      <ModalEditUser
        handleEditUserFromModal={handleEditUserFromModal}
        handleClose={handleClosed}
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClosed}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />

      <div>
        <label htmlFor='import' className="btn btn-warning"><i className="fas fa-file-import"></i>Import</label>
        <input id="import" type="file" hidden onChange={(event) => handleImport(event)} />
        <CSVLink
          data={dataExport}
          asyncOnClick={true}
          onClick={getUsersExport}
          filename={"my-file.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <i className="fas fa-file-download"></i>  Export
        </CSVLink>
      </div>
    </Container>
  );
};

export default TableUsers;