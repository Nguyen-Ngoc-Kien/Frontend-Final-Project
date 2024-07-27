import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import { fetchGradesQuiz } from '../../../services/UserServices';
import _, { debounce } from 'lodash';
import moment from 'moment';
import 'moment-timezone';

const TableUsers = (props) => {

  const [listUser,setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);
  const [listMark,setListMark] = useState([])
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const getMarkQuiz = async () => {
    const res = await fetchGradesQuiz(localStorage.getItem("idQuiz"),localStorage.getItem("access_token"))
    console.log("check res mark >>>",res)
    setListMark(res)
}
  useEffect(() => {
    getMarkQuiz()
  },[])
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    // console.log("SortBy, Sortfield >>> ",sortBy, sortField)
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUser(cloneListUsers)
  }
  const handlePageClick = (event) => {

  }
  return(
    <div className='container mt-5'>
      <Table >
        <thead>
          <tr>
            <th>
            <div>
                <span>id</span>
              </div>
            </th>
            <th>Tên học viên</th>
            <th>Thời gian hoàn thành</th>
            <th>Điểm</th>
          </tr>
        </thead>
        <tbody>
            {listMark.map((item, index) => {
                // Chuyển đổi thời gian từ chuỗi ISO sang định dạng ngày + giờ
                const formattedTime = moment(item.updatedAt).format('DD/MM/YYYY HH:mm:ss');
                return (
                <tr key={index}>
                    <td>{item.trainee.id}</td>
                    <td>{item.trainee.firstName} {item.trainee.lastName}</td>
                    <td>
                    <span>{formattedTime}</span>
                    </td>
                    <td>{item.grade}</td>
                </tr>
                );
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
    </div>
  )
}


function TableQuiz() {
  return (
    <div>
      {TableUsers()}
    </div>
  );
}

export default TableQuiz;