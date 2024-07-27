import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import _, { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import { fetchGradesAssignment, fetchUserById, patchGradeSubmission, submissionAssignment } from '../../../services/UserServices';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const TableUsers = (props) => {
  const zero = 0;
  const [gradesAssignment, setGradesAssignment] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [grade, setGrade] = useState(0);
  const [idSubmission, setIdSubmission] = useState(1);
  const [listTrainee, setListTrainee] = useState([]);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [show, setShow] = useState(false);
  const [listSubmissionAssignment, setListSubmissionAssignment] = useState([]);

  // Fetch grades assignment data
  const fetchSubmissionAssignment = async () => {
    const res = await submissionAssignment(idSubmission,localStorage.getItem('access_token'))
    console.log("fetch >>>",res)
    setListSubmissionAssignment(res)
  }
  useEffect(() => {
    const getGradesAssignment = async () => {
      try {
        const res = await fetchGradesAssignment(localStorage.getItem("idAssignment"), localStorage.getItem("access_token"));
        console.log("grade >>>", res);
        setGradesAssignment(res);
      } catch (error) {
        console.error("Error fetching grades assignment:", error);
      }
    };
    getGradesAssignment();
  }, []);

  // Fetch user details for each item in gradesAssignment
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsPromises = gradesAssignment.map(async (item) => {
        const user = await fetchUserById(item.userId, localStorage.getItem('access_token'));
        return user;
      });
      const userDetails = await Promise.all(userDetailsPromises);
      // Extracting only the necessary data (e.g., name)
      const traineeNames = userDetails.map(user => ({
        userId: user.id,
        name: `${user.firstName} ${user.lastName}` // Adjust according to your API response structure
      }));
      setListTrainee(traineeNames);
    };
    fetchUserDetails();
  }, [gradesAssignment]); // Dependency on gradesAssignment

  useEffect(() => {
    fetchSubmissionAssignment()
  },[idSubmission])

  // Handle page click
  const handlePageClick = (event) => {
    // Implement pagination logic here
  };

  // Handle sorting
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUser);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUser(cloneListUsers);
  };

  const viewDetail = (item) => {
    setIdSubmission(item.id)
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleSubmit = async (id) => {
    if(grade > 10 || grade < 0){
      toast.error("Giá trị điểm phải từ 0.0 -> 10.0")
      return;
    }
    const res = await patchGradeSubmission(id,{
      "grade":grade
    },localStorage.getItem("access_token"))
    console.log("Grade >>>",res)
    if(res && res.status !== 400 && res.status !== 401 && res.status !== 402 && res.status !== 403 && res.status !== 404){
      toast.success("Thay đổi điểm thành công")
    }
    else{
      toast.error("Lỗi khi thay đổi điểm")
    }
  }

  return (
    <div className='container mt-5'>
      <Table>
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
              <span>Tên</span>
            </th>
            <th>
              <div className='sort-header'>
                <span>Điểm</span>
              </div>
            </th>
            <th>Chi Tiết</th>
            <th>Trạng Thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {gradesAssignment && gradesAssignment.length > 0 &&
            gradesAssignment.map((item, index) => (
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{listTrainee[index]?.name}</td>
                <td>
                  <div className="form-group">
                    <input type="text" className="form-control" id={`mark-${index}`} aria-describedby="emailHelp" placeholder="Enter Mark" defaultValue={item.grade} onChange={(event) => setGrade(event.target.value)} />
                  </div>
                </td>
                <td>
                  <i className="far fa-eye icon-td-5" onClick={() => viewDetail(item)}></i>
                </td>
                <td>
                  <div className='status-save'>{item.grade === '0' ? 'Chưa lưu' : 'Đã lưu'}</div>
                </td>
                <td>
                  <div className='btn btn-success' onClick={() => handleSubmit(item.id)}>Chấm điểm</div>
                </td>
              </tr>
            ))}
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bài làm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {listSubmissionAssignment && listSubmissionAssignment.submissionAttachment && listSubmissionAssignment.submissionAttachment[0] && (
                      <div>
                        <span className='fs-14'>{listSubmissionAssignment.submissionAttachment[0].name}</span>
                        <a href={listSubmissionAssignment.submissionAttachment[0].url}><i className="fas fa-folder-open ml-3 fs-14"></i></a>
                      </div>
                    )}
                  </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
              </Modal>
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
  );
};

function TableQuiz() {
  return (
    <div>
      <TableUsers />
    </div>
  );
}

export default TableQuiz;