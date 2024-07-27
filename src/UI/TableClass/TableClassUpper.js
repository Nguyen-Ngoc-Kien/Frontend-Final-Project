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
    toast.success("Update completely!");
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUser(cloneListUsers);
    handleClosed();
    toast.success("Update completely!");
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
      const res = await fetchCourseById(courseId, localStorage.getItem('access_token'));
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
    let result = [["ID", "Email", "First Name", "Last Name", "Course Name", "Status"]];
    if (listUser && listUser.length > 0) {
      listUser.forEach((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        arr[4] = item.courseName; // Include courseName in export data
        arr[5] = item.statusClass; // Include statusClass in export data
        result.push(arr);
      });
      setDataExport(result);
    }
  };

  const handleImport = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Upload only csv file...");
      } else {
        Papa.parse(file, {
          complete: function (results) {
            let dataRawCSV = results.data;
            if (dataRawCSV.length > 0 && dataRawCSV[0].length === 6) {
              if (dataRawCSV[0][0] !== "ID" || dataRawCSV[0][1] !== "Email" || dataRawCSV[0][2] !== "first_name" || dataRawCSV[0][3] !== "last_name" || dataRawCSV[0][4] !== "courseName" || dataRawCSV[0][5] !== "statusClass") {
                toast.error("Wrong format Header CSV File!");
              } else {
                let result = [];
                dataRawCSV.forEach((item, index) => {
                  if (index > 0 && item.length === 6) {
                    let obj = {
                      id: item[0],
                      email: item[1],
                      first_name: item[2],
                      last_name: item[3],
                      courseName: item[4],
                      statusClass: item[5]
                    };
                    result.push(obj);
                  }
                });
                setListUser(result);
              }
            } else {
              toast.error("Wrong format CSV File!");
            }
          }
        });
      }
    }
  };

  return (
    <Container>
      <div>
        <input
          type='text'
          className='form-control mt-3'
          placeholder='Search by Class.... '
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => (
              <tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.className}</td>
                <td>{item.courseName}</td>
                <td>{item.createdAt}</td>
                <td>{item.statusClass}</td>
                <td>
                  <Link to='/Class-detail'>
                    <i className="far fa-eye icon-td-5" onClick={() => localStorage.setItem("classId", item.id)}></i>
                  </Link>
                </td>
                <td>
                  <button className='btn btn-warning' onClick={() => handleEditUser(item)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
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