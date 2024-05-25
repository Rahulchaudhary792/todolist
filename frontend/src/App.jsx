import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import './App.css'
Modal.setAppElement('#root');
function App() {
  const [title, setTitle] = useState('');
  const [description, sedivescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, sedivueDate] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modIsOpen, setOpen] = useState(false);
  const [data, sedivata] = useState([]);
  const [taskItem, setItem] = useState({});
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function oModal() {
    setOpen(true);
  }
  function cModal() {
    setOpen(false);
  }
  const customStyles = {
    content: {
      backgroundColor: 'black'
    },
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = Math.floor(10000000 + Math.random() * 90000000).toString();
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify({
          id, title, description, status, dueDate
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    alert(data.message);
  }
  useEffect(() => {
     const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/tasks');
          const dat = await response.json();
          sedivata(dat);
        }
        catch(error) {
          console.log("Can't fetch data");
        }
     }
     fetchData();
  }, [data]);
  const handleDelete = async  (id) => {
     const response = await fetch(`http://localhost:3000/tasks/${id}`, {
       method: 'DELETE'
     });
     const data = await response.json();
     alert(data.message);
  }
  const handleEdit = async (id) => {
     const response = await fetch(`http://localhost:3000/tasks/${id}`);
     const dat = await response.json();
     setItem(dat);
     console.log(dat);
     oModal();
  }
  const handleUpdate = async (e) => {
     e.preventDefault();
     const response = await fetch(`http://localhost:3000/tasks/${taskItem.id}`, {
       method: 'PUT',
       body: JSON.stringify({
         'id': taskItem.id,
         'title': title,
         'description': description,
         'status': status,
         'dueDate': dueDate
       }),
       headers: {
        'Content-Type': 'application/json' 
       }
     });
     const data = await response.json();
     alert(data.message);
  }
   return (
    <>
      <div>
         <h1 className="app-title">TO-DO LIST</h1>
         <div className="add-button-div">
            <button className="add-button" onClick={openModal}> + add task</button>
         </div>
         <div>
            <div className="task-items-headings-div">
              <div>
                 <h3 className="task-headings">TITLE</h3>
              </div>
              <div>
                 <h3 className="task-headings">DESCRIPTION</h3>
              </div>
              <div>
                 <h3 className="task-headings">STATUS</h3>
              </div>
              <div>
                 <h3 className="task-headings">DUE DATE</h3>
              </div>
              <div>
                 <h3 className="task-headings">EDIT</h3>
              </div>
              <div>
                 <h3 className="task-headings">DELETE</h3>
              </div>
            </div>
            <div>
            {data.map(item => (
              <div key={item.id} className="task-items-div">
                  <div>
                    <p className="task-details">{item.title}</p>
                  </div>
                  <div>
                    <p className="task-details">{item.description}</p>
                  </div>
                  <div>
                    <p className="task-details">{item.status}</p>
                  </div>
                  <div>
                    <p className="task-details">{item.dueDate}</p>
                  </div>
                  <div>
                    <button className="edit-button" onClick={() => handleEdit(item.id)}>Edit</button>
                  </div>
                  <div>
                    <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
              </div>
            ))}
  
            </div>
          </div>
         <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create task"
        style={customStyles}
      >
        <button onClick={closeModal} className="close-button">Close</button>
        <h2 className="modal-title">Add a task</h2>
        <label><h3 className="input-heading">Title:</h3></label>
        <input type="text" id="title" name="title" className="input-box" onChange={(e) => setTitle(e.target.value)} />
        <label><h3 className="input-heading">Description:</h3></label>
        <textarea className="input-textarea" id="description" name="description" onChange={(e) => sedivescription(e.target.value)} ></textarea>
        <label><h3 className="input-heading">Status:</h3></label>
        <input type="text" className="input-box" id="status" name="status" onChange={(e) => setStatus(e.target.value)} />
        <label><h3 className="input-heading">Due Date:</h3></label>
        <input type="date" className="input-box" id="dueDate" name="dueDate" onChange={(e) => sedivueDate(e.target.value)} />
        <div className="task-submit-button-div">
            <button type="submit" className="task-submit-button" onClick={handleSubmit}>submit</button>
        </div>
      </Modal>
      <Modal isOpen={modIsOpen}
      onRequestClose={cModal}
      contentLabel="Update task"
      style={customStyles}
      >
          <button onClick={cModal} className="close-button">Close</button>
          <h2 className="modal-title">Update the task</h2>
        <label><h3 className="input-heading">Title:</h3></label>
        <input type="text" id="title" name="title" className="input-box" placeholder={taskItem.title} onChange={(e) => setTitle(e.target.value)} />
        <label><h3 className="input-heading">Description:</h3></label>
        <textarea className="input-textarea" id="description" name="description" placeholder={taskItem.description} onChange={(e) => sedivescription(e.target.value)} ></textarea>
        <label><h3 className="input-heading">Status:</h3></label>
        <input type="text" className="input-box" id="status" name="status" placeholder={taskItem.status} onChange={(e) => setStatus(e.target.value)} />
        <label><h3 className="input-heading">Due Date:</h3></label>
        <input type="date" className="input-box" id="dueDate" name="dueDate" placeholder={taskItem.dueDate} onChange={(e) => sedivueDate(e.target.value)} />
        <div className="task-submit-button-div">
            <button type="submit" className="task-submit-button" onClick={handleUpdate}>submit</button>
        </div>
      </Modal>
      </div>
    </>
  )
}

export default App
