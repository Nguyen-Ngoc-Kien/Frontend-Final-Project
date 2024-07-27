import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import _, { debounce } from 'lodash';
import { useParams } from 'react-router-dom';


const TableUsers = (props) => {
  const params = useParams();
  const quizId = params.id
  console.log("quizId >>>",quizId)

  const [listUser,setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false);

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

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
                <span>Thời gian hoàn thành</span>
              </div>
            </th>
            <th>Số câu đúng</th>
            <th>Điểm</th>
            <th>Xem lại</th>
          </tr>
        </thead>
        <tbody>
                <tr>
                  <td>2024/06/21</td>
                  <td>5 / 5</td>
                  <td>
                    <span>10 / 10</span>
                  </td>
                  <td>
                  <i class="far fa-eye icon-td-5"></i>
                  </td>
                </tr>
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