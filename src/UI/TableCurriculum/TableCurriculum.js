import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import {fetchAllCurriculum} from '../../services/UserServices';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAddnew';
import { ToastContainer, toast } from 'react-toastify';
import ModalEditCurriculum from './ModalEditCurriculum';
import _, { debounce } from 'lodash';
import ModalConfirm from './ModalConfirm'; 
import { CSVLink,CSVDownload } from 'react-csv';
import Papa from 'papaparse';


const TableUsers = (props) => {
  const [listUser,setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit,setIsShowModalEdit] = useState(false);
  const [dataUserEdit,setDataUserEdit] = useState({});
  const [isShowModalDelete,setIsShowModalDelete] = useState(false);
  const [dataUserDelete,setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword,setKeyword] = useState("");
  const [dataExport,setDataExport] = useState([]);
  // let index = 0;
  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  // ];

  const handlePageClick = (event) => {
    console.log("event >>> ",event)
    getUsers(+event.selected + 1)
  }

  const handleclosed = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);  
  }

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  }

  const handleEditUser = (user) => {
    console.log("list user >>>>",listUser)
    console.log("User >>>", user)
    setDataUserEdit(user)
    setIsShowModalEdit(true)
  }

const handleDeleteUser = (user) => {
  setIsShowModalDelete(true)
  setDataUserDelete(user)
}

  const handleEditUserFromModal = (user) => {
    // console.log("user >>>",user)
    let cloneListUsers = _.cloneDeep(listUser);
    let index = listUser.findIndex(item => item.id === user.id)
    // console.log("cloneListUsers >>>",cloneListUsers)
    // console.log("index >>>",index)
    cloneListUsers[index].curriculumName = user.curriculumName;
    setListUser(cloneListUsers);
    handleclosed();
    toast.success("Update completely!")
  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUser(cloneListUsers);
    handleclosed();
    toast.success("Update completely!")    
  }
  // {
  //   "id": 1,
  //   "email": "george.bluth@reqres.in",
  //   "first_name": "George",
  //   "last_name": "Bluth",
  //   "avatar": "https://reqres.in/img/faces/1-image.jpg"
  // }
  useEffect(() => {
    // call api
    // dry
    getUsers()
  }, [])
  const getUsers = async (page) => {
    let res = await fetchAllCurriculum(page,localStorage.getItem("access_token"));
    
    if(res){
      setTotalUsers(res.length)
      setTotalPages(Math.ceil(res.length/6))
      setListUser(res)
    }

    // console.log(">>> Check listuser ", listUser)
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    // console.log("SortBy, Sortfield >>> ",sortBy, sortField)
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUser(cloneListUsers)
  }
  const handleSearch = debounce((event) => {
    // console.log(event.target.value)
    let term = event.target.value;
    if(term){
      let cloneListUsers = _.cloneDeep(listUser);
      cloneListUsers = cloneListUsers.filter(item => item.className.includes(term))
      setListUser(cloneListUsers)
    }
    else{
      getUsers(1)
    }
  },300)

  const getUsersExport = (event,done) => {
    let result = [];
    if(listUser && listUser.length > 0){
      result.push(["ID","Email","First Name","Last Name"])
      listUser.map((item,index) => {
        let arr = []
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      })
      setDataExport(result);
      done();
    }
  }

  const handleImport = (event) => {
    if(event.target && event.target.files && event.target.files[0]){
      let file = event.target.files[0]
      if(file.type !== "text/csv"){
        toast.error("Upload only csv file...")
      }
      else{


      // Parse local CSV file
      Papa.parse(file, {
        // header:true,
        complete: function(results) {
          let dataRawCSV = results.data;
          if(dataRawCSV.length > 0) {
            if(dataRawCSV[0] && dataRawCSV[0].length === 4){
              if(dataRawCSV[0][0] !== "ID" || dataRawCSV[0][1] !=="Email" || dataRawCSV[0][2] !=="first_name" || dataRawCSV[0][3] !=="last_name"){
                toast.error("Wrong format Header CSV File!")
              }
              else{
                let result = []
                dataRawCSV.map((item,index) => {
                  if(index > 0 && item.length === 4){
                    let obj = {};
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj);
                  }
                })
                setListUser(result);
                // console.log(result)
              }
            }
            else{
              toast.error("Wrong format CSV File!")
            }
          }
          else{
            toast.error("Not found data on CSV File!...")
          }
          // console.log("Finished:", results.data);
        }
        
      });
    }
  }
  }
  return(
    <div className='container mt-5'>
          <button className='btn btn-success d-flex justify-spacebetween btn-addnewuser' onClick={() => setIsShowModalAddNew(true)}>Add new Curriculum</button>
          <div>
            <input 
            type='text'
            className='form-control' 
            placeholder='Search by Curriculum.... ' 
            // value={keyword}
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
                  <i className="fas fa-long-arrow-alt-up arr-table" onClick={() => handleSort("asc","id")}></i>
                  <i className="fas fa-long-arrow-alt-down arr-table" onClick={() => handleSort("desc","id")}></i>
                </span>
              </div>
            </th>
            <th>
                <span>curriculumName</span>
                <span>
                  <i className="fas fa-long-arrow-alt-up arr-table" onClick={() => handleSort("asc","first_name")}></i>
                  <i className="fas fa-long-arrow-alt-down arr-table" onClick={() => handleSort("desc","first_name")}></i>
                </span>
            </th>
            <th>duration</th>
            <th>description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item,index) => {
              if(listUser[index].isDeleted === false){
              return(
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.curriculumName}</td>
                  <td>{item.duration}</td>
                  <td>{item.description}</td>
                  <td>
                    <button className='btn btn-warning' onClick={() => handleEditUser(item)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDeleteUser(item)}>Delete</button>
                  </td>
                </tr>
              )
              }
            })
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
      show = {isShowModalAddNew}
      handleClose = {handleclosed}
      ></ModalAddnew>

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

        <ModalEditCurriculum
        handleEditUserFromModal={handleEditUserFromModal}
        handleClose = {handleclosed}
        show = {isShowModalEdit}
        dataUserEdit = {dataUserEdit}
        ></ModalEditCurriculum>

        <ModalConfirm
        show={isShowModalDelete}
        handleClose = {handleclosed}
        dataUserDelete = {dataUserDelete}
        handleDeleteUserFromModal = {handleDeleteUserFromModal}
        ></ModalConfirm>
        <div>

        <label htmlFor='import' className="btn btn-warning"><i className="fas fa-file-import"></i>Import</label>
        <input id="import" type="file" hidden onChange={(event) => handleImport(event)} />
        <CSVLink data={dataExport}
        asyncOnClick={true}
        onClick={(event,done) => getUsersExport(event,done)}
        filename={"my-file.csv"}
        className="btn btn-primary"
        target="_blank"
        ><i className="fas fa-file-download"></i>  Export</CSVLink>
        </div>
    </div>
  )
}


function TableCurriculum() {
  return (
    <div>
      {TableUsers()}
    </div>
  );
}

export default TableCurriculum;