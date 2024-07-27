import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllStatusClass } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import ModalAddnew from './ModalAddnew';
import ModalEditCourse from './ModalEditCourse';
import ModalConfirm from './ModalConfirm';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import _ from 'lodash';

const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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
    getUsers(1); // Load initial data on component mount
  }, []);

  const getUsers = async (page) => {
    try {
      const res = await fetchAllStatusClass(page, localStorage.getItem("access_token"));
      if (res && res.length > 0) {
        const totalRecords = res.length; // Total records received from API
        const itemsPerPage = 6; // Number of items per page

        // Calculate total pages based on total records and items per page
        const totalPagesCount = Math.ceil(totalRecords / itemsPerPage);

        setTotalUsers(totalRecords);
        setTotalPages(totalPagesCount);
        setCurrentPage(page - 1); // currentPage should be 0-indexed for ReactPaginate

        // Slice the result to get items for the current page
        const startIndex = (page - 1) * itemsPerPage;
        const slicedData = res.slice(startIndex, startIndex + itemsPerPage);

        setListUser(slicedData);
      } else {
        // Handle case where res is empty or no data is returned
        setListUser([]);
        setTotalUsers(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error fetching data
    }
  };

  const handlePageClick = (selectedPage) => {
    const newPage = selectedPage.selected + 1; // selected is 0-indexed, so +1 to get 1-indexed page
    getUsers(newPage);
  };

  const handleclosed = () => {
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
    let index = listUser.findIndex(item => item.id === user.id);
    cloneListUsers[index].courseName = user.courseName;
    setListUser(cloneListUsers);
    handleclosed();
    toast.success("Update completely!");
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUser(cloneListUsers);
    handleclosed();
    toast.success("Update completely!");
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
      cloneListUsers = cloneListUsers.filter(item => item.className.includes(term));
      setListUser(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 300);

  const getUsersExport = () => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      listUser.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
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
        // Parse local CSV file
        Papa.parse(file, {
          complete: function(results) {
            let dataRawCSV = results.data;
            if (dataRawCSV.length > 0) {
              if (
                dataRawCSV[0] &&
                dataRawCSV[0].length === 4 &&
                dataRawCSV[0][0] === "ID" &&
                dataRawCSV[0][1] === "Email" &&
                dataRawCSV[0][2] === "first_name" &&
                dataRawCSV[0][3] === "last_name"
              ) {
                let result = [];
                dataRawCSV.forEach((item, index) => {
                  if (index > 0 && item.length === 4) {
                    let obj = {
                      id: item[0],
                      email: item[1],
                      first_name: item[2],
                      last_name: item[3]
                    };
                    result.push(obj);
                  }
                });
                setListUser(result);
              } else {
                toast.error("Wrong format Header CSV File!");
              }
            } else {
              toast.error("Not found data on CSV File!...");
            }
          }
        });
      }
    }
  };

  return (
    <div className='container mt-5'>
      <button className='btn btn-success d-flex justify-spacebetween btn-addnewuser' onClick={() => setIsShowModalAddNew(true)}>Thêm mới trạng thái lớp học</button>
      <div>
        <input
          type='text'
          className='form-control'
          placeholder='Tìm kiếm trạng thái lớp học.... '
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
            <th>
              <span>Trạng thái lớp học</span>
              <span>
                <i className="fas fa-long-arrow-alt-up arr-table" onClick={() => handleSort("asc", "first_name")}></i>
                <i className="fas fa-long-arrow-alt-down arr-table" onClick={() => handleSort("desc", "first_name")}></i>
              </span>
            </th>
            <th>Ngày khởi tạo</th>
            <th>Ngày cập nhật</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
              if (!item.isDeleted) {
                return (
                  <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.statusClass}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className='btn btn-warning' onClick={() => handleEditUser(item)}>Sửa</button>
                      <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Xóa</button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
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
        forcePage={Math.min(currentPage, totalPages - 1)} // Ensure forcePage doesn't exceed totalPages - 1
      />

      <ModalAddnew
        handleUpdateTable={handleUpdateTable}
        show={isShowModalAddNew}
        handleClose={handleclosed}
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

      <ModalEditCourse
        handleEditUserFromModal={handleEditUserFromModal}
        handleClose={handleclosed}
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleclosed}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />

      <div>
        <label htmlFor='import' className="btn btn-warning"><i className="fas fa-file-import"></i>Import</label>
        <input id="import" type="file" hidden onChange={(event) => handleImport(event)} />
        <CSVLink
          data={dataExport}
          onClick={getUsersExport}
          filename={"my-file.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          <i className="fas fa-file-download"></i>  Export
        </CSVLink>
      </div>
    </div>
  );
};

export default TableUsers;